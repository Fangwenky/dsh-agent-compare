/**
 * What a version did and said, as the user reads it on its card.
 *
 * - The steps: every model step's thinking, the tools it called with what
 *   they returned, and words written between steps, behind one toggle that
 *   opens them in place, as a conversation shows them.
 * - The reply: the version's last message, shown on its own beside whatever
 *   it built, never hidden behind the steps.
 * - The whale: while a version works, a small whale shows how far it has got
 *   and what it is doing. It follows the pointer and answers a poke.
 */
import React, { useEffect, useId, useRef, useState } from 'react'
import { t } from './i18n.js'
import { Markdown, CopyButton } from './results.js'
import type { Cand, Run, Stage, Trace, TraceItem } from './model.js'
import { fmt } from './candidate-evidence.js'

type Call = <T>(method: string, body: Record<string, unknown>, signal?: AbortSignal) => Promise<T>

/** The opening items a long trace keeps before the gap (TRACE_LIMITS.head on the host). */
const TRACE_HEAD = 40

const reduced = (): boolean => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * The latest recorded steps of one version, read again whenever its activity
 * changes. While the steps are closed only the counts and the newest step are
 * read; opening them reads them all.
 */
export function useTrace(run: Run, c: Cand, call: Call, full: boolean): Trace | undefined {
  const [trace, setTrace] = useState<Trace>()
  const activity = `${c.stage}:${c.progress?.steps ?? ''}:${c.progress?.lastActivityAt ?? ''}`
  useEffect(() => {
    if (c.stage === 'queued' || c.stage === 'preparing') return
    const controller = new AbortController()
    call<Trace>('trace', { runId: run.runId, label: c.label, ...(full ? {} : { summary: true }) }, controller.signal).then(value => setTrace(value), () => {})
    return () => controller.abort()
  }, [run.runId, c.label, activity, run.state, full])
  return trace
}

const TOOL_NAMES: Record<string, string> = {
  read: '读取文件', write: '写入文件', edit: '编辑文件', multi_edit: '编辑文件', multiedit: '编辑文件', apply_patch: '应用补丁',
  pwsh: '运行命令', bash: '运行命令', shell: '运行命令', powershell: '运行命令', exec: '运行命令',
  grep: '搜索内容', glob: '查找文件', ls: '列出目录', list: '列出目录', tree: '查看目录',
  web_fetch: '读取网页', fetch: '读取网页', web_search: '搜索网页', search: '搜索',
  compress: '整理上下文', todo: '更新待办', todo_write: '更新待办', todowrite: '更新待办', task: '子任务', skill: '使用技能',
}
export const toolName = (name = ''): string => t(TOOL_NAMES[name.toLowerCase()] ?? name)
const seconds = (ms?: number): string => ms === undefined ? '' : ms < 1000 ? t('不到 1 秒') : ms < 60_000 ? t('{0} 秒', { 0: (ms / 1000).toFixed(ms < 10_000 ? 1 : 0) }) : fmt(ms)

/** One line saying what the version is doing now, from its newest step. */
export function currentAction(trace: Trace | undefined): string | undefined {
  const last = trace?.items[trace.items.length - 1]
  if (!last || trace?.done) return undefined
  if (last.kind === 'tool') return last.status === 'running' ? `${toolName(last.name)}${last.target ? ` · ${last.target}` : ''}` : t('正在思考下一步')
  if (last.kind === 'thinking') return t('正在思考下一步')
  return t('正在组织回复')
}

function Status({ item }: { item: TraceItem }): React.ReactElement {
  if (item.kind === 'thinking') return <span className="ac-step-dot think" aria-hidden="true" />
  if (item.kind === 'text') return <span className="ac-step-dot text" aria-hidden="true" />
  return <span className={`ac-step-dot ${item.status ?? 'done'}`} aria-label={item.status === 'error' ? t('出错') : item.status === 'running' ? t('进行中') : t('完成')} />
}

