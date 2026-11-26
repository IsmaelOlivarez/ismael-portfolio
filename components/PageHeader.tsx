interface PageHeaderProps {
  /** Legacy props kept for call-site compatibility; not rendered as a kicker. */
  index?: string
  kicker?: string
  title: string
  lead?: string
  spec?: string
}

/** Minimal page header: the title leads, a quiet meta line follows. */
export function PageHeader({ title, lead, spec }: PageHeaderProps) {
  return (
    <section className="relative border-b border-line">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-20 sm:px-8 md:pb-20 md:pt-28 lg:px-10">
        <div className="max-w-3xl">
          <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-ink sm:text-6xl">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              {lead}
            </p>
          )}
          {spec && <p className="mt-6 text-sm text-muted">{spec}</p>}
        </div>
      </div>
    </section>
  )
}
