/**
 * Light, flow and particles over the plain interface: a glass lens that slides
 * between the options of a segmented control, light that follows the pointer
 * on glass surfaces, slow liquid light behind the workspace, a liquid meter
 * for progress and a short burst of light when a pick lands. Nothing here
 * carries information the text does not, the interface works without it, and
 * reduced motion keeps everything still.
 */
import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'

/**
 * Two comets that race around their container's edge while a comparison runs.
 * Drawn as dashes along a rounded rectangle, so they travel at an even speed
 * on a wide bar as on a square card. The stylesheet decides when it shows.
 */
export function RunRing(): React.ReactElement {
  const svg = useRef<SVGSVGElement>(null)
  const [radius, setRadius] = useState(16)
  const id = `acr${useId().replace(/[^\w-]/g, '')}`
  useLayoutEffect(() => {
    const parent = svg.current?.parentElement
    if (parent) setRadius(Math.max(0, (parseFloat(getComputedStyle(parent).borderTopLeftRadius) || 0) - 1.5))
  }, [])
  // If the stylesheet animation does not run (an older engine, or a theme that stops
  // animations), the comets are moved by script instead, at the same speed and spacing.
  useEffect(() => {
    const el = svg.current
    if (!el || typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let running: Animation[] = [], sample: ReturnType<typeof setTimeout> | undefined
    // The ring is only shown while a comparison runs; look again until it has been seen moving or not.
    const watch = setInterval(() => {
      const head = el.querySelector<SVGRectElement>('.head')
      if (!head || typeof head.animate !== 'function' || getComputedStyle(el).display === 'none' || sample) return
      const before = getComputedStyle(head).strokeDashoffset
      sample = setTimeout(() => {
        sample = undefined
        if (getComputedStyle(el).display === 'none') return
        clearInterval(watch)
        if (getComputedStyle(head).strokeDashoffset !== before) return
        const lead: Record<string, number> = { t1: 0, t2: 0.3, t3: 0.48, head: 0.636 }
        running = [...el.querySelectorAll<SVGRectElement>('.t1, .t2, .t3, .head')].map(rect => {
          rect.style.animation = 'none'
          return rect.animate([{ strokeDashoffset: 0 }, { strokeDashoffset: -100 }], { duration: 3000, iterations: Infinity, delay: -(lead[rect.classList[0]!] ?? 0) * 1000 })
        })
        el.dataset.scripted = 'true'
      }, 150)
    }, 900)
    return () => { clearInterval(watch); if (sample) clearTimeout(sample); for (const animation of running) animation.cancel() }
  }, [])
  return <svg ref={svg} className="ac-run-ring" aria-hidden="true">
    <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4d6bfe" /><stop offset=".5" stopColor="#45b6ff" /><stop offset="1" stopColor="#6f8cff" /></linearGradient></defs>
    <rect className="track" rx={radius} pathLength={100} />
    {(['t1', 't2', 't3'] as const).map(name => <rect key={name} className={name} rx={radius} pathLength={100} stroke={`url(#${id})`} />)}
    <rect className="head" rx={radius} pathLength={100} />
  </svg>
}

interface Blob { x: number; y: number; vx: number; vy: number; tx: number; ty: number; r: number; color: readonly [number, number, number]; alpha: number; next: number }
const AMBIENT_COLORS: ReadonlyArray<readonly [number, number, number]> = [[77, 107, 254], [69, 182, 255], [142, 164, 255], [169, 232, 255], [92, 128, 255], [96, 200, 255]]

/**
 * Soft blue light that drifts and merges like liquid behind the workspace.
 * Six fields of colour wander towards new random places and blend where they
 * meet. They are drawn on a tiny canvas and scaled up by the browser, so the
 * cost stays a few hundred pixels per frame. While a comparison runs the light
 * moves faster and brighter; reduced motion draws one still frame, and a
 * hidden page draws nothing.
 */
export function Ambient({ busy }: { busy: boolean }): React.ReactElement {
  const canvas = useRef<HTMLCanvasElement>(null)
  const energy = useRef(busy ? 1 : 0)
  const target = useRef(busy ? 1 : 0)
  target.current = busy ? 1 : 0
  useEffect(() => {
    const el = canvas.current
    const ctx = el?.getContext('2d')
    if (!el || !ctx) return
    const W = 80, H = 52
    el.width = W; el.height = H
    const random = (min: number, max: number): number => min + Math.random() * (max - min)
    const blobs: Blob[] = AMBIENT_COLORS.map((color, i) => ({ x: random(0, 1), y: random(0, 1), vx: 0, vy: 0, tx: random(-.1, 1.1), ty: random(-.1, 1.1), r: random(.32, .52), color, alpha: i === 4 ? .16 : random(.22, .32), next: 0 }))
    const dark = (): boolean => typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches
    const draw = (): void => {
      ctx.clearRect(0, 0, W, H)
      const night = dark()
      const boost = (night ? .55 : 1.2) * (1 + energy.current * .35)
      // The light leans towards the ground: pastel on light, deep on dark, so text set straight
      // on the background keeps its contrast even where fields overlap.
      const toward = night ? [13, 20, 48] : [255, 255, 255], amount = night ? .55 : .5
      for (const b of blobs) {
        const g = ctx.createRadialGradient(b.x * W, b.y * H, 0, b.x * W, b.y * H, b.r * W)
        const [r, gr, bl] = b.color.map((v, i) => Math.round(v + (toward[i]! - v) * amount)) as [number, number, number]
        g.addColorStop(0, `rgba(${r},${gr},${bl},${Math.min(.55, b.alpha * boost)})`)
        g.addColorStop(.55, `rgba(${r},${gr},${bl},${Math.min(.3, b.alpha * boost * .45)})`)
        g.addColorStop(1, `rgba(${r},${gr},${bl},0)`)
        ctx.fillStyle = g
        ctx.fillRect(0, 0, W, H)
      }
    }
    if (reduced()) { draw(); return }
    let frame = 0, last = 0
    const step = (now: number): void => {
      frame = requestAnimationFrame(step)
      if (document.hidden || now - last < 40) return
      const dt = Math.min(.1, (now - last) / 1000 || .04)
      last = now
      energy.current += (target.current - energy.current) * Math.min(1, dt * 1.5)
      const speed = 1 + energy.current * 1.6
      for (const b of blobs) {
        if (now > b.next) { b.tx = random(-.15, 1.15); b.ty = random(-.15, 1.15); b.next = now + random(5000, 11000) / speed }
        // A spring towards a wandering target: smooth, never still, never fast.
        b.vx += ((b.tx - b.x) * .35 - b.vx * .9) * dt * speed
        b.vy += ((b.ty - b.y) * .35 - b.vy * .9) * dt * speed
        b.x += b.vx * dt * speed; b.y += b.vy * dt * speed
      }
      draw()
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [])
  return <canvas ref={canvas} className="ac-ambient" aria-hidden="true" />
}

const reduced = (): boolean => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
const attached = new WeakSet<Element>()
const owns = (root: Element, element: Element): boolean => element.closest('.ac-root') === root

/** Follow the selected option of each segmented control and the pointer over glass inside `root`. */
export function attachFx(root: HTMLElement): () => void {
  if (attached.has(root) || typeof window === 'undefined') return () => {}
  attached.add(root)
  let frame = 0
  let pointer: PointerEvent | undefined
  const placeLenses = (): void => {
    for (const seg of root.querySelectorAll<HTMLElement>('.ac-seg')) {
      if (!owns(root, seg)) continue
      const on = seg.querySelector<HTMLElement>(':scope > button.on')
      if (!on || on.offsetParent !== seg) {
        if (seg.dataset.lens !== undefined) { delete seg.dataset.lens; seg.classList.remove('ac-lensed') }
        continue
      }
      const box = `${on.offsetLeft},${on.offsetTop},${on.offsetWidth},${on.offsetHeight}`
      if (seg.dataset.lens === box) continue
      // The first placement appears in place; later ones slide.
      const first = seg.dataset.lens === undefined
      seg.dataset.lens = box
      if (first) seg.classList.add('ac-lens-snap')
      seg.style.setProperty('--ac-lens-x', `${on.offsetLeft}px`)
      seg.style.setProperty('--ac-lens-y', `${on.offsetTop}px`)
      seg.style.setProperty('--ac-lens-w', `${on.offsetWidth}px`)
      seg.style.setProperty('--ac-lens-h', `${on.offsetHeight}px`)
      seg.classList.add('ac-lensed')
      if (first) requestAnimationFrame(() => requestAnimationFrame(() => seg.classList.remove('ac-lens-snap')))
    }
  }
  const light = (event: PointerEvent): void => {
    const target = (event.target as Element | null)?.closest?.('.ac-card, .ac-composer-settings, .ac-action-dock, .ac-why, .ac-hrow, .ac-btn.primary, .ac-logo')
    if (!(target instanceof HTMLElement) || !owns(root, target)) return
    const box = target.getBoundingClientRect()
    if (!box.width || !box.height) return
    target.style.setProperty('--ac-mx', `${(((event.clientX - box.left) / box.width) * 100).toFixed(1)}%`)
    target.style.setProperty('--ac-my', `${(((event.clientY - box.top) / box.height) * 100).toFixed(1)}%`)
  }
  const tick = (): void => {
    frame = 0
    placeLenses()
    if (pointer) { light(pointer); pointer = undefined }
  }
  const schedule = (): void => { if (!frame) frame = requestAnimationFrame(tick) }
  const move = (event: PointerEvent): void => { if (event.pointerType === 'mouse' && !reduced()) { pointer = event; schedule() } }
  const mutations = new MutationObserver(schedule)
  mutations.observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'aria-pressed', 'hidden', 'open'] })
  const sizes = typeof ResizeObserver === 'function' ? new ResizeObserver(schedule) : undefined
  sizes?.observe(root)
  root.addEventListener('pointermove', move, { passive: true })
  void document.fonts?.ready.then(schedule, () => {})
  schedule()
  return () => {
    attached.delete(root)
    mutations.disconnect()
    sizes?.disconnect()
    root.removeEventListener('pointermove', move)
    if (frame) cancelAnimationFrame(frame)
  }
}

