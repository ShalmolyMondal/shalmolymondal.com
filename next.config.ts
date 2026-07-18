import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ========== IMAGE OPTIMIZATION (CRITICAL) ==========
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75],
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
    optimizePackageImports: ['motion', 'lucide-react'],
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
      source: '/:path*',
      headers: [
        { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.vercel-analytics.com https://vercel.live; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: https: blob:; connect-src 'self' https: wss:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
        },
      ],
    },
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'no-store, max-age=0' },
      ],
    },
    {
      source: '/:path*.(png|jpg|jpeg|gif|webp|avif|svg)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
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
