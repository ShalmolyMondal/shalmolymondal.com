'use client';

import React, { ReactNode } from 'react';
import { BackgroundBeams } from '@/components/ui/background-beams';

interface CosmicBackgroundProps {
    children?: ReactNode;
    className?: string;
}

export default function CosmicBackground({ children, className = '' }: CosmicBackgroundProps) {
    return (
        <div className={`relative w-full overflow-hidden bg-gradient-to-b from-[#0B0C14] via-[#0f101f] to-[#161a31] ${className}`}>
            <style jsx>{`
                @keyframes cosmicBlob1 {
                    0%, 100% { opacity: 0.5; transform: scale(0.8); }
                    50% { opacity: 0.6; transform: scale(1.05); }
                }
                @keyframes cosmicBlob2 {
                    0%, 100% { opacity: 0.4; transform: scale(0.9); }
                    50% { opacity: 0.5; transform: scale(1.08); }
                }
            `}</style>

            <BackgroundBeams className="opacity-20" />

            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">

                {/* Deep Galaxy Blue/Purple Blob - Top Left */}
                <div
                    className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-800/40 via-[#1E1B4B]/30 to-transparent blur-[80px] will-change-transform"
                    style={{ animation: 'cosmicBlob1 20s ease-in-out infinite' }}
                />

                {/* Mystic Teal/Cyan Blob - Bottom Right */}
                <div
                    className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-800/30 via-cyan-800/20 to-transparent blur-[100px] will-change-transform"
                    style={{ animation: 'cosmicBlob2 22s ease-in-out 2s infinite' }}
                />

                {/* Noise Texture Overlay for Premium Feel */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

            </div>

            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    );
}
