/** Steps, replies and fast completion of a version's session. */
import { describe, expect, it } from 'vitest'
import { mkdir, readFile, realpath, symlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { settled } from '../src/host/index.ts'
import { toolTarget, traceOf } from '../src/host/trace.ts'
import { MASK, maskStyle, maskTrace, readTrace, traceFile, traceView, writeTrace, TRACE_LIMITS } from '../src/core/trace.ts'
import { copyTree, manifestDigests, sameManifests, stageManifests, warmable } from '../src/core/deps-warm.ts'
import { strategyFor } from '../src/core/styles.ts'
import { tmp } from './fixture.ts'

interface Ev { type: string; time?: number; data?: any }

function child(events: Ev[], idle: Promise<void> = new Promise(() => {})) {
  const inbox = { nextTurn: [] as unknown[], nextStep: [] as unknown[] }
  return { inbox, whenIdle: () => idle, session: { id: 's', header: {}, seq: 0, append() {}, snapshotEvents: (from: number) => events.slice(from) } }
}

describe('a version counts as done when its turn ends', () => {
  it('does not wait for a session that other plugins keep busy after the turn', async () => {
    const events: Ev[] = [{ type: 'turn/start' }, { type: 'step/start' }, { type: 'assistant/message' }, { type: 'turn/end', data: { reason: { kind: 'completed' } } }]
    const started = Date.now()
    await settled(child(events) as never, 0, new AbortController().signal, { poll: 10, settleMs: 60 })
    expect(Date.now() - started).toBeLessThan(1000)
  })

  it('keeps waiting while a queued message starts another turn', async () => {
    const events: Ev[] = [{ type: 'turn/start' }, { type: 'turn/end' }]
    const c = child(events)
    c.inbox.nextTurn.push('queued')
    let done = false
    const waiting = settled(c as never, 0, new AbortController().signal, { poll: 10, settleMs: 40 }).then(() => { done = true })
    await new Promise(resolve => setTimeout(resolve, 120))
    expect(done).toBe(false)
    c.inbox.nextTurn.length = 0
    events.push({ type: 'turn/start' }, { type: 'step/start' })
    await new Promise(resolve => setTimeout(resolve, 120))
    expect(done).toBe(false)
    events.push({ type: 'turn/end' })
    await waiting
    expect(done).toBe(true)
  })

  it('does not wait out the budget when the session goes idle without ever ending a turn', async () => {
    const started = Date.now()
    await settled(child([], Promise.resolve()) as never, 0, new AbortController().signal, { poll: 10, settleMs: 60, unstartedMs: 150 })
    expect(Date.now() - started).toBeGreaterThanOrEqual(150)
    expect(Date.now() - started).toBeLessThan(1500)
    // A turn that began and broke off without an end is over after the short settle.
    const brokeOff = Date.now()
    await settled(child([{ type: 'turn/start' }, { type: 'step/start' }], Promise.resolve()) as never, 0, new AbortController().signal, { poll: 10, settleMs: 60, unstartedMs: 5000 })
    expect(Date.now() - brokeOff).toBeLessThan(1500)
    // Still waits while a queued message has yet to start its turn.
    const c = child([], Promise.resolve())
    c.inbox.nextTurn.push('queued')
    let done = false
    const waiting = settled(c as never, 0, new AbortController().signal, { poll: 10, settleMs: 40, unstartedMs: 40 }).then(() => { done = true })
    await new Promise(resolve => setTimeout(resolve, 150))
    expect(done).toBe(false)
    c.inbox.nextTurn.length = 0
    await waiting
  })

  it('returns after a short grace when a stopped session never ends its turn', async () => {
    const ctl = new AbortController()
    const started = Date.now()
    setTimeout(() => ctl.abort(), 20)
    await settled(child([{ type: 'turn/start' }, { type: 'step/start' }]) as never, 0, ctl.signal, { poll: 10, graceMs: 150 })
    expect(Date.now() - started).toBeGreaterThanOrEqual(150)
    expect(Date.now() - started).toBeLessThan(2000)
  })
})

describe('trace of a session', () => {
  const t0 = 1_000_000
  const events: Ev[] = [
    { type: 'turn/start', time: t0 },
    { type: 'step/start', time: t0 + 100 },
    { type: 'assistant/message', time: t0 + 2100, data: { message: { content: [{ type: 'reasoning', text: 'Look at the project first.' }, { type: 'tool-call', id: 'c1', name: 'read', arguments: '{"file_path":"src/App.tsx"}' }] } } },
    { type: 'tool/call', time: t0 + 2100, data: { callId: 'c1', name: 'read', arguments: '{"file_path":"src/App.tsx"}' } },
    { type: 'tool/result', time: t0 + 2400, data: { message: { toolCallId: 'c1', content: [{ type: 'text', text: 'export default function App() {}' }], isError: false } } },
    { type: 'step/start', time: t0 + 2500 },
    { type: 'assistant/message', time: t0 + 3500, data: { message: { content: [{ type: 'text', text: 'Now the search box.' }, { type: 'tool-call', id: 'c2', name: 'pwsh' }] } } },
    { type: 'tool/call', time: t0 + 3500, data: { callId: 'c2', name: 'pwsh', arguments: '{"command":"npm   run typecheck"}' } },
    { type: 'tool/result', time: t0 + 9500, data: { message: { toolCallId: 'c2', content: [{ type: 'text', text: 'error TS2304' }], isError: true } } },
    { type: 'step/start', time: t0 + 9600 },
    { type: 'assistant/message', time: t0 + 11_000, data: { message: { content: [{ type: 'reasoning', text: 'Fixed.' }, { type: 'text', text: 'Added a search box.' }] } } },
    { type: 'turn/end', time: t0 + 11_000, data: { reason: { kind: 'completed' } } },
  ]

  it('lists thinking, words between steps and tool calls with their results', () => {
    const trace = traceOf(events, t0)
    expect(trace).toMatchObject({ steps: 3, tools: 2, thinking: 2, done: true, truncated: false })
    expect(trace.items.map(item => item.kind)).toEqual(['thinking', 'tool', 'text', 'tool', 'thinking'])
    expect(trace.items[0]).toMatchObject({ text: 'Look at the project first.', ms: 2000, at: 2100 })
    expect(trace.items[1]).toMatchObject({ name: 'read', target: 'src/App.tsx', status: 'done', ms: 300, output: 'export default function App() {}' })
    expect(trace.items[3]).toMatchObject({ name: 'pwsh', target: 'npm run typecheck', input: 'npm   run typecheck', status: 'error' })
  })

  it('keeps the reply out of the steps once the turn has ended, and shows a running tool as running', () => {
    expect(traceOf(events, t0).items.some(item => item.text === 'Added a search box.')).toBe(false)
    const live = traceOf(events.slice(0, 8), t0)
    expect(live.done).toBe(false)
    expect(live.items.at(-1)).toMatchObject({ kind: 'tool', name: 'pwsh', status: 'running' })
    expect(live.items.some(item => item.text === 'Now the search box.')).toBe(true)
  })

  it('stays bounded for long sessions and long texts', () => {
    const many: Ev[] = []
    for (let i = 0; i < 500; i++) many.push({ type: 'step/start' }, { type: 'assistant/message', data: { message: { content: [{ type: 'reasoning', text: 'x'.repeat(10_000) }] } } })
    const trace = traceOf(many, 0)
    expect(trace.items).toHaveLength(TRACE_LIMITS.items)
    expect(trace.truncated).toBe(true)
    expect(trace.omitted).toBe(500 - TRACE_LIMITS.items)
    expect(trace.items[0]!.text!.length).toBeLessThanOrEqual(TRACE_LIMITS.thinking + 1)
    // A long text alone shortens that text; no step is left out.
    const short = traceOf(many.slice(0, 4), 0)
    expect(short).toMatchObject({ truncated: true })
    expect(short.omitted).toBeUndefined()
  })

  it('names what a tool touched', () => {
    expect(toolTarget({ file_path: 'C:\\copy\\src\\App.tsx' })).toBe('C:\\copy\\src\\App.tsx')
    expect(toolTarget({ pattern: '**/*.ts' })).toBe('**/*.ts')
    expect(toolTarget(undefined)).toBe('')
  })

  it('is written whole and read back', async () => {
    const dir = await tmp('ac-trace')
    const file = traceFile(dir, 'A')
    await writeTrace(file, traceOf(events, t0))
    expect((await readTrace(file))?.tools).toBe(2)
    expect(await readTrace(path.join(dir, 'missing.json'))).toBeUndefined()
  })
})

describe('masking style names before a blind pick', () => {
  it('masks names used as a style and the instruction words, not ordinary words', () => {
    expect(maskStyle('Strategy: BOLD. I will go big.')).toBe(`${MASK}. I will go big.`)
    expect(maskStyle('用户要求极简风格，做一个极简的页面')).toBe(`用户要求${MASK}风格，做一个极简的页面`)
    expect(maskStyle('The Vibrant style needs color; font-weight: bold')).toBe(`The ${MASK} style needs color; font-weight: bold`)
    expect(maskStyle('揭晓：稳妥 · Conservative')).toBe(`揭晓：${MASK}`)
  })

  it('masks a style name the text uses to describe its own approach', () => {
    expect(maskStyle('I went bold and kept it minimal, a polished take.')).toBe(`I went ${MASK} and kept it ${MASK}, a ${MASK} take.`)
    expect(maskStyle('这次走稳妥路线，整体偏大胆，按极简来做')).toBe(`这次走${MASK}路线，整体偏${MASK}，按${MASK}来做`)
    expect(maskStyle('点按钮就开始；精致的排版；a lean bundle; a balanced diet')).toBe('点按钮就开始；精致的排版；a lean bundle; a balanced diet')
  })

  it('masks a custom description and every text of a trace', () => {
    const custom = strategyFor({ id: 'custom', note: '像深夜电台' })
    expect(maskStyle('按“像深夜电台”的感觉来写', custom)).toBe(`按“${MASK}”的感觉来写`)
    const masked = maskTrace({ items: [{ kind: 'tool', at: 0, name: 'write', input: 'MINIMAL', output: 'ok', target: 'Minimal style.md' }], steps: 1, tools: 1, thinking: 0, truncated: false, done: true, updatedAt: 0 })
    expect(masked.items[0]).toMatchObject({ input: MASK, target: `${MASK} style.md` })
  })

  it('shows readers a masked trace before the pick, the full one after, and only the newest steps in a summary', () => {
    const early = [{ kind: 'text' as const, at: 0, text: 'one' }, { kind: 'text' as const, at: 0, text: 'two' }]
    const stored = { items: [...early, { kind: 'thinking' as const, at: 0, text: 'Go with the Bold style.' }, { kind: 'tool' as const, at: 5, name: 'write', target: 'BOLD.md', status: 'running' as const }], steps: 2, tools: 1, thinking: 1, truncated: false, done: false, updatedAt: 0 }
    expect(traceView(stored, { blind: true })).toMatchObject({ masked: true, items: [{}, {}, { text: `Go with the ${MASK} style.` }, { target: `${MASK}.md` }] })
    expect(traceView(stored, { blind: false })).toMatchObject({ masked: false, items: [{}, {}, { text: 'Go with the Bold style.' }, { target: 'BOLD.md' }] })
    const summary = traceView(stored, { blind: true, summary: true })
    expect(summary).toMatchObject({ steps: 2, tools: 1, thinking: 1, masked: true })
    expect(summary.items).toEqual([{ kind: 'text', at: 0, text: 'two' }, { kind: 'thinking', at: 0, text: `Go with the ${MASK} style.` }, { kind: 'tool', at: 5, name: 'write', target: `${MASK}.md`, status: 'running' }])
  })
})

describe('dependencies installed while versions generate', () => {
  const directoryLink = (target: string, link: string) => symlink(target, link, process.platform === 'win32' ? 'junction' : 'dir')

  it('only for npm lockfiles without root install scripts or local packages', async () => {
    const dir = await tmp('ac-warm')
    await writeFile(path.join(dir, 'package.json'), JSON.stringify({ name: 'x', dependencies: { a: '1.0.0' } }))
    await writeFile(path.join(dir, 'package-lock.json'), JSON.stringify({ lockfileVersion: 3, packages: { '': {}, 'node_modules/a': { version: '1.0.0', resolved: 'https://registry.npmjs.org/a/-/a-1.0.0.tgz' } } }))
    expect(await warmable(dir)).toEqual({ ok: true })
    await writeFile(path.join(dir, 'package.json'), JSON.stringify({ name: 'x', scripts: { postinstall: 'node setup.js' } }))
    expect(await warmable(dir)).toMatchObject({ ok: false, reason: 'root install scripts' })
    await writeFile(path.join(dir, 'package.json'), JSON.stringify({ name: 'x' }))
    await writeFile(path.join(dir, 'package-lock.json'), JSON.stringify({ lockfileVersion: 3, packages: { 'node_modules/v': { resolved: 'vendor/v', link: true } } }))
    expect(await warmable(dir)).toMatchObject({ ok: false, reason: 'local packages' })
  })

  it('reuses only an identical manifest, and gives each version its own files', async () => {
    const project = await tmp('ac-warm-project'), warm = await tmp('ac-warm-dir')
    await writeFile(path.join(project, 'package.json'), '{"name":"x"}')
    await writeFile(path.join(project, 'package-lock.json'), '{"lockfileVersion":3}')
    const plan = await stageManifests(project, warm)
    expect(sameManifests(plan.manifests, await manifestDigests(project))).toBe(true)
    await writeFile(path.join(project, '.npmrc'), 'registry=https://example.invalid/')
    expect(sameManifests(plan.manifests, await manifestDigests(project))).toBe(false)

    await mkdir(path.join(warm, 'node_modules', 'a', 'lib'), { recursive: true })
    await writeFile(path.join(warm, 'node_modules', 'a', 'lib', 'index.js'), 'module.exports = 1')
    const target = path.join(project, 'node_modules')
    expect(await copyTree(path.join(warm, 'node_modules'), target)).toBe(1)
    expect(await readFile(path.join(target, 'a', 'lib', 'index.js'), 'utf8')).toBe('module.exports = 1')
    // New files and in-place writes stay in the version's copy.
    await mkdir(path.join(target, '.vite'), { recursive: true })
    await writeFile(path.join(target, '.vite', 'cache.json'), '{}')
    await writeFile(path.join(target, 'a', 'lib', 'index.js'), 'module.exports = 2')
    await expect(readFile(path.join(warm, 'node_modules', '.vite', 'cache.json'))).rejects.toThrow()
    expect(await readFile(path.join(warm, 'node_modules', 'a', 'lib', 'index.js'), 'utf8')).toBe('module.exports = 1')
  })

  it('relocates internal directory links so writes stay in the candidate', async () => {
    const dir = await tmp('ac-warm-internal-link'), warm = path.join(dir, 'warm'), target = path.join(dir, 'candidate')
    await mkdir(path.join(warm, 'pkg'), { recursive: true })
    await writeFile(path.join(warm, 'pkg', 'state.txt'), 'baseline')
    await directoryLink(process.platform === 'win32' ? path.join(warm, 'pkg') : 'pkg', path.join(warm, 'alias'))
    expect(await copyTree(warm, target)).toBe(1)
    expect(await realpath(path.join(target, 'alias'))).toBe(await realpath(path.join(target, 'pkg')))
    await writeFile(path.join(target, 'alias', 'state.txt'), 'candidate')
    expect(await readFile(path.join(warm, 'pkg', 'state.txt'), 'utf8')).toBe('baseline')
  })

  it('rejects links to mutable files outside the warm tree', async () => {
    const dir = await tmp('ac-warm-escaping-link'), warm = path.join(dir, 'warm'), target = path.join(dir, 'candidate'), outside = path.join(dir, 'outside')
    await mkdir(warm)
    await mkdir(outside)
    await writeFile(path.join(outside, 'state.txt'), 'baseline')
    await directoryLink(outside, path.join(warm, 'shared'))
    await expect(copyTree(warm, target)).rejects.toThrow(/outside.*dependency tree/i)
    expect(await readFile(path.join(outside, 'state.txt'), 'utf8')).toBe('baseline')
  })

  it('rejects a link whose apparently internal target resolves outside the tree', async () => {
    const dir = await tmp('ac-warm-indirect-link'), warm = path.join(dir, 'warm'), outside = path.join(dir, 'outside')
    await mkdir(warm)
    await mkdir(outside)
    await directoryLink(outside, path.join(warm, 'external'))
    await directoryLink(path.join(warm, 'external'), path.join(warm, 'alias'))
    await expect(copyTree(warm, path.join(dir, 'candidate'))).rejects.toThrow(/outside.*dependency tree/i)
  })

  it('rejects a redirected source root', async () => {
    const dir = await tmp('ac-warm-source-root'), outside = path.join(dir, 'outside'), warm = path.join(dir, 'warm')
    await mkdir(outside)
    await writeFile(path.join(outside, 'state.txt'), 'baseline')
    await directoryLink(outside, warm)
    await expect(copyTree(warm, path.join(dir, 'candidate'))).rejects.toThrow(/source.*directory/i)
  })

  it('rejects a dangling dependency link so the candidate can install normally', async () => {
    const dir = await tmp('ac-warm-dangling-link'), warm = path.join(dir, 'warm')
    await mkdir(warm)
    await directoryLink(path.join(warm, 'missing'), path.join(warm, 'alias'))
    await expect(copyTree(warm, path.join(dir, 'candidate'))).rejects.toThrow()
  })

  it('rejects a redirected destination root without changing its target', async () => {
    const dir = await tmp('ac-warm-destination-root'), warm = path.join(dir, 'warm'), target = path.join(dir, 'candidate'), outside = path.join(dir, 'outside')
    await mkdir(warm)
    await mkdir(outside)
    await writeFile(path.join(warm, 'state.txt'), 'candidate')
    await writeFile(path.join(outside, 'state.txt'), 'baseline')
    await directoryLink(outside, target)
    await expect(copyTree(warm, target)).rejects.toThrow(/destination.*directory/i)
    expect(await readFile(path.join(outside, 'state.txt'), 'utf8')).toBe('baseline')
  })

  it('requires an empty destination instead of overwriting an existing tree', async () => {
    const dir = await tmp('ac-warm-existing-target'), warm = path.join(dir, 'warm'), target = path.join(dir, 'candidate')
    await mkdir(warm)
    await mkdir(target)
    await writeFile(path.join(warm, 'state.txt'), 'candidate')
    await writeFile(path.join(target, 'state.txt'), 'existing')
    await expect(copyTree(warm, target)).rejects.toThrow(/destination.*empty/i)
    expect(await readFile(path.join(target, 'state.txt'), 'utf8')).toBe('existing')
  })
})
