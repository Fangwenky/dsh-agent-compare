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

/**
 * The DeepSeek whale mark as DSH draws it (its welcome-brand.svg): the body,
 * then the belly, the dot and the eye, which the nonzero fill leaves open.
 */
const MARK_BODY = 'M168.384 12.9517C168.138 12.8317 168.033 13.0607 167.889 13.1767C167.84 13.2142 167.799 13.2632 167.757 13.3082C167.399 13.6912 166.98 13.9427 166.433 13.9127C165.632 13.8677 164.949 14.1192 164.345 14.7312C164.217 13.9767 163.79 13.5262 163.141 13.2372C162.802 13.0872 162.458 12.9367 162.22 12.6102C162.054 12.3776 162.009 12.1186 161.926 11.8631C161.873 11.7091 161.82 11.5516 161.643 11.5251C161.45 11.4951 161.375 11.6566 161.299 11.7916C160.997 12.3436 160.88 12.9517 160.892 13.5677C160.918 14.9532 161.503 16.0568 162.666 16.8418C162.798 16.9318 162.832 17.0218 162.79 17.1533C162.711 17.4238 162.617 17.6863 162.534 17.9568C162.481 18.1293 162.402 18.1673 162.217 18.0918C161.579 17.8253 161.028 17.4308 160.541 16.9543C159.714 16.1548 158.967 15.2722 158.035 14.5812C157.816 14.4197 157.597 14.2697 157.37 14.1267C156.419 13.2032 157.495 12.4446 157.744 12.3546C158.004 12.2606 157.834 11.9376 156.993 11.9416C156.151 11.9451 155.381 12.2271 154.4 12.6027C154.256 12.6592 154.105 12.7002 153.951 12.7342C153.06 12.5652 152.135 12.5277 151.169 12.6367C149.35 12.8392 147.897 13.6992 146.829 15.1672C145.546 16.9318 145.244 18.9368 145.613 21.0279C146.002 23.232 147.127 25.0565 148.855 26.4831C150.648 27.9621 152.713 28.6871 155.068 28.5481C156.499 28.4656 158.091 28.2741 159.888 26.7536C160.341 26.9791 160.816 27.0691 161.605 27.1366C162.212 27.1931 162.797 27.1066 163.25 27.0126C163.96 26.8626 163.911 26.2056 163.654 26.0851C161.575 25.1165 162.031 25.5105 161.616 25.1915C162.673 23.9415 164.287 21.7194 164.785 18.6938C164.834 18.3598 164.896 17.8893 164.889 17.6188C164.885 17.4538 164.923 17.3898 165.111 17.3708C165.632 17.3108 166.138 17.1683 166.603 16.9128C167.95 16.1768 168.494 14.9677 168.622 13.5187C168.641 13.2972 168.618 13.0682 168.384 12.9517Z'
const MARK = MARK_BODY
  + 'M156.642 25.9951C154.626 24.4105 153.649 23.889 153.245 23.9115C152.868 23.934 152.936 24.366 153.019 24.6475C153.106 24.9255 153.219 25.117 153.377 25.361C153.487 25.5225 153.562 25.7625 153.268 25.9431C152.619 26.3446 151.49 25.808 151.437 25.7815C150.124 25.008 149.025 23.987 148.251 22.5905C147.504 21.2464 147.07 19.8044 146.998 18.2653C146.979 17.8938 147.089 17.7623 147.459 17.6948C147.946 17.6048 148.448 17.5858 148.934 17.6573C150.992 17.9578 152.743 18.8773 154.211 20.3344C155.049 21.1639 155.683 22.1554 156.336 23.124C157.03 24.1525 157.777 25.1325 158.729 25.9361C159.065 26.2176 159.333 26.4316 159.589 26.5896C158.816 26.6761 157.525 26.6946 156.642 25.9961V25.9951Z'
  + 'M157.608 19.7814C157.608 19.6164 157.74 19.4849 157.906 19.4849C157.943 19.4849 157.977 19.4924 158.008 19.5034C158.049 19.5184 158.087 19.5409 158.117 19.5749C158.17 19.6274 158.2 19.7024 158.2 19.7814C158.2 19.9464 158.068 20.0779 157.902 20.0779C157.736 20.0779 157.608 19.9464 157.608 19.7814Z'
  + 'M160.608 21.3204C160.416 21.3994 160.223 21.4669 160.038 21.4744C159.751 21.4894 159.438 21.3729 159.268 21.2304C159.004 21.0089 158.815 20.8849 158.736 20.4984C158.702 20.3334 158.721 20.0779 158.751 19.9314C158.819 19.6159 158.744 19.4134 158.521 19.2294C158.34 19.0793 158.11 19.0378 157.857 19.0378C157.762 19.0378 157.676 18.9963 157.611 18.9628C157.506 18.9103 157.419 18.7788 157.502 18.6173C157.528 18.5648 157.657 18.4373 157.687 18.4148C158.03 18.2193 158.426 18.2833 158.793 18.4298C159.132 18.5688 159.389 18.8238 159.759 19.1844C160.136 19.6199 160.204 19.7399 160.419 20.0669C160.589 20.3224 160.744 20.5849 160.85 20.8854C160.914 21.0729 160.831 21.2264 160.608 21.3204Z'
/** How far the mark reaches up and down, in its own units. */
const MARK_TOP = 11.3, MARK_BOTTOM = 28.8
/** A long wave whose crests sit at y = 0, filled down below the mark; it slides by one period. */
function wave(period: number, amp: number): string {
  let d = 'M120 0'
  for (let x = 120; x < 200; x += period) d += ` q${period / 4} ${-amp} ${period / 2} 0 t${period / 2} 0`
  return `${d} V30 H120 Z`
}
const WAVE_BACK = wave(5.2, 0.55), WAVE_FRONT = wave(6.4, 0.7)
/** What the whale says when poked. */
const POKE_LINES = ['嘿！', '收到～', '再戳就吐泡泡了'] as const

