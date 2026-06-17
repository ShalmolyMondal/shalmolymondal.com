'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

interface RootLayoutWrapperProps {
  children: React.ReactNode;
}

export default function RootLayoutWrapper({ children }: RootLayoutWrapperProps) {
  const [showLoading, setShowLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsMounted(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const handleLoadComplete = () => {
    setShowLoading(false);
    // Mark that user has seen the loading screen
    if (typeof window !== 'undefined') {
      localStorage.setItem('loading-screen-seen', 'true');
    }
  };

  // Only render after client mount to avoid hydration mismatch
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <>
      {showLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      {children}
    </>
  );
}