function Step({ item, live }: { item: TraceItem; live: boolean }): React.ReactElement {
  if (item.kind === 'text') return <li className="ac-step text"><Status item={item} /><div className="ac-step-words ac-md"><Markdown text={item.text ?? ''} /></div></li>
  const title = item.kind === 'thinking'
    ? <><b className={live ? 'ac-shimmer' : ''}>{live ? t('正在思考') : t('思考')}</b><span className="ac-step-peek">{(item.text ?? '').replace(/\s+/g, ' ').slice(0, 120)}</span>{item.ms !== undefined && !live && <span className="ac-step-time">{seconds(item.ms)}</span>}</>
    : <><b>{toolName(item.name)}</b>{item.target && <code className="ac-step-target" title={item.target}>{item.target}</code>}{item.ms !== undefined && <span className="ac-step-time">{seconds(item.ms)}</span>}</>
  return <li className={`ac-step ${item.kind}${item.status === 'error' ? ' error' : ''}`}>
    <details>
      <summary><Status item={item} />{title}</summary>
      {item.kind === 'thinking'
        ? <div className="ac-step-thinking">{item.text}</div>
        : <div className="ac-step-io">
          {item.input && <div><small>{t('输入')}</small><pre tabIndex={0}>{item.input}</pre></div>}
          {item.output !== undefined && <div><small>{t('输出')}</small><pre tabIndex={0}>{item.output || t('（没有输出）')}</pre></div>}
          {item.status === 'running' && <p className="ac-meta">{t('还在运行…')}</p>}
        </div>}
    </details>
  </li>
}

/** "N 步" with a singular form for English. */
const stepCount = (n: number): string => n === 1 ? t('1 步') : t('{0} 步', { 0: n })

/** The toggle that opens a version's steps, with a count of what is inside. */
export function StepsToggle({ trace, open, onToggle, busy, id, steps = 0 }: { trace: Trace | undefined; open: boolean; onToggle(): void; busy: boolean; id: string; steps?: number }): React.ReactElement | null {
  if (!trace || trace.items.length === 0) return busy ? <span className="ac-steps-toggle idle"><span className="ac-shimmer">{steps ? stepCount(steps) : t('正在启动…')}</span></span> : null
  const now = busy ? currentAction(trace) : undefined
  // The run record may be newer than the stored steps; count whichever has seen more.
  const count = Math.max(trace.steps, steps)
  return <button type="button" className={`ac-steps-toggle${open ? ' open' : ''}`} aria-expanded={open} aria-controls={id} onClick={onToggle}>
    <svg className="ac-steps-chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2.5L7.5 6 4 9.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    <span className="ac-steps-title">{now ? <span className="ac-shimmer">{now}</span> : t('过程')}</span>
    <span className="ac-steps-count">{[trace.thinking ? (trace.thinking === 1 ? t('思考 1') : t('思考 {0}', { 0: trace.thinking })) : '', trace.tools ? (trace.tools === 1 ? t('工具 1') : t('工具 {0}', { 0: trace.tools })) : '', stepCount(count)].filter(Boolean).join(' · ')}</span>
  </button>
}

