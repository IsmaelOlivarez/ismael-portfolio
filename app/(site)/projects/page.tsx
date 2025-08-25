import { getProjects } from '@/lib/mdx'
import { ProjectCard } from '@/components/ProjectCard'
import { Filters } from '@/components/Filters'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = generateSEO({
  title: 'Projects',
  description: 'A collection of my projects building scalable backend systems and thoughtful applications.',
})

export default function ProjectsPage() {
  const projects = getProjects()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-padding">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
              Projects
            </h1>
            <p className="text-xl text-primary/70 leading-relaxed">
              A collection of projects showcasing my work on scalable backend systems, 
              mobile applications, and thoughtful user experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Projects */}
      <section className="section-padding bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          <Filters projects={projects} />
        </div>
      </section>
    </div>
  )
}
