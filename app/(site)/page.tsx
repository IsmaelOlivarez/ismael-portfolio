import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/site.config'
import { getProjects, getBlogPosts } from '@/lib/mdx'
import { skillsData } from '@/data/skills'
import { ProjectCard } from '@/components/ProjectCard'
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = generateSEO({})

export default function HomePage() {
  const projects = getProjects().slice(0, 3)
  const blogPosts = getBlogPosts().slice(0, 2)
  const [heroMeta, heroLead] = siteConfig.tagline.split('\n\n').map((s) => s.trim())

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(120%_100%_at_top_left,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          {/* Spec strip */}
          <div className="flex items-center justify-between gap-4 border-b border-line py-3 font-mono text-[0.6rem] uppercase tracking-eyebrow text-muted">
            <span className="text-ink">
              IO<span className="text-muted"> — sys.portfolio</span>
            </span>
            <span className="hidden md:inline">40.7128°N&nbsp;&nbsp;74.0060°W</span>
            <span>Est. 2025</span>
          </div>

          {/* Columns */}
          <div className="flex flex-col gap-14 py-16 md:py-24 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Left */}
          <div className="w-full min-w-0 lg:col-span-7">
            <p className="eyebrow animate-fade-in">Portfolio — 2025</p>
            <h1 className="animate-rise mt-6 font-display text-[3.25rem] font-semibold leading-[0.95] tracking-tight text-ink sm:text-7xl">
              {siteConfig.name}
            </h1>
            <p
              className="animate-rise mt-6 max-w-xl text-pretty text-xl leading-relaxed text-muted sm:text-2xl"
              style={{ animationDelay: '80ms' }}
            >
              {heroLead}
            </p>

            <div
              className="animate-rise mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-wider text-muted"
              style={{ animationDelay: '140ms' }}
            >
              {heroMeta.split('•').map((piece, i) => (
                <span key={i} className="inline-flex items-center gap-3">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />}
                  {piece.trim()}
                </span>
              ))}
            </div>

            <div
              className="animate-rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: '200ms' }}
            >
              <Link href="/projects" className="btn-primary">
                View Work
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Download Résumé
              </Link>
            </div>

            <div
              className="animate-fade-in mt-8 flex items-center gap-1"
              style={{ animationDelay: '260ms' }}
            >
              {[
                { href: siteConfig.socials.github, icon: Github, label: 'GitHub' },
                { href: siteConfig.socials.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: siteConfig.socials.email, icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-md p-2 text-muted transition-colors hover:text-accent"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — framed headshot */}
          <div className="w-full min-w-0 lg:col-span-5">
            <div className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:ml-auto lg:mr-0">
              {/* blueprint dimension line */}
              <span className="absolute -left-3 top-0 hidden h-full items-center lg:flex" aria-hidden>
                <span className="h-full w-px bg-line" />
              </span>
              <div className="tick-corners relative aspect-[4/5] overflow-hidden border border-line bg-surface">
                {siteConfig.headshotPath ? (
                  <Image
                    src={siteConfig.headshotPath}
                    alt={`${siteConfig.name} headshot`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 20rem, 24rem"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-display text-6xl text-ink/30">IO</span>
                  </div>
                )}
                {/* corner label */}
                <span className="absolute left-2 top-2 font-mono text-[0.55rem] uppercase tracking-eyebrow text-ink/70 mix-blend-difference">
                  fig.01
                </span>
              </div>
              <span className="mt-3 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-eyebrow text-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Open to SWE roles — 2026
              </span>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* ============ SELECTED WORK ============ */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="01"
            eyebrow="Selected Work"
            title="Featured Projects"
            link={{ href: '/projects', label: 'All work' }}
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ CAPABILITIES ============ */}
      <section className="section-padding border-t border-line">
        <div className="mx-auto max-w-6xl">
          <SectionHeader index="02" eyebrow="Toolkit" title="Skills & Technologies" />
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {skillsData.map((category) => (
              <div key={category.name}>
                <h3 className="border-b border-line pb-3 font-mono text-xs uppercase tracking-eyebrow text-accent">
                  {category.name}
                </h3>
                <ul>
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="border-b border-line py-2.5 text-lg text-ink/90"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NOTES ============ */}
      <section className="section-padding border-t border-line">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="03"
            eyebrow="Writing"
            title="Latest Notes"
            link={{ href: '/blog', label: 'All notes' }}
          />
          <div className="mt-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid gap-3 border-t border-line py-8 md:grid-cols-[180px_1fr] md:gap-10"
              >
                <div className="font-mono text-xs uppercase tracking-wider text-muted">
                  {post.date}
                </div>
                <div>
                  <h3 className="font-display text-2xl leading-snug text-ink transition-colors group-hover:text-accent sm:text-3xl">
                    {post.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                    {post.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent">
                    Read
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT CTA ============ */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32 lg:px-10">
          <p className="eyebrow">[04] Contact</p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Let&apos;s build something worth shipping.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            I&apos;m open to full-time roles, collaborations, and interesting technical problems.
            The fastest way to reach me is email.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={siteConfig.socials.email} className="btn-secondary">
              {siteConfig.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ---- Local editorial section header ---- */
function SectionHeader({
  index,
  eyebrow,
  title,
  link,
}: {
  index: string
  eyebrow: string
  title: string
  link?: { href: string; label: string }
}) {
  return (
    <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
      <div>
        <p className="eyebrow">
          [{index}] {eyebrow}
        </p>
        <h2 className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="hidden shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent sm:inline-flex"
        >
          {link.label}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
