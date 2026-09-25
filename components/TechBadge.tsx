interface TechBadgeProps {
  text: string
  variant?: 'default' | 'accent'
}

export function TechBadge({ text, variant = 'default' }: TechBadgeProps) {
  const variantClasses =
    variant === 'accent'
      ? 'border-accent/40 text-accent'
      : 'border-line text-muted hover:border-ink hover:text-ink'

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.68rem] uppercase tracking-wider transition-colors ${variantClasses}`}
    >
      {text}
    </span>
  )
}
