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
  xPath: [number, number, number];
}

function seededRandom(seed: number) {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
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
        initialX: seededRandom(i + 1) * 100 + '%',
        initialY: seededRandom(i + 11) * 100 + '%',
        size: seededRandom(i + 21) * 3 + 1.5,
        duration: seededRandom(i + 31) * 8 + 12,
        delay: seededRandom(i + 41) * 2,
        color: colors[Math.floor(seededRandom(i + 51) * colors.length)],
        xPath: [0, (seededRandom(i + 61) - 0.5) * 200, (seededRandom(i + 71) - 0.5) * 100],
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
            x: particle.xPath,
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
