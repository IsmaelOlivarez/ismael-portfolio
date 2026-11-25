import { clsx } from 'clsx'
import type { CSSProperties } from 'react'

/* ============================================================
   Panel hardware primitives for the Patch Bay world.
   All presentational: SVG shapes + CSS ambient motion only.
   ============================================================ */

/** Round trig-derived coords to a fixed precision so server and client
 *  serialize byte-identical SVG (avoids React hydration mismatches). */
const r3 = (n: number) => Math.round(n * 1000) / 1000

/** A rack-ear screw head. */
export function Screw({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={clsx('h-3 w-3', className)} aria-hidden>
      <circle cx="8" cy="8" r="7" fill="rgb(var(--c-panel))" stroke="rgb(var(--c-line))" />
      <circle cx="8" cy="8" r="7" fill="none" stroke="rgb(0 0 0 / 0.35)" strokeWidth="0.5" />
      <line x1="4.5" y1="6" x2="11.5" y2="10" stroke="rgb(0 0 0 / 0.5)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="6" cy="5.5" r="1.4" fill="rgb(255 255 255 / 0.12)" />
    </svg>
  )
}

/**
 * A 1/4" patch jack socket. `lit` glows its LED collar; `tone` picks the
 * signal colour. Set `anchorRef` to let a cable connect to its centre.
 */
export function Jack({
  label,
  sub,
  lit = false,
  tone = 'amber',
  anchorRef,
  className,
}: {
  label?: string
  sub?: string
  lit?: boolean
  tone?: 'amber' | 'cyan'
  anchorRef?: React.Ref<HTMLSpanElement>
  className?: string
}) {
  const toneVar = tone === 'cyan' ? 'var(--c-patch)' : 'var(--c-accent)'
  return (
    <span className={clsx('inline-flex flex-col items-center gap-1.5', className)}>
      <span ref={anchorRef} className="relative inline-flex h-9 w-9 items-center justify-center">
        <svg viewBox="0 0 36 36" className="h-9 w-9" aria-hidden>
          {/* metal collar */}
          <circle cx="18" cy="18" r="16" fill="rgb(var(--c-panel))" stroke="rgb(var(--c-line))" />
          <circle cx="18" cy="18" r="16" fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth="0.75" />
          <circle cx="18" cy="18" r="11" fill="rgb(var(--c-metal) / 0.22)" stroke="rgb(0 0 0 / 0.4)" />
          {/* socket hole */}
          <circle cx="18" cy="18" r="6" fill="rgb(8 9 11)" />
          <circle cx="18" cy="18" r="6" fill="none" stroke={`rgb(${toneVar} / ${lit ? 0.9 : 0.25})`} strokeWidth="1.5" />
          {lit && <circle cx="18" cy="18" r="2.4" fill={`rgb(${toneVar})`} />}
        </svg>
        {lit && (
          <span
            className="pointer-events-none absolute -inset-2 animate-led-breathe"
            style={{ background: `radial-gradient(circle, rgb(${toneVar} / 0.45), transparent 68%)` }}
            aria-hidden
          />
        )}
      </span>
      {label && (
        <span className="silk text-center leading-tight">
          {label}
          {sub && <span className="block text-muted">{sub}</span>}
        </span>
      )}
    </span>
  )
}

