import Link from 'next/link'
import { siteConfig } from '@/site.config'
import { timelineData } from '@/data/timeline'
import { skillsData } from '@/data/skills'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'
import { Download, Mail, Github, Linkedin, MapPin, Phone } from 'lucide-react'

export const metadata: Metadata = generateSEO({
  title: 'Resume',
  description: 'Professional resume and experience of Ismael Olivarez.',
})

export default function ResumePage() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
              Resume
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center"
              >
                <Download className="mr-2 h-5 w-5" />
                Download PDF
              </a>
              <Link href="/contact" className="btn-secondary inline-flex items-center justify-center">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Content */}
      <section className="section-padding bg-primary/5">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white dark:bg-primary/5 border border-primary/10 rounded-2xl p-8 shadow-lg">
            {/* Contact Header */}
            <div className="text-center mb-8 pb-8 border-b border-primary/10">
              <h2 className="text-3xl font-bold text-primary mb-4">
                {siteConfig.name}
              </h2>
              <p className="text-lg text-primary/70 mb-6 max-w-2xl mx-auto">
                {siteConfig.tagline}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="h-4 w-4 text-accent" />
                  <a href={siteConfig.socials.email} className="text-primary hover:text-accent">
                    {siteConfig.email}
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Github className="h-4 w-4 text-accent" />
                  <a 
                    href={siteConfig.socials.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent"
                  >
                    github.com/IsmaelOlivarez
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Linkedin className="h-4 w-4 text-accent" />
                  <a 
                    href={siteConfig.socials.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent"
                  >
                    linkedin.com/in/ismael-olivarez-9a477b264
                  </a>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-primary mb-6 pb-2 border-b border-primary/10">
                Professional Experience
              </h3>
              <div className="space-y-6">
                {timelineData
                  .filter(item => item.type === 'experience')
                  .map((item) => (
                    <div key={item.id} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h4 className="text-lg font-semibold text-primary">
                          {item.title}
                        </h4>
                        <span className="text-sm text-primary/60 font-medium">
                          {item.period}
                        </span>
                      </div>
                      <h5 className="text-accent font-medium">
                        {item.subtitle}
                      </h5>
                      <p className="text-primary/80 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-primary mb-6 pb-2 border-b border-primary/10">
                Education
              </h3>
              <div className="space-y-6">
                {timelineData
                  .filter(item => item.type === 'education')
                  .map((item) => (
                    <div key={item.id} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h4 className="text-lg font-semibold text-primary">
                          {item.title}
                        </h4>
                        <span className="text-sm text-primary/60 font-medium">
                          {item.period}
                        </span>
                      </div>
                      <h5 className="text-accent font-medium">
                        {item.subtitle}
                      </h5>
                      <p className="text-primary/80 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-primary mb-6 pb-2 border-b border-primary/10">
                Technical Skills
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillsData.map((category) => (
                  <div key={category.name} className="space-y-3">
                    <h4 className="text-lg font-semibold text-primary">
                      {category.name}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6 pb-2 border-b border-primary/10">
                Selected Projects
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-primary">
                    Timeline
                  </h4>
                  <p className="text-primary/80">
                    Mobile social networking app with customizable post creation and horizontal feed. 
                    Built with React Native, Spring Boot, PostgreSQL, AWS, Docker, and Kubernetes.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-primary">
                    Plant Resilient
                  </h4>
                  <p className="text-primary/80">
                    Geospatial plant-compatibility tool using hardiness zones. 
                    Features 1,000+ species dataset with real-time recommendations.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-primary">
                    Superchat
                  </h4>
                  <p className="text-primary/80">
                    Real-time web chat application built with Next.js, TypeScript, and Firebase. 
                    Includes authentication, real-time messaging, and responsive UI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
