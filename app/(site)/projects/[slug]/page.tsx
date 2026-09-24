import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProject, getProjects } from '@/lib/mdx'
import { generateSEO, generateStructuredData } from '@/lib/seo'
import { TechBadge } from '@/components/TechBadge'
import { MDXComponents } from '@/components/MDXComponents'
import { ArrowLeft, Github, ExternalLink } from 'lucide-react'
import { Metadata } from 'next'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = getProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: 'Project Not Found' }
  return generateSEO({
    title: project.frontmatter.title,
    description: project.frontmatter.subtitle,
    image: project.frontmatter.coverImage ?? undefined,
    type: 'article',
    tags: project.frontmatter.tags,
  })
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const { frontmatter, content } = project

  const meta = [
    { label: 'Timeline', value: frontmatter.timeline },
    { label: 'Role', value: frontmatter.role },
    {
      label: 'Team',
      value: `${frontmatter.teamSize} ${frontmatter.teamSize === 1 ? 'person' : 'people'}`,
    },
  ]

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(120%_100%_at_top_left,black,transparent_65%)]" />
        <div className="relative mx-auto max-w-4xl px-5 py-16 sm:px-8 md:py-20 lg:px-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Work
          </Link>

          <h1 className="mt-8 font-display text-4xl leading-[1.0] tracking-tight text-ink sm:text-6xl">
            {frontmatter.title}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
            {frontmatter.subtitle}
          </p>

          {/* Spec table */}
          <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
            {meta.map((m) => (
              <div key={m.label} className="bg-bg px-5 py-4">
                <dt className="font-mono text-[0.6rem] uppercase tracking-eyebrow text-accent">
                  {m.label}
                </dt>
                <dd className="mt-1.5 text-ink">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Cover */}
      {frontmatter.coverImage && (
        <section className="border-b border-line">
          <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:px-10">
            <div className="tick-corners relative aspect-video overflow-hidden border border-line">
              <Image
                src={frontmatter.coverImage}
                alt={`${frontmatter.title} cover`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Overview */}
      <section className="section-padding">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.6fr]">
          {/* Left rail */}
          <aside className="space-y-10 lg:sticky lg:top-24 lg:self-start">
            <div>
              <h2 className="eyebrow">Stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {frontmatter.stack.map((tech) => (
                  <TechBadge key={tech} text={tech} variant="accent" />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {frontmatter.repoUrl && (
                <a
                  href={frontmatter.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Github className="h-4 w-4" />
                  Source
                </a>
              )}
              {frontmatter.liveUrl && (
                <a
                  href={frontmatter.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live
                </a>
              )}
            </div>
          </aside>

          {/* Right content */}
          <div className="space-y-12">
            <div>
              <h2 className="eyebrow">Problem</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink/90">{frontmatter.problem}</p>
            </div>

            <div>
              <h2 className="eyebrow">Outcomes</h2>
              <ul className="mt-4 space-y-4">
                {frontmatter.outcomes.map((outcome, index) => (
                  <li key={index} className="flex gap-4 border-t border-line pt-4">
                    <span className="font-mono text-sm text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="leading-relaxed text-ink/90">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Case study body */}
      <section className="section-padding border-t border-line">
        <div className="mx-auto max-w-3xl">
          <MDXComponents content={content} />
        </div>
      </section>

      {/* Gallery */}
      {frontmatter.gallery && frontmatter.gallery.length > 0 && (
        <section className="section-padding border-t border-line">
          <div className="mx-auto max-w-6xl">
            <p className="eyebrow">Gallery</p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {frontmatter.gallery.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-video overflow-hidden border border-line"
                >
                  <Image
                    src={image}
                    alt={`${frontmatter.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData('CreativeWork', frontmatter)),
        }}
      />
    </div>
  )
}
