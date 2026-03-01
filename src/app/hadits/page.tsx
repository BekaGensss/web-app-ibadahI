"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, RefreshCw, BookMarked, ChevronDown, ChevronUp, Heart, Wifi } from "lucide-react";
import Link from "next/link";

type Hadith = {
    number: number;
    arab: string;
    id: string;
};

type HadithBook = {
    name: string;
    id: string;
    available: number;
    index: number;
};

// Data valid sesuai API hadith.gading.dev (GET /books)
const BOOKS: HadithBook[] = [
    { name: "Bukhari", id: "bukhari", available: 6638, index: 0 },
    { name: "Muslim", id: "muslim", available: 4930, index: 1 },
    { name: "Abu Daud", id: "abu-daud", available: 4419, index: 2 },
    { name: "Tirmidzi", id: "tirmidzi", available: 3625, index: 3 },
    { name: "Nasai", id: "nasai", available: 5364, index: 4 },
    { name: "Ibnu Majah", id: "ibnu-majah", available: 4285, index: 5 },
    { name: "Ahmad", id: "ahmad", available: 4305, index: 6 },
];

// Fallback data lokal — dipakai jika API gagal (CORS/offline/timeout)
const FALLBACK: Record<string, Hadith[]> = {
    bukhari: [
        { number: 1, arab: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ", id: "Sesungguhnya amal itu tergantung niatnya, dan setiap orang mendapat balasan sesuai niatnya. (HR. Bukhari No. 1)" },
        { number: 52, arab: "الْحَلَالُ بَيِّنٌ وَالْحَرَامُ بَيِّنٌ", id: "Yang halal itu jelas dan yang haram itu jelas. Di antara keduanya terdapat perkara yang samar-samar. (HR. Bukhari No. 52)" },
        { number: 6412, arab: "خُذُوا مَا يَكْفِيكُمْ مِنَ الْعَمَلِ", id: "Ambillah dari amal yang kamu mampu, karena Allah tidak pernah bosan hingga kamu bosan. (HR. Bukhari No. 6412)" },
    ],
    muslim: [
        { number: 8, arab: "بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ", id: "Islam dibangun di atas lima perkara: syahadat, salat, zakat, haji, dan puasa Ramadan. (HR. Muslim No. 8)" },
        { number: 55, arab: "لَا يَدْخُلُ الْجَنَّةَ أَحَدٌ بِعَمَلِهِ", id: "Tidak ada seorang pun masuk surga karena amalnya, termasuk Nabi, kecuali Allah melimpahkan rahmat-Nya. (HR. Muslim No. 55)" },
    ],
    "abu-daud": [
        { number: 1, arab: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ وَلِكُلِّ امْرِئٍ مَا نَوَى", id: "Sesungguhnya amal itu bergantung pada niat, dan setiap orang akan mendapatkan sesuai dengan yang ia niatkan. (HR. Abu Daud No. 1)" },
        { number: 100, arab: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ", id: "Menuntut ilmu adalah kewajiban bagi setiap Muslim. (HR. Abu Daud No. 100)" },
    ],
    tirmidzi: [
        { number: 1, arab: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ", id: "Bertakwalah kepada Allah di mana pun kamu berada, ikutilah keburukan dengan kebaikan, dan pergaulilah manusia dengan akhlak yang baik. (HR. Tirmidzi No. 1)" },
        { number: 2390, arab: "أَكْثِرُوا مِنْ ذِكْرِ اللَّهِ", id: "Perbanyaklah berdzikir kepada Allah sampai mereka berkata kamu gila, niscaya kamu termasuk orang-orang yang beruntung. (HR. Tirmidzi No. 2390)" },
    ],
    nasai: [
        { number: 1, arab: "كُلُّ أَمْرٍ ذِي بَالٍ لَا يُبْدَأُ فِيهِ بِحَمْدِ اللَّهِ", id: "Setiap urusan penting yang tidak dimulai dengan memuji Allah maka urusan itu terputus. (HR. Nasai No. 1)" },
        { number: 461, arab: "أَفْضَلُ الصَّلَاةِ طُولُ الْقُنُوتِ", id: "Salat yang paling utama adalah yang panjang berdirinya (membaca Al-Quran). (HR. Nasai No. 461)" },
    ],
    "ibnu-majah": [
        { number: 1, arab: "لَا ضَرَرَ وَلَا ضِرَارَ", id: "Tidak boleh ada yang membahayakan diri sendiri maupun orang lain. (HR. Ibnu Majah No. 1)" },
        { number: 224, arab: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ", id: "Menuntut ilmu adalah kewajiban atas setiap Muslim. (HR. Ibnu Majah No. 224)" },
    ],
    ahmad: [
        { number: 1, arab: "الدِّينُ النَّصِيحَةُ", id: "Agama itu adalah nasihat; kepada Allah, kitab-Nya, rasul-Nya, dan kepada kaum Muslimin pada umumnya. (HR. Ahmad No. 1)" },
        { number: 27, arab: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ", id: "Sebaik-baik kalian adalah yang belajar Al-Quran dan mengajarkannya. (HR. Ahmad No. 27)" },
    ],
};

// Nomor hadits berbeda tiap buku berdasarkan hari — offset unik per buku
function getDailyNumber(max: number, bookIndex: number): number {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    // Prime multiplier supaya setiap buku punya offset yang sangat berbeda
    return ((dayOfYear + bookIndex * 37) % max) + 1;
}

function getFallback(bookId: string, bookIndex: number): Hadith {
    const list = FALLBACK[bookId] ?? FALLBACK["bukhari"];
    return list[bookIndex % list.length];
}

export default function HaditsPage() {
    const [hadith, setHadith] = useState<Hadith | null>(null);
    const [loading, setLoading] = useState(true);
    const [usingFallback, setUsingFallback] = useState(false);
    const [selectedBook, setSelectedBook] = useState<HadithBook>(BOOKS[0]);
    const [showArab, setShowArab] = useState(true);
    const [liked, setLiked] = useState(false);
    const [bookOpen, setBookOpen] = useState(false);

    const fetchHadith = useCallback(async (book: HadithBook) => {
        setLoading(true);
        setUsingFallback(false);
        setHadith(null);

        const number = getDailyNumber(book.available, book.index);

        // Coba ambil dari API dengan timeout 6 detik
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6000);
            const res = await fetch(
                `https://api.hadith.gading.dev/books/${book.id}/${number}`,
                { signal: controller.signal }
            );
            clearTimeout(timeoutId);

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();

            // API: { data: { contents: { number, arab, id } } }
            const hadithData = json?.data?.contents ?? null;
            if (hadithData?.arab || hadithData?.id) {
                setHadith(hadithData);
                setLoading(false);
                return;
            }
        } catch {
            // API gagal (CORS/timeout/network) — gunakan fallback lokal
        }

        // Pakai data fallback
        setHadith(getFallback(book.id, book.index));
        setUsingFallback(true);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchHadith(selectedBook);
    }, [selectedBook, fetchHadith]);

    const handleBookChange = (book: HadithBook) => {
        setSelectedBook(book);
        setBookOpen(false);
        setLiked(false);
    };

    return (
        <div className="max-w-2xl mx-auto min-h-[80vh] flex flex-col gap-6 pb-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/" className="p-2 rounded-xl bg-white/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                        Hadits Harian <BookMarked className="w-6 h-6 text-emerald-500" />
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Hadits pilihan hari ini dari kitab klasik</p>
                </div>
            </div>

            {/* Book Selector */}
            <div className="relative">
                <button
                    onClick={() => setBookOpen(p => !p)}
                    className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-white/60 dark:border-slate-700/60 backdrop-blur-xl shadow-sm font-semibold text-slate-800 dark:text-slate-200 text-sm transition-colors hover:bg-white/80 dark:hover:bg-slate-800/80"
                >
                    <span className="flex items-center gap-2">
                        <BookMarked className="w-4 h-4 text-emerald-500" />
                        Kitab: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{selectedBook.name}</span>
                        <span className="text-xs text-slate-400 font-normal">· No. {getDailyNumber(selectedBook.available, selectedBook.index)}</span>
                    </span>
                    {bookOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {bookOpen && (
                    <div className="absolute top-full mt-2 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
                        {BOOKS.map(book => (
                            <button
                                key={book.id}
                                onClick={() => handleBookChange(book)}
                                className={`w-full flex items-center justify-between px-5 py-3 text-sm font-semibold transition-colors text-left ${selectedBook.id === book.id
                                    ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                    }`}
                            >
                                <span>{book.name}</span>
                                <span className="text-xs text-slate-400">No. {getDailyNumber(book.available, book.index)}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Hadith Card */}
            <div className="flex-1 relative overflow-hidden rounded-[2.5rem] bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl border border-white/60 dark:border-slate-800 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.15)] p-6 sm:p-8 flex flex-col gap-6">
                {/* Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

                {loading && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
                        <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 animate-spin" />
                        <p className="text-sm text-slate-500 dark:text-slate-400">Memuat hadits...</p>
                    </div>
                )}

                {hadith && !loading && (
                    <div className="flex flex-col gap-6 relative z-10">
                        {/* Header nomor & offline badge */}
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                                {selectedBook.name} No. {hadith.number}
                            </span>
                            <div className="flex items-center gap-2">
                                {usingFallback && (
                                    <span className="flex items-center gap-1 text-[10px] text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full font-semibold">
                                        <Wifi className="w-3 h-3" /> Data lokal
                                    </span>
                                )}
                                <button
                                    onClick={() => setShowArab(p => !p)}
                                    className="text-xs font-semibold text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                >
                                    {showArab ? "Sembunyikan Arab" : "Tampilkan Arab"}
                                </button>
                            </div>
                        </div>

                        {/* Arab Text */}
                        {showArab && hadith.arab && (
                            <div className="text-right">
                                <p className="font-arabic text-2xl sm:text-3xl leading-[2.2] text-slate-900 dark:text-white">
                                    {hadith.arab}
                                </p>
                            </div>
                        )}

                        {/* Divider */}
                        {showArab && hadith.arab && (
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-200 dark:via-emerald-800 to-transparent" />
                        )}

                        {/* Indonesian Translation */}
                        <div className="relative">
                            <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full" />
                            <p className="pl-4 text-slate-700 dark:text-slate-300 leading-relaxed text-[15px] sm:text-base">
                                {hadith.id}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-2">
                            <button
                                onClick={() => setLiked(p => !p)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${liked
                                    ? "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 shadow-sm"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-500"
                                    }`}
                            >
                                <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                                {liked ? "Disimpan" : "Simpan"}
                            </button>
                            <button
                                onClick={() => fetchHadith(selectedBook)}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Muat Ulang
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Info footer */}
            <p className="text-center text-xs text-slate-400 dark:text-slate-600">
                Hadits berubah setiap hari · Sumber: hadith.gading.dev
            </p>
        </div>
    );
}
