"use client";

import Link from "next/link";
import { BookOpen, ArrowRight, BookMarked } from "lucide-react";
import { useLastRead } from "@/hooks/useLastRead";
import { useBookmarks } from "@/hooks/useBookmarks";

export default function LastReadWidget() {
    const { lastRead, isLoaded: lrLoaded } = useLastRead();
    const { bookmarks, isLoaded: bmLoaded } = useBookmarks();

    const isLoaded = lrLoaded && bmLoaded;
    const latestBookmark = bookmarks[0] ?? null;

    if (!isLoaded) {
        return (
            <div className="h-[120px] rounded-2xl sm:rounded-3xl bg-white/30 dark:bg-slate-800/30 animate-pulse backdrop-blur-md border border-white/40 dark:border-slate-700/40" />
        );
    }

    // Priority: last-read progress > latest bookmark > empty state
    const hasLastRead = !!lastRead;
    const hasBookmark = !!latestBookmark;

    if (!hasLastRead && !hasBookmark) {
        return (
            <Link
                href="/quran"
                className="group relative overflow-hidden flex flex-col items-center justify-center gap-3 rounded-2xl sm:rounded-3xl border border-dashed border-emerald-200 dark:border-emerald-800/60 bg-white/40 dark:bg-slate-800/30 backdrop-blur-md px-5 py-8 text-center hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-50/40 dark:hover:bg-emerald-900/10 transition-all duration-300 min-h-[120px]"
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6" />
                </div>
                <div>
                    <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">Mulai Membaca Al-Qur'an</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Posisi membaca akan tersimpan otomatis</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:gap-2 transition-all">
                    Buka sekarang <ArrowRight className="w-3.5 h-3.5" />
                </div>
            </Link>
        );
    }

    const entry = hasLastRead ? lastRead! : latestBookmark!;
    const href = hasLastRead
        ? `/quran/${entry.surahId}#ayah-${entry.ayahNumber}`
        : `/quran/${(latestBookmark as typeof latestBookmark)!.surahId}#ayah-${(latestBookmark as typeof latestBookmark)!.ayahNumber}`;
    const label = hasLastRead ? "Lanjutkan Membaca" : "Buka Bookmark";
    const badge = hasLastRead ? "Terakhir Dibaca" : "Bookmark Terakhir";
    const BadgeIcon = hasLastRead ? BookOpen : BookMarked;

    return (
        <Link
            href={href}
            className="group relative overflow-hidden flex items-center justify-between gap-4 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 px-5 py-4 sm:px-8 sm:py-6 text-white shadow-[0_10px_40px_-10px_rgba(16,185,129,0.4)] hover:-translate-y-1 hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.5)] transition-all duration-300 border border-emerald-400/30 min-h-[120px]"
        >
            {/* Glow orb */}
            <div className="absolute left-0 bottom-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 group-hover:bg-white/15 transition-colors duration-700 pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-2 flex-1 min-w-0">
                <div className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest">
                    <BadgeIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>{badge}</span>
                </div>
                <p className="text-xl sm:text-2xl font-black tracking-tight truncate">
                    Surah {entry.surahName}
                </p>
                {(entry as typeof lastRead)?.surahNameArab && (
                    <p className="font-arab text-base text-white/70 leading-none">
                        {(entry as typeof lastRead)!.surahNameArab}
                    </p>
                )}
                <p className="text-white/60 text-xs font-semibold">
                    Ayat ke-{entry.ayahNumber}
                </p>
            </div>

            <div className="relative z-10 flex flex-col items-end gap-3 shrink-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 border border-white/20 backdrop-blur-md group-hover:scale-110 transition-transform shadow-inner">
                    <BookOpen className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-1 text-white/80 text-xs font-bold group-hover:text-white transition-colors">
                    {label} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
}
