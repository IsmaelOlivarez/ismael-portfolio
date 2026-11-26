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

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="font-display text-base font-semibold tracking-tight text-ink transition-colors hover:text-accent"
          aria-label="Home"
        >
          Ismael Olivarez
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors hover:decoration-accent"
          >
            Résumé
          </Link>
        </div>

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

      {isMenuOpen && (
        <div className="border-t border-line bg-bg md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="border-b border-line py-4 font-display text-2xl font-semibold text-ink transition-colors hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-6">
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink underline decoration-line underline-offset-4"
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
