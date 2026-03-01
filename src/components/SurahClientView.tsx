"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import BookmarkButton from "@/components/BookmarkButton";
import { ChevronLeft, Info, BookOpen, Settings2 } from "lucide-react";
import { useLastRead } from "@/hooks/useLastRead";

type Ayat = {
    nomorAyat: number;
    teksArab: string;
    teksLatin: string;
    teksIndonesia: string;
    audio: Record<string, string>;
};

type SurahDetail = {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    audioFull: Record<string, string>;
    ayat: Ayat[];
};

const QARI_OPTIONS = [
    { id: "01", name: "Abdullah Al-Juhany" },
    { id: "02", name: "Abdul Muhsin Al-Qasim" },
    { id: "03", name: "Abdurrahman as-Sudais" },
    { id: "04", name: "Ibrahim Al-Dawsari" },
    { id: "05", name: "Misyari Rasyid Al-Afasi" },
];

export default function SurahClientView({ surah }: { surah: SurahDetail }) {
    const [selectedQari, setSelectedQari] = useState<string>("05");
    const [playingAyah, setPlayingAyah] = useState<number | null>(null);
    const [isFullPlaying, setIsFullPlaying] = useState(false);

    const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});
    const fullAudioRef = useRef<HTMLAudioElement | null>(null);

    const { saveLastRead } = useLastRead();

    // Load saved qari from localstorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("preferred_qari");
        if (saved) setSelectedQari(saved);
        // Save this surah as last read on open (ayah 1 — will be updated when user plays an ayah)
        saveLastRead({
            surahId: surah.nomor,
            surahName: surah.namaLatin,
            surahNameArab: surah.nama,
            ayahNumber: 1,
            timestamp: Date.now(),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [surah.nomor]);

    const handleQariChange = (qariId: string) => {
        setSelectedQari(qariId);
        localStorage.setItem("preferred_qari", qariId);
        // Stop any playing audio when switching Qari
        if (playingAyah !== null) {
            audioRefs.current[playingAyah]?.pause();
            setPlayingAyah(null);
        }
        if (isFullPlaying) {
            fullAudioRef.current?.pause();
            setIsFullPlaying(false);
        }
    };

    const toggleAyahPlay = (nomorAyat: number) => {
        if (isFullPlaying) {
            fullAudioRef.current?.pause();
            setIsFullPlaying(false);
        }

        if (playingAyah === nomorAyat) {
            // Pause current
            audioRefs.current[nomorAyat]?.pause();
            setPlayingAyah(null);
        } else {
            // Pause previous if exists
            if (playingAyah !== null) {
                audioRefs.current[playingAyah]?.pause();
            }
            // Play new
            setPlayingAyah(nomorAyat);
            // ── Resume Bacaan per Ayah: simpan posisi saat ini ──────────
            saveLastRead({
                surahId: surah.nomor,
                surahName: surah.namaLatin,
                surahNameArab: surah.nama,
                ayahNumber: nomorAyat,
                timestamp: Date.now(),
            });
            const audio = audioRefs.current[nomorAyat];
            if (audio) {
                audio.currentTime = 0;
                audio.play().catch(console.error);
            }
        }
    };

    const handleAyahEnded = (nomorAyat: number) => {
        // Auto-play next logic
        const nextAyah = nomorAyat + 1;
        if (nextAyah <= surah.jumlahAyat) {
            setPlayingAyah(nextAyah);
            const nextAudio = audioRefs.current[nextAyah];
            if (nextAudio) {
                nextAudio.currentTime = 0;
                nextAudio.play().catch(console.error);
                // Scroll to next ayah smoothly
                document.getElementById(`ayah-${nextAyah}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            setPlayingAyah(null);
        }
    };

    const toggleFullPlay = () => {
        if (playingAyah !== null) {
            audioRefs.current[playingAyah]?.pause();
            setPlayingAyah(null);
        }

        if (isFullPlaying) {
            fullAudioRef.current?.pause();
            setIsFullPlaying(false);
        } else {
            setIsFullPlaying(true);
            fullAudioRef.current?.play().catch(console.error);
        }
    };

    return (
        <div className="flex flex-col gap-8 pb-32">
            {/* Ultra Premium Header Surah */}
            <div className="relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-950 px-6 py-20 text-center text-white shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)] border border-emerald-500/20 group">

                {/* Animated Glow Orbs Component */}
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none group-hover:bg-emerald-400/20 transition-colors duration-1000"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[400px] h-[400px] bg-teal-600/20 rounded-full blur-[80px] mix-blend-screen pointer-events-none group-hover:bg-teal-500/20 transition-colors duration-1000"></div>

                <div className="relative z-10 flex flex-col items-center gap-4">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]">{surah.namaLatin}</h1>
                    <p className="text-xl opacity-90 font-medium text-emerald-100">{surah.arti}</p>
                    <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-6 py-2.5 rounded-full backdrop-blur-xl shadow-inner">
                        <span className="flex items-center gap-2 text-emerald-200"><Info className="w-4 h-4" /> {surah.tempatTurun}</span>
                        <span className="text-white/30">•</span>
                        <span className="flex items-center gap-2 text-amber-200"><BookOpen className="w-4 h-4" /> {surah.jumlahAyat} AYAT</span>
                    </div>
                </div>

                <div className="relative z-10 mt-6 text-6xl font-arabic font-bold text-transparent bg-clip-text bg-gradient-to-b from-emerald-100 to-emerald-300 drop-shadow-[0_10px_20px_rgba(16,185,129,0.2)]">
                    {surah.nama}
                </div>

                {/* Global Audio Controller (Full Surah) */}
                <div className="relative z-10 mt-8 flex flex-col items-center gap-4">

                    <audio
                        ref={fullAudioRef}
                        src={surah.audioFull[selectedQari] || surah.audioFull["05"]}
                        onEnded={() => setIsFullPlaying(false)}
                        onError={() => setIsFullPlaying(false)}
                    />

                    <button
                        onClick={toggleFullPlay}
                        className="flex items-center justify-center gap-3 transition-colors rounded-full bg-emerald-500/20 px-8 py-3.5 text-sm font-bold text-emerald-100 backdrop-blur-md hover:bg-emerald-500/40 border border-emerald-400/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                        title={isFullPlaying ? "Pause Audio" : "Play Full Surah"}
                    >
                        {isFullPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                            </svg>
                        )}
                        <span>{isFullPlaying ? "Jeda Murottal" : "Putar Full Surah"}</span>
                    </button>

                    {/* Qari Selection Dropdown in Header */}
                    <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full border border-white/10 text-emerald-100/80 text-xs">
                        <Settings2 className="w-4 h-4" />
                        <span className="opacity-75">Qari:</span>
                        <select
                            value={selectedQari}
                            onChange={(e) => handleQariChange(e.target.value)}
                            className="bg-transparent text-emerald-100 font-bold focus:outline-none cursor-pointer border-b border-dashed border-emerald-500/50 pb-0.5"
                        >
                            {QARI_OPTIONS.map(q => (
                                <option key={q.id} value={q.id} className="text-slate-900 bg-white">
                                    {q.name}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
            </div>

            <div className="flex items-center justify-between">
                <Link
                    href="/quran"
                    className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Kembali ke Daftar Surah
                </Link>
            </div>

            {/* Bismillah Prefix logic for all except surah 1 and 9 */}
            {surah.nomor !== 1 && surah.nomor !== 9 && (
                <div className="my-8 text-center text-3xl font-arabic font-bold leading-loose text-slate-800 dark:text-slate-100">
                    بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </div>
            )}

            {/* List Ayat */}
            <div className="flex flex-col gap-10">
                {surah.ayat.map((a) => {
                    const isAyahPlaying = playingAyah === a.nomorAyat;

                    return (
                        <div
                            key={a.nomorAyat}
                            id={`ayah-${a.nomorAyat}`}
                            className={`group relative flex flex-col gap-6 rounded-[2.5rem] border p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 
                            ${isAyahPlaying
                                    ? 'border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-[0_20px_50px_-15px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400'
                                    : 'border-white/40 bg-white/40 hover:border-emerald-400/50 dark:border-slate-700/50 dark:bg-slate-800/40 dark:hover:border-emerald-500/50'}
                        `}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] pointer-events-none"></div>

                            {/* Hidden Audio Element for this ayah */}
                            <audio
                                ref={el => { audioRefs.current[a.nomorAyat] = el; }}
                                src={a.audio[selectedQari] || a.audio["05"]}
                                onEnded={() => handleAyahEnded(a.nomorAyat)}
                                onError={() => handleAyahEnded(a.nomorAyat)}
                            />

                            <div className="relative z-10 flex flex-wrap sm:flex-nowrap items-center justify-between border-b pb-6 dark:border-slate-700/60 gap-4">
                                <div className="flex gap-5 items-center">
                                    <div className="relative">
                                        <div className={`absolute inset-0 blur-md rounded-full transition-opacity duration-500 ${isAyahPlaying ? 'bg-emerald-500 opacity-60 animate-pulse' : 'bg-emerald-400 opacity-20 group-hover:opacity-40'}`}></div>
                                        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-white text-emerald-700 shadow-inner border border-emerald-100 font-extrabold text-lg dark:from-emerald-900 dark:to-emerald-950 dark:border-emerald-800 dark:text-emerald-400 group-hover:rotate-6 transition-transform duration-500">
                                            {a.nomorAyat}
                                        </div>
                                    </div>
                                    <div className={`rounded-full p-1 border backdrop-blur-sm transition-colors ${isAyahPlaying ? 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-700' : 'bg-slate-100/80 dark:bg-slate-800/80 border-slate-200/50 dark:border-slate-700/50'}`}>
                                        <button
                                            onClick={() => toggleAyahPlay(a.nomorAyat)}
                                            className={`flex items-center justify-center h-10 w-10 rounded-full transition-colors ${isAyahPlaying
                                                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/40"
                                                : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-400 dark:hover:bg-emerald-800/50"
                                                }`}
                                            title={isAyahPlaying ? "Pause Audio" : "Play Audio Ayah Ini"}
                                        >
                                            {isAyahPlaying ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
                                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <BookmarkButton
                                        surahId={surah.nomor}
                                        surahName={surah.namaLatin}
                                        ayahNumber={a.nomorAyat}
                                    />
                                </div>
                            </div>

                            <div className="relative z-10 flex flex-col items-end gap-2 text-right pt-2">
                                <p className="font-arabic text-4xl leading-[2.5] sm:text-5xl sm:leading-[2.5] text-slate-900 dark:text-white drop-shadow-sm selection:bg-emerald-200 dark:selection:bg-emerald-800">
                                    {a.teksArab}
                                </p>
                            </div>

                            <div className="relative z-10 flex flex-col gap-3 border-t pt-6 dark:border-slate-700/60 mt-2">
                                <p className="font-semibold text-emerald-700 dark:text-emerald-400 leading-relaxed tracking-wide">
                                    {a.teksLatin}
                                </p>
                                <div className="w-12 h-0.5 bg-slate-200 dark:bg-slate-700 rounded-full my-1"></div>
                                <p className="text-slate-600 dark:text-slate-300 leading-loose text-[15px]">
                                    {a.teksIndonesia}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
