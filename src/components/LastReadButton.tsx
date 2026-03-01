"use client";

import { useState, useEffect } from "react";

type LastReadButtonProps = {
    surahId: number;
    surahName: string;
    ayahNumber: number;
};

export default function LastReadButton({ surahId, surahName, ayahNumber }: LastReadButtonProps) {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const data = localStorage.getItem("lastRead");
        if (data) {
            try {
                const parsed = JSON.parse(data);
                if (parsed.surahId === surahId && parsed.ayahNumber === ayahNumber) {
                    setIsSaved(true);
                }
            } catch (e) {
                // ignore
            }
        }
    }, [surahId, ayahNumber]);

    const handleSave = () => {
        const data = {
            surahId,
            surahName,
            ayahNumber,
            timestamp: Date.now(),
        };
        localStorage.setItem("lastRead", JSON.stringify(data));
        setIsSaved(true);
        // Optionally trigger an event or toast notification here
        alert(`Berhasil menandai Surah ${surahName} Ayat ${ayahNumber} sebagai terakhir dibaca.`);

        // Un-save other instances in current view logic if we had global state, 
        // but a simple reload or component state is sufficient for this scope.
    };

    return (
        <button
            onClick={handleSave}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${isSaved
                    ? "bg-emerald-600 text-white"
                    : "text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/30"
                }`}
        >
            {isSaved ? "Terakhir Dibaca" : "Tandai Terakhir Dibaca"}
        </button>
    );
}
