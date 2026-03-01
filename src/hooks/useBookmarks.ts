"use client";

import { useState, useEffect } from "react";

export type Bookmark = {
    id: string; // unique identifier e.g., "surah-1-ayah-1"
    surahId: number;
    surahName: string;
    ayahNumber: number;
    timestamp: number;
};

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage on mount
    useEffect(() => {
        const data = localStorage.getItem("bookmarksData");
        if (data) {
            try {
                setBookmarks(JSON.parse(data));
            } catch (e) {
                console.error("Failed to parse local bookmarks");
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage whenever bookmarks change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("bookmarksData", JSON.stringify(bookmarks));
        }
    }, [bookmarks, isLoaded]);

    const addBookmark = (surahId: number, surahName: string, ayahNumber: number) => {
        const id = `${surahId}-${ayahNumber}`;
        if (!bookmarks.some((b) => b.id === id)) {
            setBookmarks((prev) => [
                { id, surahId, surahName, ayahNumber, timestamp: Date.now() },
                ...prev,
            ]);
        }
    };

    const removeBookmark = (id: string) => {
        setBookmarks((prev) => prev.filter((b) => b.id !== id));
    };

    const isBookmarked = (surahId: number, ayahNumber: number) => {
        return bookmarks.some((b) => b.id === `${surahId}-${ayahNumber}`);
    };

    return {
        bookmarks,
        isLoaded,
        addBookmark,
        removeBookmark,
        isBookmarked,
    };
}
