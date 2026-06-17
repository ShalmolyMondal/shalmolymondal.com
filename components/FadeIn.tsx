import { type ReactNode } from 'react';

interface FadeInProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
}

export default function FadeIn({
    children,
    delay = 0,
    duration = 0.6,
    className = '',
}: FadeInProps) {
    // CSS-only approach: Elements are visible immediately, no whileInView blocking
    // Animation happens only if prefers-reduced-motion is not set
    const style = {
        animation: `fadeInSmooth ${duration}s ease-out ${delay}s forwards`,
    };

    return (
        <div
            style={style}
            className={`${className}`}
        >
            {children}
        </div>
    );
}
