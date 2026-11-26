'use client'

import { useEffect } from 'react'

/**
 * Adds the `snap-page` class to <html> while this page is mounted, scoping
 * the full-screen scroll-snap behavior to the homepage only (other routes
 * never carry the class, so they scroll normally). Removed on unmount.
 */
export function SnapScope() {
  useEffect(() => {
    const el = document.documentElement
    el.classList.add('snap-page')
    return () => el.classList.remove('snap-page')
  }, [])
  return null
}
