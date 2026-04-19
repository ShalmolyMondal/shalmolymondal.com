'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      // Critical images to preload
      const imageSources = [
        '/art/data-flow.png',
        '/art/code-poetry.png',
        '/art/neural-networks.png',
      ];

      try {
        let loaded = 0;

        // Start preloading immediately
        const preloadPromises = imageSources.map((src) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              loaded++;
              setProgress((loaded / imageSources.length) * 100);
              resolve();
            };
            img.onerror = () => {
              // Still count as loaded even if image fails
              loaded++;
              setProgress((loaded / imageSources.length) * 100);
              resolve();
            };
            img.src = src;
          });
        });

        // Wait for all images to load
        await Promise.all(preloadPromises);

        // Ensure minimum loading time for smooth UX (800ms)
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Fade out the loading screen
        setIsVisible(false);

        // Wait for fade animation to complete before calling onLoadComplete
        setTimeout(() => {
          onLoadComplete();
        }, 300);
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsVisible(false);
        setTimeout(() => {
          onLoadComplete();
        }, 300);
      }
    };

    preloadImages();
  }, [onLoadComplete]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#0B0C14] flex items-center justify-center"
        >
          <div className="text-center space-y-8">
            {/* Name with fade-in */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Shalmoly
            </motion.h1>

            {/* Progress bar container */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="w-48 sm:w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto"
            >
              {/* Progress fill */}
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm text-gray-400"
            >
              Preparing your portfolio...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
