"use client";

import { useState, useEffect } from "react";

// Modern geometric crescent + star SVG logo
function IbadahKuLogo({ size = 64 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer ring with gradient */}
            <defs>
                <linearGradient id="lg1" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="lg2" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <radialGradient id="bg" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#064e3b" />
                    <stop offset="100%" stopColor="#022c22" />
                </radialGradient>
            </defs>

            {/* Background circle */}
            <circle cx="32" cy="32" r="31" fill="url(#bg)" />

            {/* Outer ring */}
            <circle cx="32" cy="32" r="29" stroke="url(#lg2)" strokeWidth="1.5" fill="none" />

            {/* Crescent moon */}
            <path
                d="M38 18a14 14 0 1 0 0 28 10.5 10.5 0 1 1 0-28z"
                fill="url(#lg1)"
                filter="url(#glow)"
            />

            {/* Star */}
            <path
                d="M44 20l1.2 3.7H49l-3.1 2.2 1.2 3.7L44 27.4l-3.1 2.2 1.2-3.7-3.1-2.2h3.8z"
                fill="#a7f3d0"
                filter="url(#glow)"
            />
        </svg>
    );
}

export function WelcomeLoader() {
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animate progress bar
        let p = 0;
        const progressId = setInterval(() => {
            p += Math.random() * 18 + 5;
            if (p >= 100) { p = 100; clearInterval(progressId); }
            setProgress(Math.min(p, 100));
        }, 180);

        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => setLoading(false), 600);
        }, 2200);

        return () => { clearTimeout(timer); clearInterval(progressId); };
    }, []);

    if (!loading) return null;

    return (
        <div
            className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#eef2f7] dark:bg-[#020617] transition-opacity duration-700 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            style={{ paddingTop: "var(--safe-area-top)" }}
        >
            {/* ── Background radial glow ── */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.12),transparent)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.18),transparent)] pointer-events-none" />

            {/* ── Orbiting rings (animated) ── */}
            <div className="absolute w-72 h-72 rounded-full border border-emerald-400/10 dark:border-emerald-400/15 animate-spin-slow pointer-events-none" style={{ animationDuration: "12s" }} />
            <div className="absolute w-56 h-56 rounded-full border border-emerald-400/15 dark:border-emerald-400/20 animate-spin-slow pointer-events-none" style={{ animationDuration: "8s", animationDirection: "reverse" }} />

            {/* ── Central Logo ── */}
            <div className="relative">
                {/* Pulse glow behind logo */}
                <div className="absolute inset-0 bg-emerald-400/30 rounded-[2.5rem] blur-2xl animate-pulse scale-110" />
                {/* Logo container */}
                <div className="relative rounded-[2.5rem] shadow-[0_20px_60px_rgba(16,185,129,0.4)] border border-emerald-400/20 overflow-hidden">
                    <IbadahKuLogo size={112} />
                </div>
            </div>

            {/* ── Text ── */}
            <div className="mt-8 flex flex-col items-center gap-1.5">
                <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                    IbadahKu<span className="text-emerald-500">.</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold tracking-widest uppercase">
                    Aplikasi Islami Modern
                </p>
            </div>

            {/* ── Progress bar ── */}
            <div className="mt-10 w-52">
                <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-200 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-center text-[10px] font-bold text-slate-400 dark:text-slate-600 mt-2 tracking-wider">
                    {progress < 100 ? "Memuat..." : "Siap"}
                </p>
            </div>
        </div>
    );
}
