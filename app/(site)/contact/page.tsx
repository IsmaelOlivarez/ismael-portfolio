import { siteConfig } from '@/site.config'
import { ContactForm } from '@/components/ContactForm'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'
import { Mail, Github, Linkedin, MapPin } from 'lucide-react'

export const metadata: Metadata = generateSEO({
  title: 'Contact',
  description: 'Get in touch with Ismael Olivarez for opportunities, collaborations, or just to say hello.',
})

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-primary/70 leading-relaxed max-w-2xl mx-auto">
              I'm always interested in new opportunities, collaborations, and interesting projects. 
              Feel free to reach out if you'd like to connect.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">
                Send a Message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Contact Information
                </h2>
                <p className="text-primary/80 leading-relaxed mb-6">
                  The best way to reach me is through email or LinkedIn. 
                  I typically respond within 24 hours during weekdays.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-accent" />
                  <a
                    href={siteConfig.socials.email}
                    className="text-primary hover:text-accent transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Github className="h-5 w-5 text-accent" />
                  <a
                    href={siteConfig.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent transition-colors"
                  >
                    github.com/IsmaelOlivarez
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Linkedin className="h-5 w-5 text-accent" />
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent transition-colors"
                  >
                    linkedin.com/in/ismael-olivarez-9a477b264
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span className="text-primary">
                    New York, NY
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-primary/10">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  What I'm Looking For
                </h3>
                <ul className="space-y-2 text-primary/80">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>Full-time software engineering opportunities</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>Open source contributions and collaborations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>Interesting technical projects and challenges</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>Networking with fellow developers and engineers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
