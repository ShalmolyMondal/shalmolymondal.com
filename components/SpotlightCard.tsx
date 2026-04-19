'use client';

import { useRef, useCallback, type ReactNode } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(99, 102, 241, 0.15)'
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) return; // skip if a frame is already queued
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const div = divRef.current;
      const overlay = overlayRef.current;
      if (!div || !overlay) return;
      const rect = div.getBoundingClientRect();
      overlay.style.setProperty('--x', `${e.clientX - rect.left}px`);
      overlay.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    overlayRef.current?.style.setProperty('opacity', '1');
  }, []);

  const handleMouseLeave = useCallback(() => {
    overlayRef.current?.style.setProperty('opacity', '0');
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl ${className}`}
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: 0,
          background: `radial-gradient(600px circle at var(--x, 0px) var(--y, 0px), ${spotlightColor}, transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}
