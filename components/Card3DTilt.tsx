'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface Card3DTiltProps {
  children: ReactNode;
  className?: string;
  tiltDegree?: number; // Max tilt angle in degrees
  scale?: number; // Scale on hover
  glareEffect?: boolean; // Add shine/glare effect
}

export default function Card3DTilt({
  children,
  className = '',
  tiltDegree = 10,
  scale = 1.02,
  glareEffect = true,
}: Card3DTiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [tiltDegree, -tiltDegree]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-tiltDegree, tiltDegree]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        scale: isHovered ? scale : 1,
      }}
      transition={{
        scale: { duration: 0.2 },
      }}
      className={`relative ${className}`}
    >
      {/* Glare effect overlay */}
      {glareEffect && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0"
          style={{
            background: `radial-gradient(circle at ${
              (useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]).get())
            }% ${
              (useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]).get())
            }%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      )}

      <div style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
}
