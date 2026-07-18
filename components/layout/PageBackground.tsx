import React from 'react';

interface PageBackgroundProps {
  children: React.ReactNode;
}

/**
 * PageBackground Component
 *
 * Shared page surface for the home route.
 * Hero-specific animation lives inside the hero and stops when offscreen.
 */
export function PageBackground({ children }: PageBackgroundProps) {
  return (
    <div className="min-h-screen bg-[#0B0C14] text-[#C9D3EE] relative w-full overflow-x-hidden">
      {children}
    </div>
  );
}
