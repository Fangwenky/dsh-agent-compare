/**
 * How many versions, which style each one gets, and whether the comparison is
 * blind. Choices are saved per conversation; the host validates them again.
 * A custom style is saved only once it has a description.
 */
import React, { useEffect, useRef, useId, useState } from 'react'
import { currentLocale, t } from './i18n.js'
import { BALANCED_STYLE, CUSTOM_STYLE, DEFAULT_STYLE_IDS, MAX_CUSTOM_STYLE, STYLE_CATALOG, STYLE_GROUPS, styleById } from './style-catalog.js'
import { MARK_BODY } from './agent-view.js'
import type { StyleStat } from './model.js'

export interface StyleChoice { id: string; note?: string }
export const MIN_VERSIONS = 2
export const MAX_VERSIONS = 4
const LETTERS = ['A', 'B', 'C', 'D'] as const

/** The interface name of a style, as it appears in this language. */
export function styleName(choice: StyleChoice): string {
  if (choice.id === CUSTOM_STYLE) return choice.note ? t("自定义：{0}", { 0: choice.note }) : t("自定义")
  const style = styleById(choice.id)
  return style ? t(style.name) : choice.id
}

/** Localise known style labels without translating a user's custom description. */
export function revealedStyleName(style: { id: string; title: string }): string {
  const known = styleById(style.id)
  if (known) return currentLocale() === 'en' ? t(known.name) : style.title
  if (style.id === CUSTOM_STYLE && style.title.startsWith('自定义 · ')) return `${t("自定义")} · ${style.title.slice('自定义 · '.length)}`
  return t(style.title)
}

/** The styles for `count` versions: keep what was chosen, then add defaults not used yet. */
export function stylesFor(count: number, current: readonly StyleChoice[] | undefined): StyleChoice[] {
  const kept = (current ?? []).slice(0, count)
  const defaults = DEFAULT_STYLE_IDS[count] ?? DEFAULT_STYLE_IDS[2]!
  const used = new Set(kept.map(choice => choice.id))
  const extra = [...defaults, ...STYLE_CATALOG.map(style => style.id)].filter(id => !used.has(id))
  while (kept.length < count) kept.push({ id: extra.shift() ?? defaults[kept.length] ?? 'bold' })
  return kept
}

export function Segmented<T extends string | number>({ label, value, options, onChange, disabled }: { label: string; value: T; options: ReadonlyArray<{ value: T; text: string; title?: string; icon?: React.ReactNode }>; onChange(value: T): void; disabled?: boolean }): React.ReactElement {
  return <div className="ac-seg" role="group" aria-label={label}>
    {options.map(option => <button key={String(option.value)} type="button" className={value === option.value ? 'on' : ''} aria-pressed={value === option.value} disabled={disabled} data-text={option.text} {...(option.title ? { title: option.title } : {})} onClick={() => { if (value !== option.value) onChange(option.value) }}>{option.icon}{option.text}</button>)}
  </div>
}

export function VersionsControl({ value, onChange, disabled }: { value: number; onChange(value: number): void; disabled?: boolean }): React.ReactElement {
  return <Segmented label={t("版本数")} value={value} disabled={disabled} onChange={onChange}
    options={[2, 3, 4].map(n => ({ value: n, icon: <span className="ac-mini-pod" aria-hidden="true">{Array.from({ length:n }, (_, i) => <svg key={i} viewBox="143.6 6.6 26.4 23.4"><path d={MARK_BODY}/></svg>)}</span>, text: t("{0} 版", { 0: n }), title: t("生成 {0} 个候选。实际用量取决于任务和模型。", { 0: n }) }))} />
}

function Eye({ blind }: { blind: boolean }): React.ReactElement {
  return <svg className="ac-eye-icon" aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M2 10q8-12 16 0-8 12-16 0Z"/><circle cx="10" cy="10" r="2.4"/>{blind && <path d="m3 3 14 14"/>}
  </svg>
}

export function StyleSwatch({ id }: { id: string }): React.ReactElement {
  return <span className="ac-swatch" data-style={id} aria-hidden="true"><i/><i/><i/></span>
}

