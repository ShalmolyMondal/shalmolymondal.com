'use client';

import { Project } from '@/lib/data';
import Link from 'next/link';
import SpotlightCard from './SpotlightCard';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <SpotlightCard className="group relative bg-[#171926] rounded-lg overflow-hidden border border-[#727DA1]/15 hover:border-[#6366F1]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/10 hover:scale-102 cursor-pointer h-full">
            {/* Status Badge */}
            {project.status && (
                <div className="absolute top-4 right-4 z-10">
                    <span className="text-[#939DB8] text-xs font-medium px-3 py-1 bg-[#1E2133] rounded-full border border-[#727DA1]/20">
                        {project.status}
                    </span>
                </div>
            )}

            <div className="p-6 flex flex-col h-full">
                {/* Category */}
                <div className="text-[#939DB8] text-xs font-medium mb-3">{project.category}</div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#C9D3EE] transition-colors">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-[#939DB8] text-sm mb-4 line-clamp-2 leading-relaxed">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                        <span
                            key={index}
                            className="px-2.5 py-1 bg-[#1E2133] text-[#939DB8] text-xs rounded border border-[#727DA1]/15"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="px-2.5 py-1 text-[#939DB8] text-xs">
                            +{project.technologies.length - 4}
                        </span>
                    )}
                </div>

                {/* Progress Bar - Minimal */}
                {project.progress < 100 && (
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[#939DB8] text-xs">Progress</span>
                            <span className="text-[#C9D3EE] text-xs font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-[#1E2133] rounded-full h-1 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#6366F1] to-[#4F46E5] rounded-full transition-all duration-500"
                                style={{ width: `${project.progress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-[#727DA1]/15 mt-auto">
                    {project.githubUrl && (
                        <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#939DB8] hover:text-white transition-colors text-xs"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            View Code
                        </Link>
                    )}
                    {project.pdfUrl && (
                        <Link
                            href={project.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#939DB8] hover:text-white transition-colors text-xs"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            View Paper
                        </Link>
                    )}
                    {project.liveUrl && (
                        <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#939DB8] hover:text-white transition-colors text-xs ml-auto"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Live Demo
                        </Link>
                    )}
                </div>
            </div>
        </SpotlightCard>
    );
}
