import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FlowingGradient from '@/components/FlowingGradient';
import { getPersonalInfo } from '@/lib/data';
import { BookOpen, Headphones, Heart } from 'lucide-react';

export default function AboutPage() {
    const personal = getPersonalInfo();

    return (
        <div className="min-h-screen bg-[#0B0C14] text-white relative overflow-hidden">
            <FlowingGradient blobCount={2} animated={false} />
            <Navigation />

            <main className="pt-24 pb-20">
                <div className="max-w-3xl mx-auto px-6">

                    {/* Profile Card */}
                    <div className="bg-[#171926] border border-[#727DA1]/15 rounded-2xl p-6 md:p-8 mb-16">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="w-24 h-32 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#4F46E5] flex-shrink-0 overflow-hidden">
                                <Image
                                    src="/profile.jpg"
                                    alt={personal.name}
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>
                            <div className="flex-1 w-full">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h1 className="text-2xl font-bold text-white">{personal.name}</h1>
                                        <p className="text-[#939DB8] text-base">Data Engineer, Research, Creative Soul</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <a href={personal.social.github} target="_blank" rel="noopener noreferrer" className="text-[#939DB8] hover:text-white transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                        </a>
                                        <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#939DB8] hover:text-white transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                        </a>
                                        <a href="https://www.instagram.com/shalmolymondal/" target="_blank" rel="noopener noreferrer" className="text-[#939DB8] hover:text-white transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                                        </a>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-[#939DB8]">
                                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{personal.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[#939DB8]">
                                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span>{personal.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* About Me */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-5">
                            <span className="bg-gradient-to-r from-[#C9D3EE] to-[#818CF8] bg-clip-text text-transparent">About Me</span>
                        </h2>
                        <div className="space-y-4 text-[#939DB8] leading-relaxed">
                            <p>Hey There! I&apos;m Shalmoly, a Data Engineer, Research, Creative Soul based in Melbourne.</p>
                            <p>I work with data and build systems that make complex information easy to digest. I&apos;m naturally curious and enjoy experimenting with new tools and technologies.</p>
                            <p>Beyond tech, I find balance in creativity and movement. I&apos;m a moderately skilled keyboard player, an art enthusiast, and an avid reader. I enjoy designing intricate mandalas, and unwinding with coffee and a good book. These slower rituals ground me and bring a bit of calm to everyday chaos. I also love Zumba to keep me energised.</p>
                            <p>So, a warm welcome to my calm corner of the web, a space where I bring together the different things I enjoy: my work, art, and writing. If something here resonates with you, I&apos;m glad you stopped by.</p>
                        </div>
                    </section>

                    {/* A few small things about me */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-2">
                            <span className="bg-gradient-to-r from-[#C9D3EE] to-[#818CF8] bg-clip-text text-transparent">A few small things about me</span>
                        </h2>
                        <p className="text-sm text-[#939DB8] mb-6">Little moments that bring me joy.</p>

                        <div className="grid grid-cols-4 gap-4">
                            <div className="flex flex-col items-center text-center py-8 px-4 rounded-2xl bg-[#171926] border border-[#727DA1]/10 hover:border-[#6366F1]/40 hover:bg-[#1d1f33] hover:scale-105 hover:shadow-lg hover:shadow-[#6366F1]/10 transition-all duration-300">
                                <svg className="w-10 h-10 mb-4" viewBox="0 0 48 48" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M8 20h24v14a6 6 0 01-6 6H14a6 6 0 01-6-6V20z" stroke="#D97706" strokeWidth="2" />
                                    <path d="M32 24h4a4 4 0 010 8h-4" stroke="#D97706" strokeWidth="2" />
                                    <path d="M18 14c0-2 1.5-4 1.5-4s1.5 2 1.5 4" stroke="#D97706" strokeWidth="1.5" />
                                    <path d="M22 12c0-2 1.5-4 1.5-4s1.5 2 1.5 4" stroke="#D97706" strokeWidth="1.5" />
                                    <path d="M20 8l0-2" stroke="#EF4444" strokeWidth="2" /><circle cx="20" cy="5" r="1.5" fill="#EF4444" />
                                </svg>
                                <p className="text-sm font-medium leading-snug text-[#C9D3EE]">Coffee + books calm me down</p>
                            </div>
                            <div className="flex flex-col items-center text-center py-8 px-4 rounded-2xl bg-[#171926] border border-[#727DA1]/10 hover:border-[#6366F1]/40 hover:bg-[#1d1f33] hover:scale-105 hover:shadow-lg hover:shadow-[#6366F1]/10 transition-all duration-300">
                                <svg className="w-10 h-10 mb-4" viewBox="0 0 48 48" fill="none" stroke="#34D399" strokeWidth="0.8">
                                    <circle cx="24" cy="24" r="3" fill="#34D399" stroke="none" />
                                    <circle cx="24" cy="24" r="6" />
                                    {[0,45,90,135,180,225,270,315].map(a => <ellipse key={`i${a}`} cx="24" cy="17" rx="2.5" ry="5" transform={`rotate(${a} 24 24)`} strokeWidth="1" />)}
                                    {[0,45,90,135,180,225,270,315].map(a => <ellipse key={`o${a}`} cx="24" cy="12" rx="3" ry="8" transform={`rotate(${a} 24 24)`} />)}
                                    {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map(a => <ellipse key={`l${a}`} cx="24" cy="9" rx="2" ry="5.5" transform={`rotate(${a} 24 24)`} />)}
                                </svg>
                                <p className="text-sm font-medium leading-snug text-[#C9D3EE]">I design mandalas to unwind</p>
                            </div>
                            <div className="flex flex-col items-center text-center py-8 px-4 rounded-2xl bg-[#171926] border border-[#727DA1]/10 hover:border-[#6366F1]/40 hover:bg-[#1d1f33] hover:scale-105 hover:shadow-lg hover:shadow-[#6366F1]/10 transition-all duration-300">
                                <svg className="w-10 h-10 mb-4" viewBox="0 0 48 48" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="8" y="6" width="22" height="36" rx="3" stroke="#60A5FA" strokeWidth="2" />
                                    <path d="M14 16h10M14 22h10M14 28h6" stroke="#60A5FA" strokeWidth="2" />
                                    <circle cx="34" cy="30" r="8" stroke="#818CF8" strokeWidth="2" fill="#171926" />
                                    <path d="M31 30l2 2 4-4" stroke="#818CF8" strokeWidth="2" />
                                </svg>
                                <p className="text-sm font-medium leading-snug text-[#C9D3EE]">I love organizing things</p>
                            </div>
                            <div className="flex flex-col items-center text-center py-8 px-4 rounded-2xl bg-[#171926] border border-[#727DA1]/10 hover:border-[#6366F1]/40 hover:bg-[#1d1f33] hover:scale-105 hover:shadow-lg hover:shadow-[#6366F1]/10 transition-all duration-300">
                                <svg className="w-10 h-10 mb-4" viewBox="0 0 48 48" fill="none" stroke="#FB923C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="24" cy="10" r="4" />
                                    <path d="M18 22l6 4 6-4" />
                                    <path d="M24 26v8" />
                                    <path d="M20 40l4-6 4 6" />
                                    <path d="M16 18l4 4" />
                                    <path d="M32 18l-4 4" />
                                </svg>
                                <p className="text-sm font-medium leading-snug text-[#C9D3EE]">Zumba recharges my mind</p>
                            </div>
                        </div>
                    </section>

                    {/* Currently */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-2">
                            <span className="bg-gradient-to-r from-[#C9D3EE] to-[#818CF8] bg-clip-text text-transparent">Currently</span>
                        </h2>
                        <p className="text-sm text-[#939DB8] mb-6">What I&apos;m into right now.</p>

                        <div className="space-y-4">
                            {[
                                { icon: BookOpen, label: 'Reading', value: 'Let Them Theory, Mel Robbins', color: 'text-emerald-400', border: 'border-emerald-500/20' },
                                { icon: Headphones, label: 'Listening', value: 'A Thousand Years, Christina Perri', color: 'text-violet-400', border: 'border-violet-500/20' },
                                { icon: Heart, label: 'Enjoying', value: 'Quiet Afternoons with my New Born', color: 'text-rose-400', border: 'border-rose-500/20' },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.label} className={`flex items-center gap-4 p-4 rounded-xl bg-[#171926]/50 border-l-2 ${item.border} hover:scale-[1.02] hover:bg-[#171926] transition-all duration-200`}>
                                        <Icon className={`w-5 h-5 ${item.color} flex-shrink-0`} strokeWidth={1.5} />
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-[#939DB8] mb-0.5">{item.label}</p>
                                            <p className="text-sm text-[#C9D3EE]">{item.value}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                </div>
            </main>

            <Footer />
        </div>
    );
}
