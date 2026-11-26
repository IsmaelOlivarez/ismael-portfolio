'use client'

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'motion/react'

/**
 * A single thin shape that drifts vertically as a function of the (lagged)
 * scroll position. `depth` sets its parallax rate and sign.
 */
function Layer({
  scroll,
  depth,
  reduce,
  className,
  style,
}: {
  scroll: MotionValue<number>
  depth: number
  reduce: boolean
  className?: string
  style?: React.CSSProperties
}) {
  const y = useTransform(scroll, (v) => (reduce ? 0 : v * depth))
  return <motion.div aria-hidden className={`absolute ${className ?? ''}`} style={{ ...style, y }} />
}

/**
 * Thin geometric line-work drifting behind the page. The scroll position is
 * spring-smoothed so the shapes trail the scroll (a soft lag) and each layer
 * moves at its own depth for parallax. Fixed, non-interactive, reduced-motion
 * safe. Lines/outlines only — the canvas stays quiet.
 */
export function ScrollShapes() {
  const reduce = useReducedMotion() ?? false
  const { scrollY } = useScroll()
  const lagged = useSpring(scrollY, { stiffness: 42, damping: 18, mass: 1.1 })

  const hair = 'rgb(var(--c-ink) / 0.055)'
  const hairSoft = 'rgb(var(--c-ink) / 0.04)'
  const accent = 'rgb(var(--c-accent) / 0.09)'

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* large outlined circle, upper right */}
      <Layer
        scroll={lagged}
        depth={-0.16}
        reduce={reduce}
        className="rounded-full border"
        style={{
          top: '-14vw',
          right: '-10vw',
          width: '46vw',
          height: '46vw',
          borderColor: accent,
        }}
      />
      {/* medium outlined circle, lower left */}
      <Layer
        scroll={lagged}
        depth={0.1}
        reduce={reduce}
        className="rounded-full border"
        style={{
          bottom: '-8vw',
          left: '-6vw',
          width: '30vw',
          height: '30vw',
          borderColor: hair,
        }}
      />
      {/* tall vertical rule, left third */}
      <Layer
        scroll={lagged}
        depth={-0.08}
        reduce={reduce}
        style={{ top: '-20vh', left: '18%', width: '1px', height: '140vh', backgroundColor: hairSoft }}
      />
      {/* vertical rule, right quarter */}
      <Layer
        scroll={lagged}
        depth={0.06}
        reduce={reduce}
        style={{ top: '-20vh', right: '26%', width: '1px', height: '140vh', backgroundColor: hairSoft }}
      />
      {/* outlined square, mid right, slightly rotated */}
      <Layer
        scroll={lagged}
        depth={0.14}
        reduce={reduce}
        className="border"
        style={{
          top: '34%',
          right: '12%',
          width: '13vw',
          height: '13vw',
          borderColor: hair,
          transform: 'rotate(12deg)',
        }}
      />
      {/* long diagonal hairline */}
      <Layer
        scroll={lagged}
        depth={-0.11}
        reduce={reduce}
        style={{
          top: '58%',
          left: '-10%',
          width: '60vw',
          height: '1px',
          backgroundColor: hair,
          transform: 'rotate(-18deg)',
          transformOrigin: 'left center',
        }}
      />
      {/* small outlined circle, upper left area */}
      <Layer
        scroll={lagged}
        depth={0.18}
        reduce={reduce}
        className="rounded-full border"
        style={{ top: '22%', left: '8%', width: '5vw', height: '5vw', borderColor: accent }}
      />
      {/* thin horizontal rule, lower third */}
      <Layer
        scroll={lagged}
        depth={-0.05}
        reduce={reduce}
        style={{ top: '82%', left: '30%', width: '34vw', height: '1px', backgroundColor: hairSoft }}
      />
      {/* narrow outlined rectangle, far right lower */}
      <Layer
        scroll={lagged}
        depth={0.09}
        reduce={reduce}
        className="border"
        style={{ top: '70%', right: '4%', width: '7vw', height: '22vw', borderColor: hairSoft }}
      />
    </div>
  )
}
