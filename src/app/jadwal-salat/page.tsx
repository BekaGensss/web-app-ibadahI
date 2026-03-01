"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, MapPin, AlertCircle, ArrowLeft, Sun, Moon, Sunrise, Sunset } from "lucide-react";

type Timings = {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Sunset: string;
    Maghrib: string;
    Isha: string;
    Imsak: string;
    Midnight: string;
    Firstthird: string;
    Lastthird: string;
};

type AladhanResponse = {
    code: number;
    status: string;
    data: {
        timings: Timings;
        date: {
            readable: string;
            hijri: {
                date: string;
                month: { en: string; ar: string };
                year: string;
                designation: { abbreviated: string; expanded: string };
            };
        };
        meta: {
            timezone: string;
        };
    };
};

export default function JadwalSalatPage() {
    const [locationError, setLocationError] = useState<string | null>(null);
    const [cityName, setCityName] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [jadwal, setJadwal] = useState<AladhanResponse["data"] | null>(null);

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            setLocationError("Geolocation tidak didukung oleh browser Anda.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;

                    // 1. Ambil Waktu Salat
                    const res = await fetch(
                        `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=11`
                    );
                    if (!res.ok) throw new Error("Gagal mengambil jadwal salat");
                    const data: AladhanResponse = await res.json();
                    setJadwal(data.data);

                    // 2. Reverse Geocoding (Mendapatkan Nama Kota)
                    try {
                        const geoRes = await fetch(
                            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=id`
                        );
                        if (geoRes.ok) {
                            const geoData = await geoRes.json();
                            setCityName(geoData.city || geoData.locality || "Lokasi Ditemukan");
                        }
                    } catch (geoErr) {
                        console.error("Gagal mendeteksi nama kota", geoErr);
                    }

                } catch (err) {
                    setLocationError("Gagal mengambil jadwal salat dari server.");
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                setLocationError(
                    "Izin lokasi ditolak. Harap izinkan akses lokasi untuk melihat jadwal salat."
                );
                setLoading(false);
            }
        );
    }, []);

    const getNextPrayer = (timings: Timings) => {
        if (!timings) return null;
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        const prayerTimes = [
            { name: "Subuh", time: timings.Fajr },
            { name: "Dzuhur", time: timings.Dhuhr },
            { name: "Ashar", time: timings.Asr },
            { name: "Maghrib", time: timings.Maghrib },
            { name: "Isya", time: timings.Isha },
        ];

        for (const prayer of prayerTimes) {
            const [hours, minutes] = prayer.time.split(":").map(Number);
            const prayerMinutes = hours * 60 + minutes;
            if (prayerMinutes > currentTime) {
                return prayer;
            }
        }
        // Jika semua waktu salat hari ini sudah lewat, maka salat berikutnya adalah Subuh besok
        return { name: "Subuh", time: timings.Fajr };
    };

    const nextPrayer = jadwal ? getNextPrayer(jadwal.timings) : null;

    return (
        <div className="flex flex-col gap-10 pb-16">
            {/* Ultra Premium Hero Section */}
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 md:p-16 text-white shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)] border border-blue-500/20 group">

                {/* Animated Glow Orbs Component */}
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px] mix-blend-screen pointer-events-none group-hover:bg-blue-400/30 transition-colors duration-1000"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[400px] h-[400px] bg-indigo-600/30 rounded-full blur-[80px] mix-blend-screen pointer-events-none group-hover:bg-indigo-500/30 transition-colors duration-1000"></div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>
                <div className="relative z-10 flex flex-col items-center justify-center gap-6 text-center min-h-[300px]">
                    {loading ? (
                        <div className="animate-pulse flex flex-col items-center gap-6">
                            <Clock className="w-16 h-16 text-blue-400/50 mb-2" />
                            <div className="h-4 w-32 rounded-full bg-blue-500/50 dark:bg-blue-700/50"></div>
                            <div className="h-16 w-64 rounded-2xl bg-white/10 dark:bg-blue-700/30"></div>
                        </div>
                    ) : locationError ? (
                        <div className="rounded-3xl bg-red-500/10 border border-red-500/20 p-8 backdrop-blur-md max-w-md">
                            <AlertCircle className="w-12 h-12 text-red-300 mx-auto mb-4" />
                            <p className="text-red-100 font-medium mb-6 text-lg">{locationError}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="rounded-full bg-white text-red-600 px-8 py-3 font-bold hover:bg-red-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Coba Deteksi Ulang
                            </button>
                        </div>
                    ) : jadwal ? (
                        <div className="flex flex-col items-center w-full max-w-3xl">
                            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full justify-between mb-10">
                                <div className="flex flex-col items-center md:items-start p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-inner">
                                    <div className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-1 flex items-center gap-2">
                                        <MapPin className="w-4 h-4" /> Masehi
                                    </div>
                                    <div className="text-xl font-medium">{jadwal.date.readable}</div>
                                </div>
                                <div className="flex flex-col items-center md:items-end p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-inner">
                                    <div className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-1 flex items-center gap-2 md:flex-row-reverse">
                                        <Moon className="w-4 h-4" /> Hijriah
                                    </div>
                                    <div className="text-xl font-medium text-right text-emerald-100">
                                        {jadwal.date.hijri.date} {jadwal.date.hijri.month.en} {jadwal.date.hijri.year} H
                                    </div>
                                </div>
                            </div>

                            {nextPrayer && (
                                <div className="w-full relative group p-10 md:p-14 rounded-[3rem] bg-white/5 backdrop-blur-2xl border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.3)] overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2"></div>

                                    <p className="relative z-10 text-sm md:text-base font-bold uppercase tracking-widest text-blue-300 mb-4 flex justify-center items-center gap-3">
                                        <Clock className="w-5 h-5" /> Menuju Salat Berikutnya
                                    </p>
                                    <h2 className="relative z-10 text-6xl md:text-8xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-200 drop-shadow-[0_0_40px_rgba(59,130,246,0.6)]">{nextPrayer.name}</h2>
                                    <p className="relative z-10 text-4xl md:text-6xl font-mono font-bold text-white drop-shadow-md">{nextPrayer.time}</p>
                                </div>
                            )}

                            <div className="text-xs font-medium text-blue-200/60 mt-8 flex flex-col items-center gap-2">
                                {cityName && (
                                    <div className="flex items-center gap-1.5 bg-blue-500/20 px-4 py-2 rounded-full border border-blue-400/30 shadow-inner">
                                        <MapPin className="w-4 h-4 text-emerald-400 animate-bounce" />
                                        <span className="text-blue-100 font-bold tracking-wide">LOKASI ANDA: {cityName.toUpperCase()}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1.5 bg-black/10 px-3 py-1.5 rounded-full mt-2">
                                    <Clock className="w-3 h-3" /> Zona Waktu: {jadwal.meta.timezone}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>

            {jadwal && (
                <div className="grid gap-3 sm:gap-5 grid-cols-3 lg:grid-cols-5 mt-6 relative z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] -z-10 rounded-full pointer-events-none"></div>

                    {[
                        { id: 'fajr', name: 'Subuh', time: jadwal.timings.Fajr, icon: <Moon className="w-7 h-7" /> },
                        { id: 'dhuhr', name: 'Dzuhur', time: jadwal.timings.Dhuhr, icon: <Sun className="w-7 h-7" /> },
                        { id: 'asr', name: 'Ashar', time: jadwal.timings.Asr, icon: <Sunset className="w-7 h-7" /> },
                        { id: 'maghrib', name: 'Maghrib', time: jadwal.timings.Maghrib, icon: <Sunrise className="w-7 h-7" /> },
                        { id: 'isha', name: 'Isya', time: jadwal.timings.Isha, icon: <Moon className="w-7 h-7" /> },
                    ].map((waktu) => (
                        <div
                            key={waktu.id}
                            className={`group relative flex flex-col items-center justify-center p-4 sm:p-8 lg:py-10 rounded-[1.5rem] sm:rounded-[2.5rem] border shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)] overflow-hidden ${nextPrayer?.name === waktu.name
                                ? 'border-blue-400 bg-gradient-to-br from-blue-50/90 to-white/90 dark:from-blue-900/60 dark:to-slate-900/80 shadow-[0_10px_40px_-10px_rgba(59,130,246,0.4)] ring-2 ring-blue-500/20'
                                : 'bg-white/40 dark:bg-slate-800/40 border-white/40 dark:border-slate-700/50 hover:border-blue-400/50 dark:hover:border-blue-500/50'
                                }`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <div className="relative mb-3 sm:mb-6">
                                <div className={`absolute inset-0 blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500 rounded-full ${nextPrayer?.name === waktu.name ? 'bg-blue-500' : 'bg-slate-400'}`}></div>
                                <div className={`relative flex h-10 w-10 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-[1.5rem] shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${nextPrayer?.name === waktu.name
                                    ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-blue-500/30'
                                    : 'bg-gradient-to-br from-white to-blue-50 text-blue-600 border border-blue-100 dark:from-slate-800 dark:to-slate-900 dark:border-slate-700 dark:text-slate-300'
                                    }`}>
                                    <span className="[&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-7 sm:[&>svg]:h-7">{waktu.icon}</span>
                                </div>
                            </div>

                            <h3 className={`text-[10px] sm:text-sm font-extrabold uppercase tracking-widest mb-1 sm:mb-2 z-10 ${nextPrayer?.name === waktu.name ? 'text-blue-700 dark:text-blue-300' : 'text-slate-500 dark:text-slate-400'
                                }`}>
                                {waktu.name}
                            </h3>
                            <p className={`text-xl sm:text-4xl font-extrabold font-mono tracking-tight z-10 ${nextPrayer?.name === waktu.name ? 'text-slate-900 dark:text-white drop-shadow-sm' : 'text-slate-800 dark:text-slate-200'}`}>
                                {waktu.time}
                            </p>

                            {/* Active indicator */}
                            {nextPrayer?.name === waktu.name && (
                                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse"></div>
                            )}
                        </div>
                    ))}
                </div>
            )
            }

            <div className="mt-12 flex justify-center">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800 px-5 py-2.5 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Beranda
                </Link>
            </div>
        </div >
    );
}
