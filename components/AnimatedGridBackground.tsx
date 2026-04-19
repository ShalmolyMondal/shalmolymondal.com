'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface AnimatedGridBackgroundProps {
  children: ReactNode;
  className?: string;
  dotColor?: string;
  dotSize?: number;
  gridSize?: number;
}

export default function AnimatedGridBackground({
  children,
  className = '',
  dotColor = 'rgba(99, 102, 241, 0.08)', // Very subtle indigo dots
  dotSize = 1,
  gridSize = 40,
}: AnimatedGridBackgroundProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Animated dot grid pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="dot-grid"
              x="0"
              y="0"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <motion.circle
                cx={gridSize / 2}
                cy={gridSize / 2}
                r={dotSize}
                fill={dotColor}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
