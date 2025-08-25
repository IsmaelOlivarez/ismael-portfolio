import { TimelineItem } from '@/data/timeline'
import { Calendar, GraduationCap, Briefcase } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  const getIcon = (type: 'education' | 'experience') => {
    return type === 'education' ? GraduationCap : Briefcase
  }

  const getIconColor = (type: 'education' | 'experience') => {
    return type === 'education' 
      ? 'bg-blue-500 text-white' 
      : 'bg-accent text-white'
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20"></div>
      
      <div className="space-y-8">
        {items.map((item, index) => {
          const Icon = getIcon(item.type)
          const iconColor = getIconColor(item.type)
          
          return (
            <div key={item.id} className="relative flex items-start space-x-6">
              {/* Icon */}
              <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${iconColor} shadow-lg`}>
                <Icon className="h-8 w-8" />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-white dark:bg-primary/5 border border-primary/10 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-primary">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-primary/60">
                      <Calendar className="h-4 w-4" />
                      <span>{item.period}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-medium text-accent mb-3">
                    {item.subtitle}
                  </h4>
                  
                  <p className="text-primary/80 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          'inline-flex items-center px-3 py-1 text-xs font-medium rounded-full',
                          item.type === 'education' 
                            ? 'bg-blue-500 text-white'
                            : 'bg-accent text-white'
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
