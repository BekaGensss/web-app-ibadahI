// useAdzanSettings.ts
// Central store for adzan + notification settings, persisted in localStorage
"use client";

import { useState, useEffect, useCallback } from "react";

export type AdzanCity = {
    name: string;       // Display name in Indonesian
    country: string;    // Country code e.g. "ID"
    cityParam: string;  // Aladhan API city param
    lat: number;
    lng: number;
    timezone: string;
};

// Major Indonesian & global cities
export const AVAILABLE_CITIES: AdzanCity[] = [
    { name: "Jakarta", country: "ID", cityParam: "Jakarta", lat: -6.2088, lng: 106.8456, timezone: "Asia/Jakarta" },
    { name: "Surabaya", country: "ID", cityParam: "Surabaya", lat: -7.2575, lng: 112.7521, timezone: "Asia/Jakarta" },
    { name: "Bandung", country: "ID", cityParam: "Bandung", lat: -6.9175, lng: 107.6191, timezone: "Asia/Jakarta" },
    { name: "Medan", country: "ID", cityParam: "Medan", lat: 3.5952, lng: 98.6722, timezone: "Asia/Jakarta" },
    { name: "Makassar", country: "ID", cityParam: "Makassar", lat: -5.1477, lng: 119.4327, timezone: "Asia/Makassar" },
    { name: "Semarang", country: "ID", cityParam: "Semarang", lat: -6.9932, lng: 110.4203, timezone: "Asia/Jakarta" },
    { name: "Palembang", country: "ID", cityParam: "Palembang", lat: -2.9761, lng: 104.7754, timezone: "Asia/Jakarta" },
    { name: "Tangerang", country: "ID", cityParam: "Tangerang", lat: -6.1701, lng: 106.6402, timezone: "Asia/Jakarta" },
    { name: "Depok", country: "ID", cityParam: "Depok", lat: -6.4025, lng: 106.7942, timezone: "Asia/Jakarta" },
    { name: "Bekasi", country: "ID", cityParam: "Bekasi", lat: -6.2383, lng: 106.9756, timezone: "Asia/Jakarta" },
    { name: "Bogor", country: "ID", cityParam: "Bogor", lat: -6.5944, lng: 106.7892, timezone: "Asia/Jakarta" },
    { name: "Yogyakarta", country: "ID", cityParam: "Yogyakarta", lat: -7.7956, lng: 110.3695, timezone: "Asia/Jakarta" },
    { name: "Solo", country: "ID", cityParam: "Surakarta", lat: -7.5755, lng: 110.8243, timezone: "Asia/Jakarta" },
    { name: "Malang", country: "ID", cityParam: "Malang", lat: -7.9797, lng: 112.6304, timezone: "Asia/Jakarta" },
    { name: "Denpasar", country: "ID", cityParam: "Denpasar", lat: -8.6705, lng: 115.2126, timezone: "Asia/Makassar" },
    { name: "Pontianak", country: "ID", cityParam: "Pontianak", lat: -0.0264, lng: 109.3425, timezone: "Asia/Pontianak" },
    { name: "Balikpapan", country: "ID", cityParam: "Balikpapan", lat: -1.2379, lng: 116.8529, timezone: "Asia/Makassar" },
    { name: "Aceh", country: "ID", cityParam: "Banda Aceh", lat: 5.5483, lng: 95.3238, timezone: "Asia/Jakarta" },
    { name: "Manado", country: "ID", cityParam: "Manado", lat: 1.4748, lng: 124.8421, timezone: "Asia/Makassar" },
    { name: "Kupang", country: "ID", cityParam: "Kupang", lat: -10.1772, lng: 123.6070, timezone: "Asia/Makassar" },
    { name: "Ambon", country: "ID", cityParam: "Ambon", lat: -3.6556, lng: 128.1902, timezone: "Asia/Jayapura" },
    { name: "Jayapura", country: "ID", cityParam: "Jayapura", lat: -2.5916, lng: 140.6690, timezone: "Asia/Jayapura" },
    { name: "Makkah", country: "SA", cityParam: "Mecca", lat: 21.3891, lng: 39.8579, timezone: "Asia/Riyadh" },
    { name: "Madinah", country: "SA", cityParam: "Medina", lat: 24.5247, lng: 39.5692, timezone: "Asia/Riyadh" },
    { name: "Kuala Lumpur", country: "MY", cityParam: "Kuala Lumpur", lat: 3.1390, lng: 101.6869, timezone: "Asia/Kuala_Lumpur" },
    { name: "Singapura", country: "SG", cityParam: "Singapore", lat: 1.3521, lng: 103.8198, timezone: "Asia/Singapore" },
];

export type AdzanSettings = {
    enabled: boolean;           // Master switch for adzan audio
    notificationsEnabled: boolean; // Browser notification switch
    cityName: string;           // Display name
    volume: number;             // 0..1
    method: number;             // Aladhan calculation method (11 = Indonesian)
};

const STORAGE_KEY = "ibadahku_adzan_settings";

const DEFAULT_SETTINGS: AdzanSettings = {
    enabled: false,
    notificationsEnabled: false,
    cityName: "Jakarta",
    volume: 0.8,
    method: 11,
};

export function useAdzanSettings() {
    const [settings, setSettings] = useState<AdzanSettings>(DEFAULT_SETTINGS);
    const [loaded, setLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) });
            }
        } catch (_) { }
        setLoaded(true);
    }, []);

    const updateSettings = useCallback((patch: Partial<AdzanSettings>) => {
        setSettings(prev => {
            const next = { ...prev, ...patch };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            return next;
        });
    }, []);

    const selectedCity = AVAILABLE_CITIES.find(c => c.name === settings.cityName) ?? AVAILABLE_CITIES[0];

    return { settings, updateSettings, loaded, selectedCity };
}
