import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

export default nextConfig
