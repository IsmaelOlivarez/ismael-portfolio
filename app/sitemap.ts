import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'
import { getProjects, getBlogPosts } from '@/lib/mdx'

/**
 * Dynamic sitemap: static routes plus every project and blog post.
 * Regenerated at build time from the MDX content directory.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: '/', changeFrequency: 'monthly', priority: 1 },
      { url: '/about', changeFrequency: 'yearly', priority: 0.7 },
      { url: '/projects', changeFrequency: 'monthly', priority: 0.9 },
      { url: '/blog', changeFrequency: 'weekly', priority: 0.8 },
      { url: '/resume', changeFrequency: 'yearly', priority: 0.6 },
      { url: '/contact', changeFrequency: 'yearly', priority: 0.5 },
    ] as const
  ).map((route) => ({ ...route, url: `${siteUrl}${route.url}`, lastModified: now }))

  const projectRoutes: MetadataRoute.Sitemap = getProjects().map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  const blogRoutes: MetadataRoute.Sitemap = getBlogPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
