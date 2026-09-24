import { siteConfig } from '@/site.config'
import { ContactForm } from '@/components/ContactForm'
import { PageHeader } from '@/components/PageHeader'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'
import { Mail, Github, Linkedin, MapPin } from 'lucide-react'

export const metadata: Metadata = generateSEO({
  title: 'Contact',
  description:
    'Get in touch with Ismael Olivarez for opportunities, collaborations, or just to say hello.',
})

export default function ContactPage() {
  const details = [
    { icon: Mail, label: 'Email', value: siteConfig.email, href: siteConfig.socials.email },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/IsmaelOlivarez',
      href: siteConfig.socials.github,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'in/ismael-olivarez',
      href: siteConfig.socials.linkedin,
    },
    { icon: MapPin, label: 'Location', value: 'New York, NY', href: undefined },
  ]

  const looking = [
    'Full-time software engineering roles',
    'Open-source contributions & collaborations',
    'Interesting technical problems',
  ]

  return (
    <div>
      <PageHeader
        index="D"
        kicker="Channel"
        title="Get in touch"
        lead="Open to full-time roles, collaborations, and interesting technical problems. I usually reply within a day."
        spec="Response < 24h"
      />

      <section className="section-padding">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.3fr_1fr]">
          {/* Form */}
          <div>
            <p className="eyebrow">Send a message</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-12">
            <div>
              <p className="eyebrow">Direct</p>
              <dl className="mt-6 divide-y divide-line border-y border-line">
                {details.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 py-4">
                    <Icon className="h-4 w-4 shrink-0 text-accent" />
                    <dt className="w-24 shrink-0 font-mono text-[0.62rem] uppercase tracking-eyebrow text-muted">
                      {label}
                    </dt>
                    <dd className="min-w-0 truncate text-ink">
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-accent"
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <p className="eyebrow">Looking for</p>
              <ul className="mt-6 space-y-3">
                {looking.map((item) => (
                  <li key={item} className="flex items-start gap-3 leading-relaxed text-ink/90">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
