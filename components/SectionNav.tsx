'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'top', label: 'Intro' },
  { id: 'work', label: 'Selected work' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
]

/**
 * Fixed section indicator: one outlined dot per homepage section, filled
 * white when that section is the one in view. Dots are links, so they also
 * jump to their section (smooth-scroll handled by the page).
 */
export function SectionNav() {
  const [active, setActive] = useState('top')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the viewport centre that is intersecting.
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          const top = visible.reduce((a, b) =>
            Math.abs(a.boundingClientRect.top) < Math.abs(b.boundingClientRect.top) ? a : b,
          )
          setActive(top.target.id)
        }
      },
      // A section is "current" while it crosses the middle band of the viewport.
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
    >
      {sections.map(({ id, label }) => {
        const isActive = active === id
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            aria-current={isActive ? 'true' : undefined}
            className="group flex items-center gap-3"
          >
            <span className="translate-x-2 text-xs text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              {label}
            </span>
            <span
              className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                isActive
                  ? 'scale-110 border-ink bg-ink'
                  : 'border-muted/60 bg-transparent group-hover:border-ink'
              }`}
            />
          </a>
        )
      })}
    </nav>
  )
}
