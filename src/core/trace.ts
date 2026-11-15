/**
 * What a version did while it worked: its thinking, its tool calls with their
 * input and output, and any words it wrote between steps. Built by the host
 * from the version's own session; the final reply is kept apart from it.
 *
 * A trace is bounded: long texts are cut and a very long session keeps its
 * opening and its latest steps. It is stored next to the run's other
 * artifacts, not in the run record.
 */
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { Strategy } from './types.ts'

export type TraceItemKind = 'thinking' | 'text' | 'tool'

export interface TraceItem {
  readonly kind: TraceItemKind
  /** Milliseconds from the start of generation. */
  readonly at: number
  /** Thinking: how long the model took for that step. Tool: how long the call ran. */
  readonly ms?: number
  /** Thinking or text. */
  readonly text?: string
  /** Tool: its name as the session reports it, and a short description of what it touched. */
  readonly name?: string
  readonly target?: string
  readonly input?: string
  readonly output?: string
  readonly status?: 'running' | 'done' | 'error'
}

export interface Trace {
  readonly items: readonly TraceItem[]
  /** Model steps taken, tool calls made, and steps that thought before acting. */
  readonly steps: number
  readonly tools: number
  readonly thinking: number
  /** Some items or texts were shortened to keep the trace bounded. */
  readonly truncated: boolean
  /** How many items from the middle of a long session were left out. */
  readonly omitted?: number
  /** The session's turn has ended. */
  readonly done: boolean
  readonly updatedAt: number
}

export const TRACE_LIMITS = { items: 320, head: 40, thinking: 6000, text: 4000, input: 1500, output: 2000, target: 140 } as const

export function clip(text: string, max: number): { text: string; cut: boolean } {
  return text.length <= max ? { text, cut: false } : { text: `${text.slice(0, max)}…`, cut: true }
}

/** Keep the opening and the latest items of a long session. */
export function boundItems(items: TraceItem[]): { items: TraceItem[]; cut: boolean; omitted: number } {
  if (items.length <= TRACE_LIMITS.items) return { items, cut: false, omitted: 0 }
  const tail = TRACE_LIMITS.items - TRACE_LIMITS.head
  return { items: [...items.slice(0, TRACE_LIMITS.head), ...items.slice(-tail)], cut: true, omitted: items.length - TRACE_LIMITS.items }
}

export const EMPTY_TRACE: Trace = { items: [], steps: 0, tools: 0, thinking: 0, truncated: false, done: false, updatedAt: 0 }

const STYLE_WORDS = ['CONSERVATIVE', 'BOLD', 'MINIMAL', 'POLISHED', 'VIBRANT', 'FRIENDLY', 'RIGOROUS', 'LEAN', 'BALANCED', 'CUSTOM']
const STYLE_NAMES = [['稳妥', 'Conservative'], ['大胆', 'Bold'], ['极简', 'Minimal'], ['精致', 'Polished'], ['活力', 'Vibrant'], ['易用', 'Friendly'], ['严谨', 'Rigorous'], ['轻快', 'Lean'], ['均衡', 'Balanced']] as const
const ZH = STYLE_NAMES.map(([zh]) => zh).join('|'), EN = STYLE_NAMES.map(([, en]) => en).join('|')
/** Shown in place of a style name while a blind comparison is still blind. */
export const MASK = '▒▒'
const escape = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Mask what would name a version's style before a blind pick: the style
 * words of the instructions, a style name used as a style ("极简风格",
 * "Bold style", "稳妥 · Conservative") and a custom description. Ordinary use
 * of the same words ("font-weight: bold", "一个极简的页面") stays readable.
 */
export function maskStyle(text: string, strategy?: Strategy): string {
  let out = text.replace(new RegExp(`\\b(?:Strategy|Style)\\s*:\\s*(?:${STYLE_WORDS.join('|')})\\b`, 'g'), MASK)
    .replace(new RegExp(`\\b(?:${STYLE_WORDS.join('|')})\\b`, 'g'), MASK)
  for (const [zh, en] of STYLE_NAMES) out = out.replace(new RegExp(`${zh}\\s*·\\s*${en}`, 'gi'), MASK)
  // A style name the text uses to describe its own approach: "Bold style", "went bold",
  // "a minimal take", "极简风格", "走稳妥路线", "偏大胆".
  out = out.replace(new RegExp(`(?:${ZH})(?=\\s*(?:风格|策略|路线|方向|版本|取向|路子|思路))`, 'g'), MASK)
    .replace(new RegExp(`((?:走|偏|偏向|主打|采用|选了|按照|按)\\s*)(?:${ZH})`, 'g'), `$1${MASK}`)
    .replace(new RegExp(`\\b(?:${EN})(?=\\s+(?:style|strategy|approach|direction|take|route|version|vibe)\\b)`, 'gi'), MASK)
    .replace(new RegExp(`\\b((?:went|go|going|gone|kept it|keep it|keeping it|stayed|played it|leaned|leaning)\\s+)(?:${EN})\\b`, 'gi'), `$1${MASK}`)
  const note = strategy?.id === 'custom' ? strategy.title.replace(/^自定义 · /, '').replace(/…$/, '').trim() : ''
  if (note.length >= 4) out = out.replace(new RegExp(escape(note), 'g'), MASK)
  return out
}

export function maskTrace(trace: Trace, strategy?: Strategy): Trace {
  const mask = (value: string | undefined): string | undefined => value === undefined ? undefined : maskStyle(value, strategy)
  return {
    ...trace,
    items: trace.items.map(item => ({
      ...item,
      ...(item.text === undefined ? {} : { text: mask(item.text)! }),
      ...(item.target === undefined ? {} : { target: mask(item.target)! }),
      ...(item.input === undefined ? {} : { input: mask(item.input)! }),
      ...(item.output === undefined ? {} : { output: mask(item.output)! }),
    })),
  }
}

/**
 * What a reader is shown of a stored trace. Before a blind pick, words that
 * name the version's style are masked. A summary keeps the counts and only the
 * newest step, which is enough to say what the version is doing.
 */
export function traceView(stored: Trace, options: { blind: boolean; strategy?: Strategy; summary?: boolean }): Trace & { masked: boolean } {
  const wanted = options.summary === true ? { ...stored, items: stored.items.slice(-1) } : stored
  return { ...(options.blind ? maskTrace(wanted, options.strategy) : wanted), masked: options.blind }
}

export function traceFile(artifacts: string, label: string): string {
  return path.join(artifacts, `${label}.trace.json`)
}

/** Replace the stored trace in one step, so a reader never sees half a file. */
export async function writeTrace(file: string, trace: Trace): Promise<void> {
  await mkdir(path.dirname(file), { recursive: true })
  const temporary = `${file}.${process.pid}.${Date.now()}.tmp`
  await writeFile(temporary, JSON.stringify(trace))
  await rename(temporary, file)
}

export async function readTrace(file: string): Promise<Trace | undefined> {
  try {
    const value = JSON.parse(await readFile(file, 'utf8')) as Trace
    return value && Array.isArray(value.items) ? value : undefined
  } catch { return undefined }
}
