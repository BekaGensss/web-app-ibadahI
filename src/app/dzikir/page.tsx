"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Sun, Moon, CheckCircle2 } from "lucide-react";

// --- STATIC DZIKIR DATABASE ---
// In a real app, this could be fetched from an API or a larger JSON file.
// For demonstration, here are authentic Dzikir snippets.
const dzikirPagiData = [
    {
        id: "p1",
        arab: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        latin: "A'udzu billahi minash-shaytanir-rajim",
        arti: "Aku berlindung kepada Allah dari godaan syaitan yang terkutuk.",
        ulang: 1,
    },
    {
        id: "p2",
        arab: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...",
        latin: "Allahu la ilaha illa Huwal-Hayyul-Qayyum...",
        arti: "Ayat Kursi: Allah, tidak ada tuhan selain Dia. Yang Mahahidup, Yang terus-menerus mengurus makhluk-Nya...",
        ulang: 1,
    },
    {
        id: "p3",
        arab: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ. قُلْ هُوَ اللَّهُ أَحَدٌ...",
        latin: "Bismillahir-rahmanir-rahim. Qul huwallahu ahad...",
        arti: "Surat Al-Ikhlas, Al-Falaq, dan An-Nas.",
        ulang: 3,
    },
    {
        id: "p4",
        arab: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
        latin: "Subhanallahi wa bihamdih.",
        arti: "Maha Suci Allah dan segala puji bagi-Nya.",
        ulang: 100,
    }
];

const dzikirPetangData = [
    {
        id: "m1",
        arab: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ...",
        latin: "Amsayna wa amsal-mulku lillah, walhamdu lillah...",
        arti: "Kami masuk waktu sore dan kerajaan hanya milik Allah, segala puji bagi Allah...",
        ulang: 1,
    },
    {
        id: "m2",
        arab: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ...",
        latin: "Bismillahilladzi la yadhurru ma'asmihi syai'un fil-ardhi wa la fis-sama'...",
        arti: "Dengan nama Allah yang bila dinaungi nama-Nya, tidak ada sesuatu pun di bumi dan di langit yang akan membahayakan...",
        ulang: 3,
    },
    {
        id: "m4",
        arab: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
        latin: "Astaghfirullaha wa atubu ilayh.",
        arti: "Aku memohon ampunan kepada Allah dan bertobat kepada-Nya.",
        ulang: 100,
    }
];

