'use client';

import { useState, useEffect } from 'react';

interface FullPageLoaderProps {
  children: React.ReactNode;
}

export default function FullPageLoader({ children }: FullPageLoaderProps) {
  const [isReady, setIsReady] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const name = 'Shalmoly';

  useEffect(() => {
    // Typing animation
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < name.length) {
        setDisplayedText(name.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        // Wait before fading out
        setTimeout(() => {
          setIsReady(true);
        }, 800);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, []);

  if (!isReady) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0C14]">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight">
            {displayedText}
            {displayedText.length < name.length && (
              <span className="animate-pulse">|</span>
            )}
          </h1>
        </div>
      </div>
    );
  }

  // Fade in the page smoothly
  return (
    <div className="animate-fadeIn" style={{ animation: 'fadeIn 0.6s ease-out' }}>
      {children}
    </div>
  );
}
