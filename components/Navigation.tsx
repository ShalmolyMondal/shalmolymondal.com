'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Work', href: '/work' },
    { name: 'Art', href: '/art' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = 0;
                setScrolled(window.scrollY > 20);
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const isActive = (href: string) => pathname === href;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-[#0B0C14]/70 backdrop-blur-xl border-b border-[#6366F1]/10'
                : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 py-5">
                <div className="flex items-center justify-between relative">
                    {/* Logo/Brand - Minimal */}
                    <Link href="/" className="flex items-center group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#4F46E5] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#6366F1]/30 group-hover:shadow-[#6366F1]/50 group-hover:scale-110 transition-all duration-300">
                            S
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${active
                                            ? 'text-white bg-[#6366F1]/20 border border-[#6366F1]/30'
                                            : 'text-[#C9D3EE] hover:text-white hover:bg-[#6366F1]/10 border border-transparent'
                                        }`}
                                >
                                    {item.name}
                                    {active && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6366F1] via-[#818CF8] to-transparent rounded-full"></div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Section - Desktop CTA */}
                    <div className="hidden lg:flex items-center">
                        <Link
                            href="/contact"
                            className="px-5 py-2 bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white text-sm font-medium rounded-lg hover:from-[#818CF8] hover:to-[#6366F1] transition-all duration-300 shadow-lg shadow-[#6366F1]/20 hover:shadow-[#6366F1]/40 hover:scale-105"
                        >
                            Get in Touch
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden text-white p-2 hover:bg-[#6366F1]/10 rounded-lg transition-all"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {mobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden mt-4 pb-4 border-t border-[#6366F1]/10 pt-4 space-y-2">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${active
                                            ? 'text-white bg-[#6366F1]/20 border border-[#6366F1]/30'
                                            : 'text-[#C9D3EE] hover:text-white hover:bg-[#6366F1]/10'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                        <Link
                            href="/contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block w-full px-4 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white text-sm font-medium rounded-lg hover:from-[#818CF8] hover:to-[#6366F1] transition-all text-center mt-4"
                        >
                            Get in Touch
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
