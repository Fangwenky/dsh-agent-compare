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
    // Steps that cannot be read (an older backend, or none were kept) show as none, not as loading forever.
    call<Trace>('trace', { runId: run.runId, label: c.label, ...(full ? {} : { summary: true }) }, controller.signal)
      .then(value => setTrace(value), () => { if (!controller.signal.aborted) setTrace(current => current ?? { items: [], steps: 0, tools: 0, thinking: 0, truncated: false, done: true, updatedAt: 0 }) })
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

/**
 * The tool a version is running now, in plain words, for the whale to mention
 * ("Now: Write file · index.html"). Between tools there is nothing specific
 * to say, so the whale thinks its own thoughts instead.
 */
export function runningTool(trace: Trace | undefined): string | undefined {
  const last = trace?.items[trace.items.length - 1]
  if (!last || trace?.done || last.kind !== 'tool' || last.status !== 'running') return undefined
  return `${toolName(last.name)}${last.target ? ` · ${last.target}` : ''}`
}

function Status({ item }: { item: TraceItem }): React.ReactElement {
  if (item.kind === 'thinking') return <span className="ac-step-dot think" aria-hidden="true" />
  if (item.kind === 'text') return <span className="ac-step-dot text" aria-hidden="true" />
  return <span className={`ac-step-dot ${item.status ?? 'done'}`} aria-label={item.status === 'error' ? t('出错') : item.status === 'running' ? t('进行中') : t('完成')} />
}

function Step({ item, live, longest }: { item: TraceItem; live: boolean; longest:number }): React.ReactElement {
  const duration = typeof item.ms === 'number' && item.ms >= 0 && longest > 0
    ? <span aria-hidden="true" className="ac-step-duration" style={{width:(100 * item.ms / longest) + '%'}}/> : null
  if (item.kind === 'text') return <li className="ac-step text"><Status item={item} /><div className="ac-step-words ac-md"><Markdown text={item.text ?? ''} /></div>{duration}</li>
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
    {duration}
  </li>
}

/** "N 步" with a singular form for English. */
const stepCount = (n: number): string => n === 1 ? t('1 步') : t('{0} 步', { 0: n })

/** What a version's steps hold: thoughts, tool calls and steps, singular in English. */
function counts(trace: Trace | undefined, steps: number): string {
  const count = Math.max(trace?.steps ?? 0, steps)
  return [
    trace?.thinking ? (trace.thinking === 1 ? t('思考 1') : t('思考 {0}', { 0: trace.thinking })) : '',
    trace?.tools ? (trace.tools === 1 ? t('工具 1') : t('工具 {0}', { 0: trace.tools })) : '',
    count ? stepCount(count) : '',
  ].filter(Boolean).join(' · ')
}

/**
 * The button that opens a version's steps. It is there as soon as the version
 * starts work and stays after it finishes, so every thought, tool call and
 * edit can be read live or afterwards, the way a conversation shows them.
 */
export function StepsToggle({ trace, open, onToggle, busy, id, steps = 0, started = true }: { trace: Trace | undefined; open: boolean; onToggle(): void; busy: boolean; id: string; steps?: number; started?: boolean }): React.ReactElement | null {
  if (!started) return null
  // What it is doing now shows in the live steps below; here only before the first step.
  const now = busy && !trace?.items.length ? t('正在启动…') : undefined
  const summary = counts(trace, steps)
  return <button type="button" className={`ac-steps-toggle${open ? ' open' : ''}${busy ? ' live' : ''}`} aria-expanded={open} aria-controls={id} onClick={onToggle}
    title={open ? t('收起这一版的过程') : t('查看这一版的全部过程：思考、工具调用、改动和中间的话')}>
    <svg className="ac-steps-icon" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><circle cx="3" cy="3.5" r="1.3" /><circle cx="3" cy="7" r="1.3" /><circle cx="3" cy="10.5" r="1.3" /><path d="M6 3.5h6M6 7h6M6 10.5h4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
    <span className="ac-steps-title">{open ? t('收起过程') : t('过程')}</span>
    {now && <span className="ac-steps-now"><span className="ac-shimmer">{now}</span></span>}
    {summary && <span className="ac-steps-count">{summary}</span>}
    <svg className="ac-steps-chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2.5L7.5 6 4 9.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </button>
}

