'use client';

import { useState, useEffect } from 'react';

interface RotatingBadgeProps {
  words: string[];
  duration?: number;
}

export default function RotatingBadge({
  words,
  duration = 3500,
}: RotatingBadgeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'visible' | 'deleting'>('typing');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const TYPE_INTERVAL = 80;
  const currentWord = words[currentIndex] ?? '';

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(motionQuery.matches);
    updatePreference();
    motionQuery.addEventListener('change', updatePreference);
    return () => motionQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (phase !== 'typing' || prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setCharCount((prev) => {
        const next = prev + 1;
        if (next >= currentWord.length) {
          setPhase('visible');
          return currentWord.length;
        }
        return next;
      });
    }, TYPE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [phase, currentWord, prefersReducedMotion]);

  // Hold phase
  useEffect(() => {
    if (phase !== 'visible' || prefersReducedMotion) return;
    const t = setTimeout(() => setPhase('deleting'), duration);
    return () => clearTimeout(t);
  }, [phase, duration, prefersReducedMotion]);

  // Delete: clear instantly, advance word
  useEffect(() => {
    if (phase !== 'deleting' || prefersReducedMotion) return;
    const timer = window.setTimeout(() => {
      setCharCount(0);
      setCurrentIndex((prev) => (prev + 1) % words.length);
      setPhase('typing');
    }, 0);

    return () => window.clearTimeout(timer);
  }, [phase, words.length, prefersReducedMotion]);

  return (
    <div
      className="inline-flex items-center gap-3"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Accent dash */}
      <span className="w-5 h-[2px] bg-[#6366F1] rounded-full" aria-hidden />

      <div className="relative">
        <div className="h-6 flex items-center">
          {/* Invisible full word to reserve width — prevents layout shift */}
          <span
            className="font-medium tracking-[0.2em] text-[0.96rem] uppercase whitespace-nowrap invisible"
            aria-hidden
          >
            {currentWord}
          </span>
          {/* Visible typed text overlaid at same position */}
          <span
            className="absolute left-0 font-medium tracking-[0.2em] text-[0.96rem] uppercase whitespace-nowrap text-[#818CF8]"
          >
            {prefersReducedMotion ? currentWord : currentWord.slice(0, charCount)}
          </span>
          {/* Blinking cursor positioned right after typed text */}
          {!prefersReducedMotion && (
            <span
              className="absolute left-0 font-medium tracking-[0.2em] text-[0.96rem] uppercase whitespace-nowrap pointer-events-none"
              aria-hidden
              style={{ color: 'transparent' }}
            >
              {currentWord.slice(0, charCount)}
              <span className="inline-block w-[2px] h-4 bg-[#6366F1] align-middle ml-0.5 animate-blink" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
