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
        index="B"
        kicker="Profile"
        title="About"
        lead="CS student at Columbia and 2x SWE intern at Comerica — building scalable backend services and thoughtful applications across web and mobile."
        spec="New York, NY"
      />

      {/* Intro + portrait */}
      <section className="section-padding">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div className="space-y-6 text-lg leading-relaxed text-ink/90">
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

          <div className="relative mx-auto w-full max-w-xs lg:ml-auto lg:mr-0">
            <div className="tick-corners relative aspect-[4/5] overflow-hidden border border-line bg-surface">
              {siteConfig.headshotPath ? (
                <Image
                  src={siteConfig.headshotPath}
                  alt={`${siteConfig.name} headshot`}
                  fill
                  sizes="20rem"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-display text-6xl text-ink/30">IO</span>
                </div>
              )}
              <span className="absolute left-2 top-2 font-mono text-[0.55rem] uppercase tracking-eyebrow text-ink/70 mix-blend-difference">
                fig.02
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding border-t border-line">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 border-b border-line pb-6">
            <p className="eyebrow">[01] Trajectory</p>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl">
              Education &amp; Experience
            </h2>
          </div>
          <Timeline items={timelineData} />
        </div>
      </section>

      {/* Skills */}
      <section className="section-padding border-t border-line">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 border-b border-line pb-6">
            <p className="eyebrow">[02] Toolkit</p>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl">
              Skills &amp; Expertise
            </h2>
          </div>
          <SkillsMatrix skills={skillsData} />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-28 lg:px-10">
          <p className="eyebrow">[03] Contact</p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Let&apos;s work together.
          </h2>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={siteConfig.socials.email} className="btn-primary">
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View Résumé
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