export function StepsPanel({ trace, id, busy }: { trace: Trace | undefined; id: string; busy: boolean }): React.ReactElement {
  const list = useRef<HTMLOListElement>(null)
  const follow = useRef(true)
  const items = trace?.items ?? []
  // While the version works, stay at the newest step unless the reader scrolled up.
  useEffect(() => {
    const el = list.current
    if (el && busy && follow.current) el.scrollTop = el.scrollHeight
  }, [items.length, busy])
  const longest = items.reduce((max,item) => Math.max(max,item.ms ?? 0),0)
  const lastIndex = items.length - 1
  // Say so only when something here was actually hidden or left out.
  const masked = trace?.masked === true && items.some(item => [item.text, item.target, item.input, item.output].some(value => value?.includes('▒▒')))
  const gap = trace?.omitted ? TRACE_HEAD : -1
  return <div className="ac-steps" id={id} role="region" aria-label={t('步骤')}>
    {masked && <p className="ac-steps-note">{t('盲选中：步骤里点明风格的词显示为 ▒▒，选择后显示原文。')}</p>}
    {items.length === 0
      ? <p className="ac-steps-empty">{busy ? <span className="ac-shimmer">{t('等模型走出第一步…')}</span> : trace === undefined ? t('正在读取过程…') : t('这一版没有留下步骤记录。')}</p>
      : <ol ref={list} onScroll={event => { const el = event.currentTarget; follow.current = el.scrollHeight - el.scrollTop - el.clientHeight < 40 }}>
        {items.map((item, index) => <React.Fragment key={`${index}:${item.at}`}>
          {gap === index && <li className="ac-step-gap">{t('中间省略了 {0} 项', { 0: trace!.omitted! })}</li>}
          <Step item={item} longest={longest} live={busy && index === lastIndex && item.kind === 'thinking'} />
        </React.Fragment>)}
      </ol>}
  </div>
}

/** One short line for a step in the live feed. */
function liveLine(item: TraceItem): string {
  if (item.kind === 'tool') return `${toolName(item.name)}${item.target ? ` · ${item.target}` : ''}`
  return (item.text ?? '').replace(/\s+/g, ' ').trim().slice(0, 90)
}

/**
 * The newest steps, live, under the whale while a version works: what it
 * thought, which tools it ran and what it wrote, without opening anything.
 * A click opens all of them.
 */
