import Image from 'next/image'
import { siteConfig } from '@/site.config'
import { timelineData } from '@/data/timeline'
import { skillsData } from '@/data/skills'
import { Timeline } from '@/components/Timeline'
import { SkillsMatrix } from '@/components/SkillsMatrix'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = generateSEO({
  title: 'About',
  description: 'Learn more about Ismael Olivarez, a CS student at Columbia University and SWE intern at Comerica Bank.',
})

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
              About Me
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-primary/80 leading-relaxed mb-6">
                I'm Ismael Olivarez, a CS student at Columbia University and current SWE intern at Comerica Bank. 
                I build scalable backend services and thoughtful applications across mobile and web, with experience 
                spanning Spring Boot, React/React Native, and AWS.
              </p>
              <p className="text-lg text-primary/80 leading-relaxed">
                Previously, I shipped projects like Timeline (a customizable social app) and Plant Resilient 
                (a geospatial plant-compatibility tool).
              </p>
            </div>
          </div>

          {/* Headshot or Avatar */}
          <div className="flex justify-center mb-12">
            {siteConfig.headshotPath ? (
              <Image
                src={siteConfig.headshotPath}
                alt={`${siteConfig.name} headshot`}
                width={300}
                height={300}
                className="rounded-2xl shadow-lg"
              />
            ) : (
              <div className="w-80 h-80 bg-gradient-to-br from-accent to-accent/80 rounded-2xl shadow-lg flex items-center justify-center">
                <span className="text-5xl font-bold text-white">IO</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-primary/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Education & Experience
            </h2>
            <p className="text-lg text-primary/70 max-w-2xl mx-auto">
              My journey in computer science and software engineering
            </p>
          </div>
          <Timeline items={timelineData} />
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="section-padding">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Skills & Expertise
            </h2>
            <p className="text-lg text-primary/70 max-w-2xl mx-auto">
              Technologies and tools I use to build robust, scalable applications
            </p>
          </div>
          <SkillsMatrix skills={skillsData} />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Let's Work Together
          </h2>
          <p className="text-lg text-primary/70 mb-8 max-w-2xl mx-auto">
            I'm always interested in new opportunities, collaborations, and interesting projects. 
            Feel free to reach out if you'd like to connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={siteConfig.socials.email}
              className="btn-primary inline-flex items-center justify-center"
            >
              Get In Touch
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center justify-center"
            >
              View Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
