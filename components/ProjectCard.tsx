import Image from 'next/image'
import Link from 'next/link'
import { ProjectFrontmatter } from '@/lib/mdx'
import { TechBadge } from './TechBadge'
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  project: ProjectFrontmatter
  index?: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const href = `/projects/${project.slug}`

  return (
    <article className="card group flex flex-col overflow-hidden hover:border-accent/50">
      {/* Cover — real image, or an editorial typographic panel when missing */}
      <Link
        href={href}
        className="relative block aspect-[16/10] overflow-hidden border-b border-line"
        aria-label={`${project.title} case study`}
      >
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={`${project.title} cover`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="bg-grid flex h-full w-full flex-col items-center justify-center bg-surface px-6 text-center">
            <span className="font-display text-3xl leading-tight text-ink/80 transition-colors group-hover:text-accent">
              {project.title}
            </span>
            <span className="mt-2 font-mono text-[0.62rem] uppercase tracking-eyebrow text-muted">
              {project.slug}
            </span>
          </div>
        )}
        {typeof index === 'number' && (
          <span className="absolute left-4 top-4 font-mono text-xs text-accent mix-blend-difference">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between font-mono text-[0.66rem] uppercase tracking-wider text-muted">
          <span>{project.role}</span>
          <span>{project.timeline}</span>
        </div>

        <div>
          <h3 className="font-display text-2xl leading-snug text-ink transition-colors group-hover:text-accent">
            <Link href={href}>{project.title}</Link>
          </h3>
          <p className="mt-2 leading-relaxed text-muted">{project.subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <TechBadge key={tech} text={tech} />
          ))}
          {project.stack.length > 4 && (
            <span className="inline-flex items-center px-1 font-mono text-[0.66rem] text-muted">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-ink transition-colors hover:text-accent"
          >
            Case study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <div className="flex items-center gap-1">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-muted transition-colors hover:text-accent"
                aria-label="View source code"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-muted transition-colors hover:text-accent"
                aria-label="View live project"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
