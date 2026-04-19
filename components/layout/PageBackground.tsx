import React from 'react';
import FlowingGradient from '@/components/FlowingGradient';
import CosmicBackground from '@/components/CosmicBackground';

interface PageBackgroundProps {
  children: React.ReactNode;
}

/**
 * PageBackground Component
 *
 * Fixed background layer that stays in place while user scrolls.
 * Renders before content (z-0) to ensure background appears first.
 *
 * Layer structure:
 * - z-0: Fixed background (FlowingGradient + CosmicBackground)
 * - z-10: Page content (scrolls on top of background)
 */
export function PageBackground({ children }: PageBackgroundProps) {
  return (
    <div className="min-h-screen bg-[#0B0C14] text-[#C9D3EE] relative w-full overflow-x-hidden">
      {/* Fixed Background Layer - Behind all content */}
      <div className="fixed inset-0 z-0 w-full h-screen overflow-hidden pointer-events-none">
        {/* Base gradient */}
        <FlowingGradient />

        {/* Cosmic background animation */}
        <CosmicBackground />
      </div>

      {/* Content Layer - Scrolls on top */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
