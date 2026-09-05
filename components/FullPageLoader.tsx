'use client';

import { useState, useEffect } from 'react';

interface FullPageLoaderProps {
  children: React.ReactNode;
  name?: string;
}

export default function FullPageLoader({ children, name = 'Shalmoly' }: FullPageLoaderProps) {
  const [isReady, setIsReady] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setIsReady(false);
    // Typing animation
    let charIndex = 0;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const typingSpeed = isMobile ? 45 : 80;
    const holdTime = isMobile ? 180 : 500;
    let holdTimer: number | undefined;
    let hideTimer: number | undefined;

    const typingInterval = setInterval(() => {
      if (charIndex < name.length) {
        setDisplayedText(name.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        holdTimer = window.setTimeout(() => {
          setIsReady(true);
          hideTimer = window.setTimeout(() => setShowLoader(false), 300);
        }, holdTime);
      }
    }, typingSpeed);

    return () => {
      clearInterval(typingInterval);
      if (holdTimer) window.clearTimeout(holdTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, [name]);

  return (
    <>
      <div className="animate-fadeIn" style={{ animation: 'fadeIn 0.6s ease-out' }}>
        {children}
      </div>

      {showLoader && (
        <div
          aria-hidden="true"
          className={`fixed inset-0 z-50 flex items-center justify-center bg-(--s-bg) transition-opacity duration-300 ${isReady ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
        >
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-(--s-fg) tracking-tight">
              {displayedText}
              {displayedText.length < name.length && (
                <span className="animate-pulse">|</span>
              )}
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
