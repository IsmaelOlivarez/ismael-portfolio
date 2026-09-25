interface PageHeaderProps {
  index: string
  kicker: string
  title: string
  lead?: string
  spec?: string
}

/** Consistent blueprint-style page header with spec strip + serif title. */
export function PageHeader({ index, kicker, title, lead, spec }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(120%_100%_at_top_left,black,transparent_65%)]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between gap-4 border-b border-line py-3 font-mono text-[0.6rem] uppercase tracking-eyebrow text-muted">
          <span className="text-ink">
            IO<span className="text-muted"> — sys.portfolio</span>
          </span>
          {spec && <span className="hidden md:inline">{spec}</span>}
          <span>Est. 2025</span>
        </div>
        <div className="max-w-3xl py-16 md:py-24">
          <p className="eyebrow">
            [{index}] {kicker}
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight text-ink sm:text-6xl">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              {lead}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
