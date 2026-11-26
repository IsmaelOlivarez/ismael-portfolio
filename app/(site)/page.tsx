import Link from 'next/link'
import { getProjects, getBlogPosts } from '@/lib/mdx'
import { skillsData } from '@/data/skills'
import { siteConfig } from '@/site.config'
import { Hero } from '@/components/Hero'
import { SectionNav } from '@/components/SectionNav'
import { SnapScope } from '@/components/SnapScope'
import { ProjectCard } from '@/components/ProjectCard'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = generateSEO({})

export default function HomePage() {
  const projects = getProjects().slice(0, 3)
  const blogPosts = getBlogPosts().slice(0, 2)

  return (
    <div>
      <SnapScope />
      <SectionNav />
      <Hero />

      {/* ===== Selected work ===== */}
      <section
        id="work"
        className="snap-section section-padding lg:flex lg:min-h-screen lg:flex-col lg:justify-center"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="Selected work" link={{ href: '/projects', label: 'All projects' }} />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Toolkit ===== */}
      <section
        id="toolkit"
        className="snap-section section-padding lg:flex lg:min-h-screen lg:flex-col lg:justify-center"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="Toolkit" />
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {skillsData.map((category) => (
              <div key={category.name}>
                <h3 className="label label-accent border-b border-line pb-3">{category.name}</h3>
                <ul className="mt-1">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="border-b border-line/70 py-2.5 text-[0.95rem] text-ink/90"
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

      {/* ===== Writing ===== */}
      <section
        id="writing"
        className="snap-section section-padding lg:flex lg:min-h-screen lg:flex-col lg:justify-center"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="Writing" link={{ href: '/blog', label: 'All notes' }} />
          <div className="mt-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid gap-3 border-t border-line py-8 transition-colors md:grid-cols-[180px_1fr] md:gap-10"
              >
                <div className="text-sm text-muted">{post.date}</div>
                <div>
                  <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">
                    {post.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">{post.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors group-hover:text-accent">
                    Read
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section
        id="contact"
        className="snap-section section-padding lg:flex lg:min-h-screen lg:flex-col lg:justify-center"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Let&apos;s build something worth shipping.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            I&apos;m open to full-time roles, collaborations, and genuinely hard technical problems.
            The fastest way to reach me is email.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn btn-primary">
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={siteConfig.socials.email} className="btn btn-secondary">
              {siteConfig.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ---- Minimal section header ---- */
function SectionHeader({
  title,
  link,
}: {
  title: string
  link?: { href: string; label: string }
}) {
  return (
    <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {link && (
        <Link
          href={link.href}
          className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
        >
          {link.label}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
