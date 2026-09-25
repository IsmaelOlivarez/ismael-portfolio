import { getProjects } from '@/lib/mdx'
import { Filters } from '@/components/Filters'
import { PageHeader } from '@/components/PageHeader'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = generateSEO({
  title: 'Projects',
  description: 'A collection of my projects building scalable backend systems and thoughtful applications.',
})

export default function ProjectsPage() {
  const projects = getProjects()

  return (
    <div>
      <PageHeader
        index="A"
        kicker="Index"
        title="Work"
        lead="Projects across scalable backend systems, mobile applications, and thoughtful user experiences."
        spec={`${projects.length} projects on file`}
      />

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <Filters projects={projects} />
        </div>
      </section>
    </div>
  )
}
