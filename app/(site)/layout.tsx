import type { Metadata } from 'next'
import { Archivo, Chivo_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { generateSEO } from '@/lib/seo'

// Panel / display + body voice: Archivo, an industrial grotesque with a wide
// weight range — the lettering a studio panel is silkscreened in.
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

// Readout voice: Chivo Mono, for instrument labels, signal levels and log rows.
const chivoMono = Chivo_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = generateSEO({})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const params = new URLSearchParams(window.location.search);
                const override = params.get('theme');
                const theme = override || localStorage.getItem('theme') || 'dark';
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const resolvedTheme = theme === 'system' ? systemTheme : theme;
                document.documentElement.classList.add(resolvedTheme === 'light' ? 'light' : 'dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${archivo.variable} ${chivoMono.variable} font-body antialiased`}>
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col bg-bg text-ink">
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
