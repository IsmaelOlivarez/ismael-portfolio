import Image from 'next/image'
import Link from 'next/link'
import { ProjectFrontmatter } from '@/lib/mdx'
import { TechBadge } from './TechBadge'
import { ArrowRight, Github, ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  project: ProjectFrontmatter
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="card group hover:shadow-lg transition-all duration-300">
      {/* Cover Image */}
      <div className="relative aspect-video mb-4 overflow-hidden rounded-xl">
        <Image
          src={project.coverImage}
          alt={`${project.title} cover image`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-primary/70 text-sm leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Role & Timeline */}
        <div className="flex items-center justify-between text-sm text-primary/60">
          <span>{project.role}</span>
          <span>{project.timeline}</span>
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <TechBadge key={tech} text={tech} />
          ))}
          {project.stack.length > 4 && (
            <span className="text-xs text-primary/50 px-2 py-1">
              +{project.stack.length - 4} more
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center text-accent hover:text-accent/80 font-medium transition-colors"
          >
            View case study
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          
          <div className="flex space-x-2">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-primary/60 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
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
                className="p-2 text-primary/60 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
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