/** A rotary control knob with an indicator pointing at `value` (0–1). */
export function Knob({
  label,
  value = 0.62,
  drift = false,
  className,
}: {
  label?: string
  value?: number
  drift?: boolean
  className?: string
}) {
  // Map 0–1 to a -135°..135° sweep.
  const angle = -135 + value * 270
  return (
    <span className={clsx('inline-flex flex-col items-center gap-1.5', className)}>
      <span className="relative inline-flex h-11 w-11 items-center justify-center">
        <svg viewBox="0 0 44 44" className="h-11 w-11" aria-hidden>
          {/* skirt ticks */}
          {Array.from({ length: 11 }).map((_, i) => {
            const a = (-135 + i * 27) * (Math.PI / 180)
            const r1 = 21
            const r2 = 19
            return (
              <line
                key={i}
                x1={r3(22 + Math.sin(a) * r1)}
                y1={r3(22 - Math.cos(a) * r1)}
                x2={r3(22 + Math.sin(a) * r2)}
                y2={r3(22 - Math.cos(a) * r2)}
                stroke="rgb(var(--c-metal) / 0.4)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            )
          })}
          {/* knob body */}
          <circle cx="22" cy="22" r="15" fill="rgb(var(--c-panel))" stroke="rgb(var(--c-line))" />
          <circle cx="22" cy="22" r="15" fill="none" stroke="rgb(255 255 255 / 0.07)" strokeWidth="0.75" />
          <circle cx="22" cy="18.5" r="9" fill="rgb(255 255 255 / 0.03)" />
          {/* indicator — points at `value`; when drifting it sways AROUND that
              angle via the --knob-a custom property (no competing transform). */}
          <g
            className={drift ? 'knob-drift' : undefined}
            style={
              drift
                ? ({ transformOrigin: '22px 22px', '--knob-a': `${angle}deg` } as CSSProperties)
                : { transformOrigin: '22px 22px', transform: `rotate(${angle}deg)` }
            }
          >
            <line x1="22" y1="22" x2="22" y2="9" stroke="rgb(var(--c-accent))" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </span>
      {label && <span className="silk leading-none">{label}</span>}
    </span>
  )
}

/** A status LED with label — breathes when `on`. */
export function StatusLed({
  label,
  on = true,
  tone = 'amber',
}: {
  label: string
  on?: boolean
  tone?: 'amber' | 'cyan' | 'green'
}) {
  const rgb = tone === 'green' ? '73 224 122' : tone === 'cyan' ? 'var(--c-patch)' : 'var(--c-accent)'
  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
        {on && (
          <span
            className="pointer-events-none absolute -inset-1.5 animate-led-breathe"
            style={{ background: `radial-gradient(circle, rgb(${rgb} / 0.6), transparent 70%)` }}
            aria-hidden
          />
        )}
        <span
          className="relative h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: `rgb(${rgb})`, opacity: on ? 1 : 0.3 }}
        />
      </span>
      <span className="silk silk-ink">{label}</span>
    </span>
  )
}

/** A small analog VU meter; the needle drifts within bounds. */
export function VuMeter({ label = 'LEVEL', className }: { label?: string; className?: string }) {
  return (
    <span className={clsx('inline-flex flex-col gap-1', className)}>
      <span className="panel-raised relative block h-14 w-24 overflow-hidden rounded border border-line">
        <svg viewBox="0 0 96 56" className="h-full w-full" aria-hidden>
          {/* scale arc */}
          <path d="M14 46 A 36 36 0 0 1 82 46" fill="none" stroke="rgb(var(--c-metal) / 0.35)" strokeWidth="1" />
          {Array.from({ length: 7 }).map((_, i) => {
            const a = (-60 + i * 20) * (Math.PI / 180)
            const cx = 48
            const cy = 50
            const r1 = 34
            const r2 = 29
            const hot = i >= 5
            return (
              <line
                key={i}
                x1={r3(cx + Math.sin(a) * r1)}
                y1={r3(cy - Math.cos(a) * r1)}
                x2={r3(cx + Math.sin(a) * r2)}
                y2={r3(cy - Math.cos(a) * r2)}
                stroke={hot ? 'rgb(var(--c-accent))' : 'rgb(var(--c-metal) / 0.6)'}
                strokeWidth="1.3"
              />
            )
          })}
          {/* needle */}
          <g className="vu-needle" style={{ transformOrigin: '48px 50px' }}>
            <line x1="48" y1="50" x2="48" y2="18" stroke="rgb(var(--c-ink))" strokeWidth="1.4" strokeLinecap="round" />
          </g>
          <circle cx="48" cy="50" r="2.5" fill="rgb(var(--c-metal))" />
        </svg>
      </span>
      <span className="silk text-center">{label}</span>
    </span>
  )
}
