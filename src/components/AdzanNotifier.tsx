"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
import { useAdzanSettings } from "@/hooks/useAdzanSettings";

// Mapping Aladhan API method IDs to adhan library methods
const getAdhanMethod = (method: number) => {
    switch (method) {
        case 11: return CalculationMethod.Singapore();   // Indonesia / Kemenag – similar to Singapore
        case 4: return CalculationMethod.UmmAlQura();   // Makkah
        case 2: return CalculationMethod.NorthAmerica();
        default: return CalculationMethod.MoonsightingCommittee();
    }
};

const PRAYER_NAMES: Record<string, string> = {
    fajr: "Subuh",
    dhuhr: "Dzuhur",
    asr: "Ashar",
    maghrib: "Maghrib",
    isha: "Isya",
};

export default function AdzanNotifier() {
    const { settings, loaded, selectedCity } = useAdzanSettings();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    // key = "prayer_YYYY-MM-DD" to avoid double-trigger
    const triggeredRef = useRef<Set<string>>(new Set());
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [notifGranted, setNotifGranted] = useState(false);

    // ─── Request notification permission when user enables it ─────────────────
    useEffect(() => {
        if (!loaded) return;
        if (!("Notification" in window)) return;

        if (settings.notificationsEnabled) {
            if (Notification.permission === "granted") {
                setNotifGranted(true);
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(perm => {
                    setNotifGranted(perm === "granted");
                });
            }
        }
    }, [settings.notificationsEnabled, loaded]);

    // ─── Audio setup ──────────────────────────────────────────────────────────
    useEffect(() => {
        if (typeof window === "undefined") return;
        const audio = new Audio("/adzan.mp3");
        audio.preload = "auto";
        audio.volume = settings.volume;
        audioRef.current = audio;
        return () => {
            audio.pause();
        };
    }, []);

    // Update volume whenever settings change
    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = settings.volume;
    }, [settings.volume]);

    // ─── Core prayer time checker ─────────────────────────────────────────────
    const checkPrayerTimes = useCallback(() => {
        if (!settings.enabled && !settings.notificationsEnabled) return;

        const now = new Date();
        const hh = now.getHours();
        const mm = now.getMinutes();

        const coords = new Coordinates(selectedCity.lat, selectedCity.lng);
        const params = getAdhanMethod(settings.method);
        const prayerTimes = new PrayerTimes(coords, now, params);

        const prayers: Array<{ key: string; time: Date }> = [
            { key: "fajr", time: prayerTimes.fajr },
            { key: "dhuhr", time: prayerTimes.dhuhr },
            { key: "asr", time: prayerTimes.asr },
            { key: "maghrib", time: prayerTimes.maghrib },
            { key: "isha", time: prayerTimes.isha },
        ];

        const dateStr = now.toISOString().split("T")[0];

        for (const p of prayers) {
            const pt = p.time;
            const triggerKey = `${p.key}_${dateStr}`;

            if (
                pt.getHours() === hh &&
                pt.getMinutes() === mm &&
                !triggeredRef.current.has(triggerKey)
            ) {
                triggeredRef.current.add(triggerKey);
                triggerAdzan(PRAYER_NAMES[p.key] ?? p.key);
                break;
            }
        }
    }, [settings.enabled, settings.notificationsEnabled, selectedCity, settings.method]);

    // ─── Trigger adzan: audio + notification ─────────────────────────────────
    const triggerAdzan = useCallback(async (prayerName: string) => {
        console.info(`[AdzanNotifier] 🕌 Waktu ${prayerName} di ${selectedCity.name}`);

        // 1. Play audio
        if (settings.enabled && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(err =>
                console.warn("[AdzanNotifier] Audio blocked by browser autoplay policy:", err)
            );
        }

        // 2. Web Notification
        if (settings.notificationsEnabled) {
            const hasPermission =
                notifGranted || Notification.permission === "granted";

            if (hasPermission) {
                try {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    new Notification(`🕌 Waktu Salat ${prayerName}`, {
                        body: `Waktunya melaksanakan salat ${prayerName} di kota ${selectedCity.name}. Semoga Allah menerima ibadah kita.`,
                        icon: "/icon-192x192.png",
                        badge: "/icon-192x192.png",
                        tag: `adzan-${prayerName}`,
                        silent: false,
                    } as any);
                } catch (err) {
                    console.warn("[AdzanNotifier] Notification failed:", err);
                }
            }
        }
    }, [settings.enabled, settings.notificationsEnabled, selectedCity.name, notifGranted]);

    // ─── Polling interval (every 30 seconds) ─────────────────────────────────
    useEffect(() => {
        if (!loaded) return;

        // Clean up previous
        if (intervalRef.current) clearInterval(intervalRef.current);

        if (!settings.enabled && !settings.notificationsEnabled) return;

        // Check immediately, then every 30s
        checkPrayerTimes();
        intervalRef.current = setInterval(checkPrayerTimes, 30_000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [loaded, settings.enabled, settings.notificationsEnabled, checkPrayerTimes]);

    return null; // invisible component
}
