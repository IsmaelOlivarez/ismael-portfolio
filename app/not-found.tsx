import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="btn-primary inline-flex items-center justify-center w-full"
          >
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </Link>
          
          <Link
            href="/"
            className="btn-secondary inline-flex items-center justify-center w-full"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Link>
        </div>
      </div>
    </div>
  )
}
