'use client';

import { useState, memo, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, GraduationCap, Wrench, Trophy, Code, Database, Microscope, FlaskConical, Monitor } from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import SpotlightCard from '@/components/SpotlightCard';
import type { Skills, Experience, Education } from '@/lib/data';

interface MyJourneySectionProps {
  skills: Skills;
  experience: Experience[];
  education: Education[];
}

const tabs = [
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Wrench },
] as const;

type TabId = (typeof tabs)[number]['id'];

function InstitutionLogo({ edu }: { edu: Education }) {
  if (edu.logo) {
    const isSvg = edu.logo.endsWith('.svg');
    return (
      <div className={`w-20 h-20 rounded-full flex items-center justify-center p-3 ${isSvg ? 'bg-transparent' : 'bg-white/90'}`}>
        <Image
          src={edu.logo}
          alt={edu.institution}
          width={80}
          height={80}
          className={`object-contain ${isSvg ? 'brightness-0 invert' : ''}`}
        />
      </div>
    );
  }
  // Fallback: styled initials
  const initials = edu.institution
    .split(/[\s()]+/)
    .filter(w => w.length > 2 && w[0] === w[0].toUpperCase())
    .map(w => w[0])
    .slice(0, 3)
    .join('');
  return (
    <div className="w-14 h-14 rounded-full bg-[#6366F1]/15 border border-[#6366F1]/25 flex items-center justify-center">
      <span className="text-sm font-bold text-[#818CF8] tracking-wide">{initials}</span>
    </div>
  );
}

