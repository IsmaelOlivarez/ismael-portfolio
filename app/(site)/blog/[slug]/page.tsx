import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogPost, getBlogPosts } from '@/lib/mdx'
import { generateSEO, generateStructuredData } from '@/lib/seo'
import { ArrowLeft, Calendar, Tag, ArrowUpRight } from 'lucide-react'
import { Metadata } from 'next'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

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
  
  if (!post) {
    notFound()
  }

  const { frontmatter, content } = post

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-accent hover:text-accent/80 mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-primary">
                {frontmatter.title}
              </h1>
              <p className="text-xl text-primary/70 leading-relaxed">
                {frontmatter.description}
              </p>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 py-6 border-t border-b border-primary/10 text-sm text-primary/60">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{frontmatter.date}</span>
              </div>
              
              {frontmatter.tags.length > 0 && (
                <div className="flex items-center space-x-1">
                  <Tag className="h-4 w-4" />
                  <div className="flex flex-wrap gap-1">
                    {frontmatter.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-primary/10 text-primary rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cover Image */}
            {frontmatter.cover && (
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                <Image
                  src={frontmatter.cover}
                  alt={`${frontmatter.title} cover`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-primary/5">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none prose-primary">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </section>

      {/* Share */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Enjoyed this post?
          </h2>
          <p className="text-primary/70 mb-8">
            Share it with others or follow me for more content like this.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(frontmatter.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${frontmatter.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center"
            >
              Share on Twitter
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
            <Link href="/blog" className="btn-primary inline-flex items-center">
              Read More Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData('Article', frontmatter)),
        }}
      />
    </div>
  )
}
