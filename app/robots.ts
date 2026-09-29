import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'

/** Dynamic robots.txt so the sitemap URL always tracks the deploy origin. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
