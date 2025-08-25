import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/site.config'
import { getProjects } from '@/lib/mdx'
import { getBlogPosts } from '@/lib/mdx'
import { skillsData } from '@/data/skills'
import { ProjectCard } from '@/components/ProjectCard'
import { TechBadge } from '@/components/TechBadge'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = generateSEO({})

export default function HomePage() {
  const projects = getProjects().slice(0, 3) // Show 3 featured projects
  const blogPosts = getBlogPosts().slice(0, 2) // Show 2 latest posts

  return (
    <div className="min-h-screen">
      {/* Top Spacing */}
      <div className="pt-8 sm:pt-16 lg:pt-24 xl:pt-32"></div>
      
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                  {siteConfig.name}
                </h1>
                <div className="text-xl sm:text-2xl text-primary/80 leading-tight max-w-2xl">
                  {siteConfig.tagline.split('\n').map((line, index) => (
                    <div key={index} className={index > 0 ? 'mt-[16px]' : ''}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/projects" className="btn-primary inline-flex items-center justify-center">
                  View Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link href="/resume.pdf" className="btn-secondary inline-flex items-center justify-center" target="_blank" rel="noopener noreferrer">
                  Download Resume
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/70 hover:text-accent transition-colors p-2 rounded-lg hover:bg-primary/10"
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/70 hover:text-accent transition-colors p-2 rounded-lg hover:bg-primary/10"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href={siteConfig.socials.email}
                  className="text-primary/70 hover:text-accent transition-colors p-2 rounded-lg hover:bg-primary/10"
                  aria-label="Email"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Right: Headshot or Avatar */}
            <div className="flex justify-center lg:justify-end">
              {siteConfig.headshotPath ? (
                <div className="w-96 h-96 rounded-2xl shadow-lg overflow-hidden">
                  <Image
                    src={siteConfig.headshotPath}
                    alt={`${siteConfig.name} headshot`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="w-80 h-80 bg-gradient-to-br from-accent to-accent/80 rounded-2xl shadow-lg flex items-center justify-center">
                  <span className="text-6xl font-bold text-white">IO</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-primary/70 max-w-2xl mx-auto">
              A selection of my recent work building scalable systems and thoughtful applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/projects" className="btn-secondary inline-flex items-center">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills & Tech */}
      <section className="section-padding">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              Skills & Technologies
            </h2>
            <p className="text-lg text-primary/70 max-w-2xl mx-auto">
              Technologies and tools I use to build robust, scalable applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillsData.map((category) => (
              <div key={category.name} className="text-center">
                <h3 className="text-lg font-semibold text-primary mb-4">{category.name}</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {category.skills.map((skill) => (
                    <TechBadge key={skill} text={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Notes */}
      <section className="section-padding bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              Latest Notes
            </h2>
            <p className="text-lg text-primary/70 max-w-2xl mx-auto">
              Thoughts on technology, development, and building better software
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="card">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary">
                    <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-primary/70">{post.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-primary/60">{post.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/blog" className="btn-secondary inline-flex items-center">
              Read More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
            Let's Connect
          </h2>
          <p className="text-lg text-primary/70 mb-8 max-w-2xl mx-auto">
            I'm always interested in new opportunities and collaborations. 
            Whether you have a project in mind or just want to chat, feel free to reach out.
          </p>
          <Link href="/contact" className="btn-primary inline-flex items-center">
            Get In Touch
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
