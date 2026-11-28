import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/site.config'
import { ArrowDown, ArrowRight, Github, Linkedin, Mail } from 'lucide-react'

const [heroMeta, heroLead] = siteConfig.tagline.split('\n\n').map((s) => s.trim())
const metaPieces = heroMeta.split('•').map((p) => p.trim())

const socials = [
  { href: siteConfig.socials.github, icon: Github, label: 'GitHub' },
  { href: siteConfig.socials.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: siteConfig.socials.email, icon: Mail, label: 'Email' },
]

export function Hero() {
  return (
    <section id="top" className="snap-section relative">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="grid min-h-[calc(100svh-4rem)] items-center gap-14 py-16 lg:grid-cols-12 lg:gap-10">
          {/* ---- identity ---- */}
          <div className="lg:col-span-7">
            <h1 className="animate-rise font-display text-[clamp(2.9rem,8.5vw,5.75rem)] font-semibold leading-[0.92] tracking-tight text-ink">
              Ismael
              <br />
              Olivarez
            </h1>

            <p
              className="animate-rise mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted sm:text-xl"
              style={{ animationDelay: '80ms' }}
            >
              {heroLead}
            </p>

            <div
              className="animate-rise mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted"
              style={{ animationDelay: '140ms' }}
            >
              {metaPieces.map((piece, i) => (
                <span key={i} className="inline-flex items-center gap-3">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />}
                  {piece}
                </span>
              ))}
            </div>

            <div
              className="animate-rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: '200ms' }}
            >
              {/* Saved aside — previously navigated to the full projects page:
              <Link href="/projects" className="btn btn-primary">
                View Work
                <ArrowRight className="h-4 w-4" />
              </Link>
              */}
              <a href="#work" className="btn btn-primary">
                View Work
                <ArrowDown className="h-4 w-4" />
              </a>
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Download Résumé
              </Link>
            </div>

            <div
              className="animate-fade-in mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
              style={{ animationDelay: '280ms' }}
            >
              <div className="flex items-center gap-1">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="rounded-md p-2 text-muted transition-colors hover:text-ink"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
              <span className="inline-flex items-center gap-2.5 text-sm text-muted">
                <span className="relative flex h-1.5 w-1.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Open to SWE roles
              </span>
            </div>
          </div>

          {/* ---- portrait ---- */}
          <div className="lg:col-span-5">
            <div
              className="animate-fade-in relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-line lg:ml-auto lg:mr-0"
              style={{ animationDelay: '120ms' }}
            >
              {siteConfig.headshotPath ? (
                <Image
                  src={siteConfig.headshotPath}
                  alt={`${siteConfig.name} headshot`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 22rem, 24rem"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-surface">
                  <span className="font-display text-6xl font-semibold text-ink/20">IO</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
