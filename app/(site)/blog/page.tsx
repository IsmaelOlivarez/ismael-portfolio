import { getBlogPosts } from '@/lib/mdx'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Tag } from 'lucide-react'

export const metadata: Metadata = generateSEO({
  title: 'Blog',
  description: 'Thoughts on technology, development, and building better software.',
})

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
              Blog & Notes
            </h1>
            <p className="text-xl text-primary/70 leading-relaxed">
              Thoughts on technology, development, and building better software. 
              A mix of technical deep-dives and learning notes.
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-padding bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="card group hover:shadow-lg transition-all duration-300">
                  {/* Cover Image */}
                  {post.cover && (
                    <div className="relative aspect-video mb-4 overflow-hidden rounded-xl">
                      <img
                        src={post.cover}
                        alt={`${post.title} cover`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-primary/70 text-sm leading-relaxed">
                        {post.description}
                      </p>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-primary/60">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-accent hover:text-accent/80 font-medium transition-colors"
                    >
                      Read more
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-primary/60 text-lg">
                No blog posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
