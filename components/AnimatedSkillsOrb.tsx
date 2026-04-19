'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

interface Skill {
  name: string;
  icon?: string;
}

interface AnimatedSkillsOrbProps {
  title: string;
  skills: string[];
  delay?: number;
}

export default function AnimatedSkillsOrb({ title, skills, delay = 0 }: AnimatedSkillsOrbProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-[#171926] border border-[#727DA1]/10 rounded-xl p-6 relative overflow-hidden group"
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Title */}
      <h3 className="text-sm font-semibold text-[#6366F1] mb-4 relative z-10">{title}</h3>

      {/* Animated skill orbs */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: delay + index * 0.05,
              duration: 0.3,
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{
              scale: 1.1,
              y: -4,
              transition: { duration: 0.2 },
            }}
            className="relative"
          >
            {/* Glow effect on hover */}
            {hoveredIndex === index && (
              <motion.div
                layoutId="skillGlow"
                className="absolute -inset-2 bg-[#6366F1]/20 rounded-full blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}

            {/* Skill badge */}
            <span
              className={`
                relative px-3 py-1.5 text-xs rounded-full border
                transition-all duration-200
                ${
                  hoveredIndex === index
                    ? 'bg-[#6366F1]/15 text-[#818CF8] border-[#6366F1]/30 shadow-lg shadow-[#6366F1]/20'
                    : 'bg-[#0B0C14] text-[#C9D3EE] border-[#727DA1]/10'
                }
              `}
            >
              {skill}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Floating orb decoration */}
      <motion.div
        className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#6366F1]/5 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}