const SPARKS = ['var(--ac-v-brand-2)', 'var(--ac-v-sky)', 'var(--ac-v-ice)', 'var(--ac-v-soft)', 'var(--ac-v-accent)', '#ffb547']

/** A short burst of light from `from`: the moment a pick lands. */
export function burst(from: Element): void {
  if (reduced() || typeof document === 'undefined' || typeof Element.prototype.animate !== 'function') return
  const host = from.closest('dialog, .ac-root')
  if (!(host instanceof HTMLElement)) return
  const anchor = from.getBoundingClientRect(), frame = host.getBoundingClientRect()
  const layer = document.createElement('span')
  layer.className = 'ac-burst'
  layer.setAttribute('aria-hidden', 'true')
  layer.style.left = `${anchor.left - frame.left + anchor.width / 2}px`
  layer.style.top = `${anchor.top - frame.top + anchor.height / 2}px`
  const ring = document.createElement('b')
  layer.appendChild(ring)
  ring.animate([{ transform: 'translate(-50%,-50%) scale(.3)', opacity: 0.9 }, { transform: 'translate(-50%,-50%) scale(2.6)', opacity: 0 }], { duration: 720, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' })
  const count = 16
  for (let i = 0; i < count; i++) {
    const spark = document.createElement('i')
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.35
    const distance = 28 + Math.random() * 38
    const size = 3 + Math.random() * 4
    spark.style.width = spark.style.height = `${size.toFixed(1)}px`
    spark.style.background = SPARKS[i % SPARKS.length]!
    layer.appendChild(spark)
    const x = Math.cos(angle) * distance, y = Math.sin(angle) * distance
    spark.animate([
      { transform: 'translate(-50%,-50%) scale(.3)', opacity: 1 },
      { transform: `translate(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px)) scale(1)`, opacity: 1, offset: 0.55 },
      { transform: `translate(calc(-50% + ${(x * 1.3).toFixed(1)}px), calc(-50% + ${(y * 1.3 + 10).toFixed(1)}px)) scale(.2)`, opacity: 0 },
    ], { duration: 760 + Math.random() * 260, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' })
  }
  host.appendChild(layer)
  setTimeout(() => layer.remove(), 1200)
}
