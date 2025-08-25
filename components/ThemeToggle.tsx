'use client'

import { Sun, Moon, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  
  useEffect(() => {
    setMounted(true)
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system'
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    }
  }, [])

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark')
    
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(newTheme)
    }
  }

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    applyTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ] as const

  // Don't render until mounted to avoid SSR issues
  if (!mounted) {
    return (
      <div className="flex items-center space-x-1 rounded-lg bg-primary/10 p-1">
        {themes.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            className="flex items-center justify-center w-8 h-8 rounded-md transition-colors text-primary hover:bg-primary/20"
            aria-label={`Switch to ${label} theme`}
            title={`Switch to ${label} theme`}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-1 rounded-lg bg-primary/10 p-1">
      {themes.map(({ value, icon: Icon, label }) => {
        const isActive = theme === value
        return (
          <button
            key={value}
            onClick={() => handleThemeChange(value)}
            className={cn(
              'flex items-center justify-center w-8 h-8 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
              isActive
                ? 'bg-accent text-white'
                : 'text-primary hover:bg-primary/20'
            )}
            aria-label={`Switch to ${label} theme`}
            title={`Switch to ${label} theme`}
          >
            <Icon className="h-4 w-4" />
          </button>
        )
      })}
    </div>
  )
}
