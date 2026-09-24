import Link from 'next/link'
import { siteConfig } from '@/site.config'
import { Github, Linkedin, Mail } from 'lucide-react'

const nav = [
  { name: 'Work', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Notes', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

const socials = [
  { href: siteConfig.socials.github, icon: Github, label: 'GitHub' },
  { href: siteConfig.socials.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: siteConfig.socials.email, icon: Mail, label: 'Email' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-sm">
            <p className="font-display text-2xl text-ink">{siteConfig.name}</p>
            <p className="mt-3 leading-relaxed text-muted">
              Building scalable backend systems &amp; thoughtful applications.
            </p>
          </div>

          <div className="flex gap-16">
            <nav className="flex flex-col gap-3">
              <span className="eyebrow mb-1">Menu</span>
              {nav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted transition-colors hover:text-accent"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-3">
              <span className="eyebrow mb-1">Elsewhere</span>
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 font-mono text-xs uppercase tracking-wider text-muted sm:flex-row sm:items-center">
          <span>© {year} {siteConfig.name}</span>
          <span>Built with Next.js &amp; Tailwind</span>
        </div>
      </div>
    </footer>
  )
}
