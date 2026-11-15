/**
 * Build a version's trace from its DSH session events: each model step's
 * thinking and words, then the tools it called with what they returned.
 * The text of the last message is the reply and is shown on its own.
 */
import { boundItems, clip, TRACE_LIMITS } from '../core/trace.js';
const textOf = (content) => Array.isArray(content)
    ? content.map(block => (block && typeof block === 'object' && typeof block.text === 'string' ? block.text : '')).join('\n')
    : typeof content === 'string' ? content : '';
function parseArguments(raw) {
    if (raw && typeof raw === 'object' && !Array.isArray(raw))
        return raw;
    if (typeof raw !== 'string')
        return undefined;
    try {
        const value = JSON.parse(raw);
        return value && typeof value === 'object' && !Array.isArray(value) ? value : undefined;
    }
    catch {
        return undefined;
    }
}
/** The most telling argument of a tool call: a path, a pattern, a command or an address. */
export function toolTarget(args) {
    if (!args)
        return '';
    const raw = args.file_path ?? args.path ?? args.pattern ?? args.command ?? args.url ?? args.query ?? args.description ?? '';
    return clip(String(raw).replace(/\s+/g, ' ').trim(), TRACE_LIMITS.target).text;
}
function inputOf(name, args, raw) {
    if (args && typeof args.command === 'string')
        return args.command;
    if (args && (name === 'edit' || name === 'write' || name === 'multi_edit')) {
        const { content, old_string: before, new_string: after, ...rest } = args;
        const parts = [JSON.stringify(rest, null, 2)];
        if (typeof before === 'string')
            parts.push(`- ${before}`);
        if (typeof after === 'string')
            parts.push(`+ ${after}`);
        if (typeof content === 'string')
            parts.push(content);
        return parts.join('\n');
    }
    if (args)
        return JSON.stringify(args, null, 2);
    return typeof raw === 'string' ? raw : '';
}
export function traceOf(events, startedAt = events.find(event => typeof event.time === 'number')?.time ?? Date.now()) {
    const items = [];
    const tools = new Map();
    let steps = 0, toolCount = 0, thinking = 0, cut = false, stepStarted, done = false;
    let lastTextIndex = -1;
    const at = (event) => Math.max(0, (typeof event.time === 'number' ? event.time : startedAt) - startedAt);
    const bounded = (text, max) => { const c = clip(text, max); if (c.cut)
        cut = true; return c.text; };
    for (const event of events) {
        const data = event.data ?? {};
        if (event.type === 'step/start') {
            steps++;
            stepStarted = typeof event.time === 'number' ? event.time : undefined;
            continue;
        }
        if (event.type === 'turn/start') {
            done = false;
            continue;
        }
        if (event.type === 'turn/end') {
            done = true;
            continue;
        }
        if (event.type === 'assistant/message') {
            const blocks = Array.isArray(data.message?.content) ? data.message.content : [];
            const ms = stepStarted !== undefined && typeof event.time === 'number' ? Math.max(0, event.time - stepStarted) : undefined;
            const reasoning = blocks.filter(block => block.type === 'reasoning' && typeof block.text === 'string' && block.text.trim()).map(block => block.text.trim()).join('\n\n');
            if (reasoning) {
                thinking++;
                items.push({ kind: 'thinking', at: at(event), ...(ms === undefined ? {} : { ms }), text: bounded(reasoning, TRACE_LIMITS.thinking) });
            }
            const words = blocks.filter(block => block.type === 'text' && typeof block.text === 'string' && block.text.trim()).map(block => block.text.trim()).join('\n\n');
            lastTextIndex = -1;
            if (words) {
                lastTextIndex = items.length;
                items.push({ kind: 'text', at: at(event), text: bounded(words, TRACE_LIMITS.text) });
            }
            continue;
        }
        if (event.type === 'tool/call' && typeof data.name === 'string') {
            toolCount++;
            const args = parseArguments(data.arguments);
            const target = toolTarget(args);
            tools.set(String(data.callId ?? `${items.length}`), items.length);
            items.push({ kind: 'tool', at: at(event), name: data.name, ...(target ? { target } : {}), input: bounded(inputOf(data.name, args, data.arguments), TRACE_LIMITS.input), status: 'running' });
            continue;
        }
        if (event.type === 'tool/result') {
            const message = data.message ?? {};
            const index = tools.get(String(message.toolCallId ?? message.source?.callId ?? ''));
            if (index === undefined)
                continue;
            const call = items[index];
            items[index] = { ...call, ms: Math.max(0, at(event) - call.at), output: bounded(textOf(message.content).trim(), TRACE_LIMITS.output), status: message.isError === true ? 'error' : 'done' };
        }
    }
    // Once the turn has ended, the words of its last message are the reply, shown on their own.
    const kept = done && lastTextIndex >= 0 ? items.filter((_, index) => index !== lastTextIndex) : items;
    const bound = boundItems(kept);
    return { items: bound.items, steps, tools: toolCount, thinking, truncated: cut || bound.cut, ...(bound.omitted ? { omitted: bound.omitted } : {}), done, updatedAt: Date.now() };
}
