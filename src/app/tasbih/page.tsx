"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Target, Pocket } from "lucide-react";

const DZIKIR_PRESETS = [
    { label: "Subhanallah", arabic: "سُبْحَانَ اللَّهِ", target: 33, color: "teal" },
    { label: "Alhamdulillah", arabic: "الْحَمْدُ لِلَّهِ", target: 33, color: "emerald" },
    { label: "Allahu Akbar", arabic: "اللَّهُ أَكْبَرُ", target: 34, color: "blue" },
    { label: "Istighfar", arabic: "أَسْتَغْفِرُ اللَّهَ", target: 100, color: "purple" },
] as const;

export default function TasbihPage() {
    const [count, setCount] = useState(0);
    const [target, setTarget] = useState(33);
    const [isAnimating, setIsAnimating] = useState(false);
    const [activePreset, setActivePreset] = useState<string | null>("Subhanallah");
    const [dzikirLabel, setDzikirLabel] = useState("Subhanallah");

    // Load from local storage on mount
    useEffect(() => {
        const savedCount = localStorage.getItem("tasbihCount");
        const savedTarget = localStorage.getItem("tasbihTarget");
        if (savedCount) setCount(parseInt(savedCount));
        if (savedTarget) setTarget(parseInt(savedTarget));
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem("tasbihCount", count.toString());
        localStorage.setItem("tasbihTarget", target.toString());
    }, [count, target]);

    const handleTap = () => {
        // Haptic feedback if supported by browser/device
        if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50); // Short vibration

            // Longer vibration when target reached
            if (count + 1 === target) {
                window.navigator.vibrate([100, 50, 100]);
            }
        }

        setCount((prev) => prev + 1);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 150); // Reset animation state quickly
    };

    const handleReset = () => {
        setCount(0);
    };

    const handlePresetSelect = (preset: typeof DZIKIR_PRESETS[number]) => {
        setActivePreset(preset.label);
        setDzikirLabel(preset.label);
        setTarget(preset.target);
        setCount(0); // reset count when switching dzikir
    };

    const handleTargetChange = (newTarget: number) => {
        setTarget(newTarget);
        setActivePreset(null); // custom target, clear preset
    };

    // Calculate progress percentage
    const progress = Math.min((count / target) * 100, 100);

    return (
        <div className="flex flex-col gap-10 pb-16 items-center max-w-2xl mx-auto w-full">
            {/* Ultra Premium Header Section */}
            <div className="relative w-full overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 p-8 md:p-12 text-white shadow-[0_20px_60px_-15px_rgba(20,184,166,0.2)] border border-teal-500/20 group text-center">

                {/* Animated Glow Orbs Component */}
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[400px] h-[400px] bg-teal-500/20 rounded-full blur-[80px] mix-blend-screen pointer-events-none group-hover:bg-teal-400/20 transition-colors duration-1000"></div>

                <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm font-semibold backdrop-blur-xl border border-white/10 text-teal-100 w-fit">
                        <Pocket className="w-4 h-4 text-teal-400" />
                        <span>Penghitung Dzikir</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-teal-100 to-teal-300 drop-shadow-[0_0_30px_rgba(20,184,166,0.3)]">
                        Tasbih Digital
                    </h1>
                    <p className="text-teal-100/80 text-lg leading-relaxed font-medium">
                        Hitung dzikir Anda dengan mudah di mana saja, dilengkapi haptic feedback dan target progres.
                    </p>
                </div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>
            </div>

            {/* Dzikir Quick-Select Presets */}
            <div className="w-full">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 px-1">Pilih Dzikir</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {DZIKIR_PRESETS.map(preset => {
                        const active = activePreset === preset.label;
                        return (
                            <button
                                key={preset.label}
                                onClick={() => handlePresetSelect(preset)}
                                className={`flex flex-col items-center gap-1.5 p-3 sm:p-4 rounded-2xl border font-semibold text-xs transition-all duration-200 ${active
                                    ? "bg-teal-50 dark:bg-teal-900/30 border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-300 shadow-md scale-[1.02]"
                                    : "bg-white/50 dark:bg-slate-800/50 border-white/60 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-teal-50/50 dark:hover:bg-slate-700/50 hover:border-teal-200"}`}
                            >
                                <span className="font-arab text-lg leading-none">{preset.arabic}</span>
                                <span className="text-[11px] font-bold">{preset.label}</span>
                                <span className="text-[10px] opacity-60">{preset.target}x</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="w-full mt-2 flex flex-col items-center relative z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/10 dark:bg-teal-500/15 blur-[100px] -z-10 rounded-full pointer-events-none"></div>

                {/* Target reached message (moved above button) */}
                <div className={`mb-8 text-center transition-all duration-700 ${count >= target && count > 0 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"}`}>
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 text-white font-bold shadow-[0_10px_30px_-10px_rgba(20,184,166,0.6)] border border-teal-300">
                        <span className="text-xl">🎉</span> Target {target} Tercapai!
                    </div>
                </div>

                {/* Main Counter Button */}
                <div className="relative group">
                    <div className={`absolute inset-0 blur-2xl transition-all duration-500 rounded-full ${isAnimating ? "bg-teal-400 opacity-60 scale-105" : "bg-teal-500/40 opacity-30 group-hover:bg-teal-400/50 group-hover:scale-110 group-hover:opacity-50"}`}></div>
                    <button
                        onClick={handleTap}
                        className={`relative flex items-center justify-center w-72 h-72 md:w-80 md:h-80 rounded-full shadow-[inset_0_-10px_20px_rgba(0,0,0,0.2),0_20px_60px_-15px_rgba(20,184,166,0.5)] transition-all outline-none touch-manipulation select-none active:scale-95 z-20 overflow-hidden ${isAnimating ? "bg-gradient-to-br from-teal-300 to-teal-500 scale-95" : "bg-gradient-to-br from-teal-400 via-teal-500 to-teal-700 hover:from-teal-300 hover:via-teal-400 hover:to-teal-600 hover:shadow-[inset_0_-10px_20px_rgba(0,0,0,0.1),0_25px_80px_-10px_rgba(20,184,166,0.6)]"
                            }`}
                    >
                        {/* Dynamic Ring Progress Indicator behind the number */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none opacity-30" viewBox="0 0 100 100">
                            <circle
                                cx="50" cy="50" r="46"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="8"
                                strokeDasharray={`${progress * 2.89} 289.02`} // Approximate math for circumfrence
                                className="transition-all duration-500 ease-out"
                                strokeLinecap="round"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ffffff" />
                                    <stop offset="100%" stopColor="#99f6e4" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <div className="flex flex-col items-center relative z-10 transition-transform duration-300 group-hover:scale-105">
                            <span className="text-7xl md:text-8xl font-black text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)] tracking-tighter">
                                {count}
                            </span>
                            <span className="text-teal-100 font-bold text-sm mt-1 opacity-80 truncate max-w-[160px] text-center">
                                {dzikirLabel}
                            </span>
                            <span className="text-teal-50 font-bold tracking-[0.2em] uppercase text-xs mt-2 opacity-80 drop-shadow-md">
                                Ketuk
                            </span>
                        </div>

                        {/* Ripple Effect Layers */}
                        <div className="absolute inset-0 rounded-full border-2 border-white/30 mix-blend-overlay"></div>
                        <div className="absolute inset-4 rounded-full border border-white/20 mix-blend-overlay"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full pointer-events-none"></div>
                    </button>
                </div>

                {/* Controls */}
                <div className="flex w-full flex-col sm:flex-row justify-between items-center mt-14 gap-6 bg-white/40 dark:bg-slate-800/40 border border-white/60 dark:border-slate-700/50 p-6 rounded-[2.5rem] backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    {/* Reset Button */}
                    <button
                        onClick={handleReset}
                        className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-slate-900 hover:bg-red-50 text-slate-700 hover:text-red-500 dark:text-slate-300 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-all font-bold shadow-sm border border-slate-100 dark:border-slate-800 w-full sm:w-auto hover:-translate-y-1 hover:shadow-md"
                        title="Reset Hitungan"
                    >
                        <RotateCcw className="w-5 h-5 flex-shrink-0" />
                        <span>Mulai Ulang</span>
                    </button>

                    <div className="hidden sm:block h-12 w-px bg-slate-200 dark:bg-slate-700"></div>

                    {/* Target Selector */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">
                            <Target className="w-4 h-4 text-teal-500" />
                            Target
                        </div>
                        <div className="flex gap-2 bg-white/60 dark:bg-slate-800/60 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md shadow-inner w-full sm:w-auto justify-center">
                            {[33, 99, 100].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => handleTargetChange(t)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-black transition-all ${target === t
                                        ? "bg-teal-500 text-white shadow-md shadow-teal-500/20 scale-105"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-center w-full">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 bg-white/60 dark:bg-slate-800 px-6 py-3 rounded-full transition-colors border border-slate-200/60 dark:border-slate-800/60 shadow-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
}
