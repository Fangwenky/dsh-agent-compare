/**
 * Build a version's trace from its DSH session events: each model step's
 * thinking and words, then the tools it called with what they returned.
 * The text of the last message is the reply and is shown on its own.
 */
import { type Trace } from '../core/trace.ts';
interface Event {
    readonly type: string;
    readonly time?: number;
    readonly data?: any;
}
/** The most telling argument of a tool call: a path, a pattern, a command or an address. */
export declare function toolTarget(args: Record<string, unknown> | undefined): string;
export declare function traceOf(events: readonly Event[], startedAt?: number): Trace;
export {};
