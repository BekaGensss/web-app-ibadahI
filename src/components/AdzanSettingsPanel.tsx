"use client";

import * as React from "react";
import {
    Bell, BellOff, Volume2, VolumeX, MapPin, CheckCircle2,
    ChevronDown, Moon, Settings, TestTube, X
} from "lucide-react";
import { useAdzanSettings, AVAILABLE_CITIES, type AdzanSettings } from "@/hooks/useAdzanSettings";

// ── Tiny toggle switch ────────────────────────────────────────────────────────
function Toggle({ checked, onChange, color = "emerald" }: {
    checked: boolean;
    onChange: (v: boolean) => void;
    color?: "emerald" | "blue" | "purple";
}) {
    const trackOn = { emerald: "bg-emerald-500", blue: "bg-blue-500", purple: "bg-purple-500" }[color];
    return (
        <button
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ${checked ? trackOn : "bg-slate-300 dark:bg-slate-700"}`}
        >
            <span className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
    );
}

// ── Volume slider ─────────────────────────────────────────────────────────────
function VolumeSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
    return (
        <div className="flex items-center gap-3">
            <VolumeX className="w-4 h-4 text-slate-400 shrink-0" />
            <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={value}
                onChange={e => onChange(parseFloat(e.target.value))}
                className="flex-1 h-1.5 appearance-none rounded-full bg-slate-200 dark:bg-slate-700 accent-emerald-500 cursor-pointer"
            />
            <Volume2 className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs font-bold text-slate-500 w-8 text-right tabular-nums">{Math.round(value * 100)}%</span>
        </div>
    );
}

export default function AdzanSettingsPanel() {
    const { settings, updateSettings, selectedCity } = useAdzanSettings();
    const [open, setOpen] = React.useState(false);
    const [citySearch, setCitySearch] = React.useState("");
    const [notifStatus, setNotifStatus] = React.useState<"default" | "granted" | "denied">("default");
    const [testPlayed, setTestPlayed] = React.useState(false);
    const panelRef = React.useRef<HTMLDivElement>(null);

    // Detect notification permission state
    React.useEffect(() => {
        if ("Notification" in window) {
            setNotifStatus(Notification.permission as typeof notifStatus);
        }
    }, [open]);

    // Close on outside click
    React.useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    const filteredCities = AVAILABLE_CITIES.filter(c =>
        c.name.toLowerCase().includes(citySearch.toLowerCase())
    );

    const handleToggleNotif = async (v: boolean) => {
        if (v && notifStatus !== "granted") {
            if ("Notification" in window) {
                const perm = await Notification.requestPermission();
                setNotifStatus(perm as typeof notifStatus);
                if (perm !== "granted") return; // silently fail if denied
            }
        }
        updateSettings({ notificationsEnabled: v });
    };

    const handleTestAdzan = () => {
        const audio = new Audio("/adzan.mp3");
        audio.volume = settings.volume;
        audio.play().catch(() => { });
        setTestPlayed(true);
        setTimeout(() => setTestPlayed(false), 3000);
    };

    const isAnyActive = settings.enabled || settings.notificationsEnabled;

    return (
        <div ref={panelRef} className="relative">
            {/* Trigger Button */}
            <button
                onClick={() => setOpen(p => !p)}
                title="Pengaturan Adzan & Notifikasi"
                className={`relative flex items-center justify-center w-9 h-9 rounded-xl border transition-all duration-200 backdrop-blur-md shadow-sm ${isAnyActive
                        ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/40 dark:border-emerald-700/60 text-emerald-600 dark:text-emerald-400"
                        : "bg-white/60 border-slate-200/60 dark:bg-slate-800/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                    }`}
            >
                {isAnyActive ? <Bell className="w-[18px] h-[18px]" strokeWidth={2.5} /> : <BellOff className="w-[18px] h-[18px]" strokeWidth={2} />}
                {/* Active dot */}
                {isAnyActive && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
                )}
            </button>

            {/* Dropdown Panel */}
            {open && (
                <div className="absolute right-0 top-full mt-3 w-80 sm:w-96 z-[200] animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border border-slate-200/80 dark:border-slate-700/80 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden">

                        {/* Header */}
                        <div className="px-5 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-md shadow-emerald-500/30">
                                    <Moon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Pengingat Adzan</p>
                                    <p className="text-[11px] text-slate-400 font-medium">Tanpa GPS, pilih kota manual</p>
                                </div>
                            </div>
                            <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="px-5 py-4 space-y-5">

                            {/* ── Master switches ─────────────────────────────── */}
                            <div className="space-y-3">
                                {/* Adzan Audio */}
                                <div className="flex items-center justify-between py-2.5 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-xl ${settings.enabled ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400" : "bg-slate-200 dark:bg-slate-700 text-slate-400"}`}>
                                            <Volume2 className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Bunyi Adzan</p>
                                            <p className="text-[11px] text-slate-400">Putar audio saat waktu salat</p>
                                        </div>
                                    </div>
                                    <Toggle checked={settings.enabled} onChange={v => updateSettings({ enabled: v })} color="emerald" />
                                </div>

                                {/* Browser Notification */}
                                <div className="flex items-center justify-between py-2.5 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-xl ${settings.notificationsEnabled ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" : "bg-slate-200 dark:bg-slate-700 text-slate-400"}`}>
                                            <Bell className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Notifikasi Browser</p>
                                            <p className="text-[11px] text-slate-400">
                                                {notifStatus === "denied" ? "⛔ Izin ditolak — ubah di browser" : "Pop-up saat masuk waktu salat"}
                                            </p>
                                        </div>
                                    </div>
                                    <Toggle checked={settings.notificationsEnabled} onChange={handleToggleNotif} color="blue" />
                                </div>
                            </div>

                            {/* ── Volume (only when audio enabled) ────────────── */}
                            {settings.enabled && (
                                <div className="space-y-2">
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1">Volume Adzan</p>
                                    <div className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                                        <VolumeSlider value={settings.volume} onChange={v => updateSettings({ volume: v })} />
                                    </div>
                                </div>
                            )}

                            {/* ── City Selection ───────────────────────────────── */}
                            <div className="space-y-2">
                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 flex items-center gap-1.5">
                                    <MapPin className="w-3 h-3" /> Kota / Lokasi
                                </p>

                                {/* Search */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Cari kota..."
                                        value={citySearch}
                                        onChange={e => setCitySearch(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 transition"
                                    />
                                </div>

                                {/* City List */}
                                <div className="max-h-44 overflow-y-auto rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 divide-y divide-slate-100 dark:divide-slate-800">
                                    {filteredCities.length === 0 ? (
                                        <p className="text-center text-sm text-slate-400 py-4">Kota tidak ditemukan</p>
                                    ) : filteredCities.map(city => {
                                        const active = city.name === settings.cityName;
                                        return (
                                            <button
                                                key={city.name}
                                                onClick={() => { updateSettings({ cityName: city.name }); setCitySearch(""); }}
                                                className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors text-sm ${active ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-semibold" : "text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700/50"}`}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span className="text-xs text-slate-400 font-mono w-5">{city.country}</span>
                                                    {city.name}
                                                </span>
                                                {active && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* ── Test button ──────────────────────────────────── */}
                            {settings.enabled && (
                                <button
                                    onClick={handleTestAdzan}
                                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-sm font-bold transition-all ${testPlayed ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 border border-slate-200 dark:border-slate-700"}`}
                                >
                                    {testPlayed ? (
                                        <><CheckCircle2 className="w-4 h-4" /> Adzan Diputar!</>
                                    ) : (
                                        <><TestTube className="w-4 h-4" /> Tes Suara Adzan</>
                                    )}
                                </button>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                                Waktu salat dihitung untuk <strong className="text-slate-600 dark:text-slate-300">{selectedCity.name}</strong> · Metode Kemenag Indonesia · Halaman harus terbuka
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
