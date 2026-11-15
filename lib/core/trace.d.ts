import type { Strategy } from './types.ts';
export type TraceItemKind = 'thinking' | 'text' | 'tool';
export interface TraceItem {
    readonly kind: TraceItemKind;
    /** Milliseconds from the start of generation. */
    readonly at: number;
    /** Thinking: how long the model took for that step. Tool: how long the call ran. */
    readonly ms?: number;
    /** Thinking or text. */
    readonly text?: string;
    /** Tool: its name as the session reports it, and a short description of what it touched. */
    readonly name?: string;
    readonly target?: string;
    readonly input?: string;
    readonly output?: string;
    readonly status?: 'running' | 'done' | 'error';
}
export interface Trace {
    readonly items: readonly TraceItem[];
    /** Model steps taken, tool calls made, and steps that thought before acting. */
    readonly steps: number;
    readonly tools: number;
    readonly thinking: number;
    /** Some items or texts were shortened to keep the trace bounded. */
    readonly truncated: boolean;
    /** How many items from the middle of a long session were left out. */
    readonly omitted?: number;
    /** The session's turn has ended. */
    readonly done: boolean;
    readonly updatedAt: number;
}
export declare const TRACE_LIMITS: {
    readonly items: 320;
    readonly head: 40;
    readonly thinking: 6000;
    readonly text: 4000;
    readonly input: 1500;
    readonly output: 2000;
    readonly target: 140;
};
export declare function clip(text: string, max: number): {
    text: string;
    cut: boolean;
};
/** Keep the opening and the latest items of a long session. */
export declare function boundItems(items: TraceItem[]): {
    items: TraceItem[];
    cut: boolean;
    omitted: number;
};
export declare const EMPTY_TRACE: Trace;
/** Shown in place of a style name while a blind comparison is still blind. */
export declare const MASK = "\u2592\u2592";
/**
 * Mask what would name a version's style before a blind pick: the style
 * words of the instructions, a style name used as a style ("极简风格",
 * "Bold style", "稳妥 · Conservative") and a custom description. Ordinary use
 * of the same words ("font-weight: bold", "一个极简的页面") stays readable.
 */
export declare function maskStyle(text: string, strategy?: Strategy): string;
export declare function maskTrace(trace: Trace, strategy?: Strategy): Trace;
/**
 * What a reader is shown of a stored trace. Before a blind pick, words that
 * name the version's style are masked. A summary keeps the counts and the
 * newest few steps, enough to show live what the version is doing.
 */
export declare const SUMMARY_ITEMS = 3;
export declare function traceView(stored: Trace, options: {
    blind: boolean;
    strategy?: Strategy;
    summary?: boolean;
}): Trace & {
    masked: boolean;
};
export declare function traceFile(artifacts: string, label: string): string;
/** Replace the stored trace in one step, so a reader never sees half a file. */
export declare function writeTrace(file: string, trace: Trace): Promise<void>;
export declare function readTrace(file: string): Promise<Trace | undefined>;
