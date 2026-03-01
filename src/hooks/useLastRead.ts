"use client";
import { useState, useEffect, useCallback } from "react";

export type LastReadEntry = {
    surahId: number;
    surahName: string;
    surahNameArab: string;
    ayahNumber: number;
    timestamp: number;
};

const STORAGE_KEY = "ibadahku_last_read";

export function useLastRead() {
    const [lastRead, setLastRead] = useState<LastReadEntry | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) setLastRead(JSON.parse(stored));
        } catch (_) { }
        setIsLoaded(true);
    }, []);

    const saveLastRead = useCallback((entry: LastReadEntry) => {
        setLastRead(entry);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
    }, []);

    const clearLastRead = useCallback(() => {
        setLastRead(null);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return { lastRead, saveLastRead, clearLastRead, isLoaded };
}