/**
 * DSH's whale, hollow at first, filling with water as a version gets further
 * and solid when it is done; two lights run around its outline while it
 * works, it spouts when a new step lands, leans toward the pointer and
 * answers a poke. Purely decorative: the caption says the same thing, and
 * reduced motion keeps it still.
 */
export function Whale({ stage, level, steps, caption }: { stage: Stage; level: number; steps: number; caption: string }): React.ReactElement {
  const box = useRef<HTMLDivElement>(null)
  const lean = useRef<HTMLSpanElement>(null)
  const [poked, setPoked] = useState(0)
  const [puff, setPuff] = useState(0)
  const seen = useRef(steps)
  const asleep = stage === 'cancelled' || stage === 'stopping'
  useEffect(() => { if (steps !== seen.current) { seen.current = steps; setPuff(n => n + 1) } }, [steps])
  useEffect(() => { if (!poked) return; const timer = setTimeout(() => setPoked(0), 1600); return () => clearTimeout(timer) }, [poked])
  useEffect(() => {
    const el = box.current
    if (!el || reduced()) return
    // The whale leans toward the pointer, set straight on the element at most once a frame.
    let frame = 0, x = 0, y = 0
    const move = (event: PointerEvent): void => {
      x = event.clientX; y = event.clientY
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const r = el.getBoundingClientRect()
        const dx = Math.max(-1, Math.min(1, (x - (r.left + r.width / 2)) / (r.width / 2 || 1)))
        const dy = Math.max(-1, Math.min(1, (y - (r.top + r.height / 2)) / (r.height / 2 || 1)))
        if (lean.current) lean.current.style.transform = `perspective(500px) rotateY(${(dx * 12).toFixed(1)}deg) rotateX(${(-dy * 9).toFixed(1)}deg)`
      })
    }
    const leave = (): void => { if (lean.current) lean.current.style.transform = '' }
    const host = el.closest('.ac-card') ?? el
    host.addEventListener('pointermove', move as EventListener)
    host.addEventListener('pointerleave', leave)
    return () => { host.removeEventListener('pointermove', move as EventListener); host.removeEventListener('pointerleave', leave); cancelAnimationFrame(frame) }
  }, [])
  // Each whale needs its own ids: a hidden card's definitions do not paint another card.
  const uid = `acw${useId().replace(/[^\w-]/g, '')}`
  const fill = Math.max(0.06, Math.min(1, level))
  // The crest goes from just under the mark (hollow) to just over it (solid).
  const crest = MARK_BOTTOM + 0.3 - fill * (MARK_BOTTOM - MARK_TOP + 1.6)
  return <div ref={box} className={`ac-whale-stage${asleep ? ' asleep' : ''}${poked ? ' poked' : ''}${fill >= 1 ? ' full' : ''}`}>
    {/* A toy for the pointer; it stays out of the keyboard order and away from screen readers. */}
    <button type="button" className="ac-whale" tabIndex={-1} aria-hidden="true" title={t('小鲸鱼，点一下打个招呼')} onClick={() => setPoked(n => n + 1)}>
      <span ref={lean} className="ac-whale-lean">
        <svg viewBox="143.6 6.6 26.4 23.4" width="150" height="133" aria-hidden="true">
          <defs>
            <clipPath id={`${uid}m`}><path d={MARK} /></clipPath>
            <linearGradient id={`${uid}w`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#86a0ff" /><stop offset=".45" stopColor="#4d6bfe" /><stop offset="1" stopColor="#3550ec" /></linearGradient>
          </defs>
          {puff > 0 && <g className="ac-whale-spout" key={puff}><circle cx="150.6" cy="11.4" r=".55" /><circle cx="149.6" cy="10.4" r=".42" /><circle cx="151.6" cy="10.1" r=".36" /></g>}
          <g clipPath={`url(#${uid}m)`}>
            <rect className="ac-whale-glass" x="140" y="5" width="34" height="30" />
            <g className="ac-whale-water" style={{ transform: `translateY(${crest.toFixed(2)}px)` }}>
              <path className="ac-whale-wave back" d={WAVE_BACK} />
              <path className="ac-whale-wave front" d={WAVE_FRONT} fill={`url(#${uid}w)`} />
              <g className="ac-whale-rise"><circle cx="150" cy="3" r=".45" /><circle cx="153.4" cy="3.6" r=".32" /><circle cx="156.8" cy="3.2" r=".4" /><circle cx="160.4" cy="2.6" r=".28" /></g>
            </g>
          </g>
          <path className="ac-whale-line" d={MARK} />
          {puff > 0 && <path className="ac-whale-flash" key={`f${puff}`} d={MARK_BODY} />}
          <path className="ac-whale-trail" d={MARK_BODY} pathLength={100} />
          <path className="ac-whale-head" d={MARK_BODY} pathLength={100} />
          <path className="ac-whale-trail two" d={MARK_BODY} pathLength={100} />
          <path className="ac-whale-head two" d={MARK_BODY} pathLength={100} />
        </svg>
      </span>
      {poked > 0 && <span className="ac-whale-bubble" key={poked}>{t(POKE_LINES[(poked - 1) % POKE_LINES.length]!)}</span>}
    </button>
    {poked > 0 && <span className="ac-whale-pops" key={poked} aria-hidden="true"><i /><i /><i /><i /><i /></span>}
    <div className="ac-whale-caption" role="status">{caption}</div>
  </div>
}
