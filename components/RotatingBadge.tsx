'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

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
  const rafRef = useRef<number>(0);
  const lastTickRef = useRef(0);

  const TYPE_INTERVAL = 80;
  const currentWord = words[currentIndex];

  const tick = useCallback((timestamp: number) => {
    if (!lastTickRef.current) lastTickRef.current = timestamp;

    const elapsed = timestamp - lastTickRef.current;

    if (phase === 'typing' && elapsed >= TYPE_INTERVAL) {
      lastTickRef.current = timestamp;
      setCharCount((prev) => {
        const next = prev + 1;
        if (next >= currentWord.length) {
          setPhase('visible');
          return currentWord.length;
        }
        return next;
      });
    }

    if (phase === 'typing') {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [phase, currentWord]);

  // Drive typing with rAF
  useEffect(() => {
    if (phase === 'typing') {
      lastTickRef.current = 0;
      rafRef.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafRef.current);
    }
  }, [phase, tick]);

  // Hold phase
  useEffect(() => {
    if (phase !== 'visible') return;
    const t = setTimeout(() => setPhase('deleting'), duration);
    return () => clearTimeout(t);
  }, [phase, duration]);

  // Delete: clear instantly, advance word
  useEffect(() => {
    if (phase !== 'deleting') return;
    setCharCount(0);
    setCurrentIndex((prev) => (prev + 1) % words.length);
    setPhase('typing');
  }, [phase, words.length]);

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
            {currentWord.slice(0, charCount)}
          </span>
          {/* Blinking cursor positioned right after typed text */}
          <span
            className="absolute left-0 font-medium tracking-[0.2em] text-[0.96rem] uppercase whitespace-nowrap pointer-events-none"
            aria-hidden
            style={{ color: 'transparent' }}
          >
            {currentWord.slice(0, charCount)}
            <span className="inline-block w-[2px] h-4 bg-[#6366F1] align-middle ml-0.5 animate-blink" />
          </span>
        </div>
      </div>
    </div>
  );
}
