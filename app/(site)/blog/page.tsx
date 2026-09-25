import { getBlogPosts } from '@/lib/mdx'
import { PageHeader } from '@/components/PageHeader'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = generateSEO({
  title: 'Blog',
  description: 'Thoughts on technology, development, and building better software.',
})

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <div>
      <PageHeader
        index="C"
        kicker="Log"
        title="Notes"
        lead="Technical deep-dives and learning notes on backend systems, development, and building better software."
        spec={`${posts.length} entries`}
      />

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          {posts.length > 0 ? (
            <div>
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group grid gap-3 border-t border-line py-8 last:border-b md:grid-cols-[200px_1fr] md:gap-10"
                >
                  <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-wider text-muted md:flex-col md:items-start md:gap-2">
                    <span className="text-accent">{String(i + 1).padStart(2, '0')}</span>
                    <span>{post.date}</span>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl leading-snug text-ink transition-colors group-hover:text-accent sm:text-3xl">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                      {post.description}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line px-3 py-1 font-mono text-[0.66rem] uppercase tracking-wider text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent">
                        Read
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-line py-16 text-center">
              <p className="font-mono text-sm uppercase tracking-wider text-muted">
                No entries yet — check back soon
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