export function StepsPanel({ trace, id, busy }: { trace: Trace; id: string; busy: boolean }): React.ReactElement {
  const list = useRef<HTMLOListElement>(null)
  const follow = useRef(true)
  // While the version works, stay at the newest step unless the reader scrolled up.
  useEffect(() => {
    const el = list.current
    if (el && busy && follow.current) el.scrollTop = el.scrollHeight
  }, [trace.items.length, busy])
  const lastIndex = trace.items.length - 1
  // Say so only when something here was actually hidden or left out.
  const masked = trace.masked === true && trace.items.some(item => [item.text, item.target, item.input, item.output].some(value => value?.includes('▒▒')))
  const gap = trace.omitted ? TRACE_HEAD : -1
  return <div className="ac-steps" id={id} role="region" aria-label={t('步骤')}>
    {masked && <p className="ac-steps-note">{t('盲选中：步骤里点明风格的词显示为 ▒▒，选择后显示原文。')}</p>}
    <ol ref={list} onScroll={event => { const el = event.currentTarget; follow.current = el.scrollHeight - el.scrollTop - el.clientHeight < 40 }}>
      {trace.items.map((item, index) => <React.Fragment key={`${index}:${item.at}`}>
        {gap === index && <li className="ac-step-gap">{t('中间省略了 {0} 项', { 0: trace.omitted! })}</li>}
        <Step item={item} live={busy && index === lastIndex && item.kind === 'thinking'} />
      </React.Fragment>)}
    </ol>
  </div>
}

/** The reply a version ended with, beside what it built. Long replies open on request. */
export function ReplyBlock({ text, label }: { text: string; label: string }): React.ReactElement {
  const [open, setOpen] = useState(false)
  const long = text.length > 140 || text.split('\n').length > 3
  return <section className={`ac-reply${long && !open ? ' folded' : ''}`} aria-label={t('候选 {0} 的回复', { 0: label })}>
    <div className="ac-reply-head"><b>{t('回复')}</b><span className="ac-spacer" /><CopyButton text={text} label={t('复制')} title={t('复制这一版回复的原文')} /></div>
    <div className="ac-reply-body ac-md"><Markdown text={text} /></div>
    {long && <button type="button" className="ac-text-btn ac-reply-more" aria-expanded={open} onClick={() => setOpen(v => !v)}>{open ? t('收起') : t('展开全文')}</button>}
  </section>
}

type Mood = 'think' | 'work' | 'happy' | 'sleep'
/** What the whale says: by stage while it works, something cheerful when poked. */
const LINES: Record<'wait' | 'think' | 'work' | 'happy' | 'sleep', readonly string[]> = {
  wait: ['先看看项目', '在铺一份副本'],
  think: ['在想怎么写', '这个有意思', '写着呢'],
  work: ['马上就好', '在跑检查', '快到了'],
  happy: ['嘿！', '收到～', '再戳就吐泡泡了'],
  sleep: ['先休息一下'],
}

/**
 * A small whale that shows a version's progress. The water rises with each
 * stage, the spout puffs when a new step lands, the eyes follow the pointer,
 * and a poke makes it happy for a moment. Purely decorative: the text beside
 * it says the same thing, and reduced motion keeps it still.
 */
