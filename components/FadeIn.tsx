import { type ReactNode } from 'react';

interface FadeInProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
}

const directionStyles = {
    up: 'translate-y-0',
    down: 'translate-y-0',
    left: 'translate-x-0',
    right: 'translate-x-0',
    none: '',
};

export default function FadeIn({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    className = '',
    once = true,
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
