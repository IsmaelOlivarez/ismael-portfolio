import Link from 'next/link'
import { getProjects, getBlogPosts } from '@/lib/mdx'
import { skillsData } from '@/data/skills'
import { siteConfig } from '@/site.config'
import { PatchBayHero } from '@/components/patchbay/PatchBayHero'
import { ProjectModule } from '@/components/patchbay/ProjectModule'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = generateSEO({})

export default function HomePage() {
  const projects = getProjects().slice(0, 3)
  const blogPosts = getBlogPosts().slice(0, 2)

  return (
    <div className="studio">
      <PatchBayHero />

      {/* ============ SOURCES — selected work ============ */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            title="Selected Work"
            role="sources"
            readout={`${getProjects().length} modules online`}
            link={{ href: '/projects', label: 'All work' }}
          />
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectModule key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ SIGNAL CHAIN — toolkit ============ */}
      <section className="section-padding border-t border-line">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="Signal Chain" role="processing" readout="stack / routing" />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skillsData.map((category) => (
              <div key={category.name} className="panel rounded-lg p-5">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <span className="silk silk-accent">{category.name}</span>
                  <span className="h-2 w-2 rounded-full bg-accent/60" aria-hidden />
                </div>
                <ul>
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2.5 border-b border-line/60 py-2.5 text-[0.95rem] text-ink/90 last:border-0"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-patch" aria-hidden />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FIELD LOG — notes ============ */}
      <section className="section-padding border-t border-line">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            title="Field Log"
            role="monitor"
            readout="latest entries"
            link={{ href: '/blog', label: 'All notes' }}
          />
          <div className="panel mt-10 overflow-hidden rounded-lg">
            {blogPosts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group grid gap-3 p-6 transition-colors hover:bg-panel/60 md:grid-cols-[160px_1fr] md:gap-8 md:p-7 ${
                  i > 0 ? 'border-t border-line' : ''
                }`}
              >
                <span className="readout pt-1">{post.date}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent sm:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-muted">{post.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-wider text-accent">
                    Read
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OUTPUT — contact ============ */}
      <section className="section-padding border-t border-line">
        <div className="mx-auto max-w-6xl">
          <div className="panel brushed relative overflow-hidden rounded-lg p-8 sm:p-12 lg:p-16">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="font-display text-4xl font-semibold leading-[1.03] tracking-tight text-ink sm:text-5xl">
                  Let&apos;s patch in.
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                  I&apos;m open to full-time roles, collaborations, and genuinely hard technical
                  problems. The fastest route in is email.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link href="/contact" className="btn btn-primary">
                    Get in touch
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href={siteConfig.socials.email} className="btn btn-secondary">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* output jack cluster */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel">
                    <span className="h-4 w-4 rounded-full bg-bg ring-2 ring-accent/60" aria-hidden />
                    <span
                      className="absolute inset-0 rounded-full animate-led-breathe"
                      style={{ boxShadow: '0 0 14px 1px rgb(var(--c-accent) / 0.5)' }}
                      aria-hidden
                    />
                  </span>
                  <span className="silk">main out</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ---- Panel section header: heading with a side readout, no kicker ---- */
function SectionHeader({
  title,
  role,
  readout,
  link,
}: {
  title: string
  role: string
  readout: string
  link?: { href: string; label: string }
}) {
  return (
    <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
      <div className="flex items-baseline gap-4">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
        <span className="hidden items-center gap-2 sm:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          <span className="silk silk-accent">{role}</span>
        </span>
      </div>
      <div className="flex items-center gap-5">
        <span className="readout hidden md:inline">{readout}</span>
        {link && (
          <Link
            href={link.href}
            className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent"
          >
            {link.label}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
