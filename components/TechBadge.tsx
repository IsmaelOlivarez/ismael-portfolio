interface TechBadgeProps {
  text: string
  variant?: 'default' | 'accent'
}

export function TechBadge({ text, variant = 'default' }: TechBadgeProps) {
  const baseClasses = "px-3 py-1 text-xs font-medium rounded-full transition-colors"
  
  const variantClasses = variant === 'accent' 
    ? "bg-accent/20 text-accent hover:bg-accent/30" 
    : "bg-primary/10 text-primary hover:bg-primary/20"

  return (
    <span className={`${baseClasses} ${variantClasses}`}>
      {text}
    </span>
  )
}
