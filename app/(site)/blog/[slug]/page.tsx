import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogPost, getBlogPosts } from '@/lib/mdx'
import { generateSEO, generateStructuredData } from '@/lib/seo'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Metadata } from 'next'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: 'Post Not Found' }
  return generateSEO({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.cover,
    type: 'article',
    tags: post.frontmatter.tags,
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const { frontmatter, content } = post

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(120%_100%_at_top_left,black,transparent_65%)]" />
        <div className="relative mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-20 lg:px-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Notes
          </Link>

          <div className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-muted">
            <span className="text-accent">{frontmatter.date}</span>
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <span key={tag}>· {tag}</span>
            ))}
          </div>

          <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
            {frontmatter.title}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted sm:text-xl">
            {frontmatter.description}
          </p>
        </div>
      </section>

      {/* Cover */}
      {frontmatter.cover && (
        <section className="border-b border-line">
          <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:px-10">
            <div className="tick-corners relative aspect-video overflow-hidden border border-line">
              <Image
                src={frontmatter.cover}
                alt={`${frontmatter.title} cover`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="section-padding">
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-lg prose-blueprint max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </section>

      {/* Footer nav */}
      <section className="border-t border-line">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-5 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p className="font-display text-2xl text-ink">Enjoyed this?</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(frontmatter.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${frontmatter.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Share
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link href="/blog" className="btn-primary">
              More notes
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData('Article', frontmatter)),
        }}
      />
    </div>
  )
}
