'use client';

import { useEffect, useRef } from 'react';

export default function HeroBlob() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resize();
        window.addEventListener('resize', resize);

        // Organic blob shapes — darker than background like ZBS
        const blobs = [
            { x: 0.48, y: 0.38, radius: 0.22, speed: 0.0008, phase: 0, driftX: 0.03, driftY: 0.02 },
            { x: 0.55, y: 0.52, radius: 0.26, speed: 0.0006, phase: 2.0, driftX: 0.04, driftY: 0.03 },
            { x: 0.42, y: 0.55, radius: 0.18, speed: 0.001, phase: 4.0, driftX: 0.025, driftY: 0.035 },
            { x: 0.58, y: 0.40, radius: 0.20, speed: 0.0007, phase: 1.0, driftX: 0.035, driftY: 0.025 },
            { x: 0.50, y: 0.48, radius: 0.30, speed: 0.0005, phase: 3.0, driftX: 0.02, driftY: 0.02 },
        ];

        // Floating particles — more visible
        const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; pulseSpeed: number; pulsePhase: number }[] = [];
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 2.5 + 1,
                alpha: Math.random() * 0.5 + 0.2,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2,
            });
        }

        const drawOrganicBlob = (
            cx: number, cy: number, baseRadius: number,
            t: number, phase: number
        ) => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const centerX = cx * w;
            const centerY = cy * h;
            const r = baseRadius * Math.min(w, h);

            ctx.beginPath();
            const points = 180;
            for (let i = 0; i <= points; i++) {
                const angle = (i / points) * Math.PI * 2;
                // Multiple noise layers for organic deformation
                const n1 = Math.sin(angle * 3 + t * 1.2 + phase) * 0.18;
                const n2 = Math.sin(angle * 5 + t * 0.8 + phase * 1.5) * 0.10;
                const n3 = Math.cos(angle * 2 + t * 0.5 + phase * 0.8) * 0.14;
                const n4 = Math.sin(angle * 7 + t * 0.3 + phase * 2.0) * 0.05;
                const currentR = r * (1 + n1 + n2 + n3 + n4);
                const x = centerX + Math.cos(angle) * currentR;
                const y = centerY + Math.sin(angle) * currentR;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();

            // Dark fill — noticeably lighter than background for 3D depth
            const grad = ctx.createRadialGradient(
                centerX - r * 0.3, centerY - r * 0.3, r * 0.05,
                centerX, centerY, r * 1.1
            );
            grad.addColorStop(0, 'rgba(40, 44, 68, 0.95)');
            grad.addColorStop(0.3, 'rgba(30, 33, 51, 0.92)');
            grad.addColorStop(0.6, 'rgba(23, 25, 38, 0.88)');
            grad.addColorStop(0.85, 'rgba(16, 17, 28, 0.7)');
            grad.addColorStop(1, 'rgba(11, 12, 20, 0)');
            ctx.fillStyle = grad;
            ctx.fill();

            // Indigo highlight on the surface
            const highlightGrad = ctx.createRadialGradient(
                centerX - r * 0.25, centerY - r * 0.3, 0,
                centerX, centerY, r * 0.9
            );
            highlightGrad.addColorStop(0, 'rgba(99, 102, 241, 0.12)');
            highlightGrad.addColorStop(0.4, 'rgba(99, 102, 241, 0.05)');
            highlightGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = highlightGrad;
            ctx.fill();
        };

        const animate = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            time += 1;

            ctx.clearRect(0, 0, w, h);

            // Background
            ctx.fillStyle = '#0B0C14';
            ctx.fillRect(0, 0, w, h);

            // Draw organic morphing dark blobs
            for (const blob of blobs) {
                const offsetX = Math.sin(time * blob.speed * 2 + blob.phase) * blob.driftX;
                const offsetY = Math.cos(time * blob.speed * 1.5 + blob.phase * 0.7) * blob.driftY;
                const radiusPulse = Math.sin(time * blob.speed + blob.phase) * 0.02;
                drawOrganicBlob(
                    blob.x + offsetX,
                    blob.y + offsetY,
                    blob.radius + radiusPulse,
                    time * 0.012,
                    blob.phase
                );
            }

            // Draw floating particles — bright enough to see
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around
                if (p.x < -10) p.x = w + 10;
                if (p.x > w + 10) p.x = -10;
                if (p.y < -10) p.y = h + 10;
                if (p.y > h + 10) p.y = -10;

                // Pulsing alpha
                const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.15 + 0.85;
                const currentAlpha = p.alpha * pulse;

                // Glow effect
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(99, 102, 241, ${currentAlpha * 0.08})`;
                ctx.fill();

                // Core dot
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(201, 211, 238, ${currentAlpha})`;
                ctx.fill();
            }

            // Subtle vignette
            const vignette = ctx.createRadialGradient(w / 2, h / 2, h * 0.35, w / 2, h / 2, h * 0.85);
            vignette.addColorStop(0, 'transparent');
            vignette.addColorStop(1, 'rgba(11, 12, 20, 0.6)');
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, w, h);

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
        />
    );
}
