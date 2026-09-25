'use client'

import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
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
    <header className="sticky top-0 z-40 w-full border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Wordmark */}
        <Link href="/" className="group flex items-baseline gap-2" aria-label="Home">
          <span className="font-display text-lg tracking-tight text-ink transition-colors group-hover:text-accent">
            Ismael Olivarez
          </span>
          <span className="hidden font-mono text-[0.6rem] uppercase tracking-eyebrow text-muted sm:inline">
            SWE
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
            >
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
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-ink md:hidden"
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
            {navigation.map((item, i) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-baseline gap-3 border-b border-line py-4 font-display text-2xl text-ink transition-colors hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
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
