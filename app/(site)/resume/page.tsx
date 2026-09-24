import Link from 'next/link'
import { siteConfig } from '@/site.config'
import { timelineData } from '@/data/timeline'
import { skillsData } from '@/data/skills'
import { PageHeader } from '@/components/PageHeader'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'
import { Download } from 'lucide-react'

export const metadata: Metadata = generateSEO({
  title: 'Resume',
  description: 'Professional resume and experience of Ismael Olivarez.',
})

const projects = [
  {
    title: 'Timeline',
    body: 'Mobile social networking app with customizable post creation and a horizontal feed. Built with React Native, Spring Boot, PostgreSQL, AWS, Docker, and Kubernetes.',
  },
  {
    title: 'Plant Resilient',
    body: 'Geospatial plant-compatibility tool using hardiness zones, with a 1,000+ species dataset and real-time recommendations.',
  },
  {
    title: 'Superchat',
    body: 'Real-time web chat built with Next.js, TypeScript, and Firebase — authentication, live messaging, and a responsive UI.',
  },
]

function EntryList({ type }: { type: 'experience' | 'education' }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {timelineData
        .filter((item) => item.type === type)
        .map((item) => (
          <div key={item.id} className="py-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h4 className="font-display text-xl text-ink">{item.title}</h4>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                {item.period}
              </span>
            </div>
            <p className="mt-1 text-accent">{item.subtitle}</p>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">{item.description}</p>
          </div>
        ))}
    </div>
  )
}

function Section({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-6 flex items-baseline gap-3 border-b border-line pb-3">
        <span className="font-mono text-xs text-accent">{index}</span>
        <h3 className="font-mono text-xs uppercase tracking-eyebrow text-muted">{title}</h3>
      </div>
      {children}
    </section>
  )
}

export default function ResumePage() {
  return (
    <div>
      <PageHeader index="E" kicker="Document" title="Résumé" spec="PDF available" />

      <section className="section-padding">
        <div className="mx-auto max-w-3xl space-y-14">
          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
            <Link href="/contact" className="btn-secondary">
              Get in touch
            </Link>
          </div>

          <Section index="00" title="Experience">
            <EntryList type="experience" />
          </Section>

          <Section index="01" title="Education">
            <EntryList type="education" />
          </Section>

          <Section index="02" title="Technical Skills">
            <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
              {skillsData.map((category) => (
                <div key={category.name}>
                  <h4 className="font-mono text-[0.62rem] uppercase tracking-eyebrow text-accent">
                    {category.name}
                  </h4>
                  <p className="mt-2 leading-relaxed text-ink/90">
                    {category.skills.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section index="03" title="Selected Projects">
            <div className="divide-y divide-line border-y border-line">
              {projects.map((p) => (
                <div key={p.title} className="py-6">
                  <h4 className="font-display text-xl text-ink">{p.title}</h4>
                  <p className="mt-2 max-w-2xl leading-relaxed text-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>
    </div>
  )
}
