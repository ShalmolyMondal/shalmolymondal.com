import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Card3DTilt from '@/components/Card3DTilt';
import SpotlightCard from '@/components/SpotlightCard';
import MagneticButton from '@/components/MagneticButton';
import FadeIn from '@/components/FadeIn';
import FlowingGradient from '@/components/FlowingGradient';
import { getPersonalInfo } from '@/lib/data';

export default function ContactPage() {
    const personal = getPersonalInfo();

    return (
        <div className="min-h-screen bg-[#0B0C14] text-white flex flex-col relative overflow-hidden">
            <FlowingGradient />
            <Navigation />

            <div className="flex-1 flex items-center justify-center py-20">
                <div className="max-w-2xl w-full mx-auto px-6">
                    <FadeIn direction="up">
                        {/* Floating Card */}
                        <Card3DTilt tiltDegree={8} scale={1.03}>
                            <SpotlightCard className="bg-[#171926] border border-[#727DA1]/15 rounded-2xl p-8 md:p-10 shadow-2xl shadow-[#6366F1]/5">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6366F1]/25 bg-[#6366F1]/5 text-xs text-[#818CF8] tracking-wider uppercase font-medium mb-4">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] animate-pulse"></span>
                                        Let&apos;s Connect
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight"><span className="bg-gradient-to-r from-white via-[#C9D3EE] to-[#6366F1] bg-clip-text text-transparent">Get In Touch</span></h1>
                                    <p className="text-sm text-[#939DB8] leading-relaxed">
                                        I&apos;m always open to new opportunities and collaborations
                                    </p>
                                </div>

                                {/* Contact Info Grid */}
                                <div className="space-y-4 mb-8">
                                    {/* Email */}
                                    <div className="flex items-center gap-4 p-4 bg-[#0B0C14] rounded-xl border border-[#727DA1]/10 hover:border-[#6366F1]/30 transition-all group">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6366F1]/20 to-[#4F46E5]/20 flex items-center justify-center flex-shrink-0 border border-[#6366F1]/20">
                                            <svg className="w-5 h-5 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-semibold text-white mb-0.5">Email</h3>
                                            <a
                                                href={`mailto:${personal.email}`}
                                                className="text-sm text-[#939DB8] hover:text-[#6366F1] transition-colors truncate block"
                                            >
                                                {personal.email}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-center gap-4 p-4 bg-[#0B0C14] rounded-xl border border-[#727DA1]/10">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#818CF8]/20 to-[#6366F1]/20 flex items-center justify-center flex-shrink-0 border border-[#818CF8]/20">
                                            <svg className="w-5 h-5 text-[#818CF8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-semibold text-white mb-0.5">Location</h3>
                                            <p className="text-sm text-[#939DB8]">{personal.location}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="relative mb-8">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-[#727DA1]/10"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs">
                                        <span className="bg-[#171926] px-3 text-[#939DB8]">or connect via</span>
                                    </div>
                                </div>

                                {/* Social Links - Compact Grid */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <MagneticButton href={personal.social.github} external strength={0.2}>
                                        <span className="flex items-center justify-center gap-2 p-3 bg-[#0B0C14] rounded-lg hover:bg-[#1E2133] border border-[#727DA1]/10 hover:border-[#6366F1]/30 transition-all text-sm font-medium group">
                                            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            GitHub
                                        </span>
                                    </MagneticButton>

                                    <MagneticButton href={personal.social.linkedin} external strength={0.2}>
                                        <span className="flex items-center justify-center gap-2 p-3 bg-[#0B0C14] rounded-lg hover:bg-[#1E2133] border border-[#727DA1]/10 hover:border-[#6366F1]/30 transition-all text-sm font-medium group">
                                            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                            LinkedIn
                                        </span>
                                    </MagneticButton>

                                    <MagneticButton href={personal.social.twitter} external strength={0.2}>
                                        <span className="flex items-center justify-center gap-2 p-3 bg-[#0B0C14] rounded-lg hover:bg-[#1E2133] border border-[#727DA1]/10 hover:border-[#6366F1]/30 transition-all text-sm font-medium group">
                                            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                            Twitter
                                        </span>
                                    </MagneticButton>

                                    <MagneticButton href={personal.social.medium} external strength={0.2}>
                                        <span className="flex items-center justify-center gap-2 p-3 bg-[#0B0C14] rounded-lg hover:bg-[#1E2133] border border-[#727DA1]/10 hover:border-[#6366F1]/30 transition-all text-sm font-medium group">
                                            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                                            </svg>
                                            Medium
                                        </span>
                                    </MagneticButton>
                                </div>

                                {/* CTA Button */}
                                <MagneticButton href={`mailto:${personal.email}`} external>
                                    <span className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white hover:from-[#818CF8] hover:to-[#6366F1] rounded-lg font-medium transition-all text-sm shadow-lg shadow-[#6366F1]/20">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Send Me an Email
                                    </span>
                                </MagneticButton>
                            </SpotlightCard>
                        </Card3DTilt>
                    </FadeIn>
                </div>
            </div>

            <Footer />
        </div>
    );
}
