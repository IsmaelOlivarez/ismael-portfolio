'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, AlertTriangle, Info, Copy, CheckCheck } from 'lucide-react'

interface FigureProps {
  src: string
  alt: string
  caption?: string
}

export function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure className="my-8">
      <div className="relative aspect-video overflow-hidden rounded-xl">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-primary/60 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

interface CalloutProps {
  type: 'note' | 'warn' | 'tip'
  children: React.ReactNode
}

export function Callout({ type, children }: CalloutProps) {
  const styles = {
    note: {
      icon: Info,
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-200',
    },
    warn: {
      icon: AlertTriangle,
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-200',
    },
    tip: {
      icon: Check,
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-200',
    },
  }

  const style = styles[type]
  const Icon = style.icon

  return (
    <div className={`p-4 rounded-xl border ${style.bg} ${style.border} my-6`}>
      <div className="flex items-start space-x-3">
        <Icon className={`h-5 w-5 ${style.text} mt-0.5 flex-shrink-0`} />
        <div className={`${style.text} text-sm leading-relaxed`}>
          {children}
        </div>
      </div>
    </div>
  )
}

interface CodeBlockProps {
  language: string
  children: string
}

export function CodeBlock({ language, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="relative my-6">
      <div className="flex items-center justify-between bg-primary/5 px-4 py-2 rounded-t-lg border border-primary/10">
        <span className="text-sm font-medium text-primary/70 uppercase tracking-wider">
          {language}
        </span>
        <button
          onClick={copyToClipboard}
          className="p-1 text-primary/60 hover:text-primary transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <CheckCheck className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
      <pre className="bg-primary/5 p-4 rounded-b-lg border border-primary/10 overflow-x-auto">
        <code className={`language-${language} text-sm`}>
          {children}
        </code>
      </pre>
    </div>
  )
}

interface MDXComponentsProps {
  content: string
}

export function MDXComponents({ content }: MDXComponentsProps) {
  // This is a simplified version - in a real implementation,
  // you'd use next-mdx-remote to render the MDX content
  return (
    <div className="prose prose-lg max-w-none prose-primary">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
