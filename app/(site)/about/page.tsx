import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/site.config'
import { timelineData } from '@/data/timeline'
import { skillsData } from '@/data/skills'
import { Timeline } from '@/components/Timeline'
import { SkillsMatrix } from '@/components/SkillsMatrix'
import { PageHeader } from '@/components/PageHeader'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = generateSEO({
  title: 'About',
  description:
    'Learn more about Ismael Olivarez, a CS student at Columbia University and SWE intern at Comerica Bank.',
})

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="About"
        lead="CS student at Columbia and 2× SWE intern at Comerica — building scalable backend services and thoughtful applications across web and mobile."
        spec="New York, NY"
      />

      {/* intro + portrait */}
      <section className="section-padding">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div className="max-w-[60ch] space-y-6 text-pretty text-lg leading-relaxed text-ink/90">
            <p>
              I&apos;m Ismael Olivarez, a CS student at Columbia University and current SWE intern at
              Comerica Bank. I build scalable backend services and thoughtful applications across
              mobile and web, with experience spanning Spring Boot, React / React Native, and AWS.
            </p>
            <p className="text-muted">
              Previously, I shipped projects like Timeline (a customizable social app) and Plant
              Resilient (a geospatial plant-compatibility tool) — the kind of systems work that has
              to hold up under real traffic.
            </p>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl border border-line lg:ml-auto lg:mr-0">
            {siteConfig.headshotPath ? (
              <Image
                src={siteConfig.headshotPath}
                alt={`${siteConfig.name} headshot`}
                fill
                sizes="20rem"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-surface">
                <span className="font-display text-6xl font-semibold text-ink/20">IO</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="section-padding">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 border-b border-line pb-5 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Education &amp; experience
          </h2>
          <Timeline items={timelineData} />
        </div>
      </section>

      {/* skills */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 border-b border-line pb-5 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Skills &amp; expertise
          </h2>
          <SkillsMatrix skills={skillsData} />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Let&apos;s work together.
          </h2>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={siteConfig.socials.email} className="btn btn-primary">
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              View Résumé
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
