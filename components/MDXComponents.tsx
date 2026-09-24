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
      <div className="tick-corners relative aspect-video overflow-hidden border border-line">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-mono text-xs uppercase tracking-wider text-muted">
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
  const config = {
    note: { icon: Info, label: 'Note' },
    warn: { icon: AlertTriangle, label: 'Warning' },
    tip: { icon: Check, label: 'Tip' },
  }[type]
  const Icon = config.icon

  return (
    <div className="my-6 border-l-2 border-accent bg-surface p-4">
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <div>
          <span className="font-mono text-[0.62rem] uppercase tracking-eyebrow text-accent">
            {config.label}
          </span>
          <div className="mt-1 leading-relaxed text-ink/90">{children}</div>
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
    <div className="my-6 overflow-hidden rounded-lg border border-line">
      <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-2">
        <span className="font-mono text-[0.62rem] uppercase tracking-eyebrow text-muted">
          {language}
        </span>
        <button
          onClick={copyToClipboard}
          className="text-muted transition-colors hover:text-accent"
          aria-label="Copy code"
        >
          {copied ? <CheckCheck className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <pre className="overflow-x-auto bg-surface p-4">
        <code className={`language-${language} font-mono text-sm text-ink`}>{children}</code>
      </pre>
    </div>
  )
}

interface MDXComponentsProps {
  content: string
}

export function MDXComponents({ content }: MDXComponentsProps) {
  return (
    <div className="prose prose-lg prose-blueprint max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
