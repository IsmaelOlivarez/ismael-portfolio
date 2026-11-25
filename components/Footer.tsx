import Link from 'next/link'
import { siteConfig } from '@/site.config'
import { Screw } from './patchbay/primitives'
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
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-10">
        {/* rack rail */}
        <div className="panel panel-raised mb-10 flex items-center justify-between rounded-md px-4 py-2.5">
          <div className="flex items-center gap-3">
            <Screw />
            <span className="silk silk-ink">IO</span>
            <span className="silk text-muted/70">sys.portfolio</span>
          </div>
          <Screw />
        </div>

        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-sm">
            <p className="font-display text-2xl font-semibold text-ink">{siteConfig.name}</p>
            <p className="mt-3 leading-relaxed text-muted">
              Building scalable backend systems &amp; thoughtful applications.
            </p>
          </div>

          <div className="flex gap-14">
            <nav className="flex flex-col gap-3">
              <span className="silk mb-1">Routing</span>
              {nav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
                >
                  <span className="h-1 w-1 rounded-full bg-line" aria-hidden />
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-3">
              <span className="silk mb-1">Elsewhere</span>
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

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 sm:flex-row sm:items-center">
          <span className="readout">© {year} {siteConfig.name}</span>
          <span className="readout">built with next.js · tailwind · motion</span>
        </div>
      </div>
    </footer>
  )
}
