'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useMotionValue, useSpring } from 'motion/react'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import { siteConfig } from '@/site.config'
import { Jack, Knob, StatusLed, VuMeter, Screw } from './primitives'
import { PatchCable } from './PatchCable'

const [heroMeta, heroLead] = siteConfig.tagline.split('\n\n').map((s) => s.trim())
const metaPieces = heroMeta.split('•').map((p) => p.trim())

export function PatchBayHero() {
  const heroRef = useRef<HTMLElement>(null)
  const inputRef = useRef<HTMLSpanElement>(null)
  const outputRef = useRef<HTMLAnchorElement>(null)
  const [patched, setPatched] = useState(false)

  // Shared, spring-smoothed pointer offset (-1..1) that every cable reacts to.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 120, damping: 18, mass: 0.6 })
  const sy = useSpring(py, { stiffness: 120, damping: 18, mass: 0.6 })

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = heroRef.current?.getBoundingClientRect()
    if (!r) return
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2
    px.set(Math.max(-1, Math.min(1, nx)))
    py.set(Math.max(-1, Math.min(1, ny)))
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <section
      ref={heroRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="studio relative border-b border-line"
    >
      <div className="mx-auto max-w-6xl px-5 pb-8 pt-5 sm:px-8 lg:px-10">
        {/* ===== Top rack rail ===== */}
        <div className="panel panel-raised mb-4 flex items-center justify-between gap-4 rounded-md px-4 py-2.5">
          <div className="flex items-center gap-3">
            <Screw />
            <span className="silk silk-ink">IO</span>
            <span className="silk text-muted/70">sys.portfolio · rack 01</span>
          </div>
          <div className="flex items-center gap-5">
            <StatusLed label="PWR" tone="green" />
            <span className="hidden sm:block">
              <StatusLed label="Open to SWE roles" tone="amber" />
            </span>
            <Screw />
          </div>
        </div>

        {/* ===== Main panel ===== */}
        <div className="panel brushed relative overflow-hidden rounded-lg">
          {/* cable layer spans the whole panel */}
          <PatchCable
            containerRef={heroRef}
            startRef={inputRef}
            endRef={outputRef}
            pointerX={sx}
            pointerY={sy}
            active={patched}
          />

          <div className="relative grid gap-8 p-5 sm:p-7 lg:grid-cols-12 lg:gap-8 lg:p-8">
            {/* ---- Left: identity face ---- */}
            <div className="min-w-0 lg:col-span-7">
              <div className="flex items-center gap-3">
                {/* compact face below lg, where the big module is hidden */}
                <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-md border border-line bg-panel lg:hidden">
                  {siteConfig.headshotPath && (
                    <Image src={siteConfig.headshotPath} alt="" fill sizes="3rem" className="object-cover" />
                  )}
                </span>
                <span className="font-display text-5xl font-black leading-none tracking-tight text-ink sm:text-6xl">
                  IO
                </span>
                <span className="mt-1 flex flex-col">
                  <span className="silk silk-accent">module</span>
                  <span className="silk text-muted/70">v2026 · experience</span>
                </span>
              </div>

              <h1 className="mt-6 font-display text-[2.8rem] font-semibold leading-[0.98] tracking-tight text-ink sm:text-6xl">
                {siteConfig.name}
              </h1>
              <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
                {heroLead}
              </p>

              {/* readout strip */}
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {metaPieces.map((piece, i) => (
                  <span key={i} className="readout inline-flex items-center gap-2">
                    <span className="inline-block h-1 w-1 rounded-full bg-accent" aria-hidden />
                    {piece}
                  </span>
                ))}
              </div>

              {/* control cluster */}
              <div className="mt-6 flex flex-wrap items-end gap-6">
                <Knob label="GAIN" value={0.7} drift />
                <Knob label="TONE" value={0.42} drift />
                <span className="hidden sm:block">
                  <VuMeter label="OUTPUT" />
                </span>
              </div>
            </div>

            {/* ---- Right: headshot module (desktop) ---- */}
            <div className="hidden min-w-0 lg:col-span-5 lg:block">
              <div className="panel panel-raised relative mx-auto w-full max-w-xs overflow-hidden rounded-md p-2 lg:ml-auto lg:mr-0">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line bg-bg">
                  {siteConfig.headshotPath ? (
                    <Image
                      src={siteConfig.headshotPath}
                      alt={`${siteConfig.name} headshot`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 18rem, 20rem"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-display text-6xl font-black text-ink/25">IO</span>
                    </div>
                  )}
                  {/* screen scanline sheen */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg, rgb(255 255 255 / 0.08) 0 1px, transparent 1px 3px)',
                    }}
                    aria-hidden
                  />
                </div>
                <div className="mt-2 flex items-center justify-between px-1 pb-0.5">
                  <span className="silk text-muted/70">cam.01 · live</span>
                  <span className="readout text-[0.62rem]">40.7128°N 74.0060°W</span>
                </div>
              </div>
            </div>
          </div>

          {/* ===== Bottom patch strip: SRC ──cable──▶ OUTPUT ===== */}
          <div className="relative border-t border-line bg-bg/40 px-5 py-4 sm:px-7 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <Jack label="SRC" sub="input" lit anchorRef={inputRef} tone="amber" />
                <div className="hidden flex-col gap-1 sm:flex">
                  <span className="silk text-muted/70">signal</span>
                  <span className="readout">patch ▸ output to view work</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  ref={outputRef}
                  href="/projects"
                  onPointerEnter={() => setPatched(true)}
                  onPointerLeave={() => setPatched(false)}
                  onFocus={() => setPatched(true)}
                  onBlur={() => setPatched(false)}
                  className="btn btn-primary"
                >
                  View Work
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Download Résumé
                </Link>
                <div className="ml-1 flex items-center gap-1">
                  {[
                    { href: siteConfig.socials.github, icon: Github, label: 'GitHub' },
                    { href: siteConfig.socials.linkedin, icon: Linkedin, label: 'LinkedIn' },
                    { href: siteConfig.socials.email, icon: Mail, label: 'Email' },
                  ].map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="rounded p-2 text-muted transition-colors hover:text-accent"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
