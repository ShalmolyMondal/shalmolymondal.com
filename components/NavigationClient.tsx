'use client';

import Link, { useLinkStatus } from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import type { NavItem } from '@/lib/data';
import ThemeToggle from '@/components/ThemeToggle';

interface NavigationClientProps {
    navItems: NavItem[];
    cta: NavItem;
    brandInitial: string;
}

function NavigationPendingIndicator() {
    const { pending } = useLinkStatus();

    return (
        <span className="pointer-events-none absolute right-1.5 top-1/2 inline-flex h-3 w-3 -translate-y-1/2 items-center justify-center" aria-live="polite">
            {pending && (
                <>
                    <span className="h-2.5 w-2.5 animate-spin rounded-full border border-(color:--s-accent-2)/35 border-t-(color:--s-accent-4)" aria-hidden="true" />
                    <span className="sr-only">Loading page</span>
                </>
            )}
        </span>
    );
}

export default function NavigationClient({ navItems, cta, brandInitial }: NavigationClientProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const rafRef = useRef<number>(0);
    const scrolledRef = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = 0;
                const nextScrolled = window.scrollY > 20;
                if (nextScrolled !== scrolledRef.current) {
                    scrolledRef.current = nextScrolled;
                    setScrolled(nextScrolled);
                }
            });
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const isActive = (href: string) => pathname === href;
    const solidNav = scrolled || mobileMenuOpen;

    return (
        <nav
            aria-label="Main navigation"
            className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${solidNav
                    ? 'bg-(--s-bg)/98 border-b border-[#6366F1]/15 shadow-lg shadow-black/20'
                    : 'bg-(--s-bg)/95 border-b border-[#6366F1]/10 lg:bg-transparent lg:border-transparent lg:shadow-none'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 lg:py-5">
                <div className="flex items-center justify-between relative">
                    <Link href="/" prefetch className="flex items-center group" aria-label="Home">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#4F46E5] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#6366F1]/30 group-hover:shadow-[#6366F1]/50 group-hover:scale-110 transition-all duration-300">
                            {brandInitial}
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={`${item.name}-${item.href}`}
                                    href={item.href}
                                    prefetch
                                    aria-current={active ? 'page' : undefined}
                                    className={`relative flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-[color,background-color,border-color] duration-200 ${active
                                            ? 'text-(--s-fg) bg-[#6366F1]/20 border border-[#6366F1]/30'
                                            : 'text-(--s-text-2) hover:text-(--s-fg) hover:bg-[#6366F1]/10 border border-transparent'
                                    }`}
                                >
                                    {item.name}
                                    <NavigationPendingIndicator />
                                    {active && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6366F1] via-(color:--s-accent-2) to-transparent rounded-full"></div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="hidden lg:flex items-center gap-3">
                        <ThemeToggle />
                        <Link
                            href={cta.href}
                            prefetch
                            className="relative flex items-center justify-center px-5 py-2 bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white text-sm font-medium rounded-lg hover:from-(color:--s-accent-2) hover:to-[#6366F1] transition-[transform,box-shadow] duration-200 shadow-lg shadow-[#6366F1]/20 hover:shadow-[#6366F1]/40 hover:scale-105"
                        >
                            {cta.name}
                            <NavigationPendingIndicator />
                        </Link>
                    </div>

                    <div className="lg:hidden flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden text-(--s-fg) p-2 hover:bg-[#6366F1]/10 rounded-lg transition-all"
                        aria-label="Toggle menu"
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-navigation"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div id="mobile-navigation" className="animate-mobile-menu lg:hidden mt-3 pb-3 border-t border-[#6366F1]/10 pt-3 space-y-2">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={`${item.name}-${item.href}`}
                                    href={item.href}
                                    prefetch
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                    }}
                                    aria-current={active ? 'page' : undefined}
                                    className={`relative flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active
                                            ? 'text-(--s-fg) bg-[#6366F1]/20 border border-[#6366F1]/30'
                                            : 'text-(--s-text-2) hover:text-(--s-fg) hover:bg-[#6366F1]/10'
                                        }`}
                                >
                                    {item.name}
                                    <NavigationPendingIndicator />
                                </Link>
                            );
                        })}
                        <Link
                            href={cta.href}
                            prefetch
                            onClick={() => {
                                setMobileMenuOpen(false);
                            }}
                            className="relative flex w-full items-center justify-center px-4 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white text-sm font-medium rounded-lg hover:from-(color:--s-accent-2) hover:to-[#6366F1] transition-colors text-center mt-4"
                        >
                            {cta.name}
                            <NavigationPendingIndicator />
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
