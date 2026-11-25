import type { Config } from 'tailwindcss'

/** Semantic color backed by a CSS variable of space-separated RGB channels. */
const withAlpha = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Patch Bay semantic palette (values live in globals.css)
        bg: withAlpha('--c-bg'),
        surface: withAlpha('--c-surface'),
        panel: withAlpha('--c-panel'),
        ink: withAlpha('--c-ink'),
        muted: withAlpha('--c-muted'),
        line: withAlpha('--c-line'),
        metal: withAlpha('--c-metal'),
        patch: withAlpha('--c-patch'),
        accent: {
          DEFAULT: withAlpha('--c-accent'),
          soft: withAlpha('--c-accent-soft'),
          ink: withAlpha('--c-accent-ink'),
        },
        // Back-compat aliases so legacy `text-primary` / `bg-primary/5` resolve
        primary: {
          DEFAULT: withAlpha('--c-ink'),
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        prose: '68ch',
      },
      letterSpacing: {
        eyebrow: '0.22em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out both',
        'rise': 'rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'led-breathe': 'led-breathe 2.6s ease-in-out infinite',
        'signal-dash': 'signal-dash 0.9s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        rise: {
          '0%': { transform: 'translateY(18px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'led-breathe': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        'signal-dash': {
          to: { strokeDashoffset: '-32' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
