---
name: The Patch Bay
description: A modular signal rack in a dark studio — the portfolio is hardware you can patch.
colors:
  bg: "#121316"
  surface: "#1B1E23"
  panel: "#23272D"
  ink: "#E8E4D8"
  muted: "#9AA0A8"
  line: "#343A42"
  metal: "#9BA3AD"
  accent: "#F2A33C"
  accent-soft: "#F7C079"
  accent-ink: "#1A1205"
  patch: "#3FB6C9"
  led-green: "#49E07A"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.8rem, 6vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  brand:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 7vw, 3.75rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 1.875rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  silk:
    fontFamily: "Chivo Mono, ui-monospace, monospace"
    fontSize: "0.7rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.16em"
  readout:
    fontFamily: "Chivo Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "2px"
  DEFAULT: "4px"
  md: "6px"
  lg: "8px"
  full: "999px"
spacing:
  hairline: "4px"
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  section-y: "80px"
  section-y-lg: "112px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.md}"
    padding: "0.8rem 1.3rem"
    typography: "{typography.readout}"
  button-primary-hover:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-ink}"
  button-secondary:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.8rem 1.3rem"
    typography: "{typography.readout}"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
  panel-raised:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    rounded: "{rounded.DEFAULT}"
    padding: "0.25rem 0.625rem"
    typography: "{typography.silk}"
---

# Design System: The Patch Bay

## Overview

**Creative North Star: "The Patch Bay"**

The portfolio is a modular signal rack sitting in a dark studio room. Every surface is a brushed-aluminium front panel bolted into a rack: silkscreen legends, engraved seams, rack-ear screws, jacks, knobs, VU meters, and rubber patch cables carrying signal from input to output. The work is not described as a system — it is *shown* as one, hardware a visitor can trace signal through. This world refuses the dark-dev-portfolio defaults: no generic centered hero, no wall of equal project cards, no mono-on-black with a particle field.

The mood is engineered, tactile, and quietly powered-on. Depth is physical — every panel reads as a milled metal face catching a single top light, never a floating card with a drop shadow. Color is almost entirely neutral graphite and bone; the signal-amber accent is rationed so that when it appears — a lit jack, a travelling pulse, the primary action — it reads as live current, not decoration. Motion is the physics of real hardware: damped springs that settle rather than snap, one continuous signal pulse on the active patch, and ambient life from breathing jack LEDs and drifting VU needles.

The default and canonical theme is dark (the studio room). A light theme (`.light`, a daylight bench) exists and re-derives every token, but the dark palette is the source of truth.

**Key Characteristics:**
- Brushed-metal panels with engraved seams and inset bevels — never flat floating cards.
- Silkscreen mono legends and instrument readouts label everything, like a real rack.
- One rationed signal color (amber) marks what is live; patch-cyan is the resting signal.
- Hardware primitives (jacks, knobs, VU meters, patch cables) stand in for stock UI.
- Motion settles like real analog parts; emission is radial-gradient light, never box-shadow glow.

## Colors

A near-monochrome graphite-and-bone studio palette carrying a single warm signal accent and a cool resting-signal cyan.

