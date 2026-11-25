'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { ProjectFrontmatter } from '@/lib/mdx'

/**
 * A project shown as a rack module: a labelled face with an internal patch
 * cable running IN → OUT that ignites when the module is hovered or focused.
 */
export function ProjectModule({
  project,
  index,
}: {
  project: ProjectFrontmatter
  index: number
}) {
  const [on, setOn] = useState(false)
  const id = String(index + 1).padStart(2, '0')
  const stroke = on ? 'var(--c-accent)' : 'var(--c-patch)'

  return (
    <Link
      href={`/projects/${project.slug}`}
      onPointerEnter={() => setOn(true)}
      onPointerLeave={() => setOn(false)}
      onFocus={() => setOn(true)}
      onBlur={() => setOn(false)}
      className="panel group block rounded-lg p-5 transition-colors duration-300 focus-visible:outline-none"
      style={on ? { borderColor: 'rgb(var(--c-accent) / 0.6)' } : undefined}
    >
      {/* module header */}
      <div className="flex items-center justify-between">
        <span className="silk silk-accent">mod {id}</span>
        <span className="relative inline-flex h-2 w-2 items-center justify-center" aria-hidden>
          {on && (
            <span
              className="pointer-events-none absolute -inset-1.5"
              style={{ background: 'radial-gradient(circle, rgb(var(--c-accent) / 0.55), transparent 70%)' }}
            />
          )}
          <span
            className="relative h-2 w-2 rounded-full transition-colors"
            style={{ backgroundColor: on ? 'rgb(var(--c-accent))' : 'rgb(var(--c-metal) / 0.4)' }}
          />
        </span>
      </div>

      {/* internal patch cable IN -> OUT */}
      <div className="mt-4">
        <svg viewBox="0 0 220 56" className="h-14 w-full" aria-hidden>
          {/* jacks */}
          {[16, 204].map((cx, i) => (
            <g key={i}>
              <circle cx={cx} cy="28" r="11" fill="rgb(var(--c-panel))" stroke="rgb(var(--c-line))" />
              <circle cx={cx} cy="28" r="5" fill="rgb(8 9 11)" />
              <circle
                cx={cx}
                cy="28"
                r="5"
                fill="none"
                stroke={`rgb(${stroke} / ${on ? 0.9 : 0.4})`}
                strokeWidth="1.4"
              />
            </g>
          ))}
          {/* cable */}
          <path d="M16,28 Q110,52 204,28" fill="none" stroke="rgb(20 22 26)" strokeWidth="5" strokeLinecap="round" />
          <path
            d="M16,28 Q110,52 204,28"
            fill="none"
            stroke={`rgb(${stroke} / ${on ? 0.5 : 0.28})`}
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* travelling signal */}
          <path
            d="M16,28 Q110,52 204,28"
            fill="none"
            stroke={`rgb(${stroke})`}
            strokeWidth={on ? 2.4 : 1.6}
            strokeLinecap="round"
            strokeDasharray="2 13"
            className="animate-signal-dash"
            style={{ opacity: on ? 1 : 0.55, filter: on ? `drop-shadow(0 0 4px rgb(${stroke} / 0.8))` : 'none' }}
          />
        </svg>
      </div>

      {/* title + role */}
      <h3 className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent">
        {project.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{project.subtitle}</p>

      {/* stack as patch labels */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </div>

      {/* footer */}
      <div className="mt-5 flex items-center justify-between border-t border-line pt-3">
        <span className="readout text-[0.7rem]">{project.timeline}</span>
        <span className="inline-flex items-center gap-1 font-mono text-[0.7rem] uppercase tracking-wider text-accent">
          patch
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}
