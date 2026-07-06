import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
<<<<<<< HEAD
      { protocol: 'https', hostname: '**.vercel-storage.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: '**.blob.vercel-storage.com' },
=======
      // Cloudinary CDN (replaces Vercel Blob)
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      // Google user avatars
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
>>>>>>> 739f7bc (fix: dropdown styling and metadata initialization)
    ],
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
<<<<<<< HEAD
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
=======
        { key: 'X-Frame-Options',       value: 'DENY'    },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
>>>>>>> 739f7bc (fix: dropdown styling and metadata initialization)
      ],
    }]
  },
}

export default nextConfig