const SkillsTab = memo(function SkillsTab({ skills }: { skills: Skills }) {
  const groups = [
    { title: 'Languages', items: skills.languages },
    { title: 'Research & ML', items: skills.researchAndML },
    { title: 'Data & IoT', items: skills.dataAndIoT },
    { title: 'Web', items: skills.web },
    { title: 'Tools', items: skills.tools },
  ];

  return (
    <div className="space-y-5">
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col sm:flex-row sm:items-start gap-3">
          <h4 className="text-xs font-medium text-[#818CF8] uppercase tracking-wider sm:w-32 shrink-0 pt-1.5">{group.title}</h4>
          <div className="flex flex-wrap gap-2">
            {group.items.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-sm text-[#C9D3EE] bg-[#171926] border border-[#727DA1]/20 rounded-lg hover:border-[#6366F1]/40 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

function getExperienceIcon(role: string) {
  const r = role.toLowerCase();
  if (r.includes('research')) return Microscope;
  if (r.includes('data')) return Database;
  if (r.includes('software') || r.includes('developer')) return Code;
  if (r.includes('academic') || r.includes('scholar')) return GraduationCap;
  if (r.includes('iot')) return Monitor;
  return Briefcase;
}

const ExperienceTab = memo(function ExperienceTab({ experience }: { experience: Experience[] }) {
  return (
    <div className="relative">
      {/* Center vertical line — hidden on mobile */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#727DA1]/30 -translate-x-1/2" />

      <div className="space-y-12 md:space-y-16">
        {experience.map((exp, i) => {
          const isLeft = i % 2 === 0;
          const Icon = getExperienceIcon(exp.role);

          return (
            <FadeIn key={i} direction="up" delay={0.1 + i * 0.05}>
              <div className="relative flex flex-col md:flex-row md:items-start">

                {/* ── Mobile layout (stacked) ── */}
                <div className="md:hidden flex gap-4 items-start">
                  {/* Icon circle */}
                  <div className="shrink-0 w-12 h-12 rounded-full border-2 border-[#727DA1]/40 bg-[#0B0C14] flex items-center justify-center z-10">
                    <Icon className="w-5 h-5 text-[#818CF8]" />
                  </div>
                  {/* Card */}
                  <div className="flex-1 p-5 rounded-xl bg-[#171926] border border-[#727DA1]/15">
                    <h4 className="text-base font-semibold text-white leading-snug">{exp.role}</h4>
                    <p className="text-sm text-[#C9D3EE]">{exp.company}</p>
                    {exp.location && <p className="text-xs text-[#939DB8] mt-0.5">{exp.location}</p>}
                    <p className="text-xs text-[#818CF8] font-medium mt-1">{exp.period}</p>
                    <p className="text-sm text-[#939DB8] leading-relaxed mt-3">{exp.description}</p>
                  </div>
                </div>

                {/* ── Desktop layout (alternating) ── */}
                <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 w-full items-start">

                  {/* Left column */}
                  <div className={`flex ${isLeft ? 'justify-end' : 'justify-end items-center'}`}>
                    {isLeft ? (
                      /* Card on left */
                      <div className="relative max-w-md w-full p-5 rounded-xl bg-[#171926] border border-[#727DA1]/15">
                        <h4 className="text-base font-semibold text-white leading-snug">{exp.role}</h4>
                        <p className="text-sm text-[#C9D3EE]">{exp.company}</p>
                        {exp.location && <p className="text-xs text-[#939DB8] mt-0.5">{exp.location}</p>}
                        <p className="text-sm text-[#939DB8] leading-relaxed mt-3">{exp.description}</p>
                        {/* Arrow pointing right */}
                        <div className="absolute top-5 -right-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-[#727DA1]/15" />
                      </div>
                    ) : (
                      /* Date on left */
                      <span className="text-sm text-[#939DB8] font-medium whitespace-nowrap mt-3">{exp.period}</span>
                    )}
                  </div>

                  {/* Center icon */}
                  <div className="shrink-0 w-12 h-12 rounded-full border-2 border-[#727DA1]/40 bg-[#0B0C14] flex items-center justify-center z-10">
                    <Icon className="w-5 h-5 text-[#818CF8]" />
                  </div>

                  {/* Right column */}
                  <div className={`flex ${isLeft ? 'items-center' : 'justify-start'}`}>
                    {isLeft ? (
                      /* Date on right */
                      <span className="text-sm text-[#939DB8] font-medium whitespace-nowrap mt-3">{exp.period}</span>
                    ) : (
                      /* Card on right */
                      <div className="relative max-w-md w-full p-5 rounded-xl bg-[#171926] border border-[#727DA1]/15">
                        <h4 className="text-base font-semibold text-white leading-snug">{exp.role}</h4>
                        <p className="text-sm text-[#C9D3EE]">{exp.company}</p>
                        {exp.location && <p className="text-xs text-[#939DB8] mt-0.5">{exp.location}</p>}
                        <p className="text-sm text-[#939DB8] leading-relaxed mt-3">{exp.description}</p>
                        {/* Arrow pointing left */}
                        <div className="absolute top-5 -left-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-[#727DA1]/15" />
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
});

const EducationTab = memo(function EducationTab({ education }: { education: Education[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {education.map((edu, i) => (
        <SpotlightCard key={i} className="bg-[#171926] rounded-xl border border-[#727DA1]/15 hover:border-[#6366F1]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/10 hover:scale-102 text-center p-6">
          {/* Logo / Initials */}
          <div className="flex justify-center items-center h-24 mb-4">
            <InstitutionLogo edu={edu} />
          </div>

          {/* Details */}
          <h4 className="text-base font-semibold text-white mb-1">{edu.degree}</h4>
          <p className="text-sm text-[#C9D3EE] mb-0.5">{edu.institution}</p>
          <p className="text-sm text-[#939DB8] mb-2">{edu.field}</p>
          <p className="text-xs text-[#818CF8] font-medium">{edu.period}</p>
        </SpotlightCard>
      ))}
    </div>
  );
});

export function MyJourneySection({ skills, experience, education }: MyJourneySectionProps) {
  const [activeTab, setActiveTab] = useState<TabId>('education');

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-[#727DA1]/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Centered header */}
        <FadeIn direction="up" delay={0.1}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#171926] border border-[#727DA1]/20 mb-5">
              <Trophy className="w-7 h-7 text-[#818CF8]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-[#C9D3EE] to-[#818CF8] bg-clip-text text-transparent">My Journey</span>
            </h2>
            <p className="text-[#939DB8] text-base max-w-xl mx-auto">
              From curious student to data engineer — the milestones that shaped my career
            </p>
          </div>
        </FadeIn>

        {/* Tabs */}
        <FadeIn direction="up" delay={0.2}>
          <div className="flex justify-center gap-2 mb-10">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/20'
                      : 'bg-[#171926] text-[#939DB8] border border-[#727DA1]/20 hover:border-[#6366F1]/40 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'skills' && <SkillsTab skills={skills} />}
            {activeTab === 'experience' && <ExperienceTab experience={experience} />}
            {activeTab === 'education' && <EducationTab education={education} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
