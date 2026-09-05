'use client';

/**
 * LoadingShimmer Component
 *
 * Provides a subtle shimmer effect while content loads.
 * Creates an animated gradient overlay that pulses gently,
 * indicating to users that content is being loaded.
 *
 * Rendered as a fixed overlay behind all content, appears only briefly.
 */
export default function LoadingShimmer() {
  return (
    <div className="fixed inset-0 z-5 pointer-events-none">
      {/* Subtle shimmer effect */}
      <div className="absolute inset-0 animate-pulse">
        {/* Top to bottom gradient pulse */}
        <div className="absolute inset-0 bg-gradient-to-b from-(color:--s-fg)/5 via-transparent to-(color:--s-fg)/5 opacity-40" />
      </div>

      {/* Light streak animation - moves across screen */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-(color:--s-fg)/10 to-transparent animate-shimmer" />
      </div>
    </div>
  );
}
