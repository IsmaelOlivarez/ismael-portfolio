import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ProjectFrontmatter } from '@/lib/mdx'

/** Minimal project card: a quiet hairline that warms on hover. */
export function ProjectCard({ project }: { project: ProjectFrontmatter; index?: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card group flex h-full flex-col p-6 hover:border-ink/25 focus-visible:outline-none"
    >
      <div>
        <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{project.subtitle}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-5">
          <span className="text-xs text-muted">{project.timeline}</span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors group-hover:text-accent">
            View
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
