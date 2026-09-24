import { TimelineItem } from '@/data/timeline'

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Rail */}
      <div className="absolute bottom-2 left-0 top-2 w-px bg-line sm:left-40" aria-hidden />

      <div className="space-y-12">
        {items.map((item) => (
          <div key={item.id} className="relative grid gap-4 sm:grid-cols-[10rem_1fr]">
            {/* Period + type */}
            <div className="pl-6 sm:pl-0 sm:pr-8 sm:text-right">
              <p className="font-mono text-xs uppercase tracking-wider text-ink">{item.period}</p>
              <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-eyebrow text-accent">
                {item.type}
              </p>
            </div>

            {/* Node marker */}
            <span
              className="absolute left-[-4px] top-1.5 h-2 w-2 rounded-full border border-accent bg-bg sm:left-[9.75rem]"
              aria-hidden
            />

            {/* Content */}
            <div className="pl-6 sm:pl-8">
              <h3 className="font-display text-2xl leading-snug text-ink">{item.title}</h3>
              <p className="mt-1 text-accent">{item.subtitle}</p>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[0.66rem] uppercase tracking-wider text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