export default function DzikirPage() {
    // Auto-detect morning or evening based on real time
    // Pagi (Fajr–Ashar): before 15:00 local time
    // Petang (Ashar–Isha): 15:00 onwards
    const autoTab = (): 'pagi' | 'petang' => {
        const h = new Date().getHours();
        return h >= 15 ? 'petang' : 'pagi';
    };
    const [activeTab, setActiveTab] = useState<'pagi' | 'petang'>(autoTab());
    const [counters, setCounters] = useState<Record<string, number>>({});

    const currentData = activeTab === 'pagi' ? dzikirPagiData : dzikirPetangData;

    const handleTap = (id: string, max: number) => {
        setCounters(prev => {
            const current = prev[id] || 0;
            if (current < max) {
                return { ...prev, [id]: current + 1 };
            }
            return prev;
        });
    };

    const resetAll = () => {
        setCounters({});
    };

    const progress = Math.round(
        (Object.keys(counters).filter(k => {
            const dz = [...dzikirPagiData, ...dzikirPetangData].find(d => d.id === k);
            return dz && counters[k] >= dz.ulang;
        }).length / currentData.length) * 100
    ) || 0;


    return (
        <div className="max-w-4xl mx-auto pb-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 relative z-10">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-3 rounded-2xl bg-white/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm">
                        <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                            Dzikir Harian <BookOpen className="w-7 h-7 text-emerald-500" />
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Rutinitas pelindung pagi dan petang.</p>
                    </div>
                </div>

                {/* Progress Bar Mini */}
                <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center gap-4 shadow-sm min-w-[200px]">
                    <div className="flex-1">
                        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide flex justify-between">
                            <span>Progres Sesi</span>
                            <span className="text-emerald-600 dark:text-emerald-400">{progress}%</span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-700 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                    <button onClick={resetAll} className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors tooltip tooltip-left" data-tip="Reset Konter">
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-white/60 dark:border-slate-700 backdrop-blur-md mb-8 shadow-inner">
                <button
                    onClick={() => { setActiveTab('pagi'); resetAll(); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 px-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'pagi'
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg ring-1 ring-white/20'
                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50'
                        }`}
                >
                    <Sun className="w-5 h-5" /> Dzikir Pagi
                </button>
                <button
                    onClick={() => { setActiveTab('petang'); resetAll(); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 px-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'petang'
                        ? 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-lg ring-1 ring-white/20'
                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50'
                        }`}
                >
                    <Moon className="w-5 h-5" /> Dzikir Petang
                </button>
            </div>

            {/* Interactive Dzikir Cards */}
            <div className="space-y-6">
                {currentData.map((item, index) => {
                    const count = counters[item.id] || 0;
                    const isDone = count >= item.ulang;

                    return (
                        <div
                            key={item.id}
                            className={`relative group bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl border p-6 md:p-8 rounded-[2rem] transition-all duration-500 shadow-sm ${isDone
                                ? 'border-emerald-500/30 opacity-60 scale-[0.98]'
                                : 'border-slate-200 dark:border-slate-800 hover:border-emerald-400/50 hover:shadow-xl'
                                }`}
                        >
                            {/* Done Badge */}
                            {isDone && (
                                <div className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center gap-2 text-emerald-500 font-bold px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-xs">
                                    <CheckCircle2 className="w-4 h-4" /> Selesai
                                </div>
                            )}

                            <div className="flex gap-4 items-center mb-6">
                                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-sm">
                                    {index + 1}
                                </span>
                                <div className="text-sm font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-lg">
                                    Dibaca {item.ulang}x
                                </div>
                            </div>

                            {/* Arab, Latin, Arti */}
                            <div className="space-y-6 mb-8 text-right">
                                <p className="font-arab text-3xl md:text-5xl leading-loose font-medium text-slate-800 dark:text-slate-100">
                                    {item.arab}
                                </p>
                                <div className="text-left space-y-2 border-t border-slate-100 dark:border-slate-800 pt-6">
                                    <p className="text-emerald-600 dark:text-emerald-400 italic">
                                        {item.latin}
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                        "{item.arti}"
                                    </p>
                                </div>
                            </div>

                            {/* Interactive Tap Area */}
                            <div
                                onClick={() => handleTap(item.id, item.ulang)}
                                className={`w-full py-6 md:py-8 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group-hover:-translate-y-1 active:scale-95 select-none ${isDone
                                    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 shadow-inner'
                                    : 'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 shadow-md ring-1 ring-slate-200 dark:ring-slate-700'
                                    }`}
                            >
                                <div className="text-sm font-bold uppercase tracking-widest mb-2 opacity-70">
                                    {isDone ? 'Selesai' : 'Ketuk Layar / Tombol Ini'}
                                </div>
                                <div className="text-5xl md:text-6xl font-black tabular-nums font-mono drop-shadow-sm flex items-baseline gap-2">
                                    {count}
                                    <span className="text-2xl font-bold opacity-40">/{item.ulang}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {progress === 100 && (
                <div className="mt-12 p-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-[2.5rem] text-white text-center shadow-lg transform slide-in-from-bottom-5 animate-in">
                    <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Alhamdulillah, Selesai!</h2>
                    <p className="opacity-90 font-medium">Anda telah merampungkan rutinitas dzikir sesi ini. Semoga Allah menerima amal ibadah Anda.</p>
                </div>
            )}
        </div>
    );
}
