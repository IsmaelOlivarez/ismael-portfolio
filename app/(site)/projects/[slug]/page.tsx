import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProject, getProjects } from '@/lib/mdx'
import { generateSEO, generateStructuredData } from '@/lib/seo'
import { TechBadge } from '@/components/TechBadge'
import { MDXComponents } from '@/components/MDXComponents'
import { ArrowLeft, Github, ExternalLink, Calendar, Users } from 'lucide-react'
import { Metadata } from 'next'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return generateSEO({
    title: project.frontmatter.title,
    description: project.frontmatter.subtitle,
    image: project.frontmatter.coverImage,
    type: 'article',
    tags: project.frontmatter.tags,
  })
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProject(slug)
  
  if (!project) {
    notFound()
  }

  const { frontmatter, content } = project

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/projects"
            className="inline-flex items-center text-accent hover:text-accent/80 mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>

          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-primary">
                {frontmatter.title}
              </h1>
              <p className="text-xl text-primary/70 leading-relaxed">
                {frontmatter.subtitle}
              </p>
            </div>

            {/* Project Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-b border-primary/10">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary/60" />
                <span className="text-primary/70">{frontmatter.timeline}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary/60" />
                <span className="text-primary/70">{frontmatter.teamSize} person{frontmatter.teamSize !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-primary/70">{frontmatter.role}</span>
              </div>
            </div>

            {/* Cover Image */}
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Image
                src={frontmatter.coverImage}
                alt={`${frontmatter.title} cover image`}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Stack */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {frontmatter.stack.map((tech) => (
                  <TechBadge key={tech} text={tech} variant="accent" />
                ))}
              </div>
            </div>

            {/* Problem Statement */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">The Problem</h3>
              <p className="text-primary/80 leading-relaxed">{frontmatter.problem}</p>
            </div>

            {/* Outcomes */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">Key Outcomes</h3>
              <ul className="space-y-2">
                {frontmatter.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-primary/80 leading-relaxed">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-6">
              {frontmatter.repoUrl && (
                <a
                  href={frontmatter.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center"
                >
                  <Github className="mr-2 h-5 w-5" />
                  View Source
                </a>
              )}
              {frontmatter.liveUrl && (
                <a
                  href={frontmatter.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  View Live
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="section-padding bg-primary/5">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none prose-primary">
            <MDXComponents content={content} />
          </div>
        </div>
      </section>

      {/* Gallery */}
      {frontmatter.gallery && frontmatter.gallery.length > 0 && (
        <section className="section-padding">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {frontmatter.gallery.map((image, index) => (
                <div key={index} className="relative aspect-video overflow-hidden rounded-xl">
                  <Image
                    src={image}
                    alt={`${frontmatter.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData('CreativeWork', frontmatter)),
        }}
      />
    </div>
  )
}
