'use client'

import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
import { Screw } from './patchbay/primitives'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const navigation = [
  { name: 'Work', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Notes', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Lock scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        {/* Brand plate */}
        <Link href="/" className="group flex items-center gap-3" aria-label="Home">
          <Screw className="hidden sm:block" />
          <span className="flex items-baseline gap-2">
            <span className="font-display text-base font-bold tracking-tight text-ink transition-colors group-hover:text-accent">
              Ismael&nbsp;Olivarez
            </span>
            <span className="hidden font-mono text-[0.7rem] uppercase tracking-eyebrow text-muted sm:inline">
              SWE
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-line transition-colors group-hover:bg-accent" aria-hidden />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 md:flex">
          <div className="h-5 w-px bg-line" />
          <ThemeToggle />
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.14em] text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors hover:decoration-accent"
          >
            Résumé
          </Link>
          <Screw />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded p-2 text-ink md:hidden"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-line bg-bg md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 border-b border-line py-4 font-display text-2xl font-semibold text-ink transition-colors hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="h-2 w-2 rounded-full bg-accent/70" aria-hidden />
                {item.name}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-6">
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-[0.14em] text-ink underline decoration-line underline-offset-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Résumé
              </Link>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
