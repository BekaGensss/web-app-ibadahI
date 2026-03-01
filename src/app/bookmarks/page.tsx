"use client";

import Link from "next/link";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Bookmark, Trash2, ArrowRight, ArrowLeft } from "lucide-react";

export default function BookmarksPage() {
    const { bookmarks, isLoaded, removeBookmark } = useBookmarks();

    return (
        <div className="flex flex-col gap-10 pb-16">
            {/* Ultra Premium Header Section */}
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-8 md:p-12 text-white shadow-[0_20px_60px_-15px_rgba(16,185,129,0.2)] border border-emerald-500/20 group">

                {/* Animated Glow Orbs */}
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[80px] mix-blend-screen pointer-events-none group-hover:bg-emerald-400/20 transition-colors duration-1000"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[300px] h-[300px] bg-teal-600/20 rounded-full blur-[60px] mix-blend-screen pointer-events-none group-hover:bg-teal-500/20 transition-colors duration-1000"></div>

                <div className="relative z-10 flex flex-col gap-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm font-semibold backdrop-blur-xl border border-white/10 text-emerald-100 w-fit">
                        <Bookmark className="w-4 h-4 text-emerald-400" />
                        <span>Koleksi Simpanan</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                        Daftar Bookmark
                    </h1>
                    <p className="text-emerald-100/70 text-lg leading-relaxed font-medium">
                        Kumpulan ayat Al-Qur'an dan doa yang Anda simpan untuk dibaca kembali.
                    </p>
                </div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>
            </div>

            {!isLoaded ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-48 rounded-[2rem] bg-slate-200/50 dark:bg-slate-800/50 animate-pulse backdrop-blur-md"></div>
                    ))}
                </div>
            ) : bookmarks.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-[3rem] border border-dashed py-20 px-6 text-center border-slate-300 dark:border-slate-700 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20 rounded-full"></div>
                        <div className="relative h-24 w-24 rounded-[2rem] bg-gradient-to-br from-emerald-100 to-white flex items-center justify-center text-emerald-600 shadow-inner border border-emerald-100 dark:from-emerald-900 dark:to-emerald-950 dark:border-emerald-800 dark:text-emerald-400">
                            <Bookmark className="w-12 h-12" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">Belum Ada Bookmark</h2>
                    <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-md text-lg leading-relaxed">
                        Anda belum menyimpan ayat apapun. Coba eksplorasi Al-Qur'an dan simpan beberapa ayat menarik untuk dibaca lagi nanti.
                    </p>
                    <Link href="/quran" className="mt-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 px-8 py-4 text-sm font-bold text-white hover:from-emerald-400 hover:to-emerald-500 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-1">
                        Mulai Jelajahi Al-Qur'an
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
                    {bookmarks.map((b) => (
                        <div
                            key={b.id}
                            className="group flex flex-col justify-between rounded-[2.5rem] border border-white/40 bg-white/40 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400/50 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.2)] dark:border-slate-700/50 dark:bg-slate-800/40 dark:hover:border-emerald-500/50 relative overflow-hidden"
                        >
                            {/* Interactive hover background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
                                        {new Date(b.timestamp).toLocaleDateString("id-ID", { day: 'numeric', month: 'short' })}
                                    </span>
                                    <button
                                        onClick={() => removeBookmark(b.id)}
                                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-2.5 rounded-full transition-colors tooltip border border-transparent hover:border-red-100 dark:hover:border-red-900/50 bg-white/50 dark:bg-slate-800/50"
                                        title="Hapus Bookmark"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">Surah {b.surahName}</h2>
                                <p className="mt-2 font-bold text-emerald-600/80 dark:text-emerald-400/80">
                                    Ayat ke-{b.ayahNumber}
                                </p>
                            </div>
                            <div className="relative z-10 mt-8 flex justify-end border-t border-slate-200/60 dark:border-slate-700/60 pt-6">
                                <Link
                                    href={`/quran/${b.surahId}#ayah-${b.ayahNumber}`}
                                    className="rounded-full bg-emerald-50 px-6 py-3 text-sm font-bold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50 transition-colors flex items-center gap-2 border border-emerald-100 dark:border-emerald-800/50 group-hover:shadow-sm"
                                >
                                    Baca Lanjut <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-8 flex justify-center">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
}