### Primary
- **Signal Amber** (#F2A33C): The one live-current color. Reserved for the primary action (`.btn-primary`), lit jack collars and LEDs, the active patch cable and its travelling pulse, silkscreen role tags (`.silk-accent`), readout bullets, and hover color on links and titles. Its scarcity is the whole point. `accent-soft` (#F7C079) is the hover lift; `accent-ink` (#1A1205) is the near-black text that rides on amber fills.

### Secondary
- **Patch Cyan** (#3FB6C9): The resting signal color — a second cable tone and the dormant state of project-module jacks and cables before they ignite amber on hover/focus. Also the toolkit list bullets in Signal Chain.

### Neutral
- **Studio Room** (#121316): The deepest ground, the dark room the rack sits in. Page background and jack-socket interiors.
- **Panel Face** (#1B1E23): The default milled panel surface (`.panel`).
- **Lifted Module** (#23272D): A panel raised one step above its neighbor (`.panel-raised`), knob and jack bodies, secondary-button fill.
- **Bone Legend** (#E8E4D8): Primary legend text and headings — warm off-white, the silkscreen ink.
- **Dim Legend** (#9AA0A8): Muted body copy, secondary readouts, inactive labels.
- **Engraved Seam** (#343A42): Every 1px border, divider, and panel edge — the milled seam between parts.
- **Brushed Aluminium** (#9BA3AD): Metal highlights — knob skirts, VU scales, screw bodies, faint panel sheen washes.
- **Status Green** (#49E07A): The single power-indicator green, used only for the "PWR" status LED. Not a general-purpose color.

### Named Rules
**The Live-Current Rule.** Amber marks only what is live: the primary action, a lit jack, the active cable, an ignited module. If more than a small fraction of a view is amber, something inert has been wrongly energized. Everything at rest is graphite, bone, and — for dormant signal — cyan.

**The Channel-Native Color Rule.** Values are authored as space-separated RGB channels in CSS variables (`--c-accent: 242 163 60`) so Tailwind opacity modifiers compose (`rgb(var(--c-accent) / 0.3)`). Consume colors through the semantic tokens, never as raw hex in components.

## Typography

**Display / Body Font:** Archivo (with ui-sans-serif, system-ui fallback) — one industrial grotesque carries both headings and body, the lettering a studio panel is silkscreened in. Self-hosted via next/font.
**Label / Readout Font:** Chivo Mono (with ui-monospace fallback) — instrument labels, signal levels, log rows.

**Character:** A wide-range industrial grotesque paired with a utilitarian monospace. Archivo runs from regular body up to a 900 "IO" module brand; Chivo Mono does all the silkscreen and readout work. The split is strict and semantic: prose is Archivo, machine-labeling is mono.

### Hierarchy
- **Brand "IO"** (Archivo 900 black, 3rem–3.75rem, line-height 1, tracking -0.02em): The module brand mark in the hero identity face.
- **Display** (Archivo 600 semibold, 2.8rem–3.75rem, line-height 0.98): The name h1 and the large contact heading ("Let's patch in.").
- **Headline** (Archivo 600 semibold, 1.5rem–1.875rem, tight tracking): Section titles (Selected Work, Signal Chain, Field Log).
- **Title** (Archivo 600 semibold, 1.25rem, line-height snug): Project-module and field-log entry titles; shift to amber on hover.
- **Body** (Archivo 400, 1.125rem–1.25rem, line-height ~1.65, color muted): Lead paragraphs and descriptions. Prose max-width 68ch.
- **Silk label** (Chivo Mono 400, 0.7rem/11.2px, uppercase, tracking 0.16em, muted): Silkscreen panel legends — the `.silk` label on every piece of hardware.
- **Readout** (Chivo Mono 400, 0.75rem, tabular-nums, tracking 0.02em, muted): Instrument readouts — levels, coordinates, dates, log rows.

### Named Rules
**The Mono-Is-Instrumentation Rule.** Chivo Mono is for machine-labeling only: silkscreen legends, readouts, levels, coordinates, timestamps, button and nav labels. It never sets prose. Reaching for mono as a stylistic device outside instrumentation breaks the rack fiction.

**The Legible-Floor Rule.** Functional text never drops below 11px. Silk labels and chips sit at the 0.7rem (11.2px) floor; nothing smaller ships.

## Layout

A centered rack column: content lives in a `max-w-6xl` container (72rem) with responsive gutters (`px-5` / `sm:px-8` / `lg:px-10`). Vertical rhythm is the `.section-padding` cadence — `py-20` rising to `md:py-28` — with sections divided by a single engraved `border-line` top rule.

The hero is a rack composition: a thin top rail (brand + status LEDs + screws), a main panel splitting into a 12-column grid (7 identity / 5 headshot module on `lg`), and a bottom patch strip wiring a lit SRC input jack through a cursor-reactive cable to the "View Work" output. Project work is a responsive module grid (1 / 2 / 3 columns). The toolkit is a 4-up panel grid; field-log entries stack in a single shared panel.

Spacing follows a 4px-based rhythm; panels pad `p-5` rising to `lg:p-8`, large feature panels to `p-16`. Chrome is integer-aligned and pixel-crisp — borders are a true 1px, the active module is always unmistakable.

## Elevation & Depth

Depth is milled, not floated. Panels convey physicality through **inset bevels and a single top light**, not ambient drop shadows. A `.panel` carries an inset white top edge, an inset black bottom edge, and a tight downward contact shadow — it reads as a metal face bolted to the rack, catching light from above. Larger grounds (`.brushed`, `.studio`) add a faint top-lit aluminium sheen and a room vignette so the rack sits in space.

### Shadow Vocabulary
- **Panel chrome** (`box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.05), inset 0 -1px 0 rgb(0 0 0 / 0.35), 0 14px 34px -22px rgb(0 0 0 / 0.75)`): The milled-face treatment on every `.panel`. The two inset lines are the bevel; the diffuse dark cast is the contact shadow against the rack.
- **Primary button chrome** (`box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.4), 0 10px 22px -14px rgb(var(--c-accent) / 0.9)`): A bright inset top edge plus a short amber-tinted cast so the action sits proud and warm.

### Named Rules
**The Emission-Not-Glow Rule.** LEDs, lit jacks, and active emphasis emit light via a `radial-gradient` halo layered behind the element, never a `box-shadow` glow. Box-shadow is reserved for structural bevels and contact shadows. Signal brightness on the active cable comes from a `drop-shadow` filter on the pulse stroke, not an element glow.

**The Milled-Face Rule.** Every container is a milled panel: 1px `line` border, 8px radius, inset bevel. Surfaces are never borderless floating cards and never carry a soft ambient drop shadow as their resting state.

## Shapes

Tight, machined radii. Panels round at 8px (`lg`); buttons, rails, and raised modules at 6px (`md`); chips at 4px; inset screens and image frames at 2px (`sm`); jacks, knobs, LEDs, and status dots are full circles (999px). Every panel is outlined by a 1px `line` seam. The recurring silhouette is the rack module: a bordered rectangular face with silkscreen header, internal hardware, and a bottom readout/footer rule. Hardware primitives are built as crisp SVG geometry (jack collars, knob skirts with tick marks, VU arcs) with trig coordinates rounded to fixed precision for byte-identical server/client render.

## Components

### Buttons
- **Shape:** Machined 6px radius (`md`), mono uppercase label, tracking 0.14em, padding 0.8rem 1.3rem.
- **Primary (`.btn-primary`):** Amber fill (#F2A33C) with near-black `accent-ink` text; bright inset top edge and a short amber cast. It is the output at a cable terminus — the single unmistakable action per view. Hover lifts fill to `accent-soft`.
- **Secondary (`.btn-secondary`):** Lifted-panel fill (#23272D), bone text, 1px `line` border with an inset top sheen. Hover brightens the border toward metal.
- **Transition:** All-property 200ms.

### Chips
- **Style:** 4px-radius outline tag — 1px `line` border, transparent fill, mono uppercase 0.7rem, tracking 0.08em, muted text. Used for project stacks ("patch labels"). Non-interactive; no selected state.

### Cards / Containers (Panels)
- **Corner Style:** 8px (`lg`).
- **Background:** `surface` face, or `panel` when raised; `.brushed` adds a top sheen on large grounds.
- **Depth:** The milled-face inset bevel + contact shadow (see Elevation). Never a soft ambient shadow at rest.
- **Border:** 1px engraved `line` seam, always present.
- **Internal Padding:** `p-5` default, up to `lg:p-8`; feature panels `p-12`–`p-16`.
- **Active state:** Project modules shift their border toward `accent/0.6` and ignite their LED and internal cable amber on hover/focus.

### Navigation
- **Header:** Sticky, `bg-bg/85` with backdrop blur, 1px `line` bottom seam, flanked by rack screws. Brand plate (Archivo bold + mono "SWE" tag) left; mono uppercase nav links (tracking 0.16em) each led by a small dot that lights amber on hover; theme toggle and underlined "Résumé" right.
- **Mobile:** Full-width menu panel; links become Archivo 2xl semibold rows with amber bullets, divided by `line` seams.
- **Footer:** Opens with a rack rail (screws + "IO sys.portfolio"); routing and "elsewhere" columns under mono `.silk` headers; closes on two readout rows.

### Signature Component — The Patch Cable
The world's defining interaction. An SVG cable drawn between two live DOM anchors inside a container, rebuilt from measured anchor positions (ResizeObserver + resize + post-font settle). It **sags under gravity** (sag scales with span, floor 26px) and **nudges toward the cursor** via a shared spring-smoothed pointer offset, so every cable on a surface reacts together. It is drawn in layers — contact shadow, black rubber core, tinted signal sheath, a thin top highlight — with a dashed **travelling signal pulse** (`signal-dash` keyframe) running its length. On activation (patching the output, hovering/focusing a module) the sheath brightens, the pulse thickens, and a `drop-shadow` ignites it. Resting cables carry patch-cyan; active cables ignite signal-amber. The `ProjectModule` carries a simpler internal IN→OUT cable on the same grammar.

### Hardware Primitives
`Jack` (1/4" socket with metal collar, lit LED collar + breathing radial halo when live), `Knob` (skirt tick marks, indicator pointing at a 0–1 value mapped across a 270° sweep, optional ambient sway), `StatusLed` (dot + breathing radial halo + silk label), `VuMeter` (scale arc with a hot amber zone and a drifting needle), and `Screw` (rack-ear screw head). All are presentational SVG with CSS ambient motion.

### Motion Grammar
- **Spring physics:** Moving parts settle, never snap. The cursor-reactive pointer is spring-smoothed (stiffness 120, damping 18, mass 0.6).
- **One active pulse:** Exactly one continuous signal pulse rides the active patch (`signal-dash`, 0.9s linear).
- **Ambient life:** Jack/status LEDs breathe (`led-breathe`, 2.6s), VU needles drift (`vu-sway`, 7s), knobs optionally sway (`knob-sway`, 6s). Bounded, looping, low-amplitude.
- **Reduced motion:** A global `prefers-reduced-motion` guard flattens all animation and transition durations; the cable drops its cursor-follow and signal dash. The world is fully reduced-motion-safe.

## Do's and Don'ts

### Do:
- **Do** build every container as a milled panel: 1px `line` seam, 8px radius, inset bevel; reach for `.panel` / `.panel-raised`.
- **Do** ration amber to live current — the primary action, lit jacks, the active cable, an ignited module (The Live-Current Rule).
- **Do** label hardware with mono silk legends and readouts; keep Archivo for prose (The Mono-Is-Instrumentation Rule).
- **Do** emit light with radial-gradient halos and pulse drop-shadows; keep box-shadow for bevels and contact shadows (The Emission-Not-Glow Rule).
- **Do** let moving parts settle with spring physics, and guard every animation behind `prefers-reduced-motion`.
- **Do** keep chrome integer-aligned and functional text at or above 11px (The Legible-Floor Rule).
- **Do** use patch-cyan for dormant signal and amber for the ignited/active state.

### Don't:
- **Don't** render stock floating cards or buttons with soft ambient drop shadows — the material is milled metal, not paper.
- **Don't** spread amber across inert chrome; if most of a view is amber, something inert was wrongly energized.
- **Don't** set prose or headings in Chivo Mono, and don't label hardware in Archivo.
- **Don't** fake LED or active glow with box-shadow; use a radial-gradient emission layer.
- **Don't** let any moving part snap; and never ship motion that ignores `prefers-reduced-motion`.
- **Don't** drop functional text below 11px or let panel chrome fall off integer pixel alignment.
