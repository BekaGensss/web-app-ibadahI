"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Clock, ArrowRight, MapPin } from "lucide-react";
import { Coordinates, CalculationMethod, PrayerTimes, Prayer } from "adhan";
import { useAdzanSettings } from "@/hooks/useAdzanSettings";

const PRAYER_LABELS: Record<string, string> = {
    fajr: "Subuh",
    sunrise: "Syuruq",
    dhuhr: "Dzuhur",
    asr: "Ashar",
    maghrib: "Maghrib",
    isha: "Isya",
};

const PRAYER_COLORS: Record<string, string> = {
    fajr: "from-indigo-500 to-blue-600",
    sunrise: "from-amber-400 to-orange-500",
    dhuhr: "from-yellow-400 to-amber-500",
    asr: "from-orange-400 to-red-500",
    maghrib: "from-pink-500 to-purple-600",
    isha: "from-indigo-600 to-slate-700",
};

function padZero(n: number) {
    return n.toString().padStart(2, "0");
}

function formatCountdown(ms: number) {
    if (ms <= 0) return "00:00:00";
    const totalS = Math.floor(ms / 1000);
    const h = Math.floor(totalS / 3600);
    const m = Math.floor((totalS % 3600) / 60);
    const s = totalS % 60;
    return `${padZero(h)}:${padZero(m)}:${padZero(s)}`;
}

export default function SalatCountdownWidget() {
    const { selectedCity } = useAdzanSettings();

    const [nextPrayer, setNextPrayer] = useState<{ name: string; label: string; timeMs: number } | null>(null);
    const [countdown, setCountdown] = useState("--:--:--");
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const calcNext = () => {
        const coords = new Coordinates(selectedCity.lat, selectedCity.lng);
        const params = CalculationMethod.Singapore(); // Indonesia method
        const now = new Date();
        const pt = new PrayerTimes(coords, now, params);

        const next = pt.nextPrayer();
        if (!next || next === Prayer.None) return;

        const nextTime = pt.timeForPrayer(next);
        if (!nextTime) return;

        setNextPrayer({
            name: next as string,
            label: PRAYER_LABELS[next as string] ?? (next as string),
            timeMs: nextTime.getTime(),
        });
    };

    // Recalculate every minute
    useEffect(() => {
        calcNext();
        const id = setInterval(calcNext, 60_000);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCity]);

    // Countdown tick every second
    useEffect(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (!nextPrayer) return;

        timerRef.current = setInterval(() => {
            const diff = nextPrayer.timeMs - Date.now();
            if (diff <= 0) {
                calcNext(); // recalculate next prayer
            } else {
                setCountdown(formatCountdown(diff));
            }
        }, 1000);

        return () => { if (timerRef.current) clearInterval(timerRef.current); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nextPrayer]);

    if (!nextPrayer) return null;

    const gradientClass = PRAYER_COLORS[nextPrayer.name] ?? "from-emerald-500 to-teal-600";

    return (
        <Link
            href="/jadwal-salat"
            className={`group relative overflow-hidden flex items-center justify-between gap-4 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${gradientClass} px-5 py-4 sm:px-8 sm:py-6 text-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.35)] transition-all duration-300 border border-white/20`}
        >
            {/* Glow orb */}
            <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-white/15 transition-colors duration-700 pointer-events-none" />

            {/* Left: label */}
            <div className="relative z-10 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Salat Berikutnya</span>
                </div>
                <p className="text-2xl sm:text-3xl font-black tracking-tight">
                    {nextPrayer.label}
                </p>
                <div className="flex items-center gap-1.5 text-white/60 text-xs font-medium">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedCity.name}</span>
                </div>
            </div>

            {/* Right: countdown */}
            <div className="relative z-10 flex flex-col items-end gap-2">
                <p className="text-3xl sm:text-4xl font-black font-mono tabular-nums drop-shadow-md tracking-tight">
                    {countdown}
                </p>
                <div className="flex items-center gap-1.5 text-white/70 text-xs font-semibold group-hover:text-white transition-colors">
                    Lihat Jadwal Lengkap <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
}
