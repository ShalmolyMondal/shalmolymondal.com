import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Edge Caching & Security Middleware for Vercel
 *
 * Optimized for:
 * - CDN edge caching (Vercel Edge Network)
 * - Aggressive static asset caching
 * - Stale-while-revalidate for better performance
 * - Security headers
 * - Performance optimization
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  // ========== EDGE CACHING STRATEGY ==========

  // 1. IMMUTABLE STATIC ASSETS (1 year cache)
  // Next.js chunks with hash: _next/static/chunks/*.js
  if (pathname.includes('_next/static/chunks/') || pathname.includes('/_next/static/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable, s-maxage=31536000');
  }

  // 2. VERSIONED ASSETS (fonts, images in public)
  // .js, .css, .woff2, .woff, fonts
  if (pathname.match(/\.(js|css|woff2|woff|ttf|eot)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable, s-maxage=31536000');
  }

  // 3. IMAGE ASSETS (1 year cache)
  // .png, .jpg, .jpeg, .gif, .webp, .avif
  if (pathname.match(/\.(png|jpg|jpeg|gif|webp|avif|svg)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable, s-maxage=31536000');
    response.headers.set('X-Content-Type-Options', 'nosniff');
  }

  // 4. HTML PAGES (1 hour + stale-while-revalidate)
  // Edge caches for 1 hour, browser caches for 10 minutes
  // Serves stale content for 24 hours while revalidating in background
  if (pathname.match(/^\/[^/.]*$/) || pathname.endsWith('/') || pathname.endsWith('.html')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=600, s-maxage=3600, stale-while-revalidate=86400'
    );
  }

  // 5. API ROUTES (1 hour cache)
  if (pathname.startsWith('/api/')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
    );
  }

  // ========== SECURITY HEADERS ==========

  // HSTS - Force HTTPS for 1 year
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY');

  // Enable XSS protection
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Prevent MIME sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Referrer policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Restrict permissions (camera, microphone, geolocation, payment)
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
  );

  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.vercel-analytics.com https://vercel.live; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: https: blob:; connect-src 'self' https: wss:; frame-ancestors 'none'; base-uri 'self'; form-action 'self';`
  );

  // ========== PERFORMANCE HEADERS ==========

  // Enable compression (gzip, brotli)
  response.headers.set('Accept-Encoding', 'gzip, deflate, br');

  // Enable DNS prefetch for external resources
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  // Preload critical fonts
  const linkHeaders = [
    '</fonts/inter-var.woff2>; rel=preload; as=font; type=font/woff2; crossorigin',
  ];
  response.headers.set('Link', linkHeaders.join(', '));

  // Optimize image delivery
  if (pathname.includes('/public/') && pathname.match(/\.(png|jpg|jpeg|webp)$/)) {
    response.headers.set('Accept', 'image/webp,image/avif,image/jxl,image/*');
  }

  // ========== VERCEL EDGE OPTIMIZATION ==========

  // Tag for Vercel Analytics
  response.headers.set('x-vercel-cache', 'HIT');

  return response;
}

// Middleware matcher - apply to all routes except specific paths
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