export function BlindControl({ blind, onChange, disabled }: { blind: boolean; onChange(blind: boolean): void; disabled?: boolean }): React.ReactElement {
  return <Segmented label={t("比较时是否显示风格")} value={blind ? 'blind' : 'open'} disabled={disabled} onChange={value => onChange(value === 'blind')}
    options={[{ value: 'blind', icon: <Eye blind/>, text: t("盲选"), title: t("选完再揭晓每一版的风格和模型，避免先入为主") }, { value: 'open', icon: <Eye blind={false}/>, text: t("公开对比"), title: t("一开始就显示每一版的风格和模型") }]} />
}

/** One version's style: presets grouped by what they change, plus a custom description. */
export function StylePicker({ index, choice, open, onChange, disabled, shared }: { index: number; choice: StyleChoice; open: boolean; onChange(choice: StyleChoice): void; disabled?: boolean; shared?: boolean }): React.ReactElement {
  const [palette, setPalette] = useState(false)
  const panelId = useId()
  const trigger = useRef<HTMLButtonElement>(null)
  const noteField = useRef<HTMLInputElement>(null)
  const [pending, setPending] = useState(false)
  const [note, setNote] = useState(choice.note ?? '')
  useEffect(() => { setNote(choice.note ?? ''); if (choice.id === CUSTOM_STYLE) setPending(false) }, [choice.id, choice.note])
  const custom = pending || choice.id === CUSTOM_STYLE
  const commit = (): void => {
    const text = note.replace(/\s+/g, ' ').trim()
    if (text && (text !== choice.note || choice.id !== CUSTOM_STYLE)) onChange({ id: CUSTOM_STYLE, note: text })
  }
  const style = styleById(choice.id)
  const label = shared ? t("各版共用的风格") : open ? t("{0} 的风格", { 0: LETTERS[index] }) : t("第 {0} 种风格", { 0: index + 1 })
  function closePalette(): void { setPalette(false); trigger.current?.focus() }
  function choose(id: string): void {
    if (id === CUSTOM_STYLE) {
      setPending(true); setPalette(false)
      requestAnimationFrame(() => noteField.current?.focus())
    } else { setPending(false); onChange({ id }); closePalette() }
  }
  return <span data-label={open && !shared ? LETTERS[index] : undefined} className={`ac-style-slot${custom ? ' custom' : ''}`}>
    {!shared && <span className="ac-style-badge" aria-hidden="true">{open ? LETTERS[index] : index + 1}</span>}
    <button className="ac-swatch-trigger" type="button" ref={trigger} aria-label={t("浏览风格样式：{0}", { 0: label })}
      aria-controls={panelId} aria-expanded={palette} disabled={disabled} onClick={() => setPalette(v => !v)}><StyleSwatch id={choice.id}/></button>
    <select aria-label={label} disabled={disabled} value={custom ? CUSTOM_STYLE : choice.id} title={style ? t(style.hint) : choice.note ?? ''}
      onChange={event => { const id = event.target.value; if (id === CUSTOM_STYLE) { setPending(true); return } setPending(false); onChange({ id }) }}>
      {shared && <option value={BALANCED_STYLE.id}>{t(BALANCED_STYLE.name)}</option>}
      {STYLE_GROUPS.map(group => <optgroup key={group.id} label={t(group.name)}>{STYLE_CATALOG.filter(s => s.group === group.id).map(s => <option key={s.id} value={s.id}>{t(s.name)}</option>)}</optgroup>)}
      <optgroup label={t("自定义")}><option value={CUSTOM_STYLE}>{t("自定义…")}</option></optgroup>
    </select>
    {palette && <span id={panelId} role="group" className="ac-palette" aria-label={t("风格样式")} onKeyDown={e => {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closePalette() }
    }}>
      {!open && <span className="ac-palette-note">{t("开始时随机分配，选完再揭晓。")}</span>}
      {STYLE_CATALOG.map(s => <button type="button" key={s.id} disabled={disabled} aria-pressed={s.id===choice.id}
        title={t(s.hint)} onClick={() => choose(s.id)}><StyleSwatch id={s.id}/>{t(s.name)}</button>)}
      <button className="ac-custom-card" type="button" disabled={disabled} onClick={() => choose(CUSTOM_STYLE)}>{t("自定义…")}</button>
    </span>}
    {custom && <input ref={noteField} type="text" className="ac-style-note" aria-label={t("{0}：自定义描述", { 0: label })} maxLength={MAX_CUSTOM_STYLE} value={note} disabled={disabled}
      placeholder={t("例如：像复古游戏机")} onChange={event => setNote(event.target.value)} onBlur={commit}
      onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); commit() } if (event.key === 'Escape' && pending) { event.preventDefault(); setPending(false) } }} />}
    {custom && <small className="ac-char-count">{note.length}/{MAX_CUSTOM_STYLE}</small>}
  </span>
}

