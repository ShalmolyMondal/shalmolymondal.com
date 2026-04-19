'use client';

import { useEffect, useRef } from 'react';

export default function ShootingStarsBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let animationFrameId: number;

        // Configuration
        const starCount = 150;
        const shootingStarProbability = 0.015; // Chance per frame

        interface Star {
            x: number;
            y: number;
            size: number;
            opacity: number;
            pulseSpeed: number;
            pulseOffset: number;
        }

        interface ShootingStar {
            x: number;
            y: number;
            length: number;
            speed: number;
            angle: number;
            opacity: number;
            color: string;
        }

        let stars: Star[] = [];
        let shootingStars: ShootingStar[] = [];

        const initStars = () => {
            stars = [];
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.8 + 0.2, // Base opacity
                    pulseSpeed: Math.random() * 0.02 + 0.005,
                    pulseOffset: Math.random() * Math.PI * 2,
                });
            }
        };

        const createShootingStar = () => {
            const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2; // roughly 45 degrees
            const speed = Math.random() * 10 + 15;

            // Start from top-left area generally, but trail across
            let startX: number, startY: number;

            if (Math.random() > 0.5) {
                // Start from left
                startX = -50;
                startY = Math.random() * (height * 0.7);
            } else {
                // Start from top
                startX = Math.random() * (width * 0.7);
                startY = -50;
            }

            shootingStars.push({
                x: startX,
                y: startY,
                length: Math.random() * 100 + 50,
                speed: speed,
                angle: angle,
                opacity: 1,
                color: Math.random() > 0.8 ? '#818CF8' : '#6366F1', // Indigo/White variation
            });
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            initStars();
        };

        let time = 0;
        const animate = () => {
            time++;
            ctx.clearRect(0, 0, width, height);

            // Subtle gradient glow at the bottom
            const gradient = ctx.createRadialGradient(width / 2, height * 1.2, 0, width / 2, height * 1.2, width * 0.8);
            gradient.addColorStop(0, 'rgba(99, 102, 241, 0.05)'); // Reduced Indigo glow
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Draw Static Stars
            stars.forEach(star => {
                // Twinkle effect
                const pulse = Math.sin(time * star.pulseSpeed + star.pulseOffset);
                const currentOpacity = star.opacity + pulse * 0.2; // Fluctuate opacity

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, currentOpacity))})`;
                ctx.fill();
            });

            // Update and Draw Shooting Stars
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const star = shootingStars[i];

                // Move
                const velocityX = Math.cos(star.angle) * star.speed;
                const velocityY = Math.sin(star.angle) * star.speed;
                star.x += velocityX;
                star.y += velocityY;
                star.opacity -= 0.015; // Fade out

                // Draw trail
                const gradient = ctx.createLinearGradient(
                    star.x, star.y,
                    star.x - Math.cos(star.angle) * star.length,
                    star.y - Math.sin(star.angle) * star.length
                );
                gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`); // Head
                gradient.addColorStop(0.5, `rgba(99, 102, 241, ${star.opacity * 0.5})`); // Tail mid (Indigo)
                gradient.addColorStop(1, 'transparent'); // Tail end

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(star.x - Math.cos(star.angle) * star.length, star.y - Math.sin(star.angle) * star.length);
                ctx.stroke();

                // Optional: Draw head glow
                ctx.beginPath();
                ctx.arc(star.x, star.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();

                if (star.opacity <= 0 || star.x > width + 100 || star.y > height + 100) {
                    shootingStars.splice(i, 1);
                }
            }

            // Create new shooting star?
            if (Math.random() < shootingStarProbability) {
                createShootingStar();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        let paused = false;
        const handleVisibility = () => {
            if (document.hidden) {
                paused = true;
                cancelAnimationFrame(animationFrameId);
            } else {
                paused = false;
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        window.addEventListener('resize', resize, { passive: true });
        document.addEventListener('visibilitychange', handleVisibility);
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            document.removeEventListener('visibilitychange', handleVisibility);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
        />
    );
}
