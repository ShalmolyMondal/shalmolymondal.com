import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ========== IMAGE OPTIMIZATION (CRITICAL) ==========
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache
    remotePatterns: [], // Restrict image sources for security
    unoptimized: false, // Use Next.js Image Optimization
  },

  // ========== COMPILER & BUNDLING OPTIMIZATION ==========
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // ========== EXPERIMENTAL FEATURES ==========
  experimental: {
    // Optimize package imports - split Motion library
    optimizePackageImports: ['motion', 'lucide-react', 'framer-motion'],
  },

  // ========== CACHING STRATEGY ==========
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 5,
  },

  // ========== PERFORMANCE OPTIMIZATION ==========
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true, // Enable gzip compression
  productionBrowserSourceMaps: false, // Disable sourcemaps in production

  // ========== VERCEL-SPECIFIC OPTIMIZATIONS ==========
  ...(process.env.VERCEL && {
    // Vercel Edge Network optimizations
    staticPageGenerationTimeout: 60,
  }),


  // ========== HEADERS & CACHING ==========
  headers: async () => [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=3600' },
      ],
    },
    {
      source: '/:path*.(woff2|woff|ttf)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/_next/static/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],

  // ========== REDIRECTS ==========
  redirects: async () => [
    // Add any redirects needed
  ],

  // ========== REWRITES ==========
  rewrites: async () => ({
    beforeFiles: [],
    afterFiles: [],
    fallback: [],
  }),

};

export default nextConfig;
