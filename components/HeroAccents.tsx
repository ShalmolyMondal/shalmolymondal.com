'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';

interface Particle {
  id: number;
  initialX: string;
  initialY: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export default function HeroAccents() {
  const particles = useMemo<Particle[]>(() => {
    const colors = ['#6366F1', '#818CF8', '#A5B4FC'];
    const generatedParticles: Particle[] = [];

    // Generate responsive number of particles based on viewport
    const particleCount =
      typeof window !== 'undefined'
        ? window.innerWidth < 768
          ? 8
          : window.innerWidth < 1024
            ? 12
            : 16
        : 12;

    for (let i = 0; i < particleCount; i++) {
      generatedParticles.push({
        id: i,
        initialX: Math.random() * 100 + '%',
        initialY: Math.random() * 100 + '%',
        size: Math.random() * 3 + 1.5,
        duration: Math.random() * 8 + 12,
        delay: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    return generatedParticles;
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            left: particle.initialX,
            top: particle.initialY,
          }}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 0.6, 0.4, 0],
            scale: [0, 1, 1, 0],
            y: [0, -100, 100, -150],
            x: [0, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
