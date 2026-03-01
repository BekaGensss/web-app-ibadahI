"use client";

import { useBookmarks } from "@/hooks/useBookmarks";

type BookmarkButtonProps = {
    surahId: number;
    surahName: string;
    ayahNumber: number;
};

export default function BookmarkButton({ surahId, surahName, ayahNumber }: BookmarkButtonProps) {
    const { isLoaded, isBookmarked, addBookmark, removeBookmark } = useBookmarks();

    if (!isLoaded) return <div className="h-8 w-24 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse"></div>;

    const bookmarked = isBookmarked(surahId, ayahNumber);
    const id = `${surahId}-${ayahNumber}`;

    const toggleBookmark = () => {
        if (bookmarked) {
            removeBookmark(id);
        } else {
            addBookmark(surahId, surahName, ayahNumber);
            alert(`Berhasil menyimpan Surah ${surahName} Ayat ${ayahNumber} ke daftar Bookmark.`);
        }
    };

    return (
        <button
            onClick={toggleBookmark}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1 ${bookmarked
                    ? "bg-emerald-600 text-white"
                    : "text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50"
                }`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
            </svg>
            {bookmarked ? "Tersimpan" : "Simpan Ayat"}
        </button>
    );
}