export function LiveSteps({ trace, onOpen }: { trace: Trace | undefined; onOpen(): void }): React.ReactElement | null {
  const items = (trace?.items ?? []).slice(-3)
  if (items.length === 0) return null
  return <button type="button" className="ac-live-steps" onClick={onOpen} title={t('查看这一版的全部过程')} aria-label={t('最新步骤，点开查看全部过程')}>
    {items.map((item, index) => {
      const newest = index === items.length - 1
      const kind = item.kind === 'tool' ? (item.status === 'running' ? 'running' : item.status === 'error' ? 'error' : 'done') : item.kind === 'thinking' ? 'think' : 'text'
      return <span key={`${item.kind}:${item.at}:${index}`} className={`ac-live-step ${kind}${newest ? ' newest' : ''}`}>
        <span className={`ac-step-dot ${kind}`} aria-hidden="true" />
        <b>{item.kind === 'tool' ? t('工具') : item.kind === 'thinking' ? t('思考') : t('写道')}</b>
        <span className="ac-live-text">{liveLine(item)}</span>
      </span>
    })}
  </button>
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
export const MARK_BODY = 'M168.384 12.9517C168.138 12.8317 168.033 13.0607 167.889 13.1767C167.84 13.2142 167.799 13.2632 167.757 13.3082C167.399 13.6912 166.98 13.9427 166.433 13.9127C165.632 13.8677 164.949 14.1192 164.345 14.7312C164.217 13.9767 163.79 13.5262 163.141 13.2372C162.802 13.0872 162.458 12.9367 162.22 12.6102C162.054 12.3776 162.009 12.1186 161.926 11.8631C161.873 11.7091 161.82 11.5516 161.643 11.5251C161.45 11.4951 161.375 11.6566 161.299 11.7916C160.997 12.3436 160.88 12.9517 160.892 13.5677C160.918 14.9532 161.503 16.0568 162.666 16.8418C162.798 16.9318 162.832 17.0218 162.79 17.1533C162.711 17.4238 162.617 17.6863 162.534 17.9568C162.481 18.1293 162.402 18.1673 162.217 18.0918C161.579 17.8253 161.028 17.4308 160.541 16.9543C159.714 16.1548 158.967 15.2722 158.035 14.5812C157.816 14.4197 157.597 14.2697 157.37 14.1267C156.419 13.2032 157.495 12.4446 157.744 12.3546C158.004 12.2606 157.834 11.9376 156.993 11.9416C156.151 11.9451 155.381 12.2271 154.4 12.6027C154.256 12.6592 154.105 12.7002 153.951 12.7342C153.06 12.5652 152.135 12.5277 151.169 12.6367C149.35 12.8392 147.897 13.6992 146.829 15.1672C145.546 16.9318 145.244 18.9368 145.613 21.0279C146.002 23.232 147.127 25.0565 148.855 26.4831C150.648 27.9621 152.713 28.6871 155.068 28.5481C156.499 28.4656 158.091 28.2741 159.888 26.7536C160.341 26.9791 160.816 27.0691 161.605 27.1366C162.212 27.1931 162.797 27.1066 163.25 27.0126C163.96 26.8626 163.911 26.2056 163.654 26.0851C161.575 25.1165 162.031 25.5105 161.616 25.1915C162.673 23.9415 164.287 21.7194 164.785 18.6938C164.834 18.3598 164.896 17.8893 164.889 17.6188C164.885 17.4538 164.923 17.3898 165.111 17.3708C165.632 17.3108 166.138 17.1683 166.603 16.9128C167.95 16.1768 168.494 14.9677 168.622 13.5187C168.641 13.2972 168.618 13.0682 168.384 12.9517Z'
/** The openings in the mark (belly, dot, eye), white as on the blue logo. */
const MARK_HOLES = 'M156.642 25.9951C154.626 24.4105 153.649 23.889 153.245 23.9115C152.868 23.934 152.936 24.366 153.019 24.6475C153.106 24.9255 153.219 25.117 153.377 25.361C153.487 25.5225 153.562 25.7625 153.268 25.9431C152.619 26.3446 151.49 25.808 151.437 25.7815C150.124 25.008 149.025 23.987 148.251 22.5905C147.504 21.2464 147.07 19.8044 146.998 18.2653C146.979 17.8938 147.089 17.7623 147.459 17.6948C147.946 17.6048 148.448 17.5858 148.934 17.6573C150.992 17.9578 152.743 18.8773 154.211 20.3344C155.049 21.1639 155.683 22.1554 156.336 23.124C157.03 24.1525 157.777 25.1325 158.729 25.9361C159.065 26.2176 159.333 26.4316 159.589 26.5896C158.816 26.6761 157.525 26.6946 156.642 25.9961V25.9951Z'
  + 'M157.608 19.7814C157.608 19.6164 157.74 19.4849 157.906 19.4849C157.943 19.4849 157.977 19.4924 158.008 19.5034C158.049 19.5184 158.087 19.5409 158.117 19.5749C158.17 19.6274 158.2 19.7024 158.2 19.7814C158.2 19.9464 158.068 20.0779 157.902 20.0779C157.736 20.0779 157.608 19.9464 157.608 19.7814Z'
  + 'M160.608 21.3204C160.416 21.3994 160.223 21.4669 160.038 21.4744C159.751 21.4894 159.438 21.3729 159.268 21.2304C159.004 21.0089 158.815 20.8849 158.736 20.4984C158.702 20.3334 158.721 20.0779 158.751 19.9314C158.819 19.6159 158.744 19.4134 158.521 19.2294C158.34 19.0793 158.11 19.0378 157.857 19.0378C157.762 19.0378 157.676 18.9963 157.611 18.9628C157.506 18.9103 157.419 18.7788 157.502 18.6173C157.528 18.5648 157.657 18.4373 157.687 18.4148C158.03 18.2193 158.426 18.2833 158.793 18.4298C159.132 18.5688 159.389 18.8238 159.759 19.1844C160.136 19.6199 160.204 19.7399 160.419 20.0669C160.589 20.3224 160.744 20.5849 160.85 20.8854C160.914 21.0729 160.831 21.2264 160.608 21.3204Z'
const MARK = MARK_BODY + MARK_HOLES
/** How far the mark reaches up and down, in its own units. */
const MARK_TOP = 11.3, MARK_BOTTOM = 28.8
/** A long wave whose crests sit at y = 0, filled down below the mark; it slides by one period. */
function wave(period: number, amp: number): string {
  let d = 'M120 0'
  for (let x = 120; x < 200; x += period) d += ` q${period / 4} ${-amp} ${period / 2} 0 t${period / 2} 0`
  return `${d} V30 H120 Z`
}
const WAVE_BACK = wave(5.2, 0.55), WAVE_FRONT = wave(6.4, 0.7)
/** What the whale thinks while it works, by stage. */
const THOUGHTS = {
  start: ['复制一份工作区…', '热身中，伸个懒腰', '深吸一口气，下潜'],
  think: ['让我想想…', '这个需求有点意思', '先在脑子里画个草图', '灵感 +1', '翻翻工具箱', '别催，鲸鱼也要构思', '这段要写得漂亮点', '想偷看别的版本？盲选哦', '海底信号有点慢…', '用最少的字，办最多的事'],
  check: ['装依赖，咕噜咕噜', '跑检查，祈祷全绿', '页面马上就好', '最后擦亮一下', '水快满啦！'],
  hint: ['戳戳我？', '无聊就戳我一下', '我会吐泡泡哦'],
} as const
/** What the whale says to a poke, by how many came in a row. */
const POKES = {
  one: ['嘿！', '收到～', '在呢在呢', '痒！', '我在认真干活呢', '泡泡送你', '再戳就吐泡泡了'],
  two: ['还来？', '哈哈哈好痒', '你是不是想摸鱼'],
  three: ['三连击！转个圈给你看'],
  four: ['晕…晕了'],
  more: ['好啦好啦，让我专心写完', '再戳我就喷你一脸水', '大鲸鱼也是要面子的'],
} as const
type Bubble = { text: string; kind: 'think' | 'say'; id: number }
const pick = <T,>(list: readonly T[], avoid?: T): T => { const options = list.length > 1 ? list.filter(x => x !== avoid) : list; return options[Math.floor(Math.random() * options.length)]! }

/** A thought that fits what the version is doing now. */
function thoughtFor(stage: Stage, action: string | undefined, last: string | undefined): string {
  if (Math.random() < 0.18) return pick(THOUGHTS.hint, last)
  if (stage === 'queued' || stage === 'preparing') return pick(THOUGHTS.start, last)
  if (stage !== 'generating') return pick(THOUGHTS.check, last)
  // Now and then, name the tool it is running.
  if (action && Math.random() < 0.3) return t('正在：{0}', { 0: action.length > 26 ? `${action.slice(0, 25)}…` : action })
  return pick(THOUGHTS.think, last)
}

/**
 * DeepSeek's blue whale (the mark DSH ships), pale at first, filling with
 * DeepSeek blue as a version gets further until it is the logo itself, belly
 * and eye white in both themes; two lights run around its outline while it
 * works. Now and then a thought rises over its head (what it is doing, an
 * idea, or an invitation to poke it); a new step makes it spout; it leans
 * toward the pointer; pokes in a row make it jump, spin and splash, with a
 * new line each time. Purely decorative: the caption says what matters, the
 * bubbles stay away from screen readers, and reduced motion keeps it still.
 */

type Expression = 'sleep' | 'thought' | 'lamp' | 'bubbles' | 'search' | 'stars' | 'unknown' | 'tear' | 'hearts'
const GLYPH: Record<Expression, React.ReactNode> = {
  sleep:<><path d="M3 15h4l-4 4h4m2-11h5l-5 6h5m2-11h4l-4 5h4"/></>,
  thought:<>{[5,12,19].map(x => <circle key={x} cx={x} cy="12" r="1.5" fill="currentColor"/>)}</>,
  lamp:<><path d="M8 15c0-2-3-3-3-7a7 7 0 0 1 14 0c0 4-3 5-3 7l-1 2H9Zm2 5h4"/><path d="m10 9 2 2 2-2"/></>,
  bubbles:<><circle cx="8" cy="17" r="3"/><circle cx="15" cy="10" r="3"/><circle cx="11" cy="4" r="1"/></>,
  search:<><circle cx="9.5" cy="10" r="5.5"/><path d="m14 14.5 6 6"/></>,
  stars:<><path d="m9 3 1.7 5.3L16 10l-5.3 1.7L9 17l-1.7-5.3L2 10l5.3-1.7ZM18 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1Z"/></>,
  unknown:<><path d="M8 8a4.2 4.2 0 1 1 7.2 3c-2 1.5-3.2 2-3.2 5"/><circle cx="12" cy="20" r=".8" fill="currentColor"/></>,
  tear:<><path d="M12 3C10 8 5 11 5 15a7 7 0 0 0 14 0c0-4-5-8-7-12Z"/><path d="M8 15q0 2 2 3"/></>,
  hearts:<><path d="M10 20 3 13C-1 7 6 4 10 9c5-5 11 0 7 5Z"/><path d="M18 3q3-3 5 0-1 3-5 5-4-2-4-5 1-3 4 0Z"/></>,
}
export function WhaleFace({ stage, picked, eligible, spark, waiting }: { stage:Stage; picked?:boolean; eligible?:boolean; spark?:boolean; waiting?:boolean }): React.ReactElement {
  const face:Expression = picked ? 'hearts' : stage==='ready' ? eligible ? 'stars' : 'unknown'
    : stage==='failed' || stage==='interrupted' ? 'tear' : stage==='generating' ? spark ? 'lamp' : 'thought'
    : stage==='installing' ? 'bubbles' : ['verifying','previewing','sealing'].includes(stage) ? 'search' : 'sleep'
  return <svg className="ac-whale-face" data-face={face} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{GLYPH[face]}
    {waiting && face==='search' && <path d="M20 2q-4 5-1 6 4 1 1-6Z"/>}</svg>
}

export function Whale({ stage, level, steps, caption, action, waiting }: { stage: Stage; level: number; steps: number; caption: string; action?: string; waiting?: boolean }): React.ReactElement {
  const box = useRef<HTMLDivElement>(null)
  const lean = useRef<HTMLSpanElement>(null)
  const [poked, setPoked] = useState(0)
  const [combo, setCombo] = useState(0)
  const [bubble, setBubble] = useState<Bubble>()
  const [puff, setPuff] = useState(0)
  const [spark, setSpark] = useState(false)
  useEffect(() => {
    if (!puff || reduced() || document.hidden) return
    setSpark(true)
    const timer = setTimeout(() => setSpark(false), 650)
    return () => clearTimeout(timer)
  }, [puff])
  const seen = useRef(steps)
  const streak = useRef({ count: 0, at: 0 })
  const now = useRef({ stage, action, last: undefined as string | undefined })
  now.current.stage = stage; now.current.action = action
  const asleep = stage === 'cancelled' || stage === 'stopping'
  useEffect(() => { if (steps !== seen.current) { seen.current = steps; setPuff(n => n + 1) } }, [steps])
  // A poke shows for a moment; pokes in a row build a combo.
  useEffect(() => { if (!poked) return; const timer = setTimeout(() => { setPoked(0); setCombo(0) }, 1700); return () => clearTimeout(timer) }, [poked])
  useEffect(() => { if (bubble === undefined) return; const timer = setTimeout(() => setBubble(current => current?.id === bubble.id ? undefined : current), bubble.kind === 'say' ? 2200 : 3600); return () => clearTimeout(timer) }, [bubble])
  // Thoughts rise on their own every few seconds, at a different rhythm for each whale.
  useEffect(() => {
    if (asleep) return
    let timer: ReturnType<typeof setTimeout>
    const next = (delay: number): void => {
      timer = setTimeout(() => {
        const text = thoughtFor(now.current.stage, now.current.action, now.current.last)
        now.current.last = text
        setBubble(current => current?.kind === 'say' ? current : { text, kind: 'think', id: Date.now() })
        next(7000 + Math.random() * 6000)
      }, delay)
    }
    next(1800 + Math.random() * 3500)
    return () => clearTimeout(timer)
  }, [asleep])
  const poke = (): void => {
    const time = Date.now()
    const count = time - streak.current.at < 2600 ? streak.current.count + 1 : 1
    streak.current = { count, at: time }
    const lines = count === 1 ? POKES.one : count === 2 ? POKES.two : count === 3 ? POKES.three : count === 4 ? POKES.four : POKES.more
    const text = pick(lines, now.current.last)
    now.current.last = text
    setCombo(count)
    setPoked(n => n + 1)
    setBubble({ text, kind: 'say', id: time })
  }
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
        // A flat lean and nudge: a 3D tilt would be rasterised soft and blur the logo.
        if (lean.current) lean.current.style.transform = `translate(${(dx * 4).toFixed(1)}px, ${(dy * 3).toFixed(1)}px) rotate(${(dx * 5).toFixed(1)}deg)`
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
  const moves = poked ? (combo >= 5 ? ' poked splash' : combo === 3 ? ' poked spin' : combo === 4 ? ' poked dizzy' : ' poked') : ''
  return <div ref={box} className={`ac-whale-stage${asleep ? ' asleep' : ''}${moves}${fill >= 1 ? ' full' : ''}`}>
    {bubble && <span className={`ac-whale-bubble ${bubble.kind}`} key={bubble.id} aria-hidden="true">{t(bubble.text)}</span>}
    {/* A toy for the pointer; it stays out of the keyboard order and away from screen readers. */}
    <button type="button" className="ac-whale" tabIndex={-1} aria-hidden="true" title={t('小鲸鱼，戳一下试试')} onClick={poke}>
      <span ref={lean} className="ac-whale-lean">
        <WhaleFace stage={stage} spark={spark} waiting={waiting}/>
        <svg viewBox="143.6 6.6 26.4 23.4" width="150" height="133" aria-hidden="true">
          <defs>
            <clipPath id={`${uid}m`}><path d={MARK} /></clipPath>
            {/* DeepSeek blue, with a lighter band only at the surface. */}
            <linearGradient id={`${uid}w`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7d95ff" /><stop offset=".07" stopColor="#4d6bfe" /><stop offset="1" stopColor="#4d6bfe" /></linearGradient>
          </defs>
          {puff > 0 && <g className="ac-whale-spout" key={puff}><circle cx="150.6" cy="11.4" r=".55" /><circle cx="149.6" cy="10.4" r=".42" /><circle cx="151.6" cy="10.1" r=".36" /></g>}
          <path className="ac-whale-holes" d={MARK_HOLES} />
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
    </button>
    {poked > 0 && <span className="ac-whale-ripple" key={`r${poked}`} aria-hidden="true" />}
    {poked > 0 && <span className="ac-whale-pops" key={poked} aria-hidden="true">{Array.from({ length: combo >= 5 ? 9 : 5 }, (_, i) => <i key={i} />)}</span>}
    <div className="ac-whale-caption" role="status">{caption}</div>
  </div>
}
