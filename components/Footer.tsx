import Link from 'next/link'
import { siteConfig } from '@/site.config'
import { Github, Linkedin, Mail, Download } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-primary/10 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">{siteConfig.name}</h3>
            <p className="text-sm text-primary/70 max-w-xs">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/projects" 
                  className="text-sm text-primary/70 hover:text-accent transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-sm text-primary/70 hover:text-accent transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-sm text-primary/70 hover:text-accent transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-sm text-primary/70 hover:text-accent transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Resume */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Connect</h4>
            <div className="flex space-x-4">
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/70 hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/70 hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.socials.email}
                className="text-primary/70 hover:text-accent transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-sm text-primary/70 hover:text-accent transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download Resume</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-primary/60">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <p className="text-sm text-primary/60">
              Built with Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
