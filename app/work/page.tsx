import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import FadeIn from '@/components/FadeIn';
import SpotlightCard from '@/components/SpotlightCard';
import FlowingGradient from '@/components/FlowingGradient';
import SkillRadar from '@/components/SkillRadar';
import { getProjects, getResearch, getAbout, getSkills } from '@/lib/data';
import type { Education } from '@/lib/data';
import { Briefcase, GraduationCap, Database, Microscope, Code, Monitor } from 'lucide-react';

function getExperienceIcon(role: string) {
    const r = role.toLowerCase();
    if (r.includes('research')) return Microscope;
    if (r.includes('data')) return Database;
    if (r.includes('software') || r.includes('developer')) return Code;
    if (r.includes('academic') || r.includes('scholar')) return GraduationCap;
    if (r.includes('iot')) return Monitor;
    return Briefcase;
}

function InstitutionLogo({ edu }: { edu: Education }) {
    if (edu.logo) {
        const isSvg = edu.logo.endsWith('.svg');
        return (
            <div className={`w-16 h-16 rounded-full flex items-center justify-center p-2.5 ${isSvg ? 'bg-transparent' : 'bg-white/90'}`}>
                <Image
                    src={edu.logo}
                    alt={edu.institution}
                    width={64}
                    height={64}
                    className={`object-contain ${isSvg ? 'brightness-0 invert' : ''}`}
                />
            </div>
        );
    }
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

export default function WorkPage() {
    const projects = getProjects().filter(p => p.featured).slice(0, 3);
    const research = getResearch();
    const about = getAbout();
    const skills = getSkills();

    const skillGroups = [
        { title: 'Languages', items: skills.languages },
        { title: 'Research & ML', items: skills.researchAndML },
        { title: 'Data & IoT', items: skills.dataAndIoT },
        { title: 'Web', items: skills.web },
        { title: 'Tools', items: skills.tools },
    ];

    return (
        <div className="min-h-screen bg-[#0B0C14] text-white relative overflow-hidden">
            <FlowingGradient blobCount={2} animated={false} />
            <Navigation />

            <main className="pt-24 pb-20">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Header */}
                    <FadeIn direction="up">
                        <div className="text-center mb-12">
                            <h1 className="text-5xl md:text-6xl font-bold mb-4"><span className="bg-gradient-to-r from-white via-[#C9D3EE] to-[#6366F1] bg-clip-text text-transparent">My Work</span></h1>
                            <p className="text-lg text-[#939DB8] max-w-2xl mx-auto">
                                From research to production — projects I've built and academic contributions
                            </p>
                            <a
                                href="/resume.pdf"
                                download
                                className="group inline-flex items-center gap-3 mt-6 px-5 py-3 rounded-xl border border-[#727DA1]/15 bg-[#171926]/50 hover:border-[#6366F1]/30 hover:bg-[#171926] transition-all"
                            >
                                <svg className="w-4 h-4 text-[#818CF8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                <span className="text-sm font-medium text-[#C9D3EE] group-hover:text-white transition-colors">Download Resume</span>
                            </a>
                        </div>
                    </FadeIn>

                    {/* Experience Timeline */}
                    <section className="mb-20">
                        <FadeIn direction="up">
                            <h2 className="text-2xl font-bold mb-10">
                                <span className="bg-gradient-to-r from-[#C9D3EE] to-[#818CF8] bg-clip-text text-transparent">Experience</span>
                            </h2>
                        </FadeIn>

                        <div className="relative">
                            {/* Center vertical line — hidden on mobile */}
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#727DA1]/30 -translate-x-1/2" />

                            <div className="space-y-12 md:space-y-16">
                                {about.experience.map((exp, i) => {
                                    const isLeft = i % 2 === 0;
                                    const Icon = getExperienceIcon(exp.role);

                                    return (
                                        <FadeIn key={i} direction="up" delay={0.1 + i * 0.05}>
                                            <div className="relative flex flex-col md:flex-row md:items-start">

                                                {/* Mobile layout */}
                                                <div className="md:hidden flex gap-4 items-start">
                                                    <div className="shrink-0 w-12 h-12 rounded-full border-2 border-[#727DA1]/40 bg-[#0B0C14] flex items-center justify-center z-10">
                                                        <Icon className="w-5 h-5 text-[#818CF8]" />
                                                    </div>
                                                    <div className="flex-1 p-5 rounded-xl bg-[#171926] border border-[#727DA1]/15">
                                                        <h4 className="text-base font-semibold text-white leading-snug">{exp.role}</h4>
                                                        <p className="text-sm text-[#C9D3EE]">{exp.company}</p>
                                                        {exp.location && <p className="text-xs text-[#939DB8] mt-0.5">{exp.location}</p>}
                                                        <p className="text-xs text-[#818CF8] font-medium mt-1">{exp.period}</p>
                                                        <p className="text-sm text-[#939DB8] leading-relaxed mt-3">{exp.description}</p>
                                                    </div>
                                                </div>

                                                {/* Desktop alternating layout */}
                                                <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 w-full items-start">
                                                    {/* Left column */}
                                                    <div className={`flex ${isLeft ? 'justify-end' : 'justify-end items-center'}`}>
                                                        {isLeft ? (
                                                            <div className="relative max-w-md w-full p-5 rounded-xl bg-[#171926] border border-[#727DA1]/15">
                                                                <h4 className="text-base font-semibold text-white leading-snug">{exp.role}</h4>
                                                                <p className="text-sm text-[#C9D3EE]">{exp.company}</p>
                                                                {exp.location && <p className="text-xs text-[#939DB8] mt-0.5">{exp.location}</p>}
                                                                <p className="text-sm text-[#939DB8] leading-relaxed mt-3">{exp.description}</p>
                                                                <div className="absolute top-5 -right-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-8 border-l-[#727DA1]/15" />
                                                            </div>
                                                        ) : (
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
                                                            <span className="text-sm text-[#939DB8] font-medium whitespace-nowrap mt-3">{exp.period}</span>
                                                        ) : (
                                                            <div className="relative max-w-md w-full p-5 rounded-xl bg-[#171926] border border-[#727DA1]/15">
                                                                <h4 className="text-base font-semibold text-white leading-snug">{exp.role}</h4>
                                                                <p className="text-sm text-[#C9D3EE]">{exp.company}</p>
                                                                {exp.location && <p className="text-xs text-[#939DB8] mt-0.5">{exp.location}</p>}
                                                                <p className="text-sm text-[#939DB8] leading-relaxed mt-3">{exp.description}</p>
                                                                <div className="absolute top-5 -left-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-8 border-r-[#727DA1]/15" />
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
                    </section>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#727DA1]/20 to-transparent mb-20" />

                    {/* Education */}
                    <section className="mb-20">
                        <FadeIn direction="up">
                            <h2 className="text-2xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-[#C9D3EE] to-[#818CF8] bg-clip-text text-transparent">Education</span>
                            </h2>
                        </FadeIn>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                            {about.education.map((edu, i) => (
                                <FadeIn key={i} direction="up" delay={i * 0.1} className="flex">
                                    <SpotlightCard className="flex flex-col bg-[#171926] rounded-xl border border-[#727DA1]/15 hover:border-[#6366F1]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/10 text-center p-6 w-full">
                                        <div className="flex justify-center items-center h-24 mb-4">
                                            <InstitutionLogo edu={edu} />
                                        </div>
                                        <h4 className="text-base font-semibold text-white mb-1">{edu.degree}</h4>
                                        <p className="text-sm text-[#C9D3EE] mb-0.5">{edu.institution}</p>
                                        <p className="text-sm text-[#939DB8] mb-2 flex-1">{edu.field}</p>
                                        <p className="text-xs text-[#818CF8] font-medium">{edu.period}</p>
                                    </SpotlightCard>
                                </FadeIn>
                            ))}
                        </div>
                    </section>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#727DA1]/20 to-transparent mb-20" />

                    {/* Skills */}
                    <section className="mb-20">
                        <FadeIn direction="up">
                            <h2 className="text-2xl font-bold mb-8">
                                <span className="bg-gradient-to-r from-[#C9D3EE] to-[#818CF8] bg-clip-text text-transparent">Skills</span>
                            </h2>
                        </FadeIn>

                        {/* Radar */}
                        <FadeIn direction="up" delay={0.1}>
                            <div className="w-full max-w-xl mx-auto">
                                <SkillRadar />
                            </div>
                        </FadeIn>

                        {/* Skill groups */}
                        <FadeIn direction="up" delay={0.2}>
                            <div className="space-y-5 mt-10">
                                {skillGroups.map((group) => (
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
                        </FadeIn>
                    </section>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#727DA1]/20 to-transparent mb-20" />

                    {/* Featured Projects */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6"><span className="bg-gradient-to-r from-[#C9D3EE] to-[#818CF8] bg-clip-text text-transparent">Projects</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project, index) => (
                                <FadeIn key={project.id} direction="up" delay={index * 0.15}>
                                    <ProjectCard project={project} />
                                </FadeIn>
                            ))}
                        </div>
                    </section>

                    {/* Thesis + Publications Section */}
                    <section className="mb-16">
                        {/* Thesis */}
                        <h2 className="text-2xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-[#C9D3EE] to-[#818CF8] bg-clip-text text-transparent">Thesis</span>
                        </h2>
                        <SpotlightCard className="bg-[#171926] border border-[#727DA1]/15 rounded-xl p-6 mb-8">
                            <p className="text-[#C9D3EE] text-sm leading-relaxed">
                                {research.description}
                            </p>
                            {research.thesis.url && (
                                <a
                                    href={research.thesis.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[#6366F1] hover:text-[#818CF8] text-sm font-medium mt-4 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Read Thesis
                                </a>
                            )}
                        </SpotlightCard>

                        {/* Publications */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-[#C9D3EE] to-[#818CF8] bg-clip-text text-transparent">Publications</span>
                            </h2>
                            <div className="space-y-8">
                                {research.publications.map((pub) => (
                                    <SpotlightCard key={pub.id}>
                                        <div className="bg-[#171926] border border-[#727DA1]/15 rounded-xl p-6 hover:border-[#6366F1]/30 transition-all group">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="px-2 py-0.5 bg-[#6366F1]/15 text-[#818CF8] text-xs font-medium rounded border border-[#6366F1]/20">
                                                    {pub.venue}
                                                </span>
                                                <span className="text-[#939DB8] text-xs">{pub.year}</span>
                                                <span className="text-[#939DB8] text-xs">· {pub.type}</span>
                                            </div>
                                            <h4 className="text-base font-medium text-white mb-3 group-hover:text-[#C9D3EE] transition-colors leading-snug">
                                                {pub.title}
                                            </h4>
                                            <p className="text-[#939DB8] text-sm mb-4">{pub.authors}</p>

                                            <div className="flex items-center gap-3 pt-2">
                                                {pub.doi && (
                                                    <a
                                                        href={pub.doi}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#6366F1]/15 text-[#818CF8] text-xs font-medium rounded border border-[#6366F1]/30 hover:border-[#6366F1]/60 hover:text-[#C9D3EE] transition-colors"
                                                    >
                                                        DOI
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </a>
                                                )}
                                                <a
                                                    href={pub.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-[#6366F1] hover:text-[#818CF8] text-xs font-medium transition-colors"
                                                >
                                                    View Publication
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
