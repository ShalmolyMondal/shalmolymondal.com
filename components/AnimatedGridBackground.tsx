import type { CSSProperties, ReactNode } from 'react';

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
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize + 0.5}px)`,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          backgroundPosition: `${gridSize / 2}px ${gridSize / 2}px`,
        } as CSSProperties}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