/** The styles of every version, with how a blind comparison assigns them. */
export function StyleSlots({ styles, blind, onChange, disabled }: { styles: readonly StyleChoice[]; blind: boolean; onChange(styles: StyleChoice[]): void; disabled?: boolean }): React.ReactElement {
  const last = LETTERS[styles.length - 1]
  return <div className="ac-style-row" role="group" aria-label={t("各版风格")}>
    <span className="ac-style-row-label">{t("风格")}</span>
    {styles.map((choice, index) => <StylePicker key={index} index={index} choice={choice} open={!blind} disabled={disabled}
      onChange={next => onChange(styles.map((item, at) => at === index ? next : item))} />)}
    <span className="ac-meta">{blind ? t("开始时随机分到 A–{0}，选完再揭晓", { 0: last }) : t("按顺序对应 A–{0}，比较时直接显示", { 0: last })}</span>
  </div>
}

/** Ready-made sets: one tap sets how many versions run and which style each gets. */
export const STYLE_COMBOS: ReadonlyArray<{ id: string; name: string; styles: readonly string[] }> = [
  { id: 'classic', name: '经典对照', styles: ['conservative', 'bold'] },
  { id: 'visual', name: '三种视觉', styles: ['minimal', 'polished', 'vibrant'] },
  { id: 'priority', name: '三种取舍', styles: ['friendly', 'rigorous', 'lean'] },
  { id: 'explore', name: '四向探索', styles: ['conservative', 'bold', 'minimal', 'vibrant'] },
]

export function StyleCombos({ styles, onPick, disabled }: { styles: readonly StyleChoice[]; onPick(styles: StyleChoice[]): void; disabled?: boolean }): React.ReactElement {
  const current = styles.map(choice => choice.note === undefined ? choice.id : '').join(',')
  return <div className="ac-combos" role="group" aria-label={t("快速组合")}>
    <span className="ac-style-row-label">{t("快速组合")}</span>
    {STYLE_COMBOS.map(combo => {
      const on = current === combo.styles.join(',')
      const names = combo.styles.map(id => styleName({ id })).join(t("、"))
      return <button key={combo.id} type="button" className={`ac-chip ac-combo${on ? ' on' : ''}`} aria-pressed={on} disabled={disabled} title={names}
        onClick={() => { if (!on) onPick(combo.styles.map(id => ({ id }))) }}>{t(combo.name)}<span className="ac-recipe-strip" aria-hidden="true">{combo.styles.map(id => <StyleSwatch key={id} id={id}/>)}</span><small>{t("{0} 版", { 0: combo.styles.length })}</small></button>
    })}
  </div>
}

/** The styles this user picked most often, once there is enough history to say so. */
export function StyleHabit({ load }: { load(): Promise<{ comparisons: number; styles: StyleStat[] }> }): React.ReactElement | null {
  const [stats, setStats] = useState<{ comparisons: number; styles: StyleStat[] }>()
  useEffect(() => {
    let active = true
    load().then(value => { if (active) setStats(value) }, () => {})
    return () => { active = false }
  }, [])
  const top = stats?.styles.filter(style => style.offered >= 3 && style.picked > 0).slice(0, 2) ?? []
  if (!stats || stats.comparisons < 3 || top.length === 0) return null
  return <span className="ac-meta ac-style-habit">{t("你常选：")}{top.map(style => <span key={style.id} className="ac-habit-item">{style.id === CUSTOM_STYLE ? t("自定义") : styleName({ id: style.id })} {style.picked}/{style.offered}<i aria-hidden="true" style={{width:Math.min(100, 100 * style.picked / style.offered) + '%'}}/></span>)}</span>
}
