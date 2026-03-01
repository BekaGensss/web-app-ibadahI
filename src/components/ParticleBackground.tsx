"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes"; // Assuming you have next-themes, if not we fall back to dark class check

export function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mounted, setMounted] = useState(false);
    const { theme, systemTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        // Determine active theme color for particles
        const currentTheme = theme === 'system' ? systemTheme : theme;
        const isDark = currentTheme === 'dark';

        // Settings
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 30 : 70; // Fewer particles on mobile
        const connectionDistance = isMobile ? 100 : 150;
        const particleColor = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(16, 185, 129, 0.5)"; // White in dark, Emerald in light
        const lineColor = isDark ? "rgba(255, 255, 255, " : "rgba(16, 185, 129, ";

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;

            constructor(width: number, height: number) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 1; // Speed X
                this.vy = (Math.random() - 0.5) * 1; // Speed Y
                this.radius = Math.random() * 2 + 1; // Size 1-3px
            }

            update(width: number, height: number) {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.fill();
            }
        }

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        };

        const drawLines = (ctx: CanvasRenderingContext2D) => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distanceX2 = dx * dx + dy * dy;

                    if (distanceX2 < connectionDistance * connectionDistance) {
                        // Calculate opacity based on distance (closer = more opaque)
                        const opacity = 1 - Math.sqrt(distanceX2) / connectionDistance;
                        // Limit opaccity for a subtle web (make light mode more visible)
                        ctx.beginPath();
                        ctx.strokeStyle = `${lineColor}${opacity * (isDark ? 0.2 : 0.6)})`;
                        ctx.lineWidth = isDark ? 1 : 1.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.update(canvas.width, canvas.height);
                p.draw(ctx);
            });
            drawLines(ctx);

            animationFrameId = requestAnimationFrame(animate);
        };

        // Initialize Native Canvas
        window.addEventListener("resize", resize);
        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mounted, theme, systemTheme]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-5]">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-60"
            />
            {/* Subtle glow orbs behind the web to give it depth */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/10 dark:bg-blue-600/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-emerald-300/10 dark:bg-emerald-600/5 rounded-full blur-[120px] -z-10 delay-1000 animate-pulse"></div>
        </div>
    );
}