export function Whale({ stage, level, steps, caption }: { stage: Stage; level: number; steps: number; caption: string }): React.ReactElement {
  const box = useRef<HTMLDivElement>(null)
  const eyes = useRef<SVGGElement>(null)
  const [poked, setPoked] = useState(0)
  const [puff, setPuff] = useState(0)
  const seen = useRef(steps)
  const mood: Mood = poked ? 'happy' : stage === 'cancelled' || stage === 'stopping' ? 'sleep' : stage === 'generating' || stage === 'preparing' || stage === 'queued' ? 'think' : 'work'
  useEffect(() => { if (steps !== seen.current) { seen.current = steps; setPuff(n => n + 1) } }, [steps])
  useEffect(() => { if (!poked) return; const timer = setTimeout(() => setPoked(0), 1600); return () => clearTimeout(timer) }, [poked])
  useEffect(() => {
    const el = box.current
    if (!el || reduced()) return
    // The eyes move straight on the element, at most once a frame, without re-rendering.
    let frame = 0, x = 0, y = 0
    const move = (event: PointerEvent): void => {
      x = event.clientX; y = event.clientY
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const r = el.getBoundingClientRect()
        const dx = x - (r.left + r.width * 0.42), dy = y - (r.top + r.height * 0.5)
        const d = Math.hypot(dx, dy) || 1
        if (eyes.current) eyes.current.style.transform = `translate(${((dx / d) * Math.min(3, d / 40)).toFixed(2)}px, ${((dy / d) * Math.min(2.5, d / 50)).toFixed(2)}px)`
      })
    }
    const host = el.closest('.ac-card') ?? el
    host.addEventListener('pointermove', move as EventListener)
    return () => { host.removeEventListener('pointermove', move as EventListener); cancelAnimationFrame(frame) }
  }, [])
  const lines = LINES[mood === 'think' && stage !== 'generating' ? 'wait' : mood]
  const line = lines[(poked + Math.floor(steps / 6)) % lines.length]!
  // Each whale needs its own gradient ids: a hidden card's definitions do not paint another card.
  const uid = `acw${useId().replace(/[^\w-]/g, '')}`
  const percent = Math.round(Math.max(0.08, Math.min(1, level)) * 100)
  return <div ref={box} className={`ac-whale-stage mood-${mood}`} style={{ '--ac-level': `${percent}%` } as React.CSSProperties}>
    <div className="ac-whale-sea" aria-hidden="true"><i /><i /></div>
    {/* A toy for the pointer; it stays out of the keyboard order and away from screen readers. */}
    <button type="button" className="ac-whale" tabIndex={-1} aria-hidden="true" title={t('小鲸鱼，点一下打个招呼')} onClick={() => setPoked(n => n + 1)}>
      <svg viewBox="0 0 168 120" width="168" height="120" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}b`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7d9bff" /><stop offset=".55" stopColor="#4d6bfe" /><stop offset="1" stopColor="#3657f5" /></linearGradient>
          <linearGradient id={`${uid}w`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e9f0ff" /><stop offset="1" stopColor="#c9d8ff" /></linearGradient>
        </defs>
        <g className="ac-whale-spout" key={puff}><circle cx="58" cy="22" r="4" /><circle cx="50" cy="14" r="3" /><circle cx="66" cy="12" r="2.5" /></g>
        <g className="ac-whale-tail"><path d="M128 64c10-2 18-10 22-22 3 9 2 18-4 26 7 1 12 5 15 12-11 2-22-1-30-8z" fill={`url(#${uid}b)`} /></g>
        <path className="ac-whale-body" d="M22 70c0-26 22-44 52-44 30 0 54 16 58 38 3 18-12 32-36 38-14 4-34 4-48-2C32 94 22 84 22 70z" fill={`url(#${uid}b)`} />
        <path d="M30 84c10 10 30 14 52 12 18-2 34-8 42-18-4 14-22 24-46 26-22 1-40-6-48-20z" fill={`url(#${uid}w)`} opacity=".9" />
        <ellipse cx="96" cy="86" rx="10" ry="5" transform="rotate(28 96 86)" fill="#3657f5" opacity=".55" className="ac-whale-fin" />
        <ellipse cx="44" cy="50" rx="16" ry="7" fill="#fff" opacity=".22" />
        <g ref={eyes} className="ac-whale-eyes">
          <g className="ac-whale-blink">
            <rect className="ac-whale-eye" x="44" y="56" width="7" height="13" rx="3.5" />
            <rect className="ac-whale-eye" x="62" y="56" width="7" height="13" rx="3.5" />
          </g>
        </g>
        <ellipse cx="40" cy="74" rx="5" ry="2.6" fill="#ff9fc4" opacity=".55" />
        <ellipse cx="74" cy="74" rx="5" ry="2.6" fill="#ff9fc4" opacity=".55" />
        <path className="ac-whale-mouth" d="M53 76q4 3 8 0" fill="none" stroke="#1d2f7a" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className="ac-whale-bubble" key={`${mood}:${poked}`}>{t(line)}</span>
    </button>
    {poked > 0 && <span className="ac-whale-pops" key={poked} aria-hidden="true"><i /><i /><i /><i /><i /></span>}
    <div className="ac-whale-caption" role="status">{caption}</div>
  </div>
}
