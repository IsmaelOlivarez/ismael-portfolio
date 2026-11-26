import { TimelineItem } from '@/data/timeline'

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* rail */}
      <div className="absolute bottom-2 left-0 top-2 w-px bg-line sm:left-40" aria-hidden />

      <div className="space-y-12">
        {items.map((item) => (
          <div key={item.id} className="relative grid gap-4 sm:grid-cols-[10rem_1fr]">
            {/* period + type */}
            <div className="pl-6 sm:pl-0 sm:pr-8 sm:text-right">
              <p className="text-sm text-ink">{item.period}</p>
              <p className="label label-accent mt-1 sm:justify-end">{item.type}</p>
            </div>

            {/* node */}
            <span
              className="absolute left-[-3px] top-1.5 h-2 w-2 rounded-full border border-accent bg-bg sm:left-[9.7rem]"
              aria-hidden
            />

            {/* content */}
            <div className="pl-6 sm:pl-8">
              <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-1 text-accent">{item.subtitle}</p>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="chip">
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
