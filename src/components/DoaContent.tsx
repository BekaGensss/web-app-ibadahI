"use client";

import { useState } from "react";
import { Search, BookOpen, Clock, HandHeart } from "lucide-react";
import { Doa } from "@/data/doa";

type DoaHarianType = {
    doa: string;
    ayat: string;
    latin: string;
    artinya: string;
};

export default function DoaContent({
    doaHarian,
    doaSalat,
    doaSetelahSalat
}: {
    doaHarian: DoaHarianType[];
    doaSalat: Doa[];
    doaSetelahSalat: Doa[];
}) {
    const [activeTab, setActiveTab] = useState<"harian" | "salat" | "setelah-salat">("harian");
    const [searchQuery, setSearchQuery] = useState("");

    // Filter based on active tab and search query
    const getFilteredData = () => {
        const query = searchQuery.toLowerCase();

        switch (activeTab) {
            case "harian":
                return doaHarian.filter(d =>
                    d.doa.toLowerCase().includes(query) ||
                    d.artinya.toLowerCase().includes(query)
                );
            case "salat":
                return doaSalat.filter(d =>
                    d.title.toLowerCase().includes(query) ||
                    d.translation.toLowerCase().includes(query)
                );
            case "setelah-salat":
                return doaSetelahSalat.filter(d =>
                    d.title.toLowerCase().includes(query) ||
                    d.translation.toLowerCase().includes(query)
                );
        }
    };

    const filteredData = getFilteredData();

    return (
        <div className="flex flex-col gap-10">
            {/* Search and Tabs Container */}
            <div className="relative z-10 flex flex-col gap-6">

                {/* Search Bar */}
                <div className="relative max-w-2xl w-full mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-purple-400" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari doa berdasarkan nama atau arti..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/60 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all font-medium text-slate-700 dark:text-slate-200"
                    />
                </div>

                {/* Tabs */}
                <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
                    <div className="flex bg-white/40 dark:bg-slate-800/40 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl shadow-inner w-max mx-auto min-w-full sm:min-w-fit">
                        <button
                            onClick={() => setActiveTab("harian")}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === "harian"
                                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md shadow-purple-500/20 scale-100"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700/50"
                                }`}
                        >
                            <BookOpen className="w-4 h-4" />
                            Doa Harian
                        </button>
                        <button
                            onClick={() => setActiveTab("salat")}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === "salat"
                                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md shadow-purple-500/20 scale-100"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700/50"
                                }`}
                        >
                            <Clock className="w-4 h-4" />
                            Doa Salat
                        </button>
                        <button
                            onClick={() => setActiveTab("setelah-salat")}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === "setelah-salat"
                                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md shadow-purple-500/20 scale-100"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700/50"
                                }`}
                        >
                            <HandHeart className="w-4 h-4" />
                            Doa Setelah Salat
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            {filteredData.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-[3rem] border border-dashed py-20 px-6 text-center border-slate-300 dark:border-slate-700 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10">
                    <p className="text-xl font-bold text-slate-600 dark:text-slate-300">Tidak ada doa yang ditemukan.</p>
                    <p className="mt-2 text-slate-500 dark:text-slate-400">Coba gunakan kata kunci pencarian yang lain.</p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
                    {activeTab === "harian" ? (
                        (filteredData as DoaHarianType[]).map((doa, index) => (
                            <DoaCard
                                key={index}
                                index={index + 1}
                                title={doa.doa}
                                arabic={doa.ayat}
                                latin={doa.latin}
                                translation={doa.artinya}
                            />
                        ))
                    ) : (
                        (filteredData as Doa[]).map((doa, index) => (
                            <DoaCard
                                key={index}
                                index={index + 1}
                                title={doa.title}
                                arabic={doa.arabic}
                                latin={doa.latin}
                                translation={doa.translation}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

function DoaCard({ title, arabic, latin, translation, index }: { title: string, arabic: string, latin: string, translation: string, index: number }) {
    return (
        <div className="group flex flex-col justify-between gap-6 overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/40 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-purple-400/50 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.2)] dark:border-slate-700/50 dark:bg-slate-800/40 dark:hover:border-purple-500/50 relative">
            {/* Interactive hover background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex items-start justify-between border-b pb-4 border-slate-200/60 dark:border-slate-700/60">
                    <h3 className="font-extrabold text-xl text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors pr-4 tracking-tight">{title}</h3>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-white text-purple-700 shadow-inner font-black text-lg border border-purple-100 dark:from-purple-900 dark:to-purple-950 dark:border-purple-800 dark:text-purple-400 group-hover:rotate-6 transition-transform duration-500">
                        {index}
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2 text-right py-6">
                    <p className="font-arabic text-3xl leading-[2.5] sm:text-4xl sm:leading-[2.5] text-slate-900 dark:text-white group-hover:text-purple-900 dark:group-hover:text-purple-100 transition-colors">
                        {arabic}
                    </p>
                </div>
            </div>

            <div className="relative z-10 flex flex-col gap-4 rounded-3xl bg-white/60 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-6 shadow-sm mt-auto">
                <p className="text-sm font-semibold italic text-purple-700 dark:text-purple-400 leading-relaxed">
                    "{latin}"
                </p>
                <div className="h-px w-full bg-slate-200/60 dark:bg-slate-800/60"></div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                    <span className="font-bold text-slate-700 dark:text-slate-200">Artinya:</span> {translation}
                </p>
            </div>
        </div>
    );
}
