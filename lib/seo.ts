import { Metadata } from 'next'
import { siteConfig } from '@/site.config'

export interface SEOProps {
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
}

export function generateSEO({
  title,
  description,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
}: SEOProps): Metadata {
  const siteTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const siteDescription = description || siteConfig.tagline
  const siteImage = image || '/og-base.png'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return {
    title: siteTitle,
    description: siteDescription,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: siteUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: siteImage,
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
      type,
      publishedTime,
      modifiedTime,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: [siteImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export function generateStructuredData(type: 'Person' | 'CreativeWork' | 'Article', data: any) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  }

  switch (type) {
    case 'Person':
      return {
        ...baseData,
        name: siteConfig.name,
        email: siteConfig.email,
        url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        sameAs: [
          siteConfig.socials.github,
          siteConfig.socials.linkedin,
        ],
        jobTitle: 'Software Engineer',
        worksFor: {
          '@type': 'Organization',
          name: 'Comerica Bank',
        },
        alumniOf: {
          '@type': 'Organization',
          name: 'Columbia University',
        },
      }
    
    case 'CreativeWork':
      return {
        ...baseData,
        name: data.title,
        description: data.subtitle || data.description,
        author: {
          '@type': 'Person',
          name: siteConfig.name,
        },
        datePublished: data.timeline || data.date,
        ...(data.repoUrl && { url: data.repoUrl }),
        ...(data.liveUrl && { url: data.liveUrl }),
      }
    
    case 'Article':
      return {
        ...baseData,
        headline: data.title,
        description: data.description,
        author: {
          '@type': 'Person',
          name: siteConfig.name,
        },
        datePublished: data.date,
        dateModified: data.date,
        ...(data.cover && { image: data.cover }),
        ...(data.tags && { keywords: data.tags.join(', ') }),
      }
    
    default:
      return baseData
  }
}
