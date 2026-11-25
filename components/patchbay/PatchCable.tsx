'use client'

import { useLayoutEffect, useState } from 'react'
import {
  motion,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'motion/react'

type Pt = { x: number; y: number }

/**
 * A hanging patch cable drawn between two DOM anchors inside `containerRef`.
 * It sags under gravity, nudges toward the cursor with spring physics, and
 * carries a travelling signal pulse that brightens when `active`.
 *
 * `pointerX` / `pointerY` are shared, spring-smoothed pointer offsets in the
 * range roughly -1..1 (supplied by the parent so every cable reacts together).
 */
export function PatchCable({
  containerRef,
  startRef,
  endRef,
  pointerX,
  pointerY,
  active = false,
  tone = 'amber',
}: {
  containerRef: React.RefObject<HTMLElement>
  startRef: React.RefObject<HTMLElement>
  endRef: React.RefObject<HTMLElement>
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  active?: boolean
  tone?: 'amber' | 'cyan'
}) {
  const reduce = useReducedMotion()
  const [box, setBox] = useState({ w: 0, h: 0 })
  const [start, setStart] = useState<Pt>({ x: 0, y: 0 })
  const [end, setEnd] = useState<Pt>({ x: 0, y: 0 })

  useLayoutEffect(() => {
    const measure = () => {
      const c = containerRef.current
      const s = startRef.current
      const e = endRef.current
      if (!c || !s || !e) return
      const cb = c.getBoundingClientRect()
      const sb = s.getBoundingClientRect()
      const eb = e.getBoundingClientRect()
      setBox({ w: cb.width, h: cb.height })
      setStart({ x: sb.left + sb.width / 2 - cb.left, y: sb.top + sb.height / 2 - cb.top })
      setEnd({ x: eb.left + eb.width / 2 - cb.left, y: eb.top + eb.height / 2 - cb.top })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', measure)
    // Re-measure once fonts/layout settle.
    const t = window.setTimeout(measure, 300)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.clearTimeout(t)
    }
  }, [containerRef, startRef, endRef])

  const dist = Math.hypot(end.x - start.x, end.y - start.y)
  const sag = Math.max(26, dist * 0.22)

  const buildPath = (nx: number, ny: number) => {
    const mx = (start.x + end.x) / 2
    const my = (start.y + end.y) / 2
    const cx = mx + nx * 26
    const cy = my + sag + ny * 20
    return `M ${start.x},${start.y} Q ${cx},${cy} ${end.x},${end.y}`
  }

  // Bind the path to the spring-smoothed pointer so the cable follows the cursor.
  const d = useTransform<number, string>([pointerX, pointerY], ([nx, ny]) =>
    buildPath(reduce ? 0 : nx, reduce ? 0 : ny),
  )

  const stroke = tone === 'cyan' ? 'var(--c-patch)' : 'var(--c-accent)'

  if (!box.w || !dist) {
    // First paint before measurement: nothing to draw yet.
    return <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />
  }

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      viewBox={`0 0 ${box.w} ${box.h}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      {/* cable shadow */}
      <motion.path
        d={d}
        fill="none"
        stroke="rgb(0 0 0 / 0.45)"
        strokeWidth={9}
        strokeLinecap="round"
        style={{ transform: 'translateY(3px)' }}
      />
      {/* rubber cable */}
      <motion.path d={d} fill="none" stroke="rgb(20 22 26)" strokeWidth={7} strokeLinecap="round" />
      <motion.path
        d={d}
        fill="none"
        stroke={`rgb(${stroke} / ${active ? 0.55 : 0.32})`}
        strokeWidth={7}
        strokeLinecap="round"
      />
      {/* cable highlight */}
      <motion.path
        d={d}
        fill="none"
        stroke="rgb(255 255 255 / 0.14)"
        strokeWidth={1.5}
        strokeLinecap="round"
        style={{ transform: 'translateY(-1.5px)' }}
      />
      {/* travelling signal pulse */}
      <motion.path
        d={d}
        fill="none"
        stroke={`rgb(${stroke})`}
        strokeWidth={active ? 3 : 2}
        strokeLinecap="round"
        strokeDasharray="2 14"
        className={reduce ? undefined : 'animate-signal-dash'}
        style={{
          opacity: active ? 1 : 0.6,
          filter: active ? `drop-shadow(0 0 5px rgb(${stroke} / 0.85))` : 'none',
        }}
      />
    </svg>
  )
}
