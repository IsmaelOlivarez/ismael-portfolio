import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] items-center overflow-hidden border-b border-line">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(120%_100%_at_center,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <p className="eyebrow">Error — 404</p>
        <h1 className="mt-6 font-display text-7xl leading-none tracking-tight text-ink sm:text-9xl">
          404
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
          This route isn&apos;t on file. The page you&apos;re looking for doesn&apos;t exist or has
          moved.
        </p>
        <div className="mt-10">
          <Link href="/" className="btn-primary">
            <Home className="h-4 w-4" />
            Back home
          </Link>
        </div>
      </div>
    </div>
  )
}
