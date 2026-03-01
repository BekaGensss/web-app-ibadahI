"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Book, MapPin } from "lucide-react";

type Surah = {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    audioFull: Record<string, string>;
};

export default function QuranListClient({ initialSurahs }: { initialSurahs: Surah[] }) {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter surahs based on search query (nama, arti, etc)
    const filteredSurahs = initialSurahs.filter(surah => {
        const lowerQuery = searchQuery.toLowerCase();
        return surah.namaLatin.toLowerCase().includes(lowerQuery) ||
            surah.arti.toLowerCase().includes(lowerQuery) ||
            surah.nomor.toString().includes(lowerQuery);
    });

    return (
        <div className="flex flex-col gap-8 pb-16">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 p-8 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.2)] border border-emerald-500/20 group">
                {/* Animated Glow Orbs Component */}
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[80px] mix-blend-screen pointer-events-none group-hover:bg-emerald-400/20 transition-colors duration-1000"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[300px] h-[300px] bg-teal-600/20 rounded-full blur-[60px] mix-blend-screen pointer-events-none group-hover:bg-teal-500/20 transition-colors duration-1000"></div>

                <div className="relative z-10 flex flex-col items-center justify-center text-center gap-5 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm font-semibold backdrop-blur-xl border border-white/10 text-emerald-100">
                        <Book className="w-4 h-4 text-emerald-400" />
                        <span>Kitab Suci Al-Qur'an</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">
                        Jelajahi <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400">Mukjizat</span>
                    </h1>

                    {/* Search Bar Area */}
                    <div className="w-full max-w-md relative mt-2 group/search">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-0 group-focus-within/search:opacity-100 transition-opacity"></div>
                        <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 focus-within:border-emerald-400/50 transition-colors p-1.5">
                            <span className="pl-4 pr-2 text-emerald-100/70">
                                <Search className="w-5 h-5" />
                            </span>
                            <input
                                type="text"
                                placeholder="Cari Surah (contoh: Al-Kahfi, 18)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-none outline-none text-white placeholder-emerald-100/50 py-2.5 text-sm md:text-base pr-4"
                            />
                        </div>
                    </div>
                </div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
            </div>

            {/* List Surah Cards (Shrunk size) */}
            {filteredSurahs.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    <Book className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>Surah tidak ditemukan.</p>
                </div>
            ) : (
                <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10">
                    {filteredSurahs.map((surah) => (
                        <Link
                            key={surah.nomor}
                            href={`/quran/${surah.nomor}`}
                            className="group relative flex flex-row items-center justify-between overflow-hidden rounded-2xl border border-white/40 bg-white/50 px-5 py-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.2)] dark:border-slate-700/50 dark:bg-slate-800/40 dark:hover:border-emerald-500/50"
                        >
                            {/* Hover BG */}
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                            {/* Left Content (Icon & Name) */}
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 text-emerald-600 shadow-inner border border-emerald-100/80 font-bold text-sm dark:from-emerald-900/50 dark:to-emerald-950/80 dark:border-emerald-800/50 dark:text-emerald-400 group-hover:scale-105 transition-transform duration-300">
                                    {surah.nomor}
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="font-bold text-base md:text-lg tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                                        {surah.namaLatin}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-0.5 max-w-[150px] sm:max-w-[200px]">
                                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest truncate">
                                            {surah.arti}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0"></span>
                                        <span className="text-[10px] text-slate-500 whitespace-nowrap">{surah.jumlahAyat} ayat</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Content (Arabic) */}
                            <div className="text-2xl font-arabic font-bold text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors mix-blend-multiply dark:mix-blend-normal relative z-10 shrink-0 pl-2">
                                {surah.nama}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
