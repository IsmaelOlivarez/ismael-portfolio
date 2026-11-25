# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary visitors are a mix of three audiences, and the site must work for all
three at once:

- **Recruiters / hiring managers** doing a fast first-pass evaluation — scanning
  for role fit, reaching out, or pulling the résumé.
- **Engineers and engineering hiring managers** assessing technical depth by
  reading the project case studies and judging the work itself.
- **Professional network** (warm intros, peers, collaborators) arriving with
  context and looking to connect.

The site serves cold evaluation and warm introduction equally; no single visitor
type outranks the others.

## Product Purpose

A personal portfolio for Ismael Olivarez that presents his work, background, and
contact paths. It exists to convert a visit into evaluation and contact — a
recruiter reaching out, an engineer trusting the depth of the work, or a peer
connecting. Success is a qualified visitor leaving convinced enough to make
contact (email, résumé download, or social follow).

Ismael is actively open to software engineering roles. The site carries an
explicit "Open to SWE roles" signal.

## Positioning

Lead identity: **product-minded engineer** — someone who ships real, polished
products that hold up under real use. Craft and outcomes come first; the specific
stack is supporting evidence, not the headline. Backend/systems strength
(Spring Boot, AWS, microservices) and full-stack + mobile range (React /
React Native, Next.js) are both in service of that product-shipping identity
rather than being the pitch themselves.

## Operating Context

- Content is authored as MDX case studies (`content/projects/`) and blog notes
  (`content/blog/`), each with structured frontmatter (role, timeline, stack,
  problem, outcomes, links, gallery). New work is added by copying the
  `_TEMPLATE` files.
- Structured data for the timeline and skills lives in `data/timeline.ts` and
  `data/skills.ts`.
- Site-wide identity and links are centralized in `site.config.ts`.
- The contact form posts to an API route backed by nodemailer (SMTP / provider
  configurable via environment variables).
- Deployed on Vercel; analytics via Plausible.

## Capabilities and Constraints

- **Stack (existing codebase):** Next.js 15 (App Router), React 18, TypeScript,
  Tailwind CSS 3, MDX (gray-matter), nodemailer, Zod, lucide-react icons.
  Deployed on Vercel.
- **Surfaces:** Home, Projects (listing + MDX detail), About (bio, timeline,
  skills), Blog (listing + MDX posts), Contact (form), Résumé. Plus dynamic
  `sitemap.ts` and `robots.ts`.
- Theme: dark by default with a user-facing light/dark toggle.
- **Open / to verify:** Graduation and role-start timing is ambiguous in the
  current content — `data/timeline.ts` lists Columbia as 2021–2025, while the
  home hero shows "Open to SWE roles — 2026" and "Est. 2025." Future work must
  not silently pick one; confirm the real target before presenting dates as fact.

## Brand Commitments

- Name: **Ismael Olivarez**; "IO" monogram used as a mark.
- Voice: direct, engineer-to-engineer, outcome-focused and unembellished
  (e.g. "Let's build something worth shipping," "the kind of systems work that
  has to hold up under real traffic"). Not salesy; confident without hype.
- Accessibility is a stated product commitment (see Accessibility & Inclusion).

## Evidence on Hand

Real assets present in the repository:

- **Projects:** Superchat (`content/projects/superchat.mdx`), Plant Resilient,
  Timeline — case studies with problem, outcomes, stack, and repo/live links.
- **Blog:** two technical posts (`building-scalable-backends`,
  `react-native-performance-tips`).
- **Assets:** headshot (`public/images/headshot.jpeg`), résumé
  (`public/resume.pdf`), OG base image, real GitHub and LinkedIn profiles.

**Metric claims — handle as estimates.** The case studies cite specific figures
(e.g. sub-100ms message delivery, 99.9% uptime, 95+ Lighthouse scores). Per the
author, these are approximate, not rigorously measured. Preserve them as written,
but future work must **not** amplify them, make them more prominent, or introduce
new quantified claims that were not provided.

## Product Principles

1. **Serve the three-second scan and the deep read.** A recruiter must grasp fit
   and find contact fast; an engineer must be able to go deep on the work. Design
   for both without compromising either.
2. **The work is the argument.** Positioning as a product-minded engineer is
   earned by showing shipped projects and outcomes, not by asserting adjectives.
3. **Honest claims only.** Preserve real evidence; never invent or inflate
   metrics, testimonials, or credentials. Estimated numbers stay as-is and
   un-amplified.
4. **Make contact effortless.** Email, résumé, and social paths are always within
   reach; conversion is the point of the visit.
5. **Accessible and fast by default.** Craft includes performance and
   accessibility, not just visuals.

## Accessibility & Inclusion

Targets WCAG AA conformance: keyboard navigation, screen-reader support,
sufficient contrast, skip-to-content, and visible focus indicators. Treat this as
a floor future work must not regress below.
