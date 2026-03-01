"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight, Loader2, Info } from "lucide-react";

interface HijriDay {
    gregorian: { date: string; day: string; month: { en: string } };
    hijri: { date: string; day: string; month: { en: string; ar: string }; year: string; holidays: string[] };
}

export default function KalenderPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [calendarData, setCalendarData] = useState<HijriDay[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Helper to get standard Gregorian calendar grid
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const isToday = (day: number) => {
        const today = new Date();
        return today.getDate() === day && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
    };

    useEffect(() => {
        async function fetchHijriData() {
            setLoading(true);
            setError(null);
            try {
                const month = currentDate.getMonth() + 1;
                const year = currentDate.getFullYear();
                // Aladhan API accepts month & year
                const res = await fetch(`https://api.aladhan.com/v1/gToHCalendar/${month}/${year}?adjustment=1`);
                if (!res.ok) throw new Error("Gagal mengambil data kalender Hijriah.");

                const data = await res.json();
                if (data.code === 200) {
                    setCalendarData(data.data);
                } else {
                    throw new Error("Data tidak valid dari server.");
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchHijriData();
    }, [currentDate]);

    // Months name array for Indonesian locale
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

    // Logic to determine if a Hijri day is Puasa Ayyamul Bidh (13, 14, 15)
    const isAyyamulBidh = (hijriDayStr: string) => {
        const hDay = parseInt(hijriDayStr);
        return hDay === 13 || hDay === 14 || hDay === 15;
    };

    // Logic to determine if a day is Monday or Thursday (Sunnah fasting)
    const isSeninKamis = (gregorianDateStr: string) => {
        // Format from API: DD-MM-YYYY
        const parts = gregorianDateStr.split('-');
        if (parts.length < 3) return false;
        const dateObj = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        const dayOfWeek = dateObj.getDay();
        return dayOfWeek === 1 || dayOfWeek === 4; // 1 = Monday, 4 = Thursday
    };

    const getHijriInfoForDay = (day: number) => {
        // Find the specific day in the Aladhan API response array
        // Note: day is Masehi date (1-31)
        const formattedDay = day < 10 ? `0${day}` : `${day}`;
        return calendarData.find(d => d.gregorian.date.startsWith(formattedDay));
    };

    // Let's get the dominant Hijri Month for the Header
    const getDominantHijriMonth = () => {
        if (calendarData.length === 0) return "";
        // Usually the 15th of the Masehi month represents the main Hijri month spanning it
        const midMonthDay = calendarData[Math.floor(calendarData.length / 2)];
        if (midMonthDay) {
            return `${midMonthDay.hijri.month.en} ${midMonthDay.hijri.year} H`;
        }
        return "";
    };

    return (
        <div className="max-w-5xl mx-auto pb-20">

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/" className="p-2 rounded-xl bg-white/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                        Kalender Hijriah <CalendarDays className="w-7 h-7 text-orange-500" />
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Penanggalan Masehi-Hijriah & Pengingat Puasa Sunnah.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">

                {/* Main Calendar View */}
                <div className="lg:col-span-3 order-2 lg:order-1 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/60 dark:border-slate-800 p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(249,115,22,0.1)]">

                    {/* Calendar Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                        <div className="flex items-center gap-2">
                            <button onClick={prevMonth} className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm">
                                <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                            </button>
                            <button onClick={nextMonth} className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm">
                                <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                            </button>
                            <button onClick={() => setCurrentDate(new Date())} className="ml-2 px-4 py-2 text-sm font-bold bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400 rounded-full hover:bg-orange-200 dark:hover:bg-orange-500/30 transition-colors">
                                Hari Ini
                            </button>
                        </div>

                        <div className="text-center sm:text-right">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </h2>
                            <p className="text-sm font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 px-3 py-1 rounded-full inline-block border border-orange-100 dark:border-orange-500/20">
                                {loading ? <span className="flex items-center gap-2"><Loader2 className="w-3 h-3 animate-spin" /> Memuat...</span> : getDominantHijriMonth()}
                            </p>
                        </div>
                    </div>

                    {/* Error State */}
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-center mb-6 border border-red-200 dark:border-red-800">
                            Gagal mengambil data dari server. Menampilkan format dasar.
                        </div>
                    )}

                    {/* Days Header */}
                    <div className="grid grid-cols-7 gap-2 mb-4">
                        {dayNames.map((d, i) => (
                            <div key={d} className={`text-center font-bold text-sm py-2 ${i === 0 ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'}`}>
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-2 sm:gap-3">
                        {/* Empty slots for start of month */}
                        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                            <div key={`empty-${i}`} className="h-14 sm:h-20 md:h-24 rounded-xl sm:rounded-2xl bg-white/30 dark:bg-slate-800/20 border border-transparent"></div>
                        ))}

                        {/* Actual Days */}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const masehiDay = i + 1;
                            const isTodayMarker = isToday(masehiDay);
                            const hijriInfo = getHijriInfoForDay(masehiDay);

                            const hijriDayStr = hijriInfo?.hijri.day || "";
                            const isAyyamul = isAyyamulBidh(hijriDayStr);
                            const isSK = hijriInfo ? isSeninKamis(hijriInfo.gregorian.date) : false;
                            const hasHoliday = hijriInfo?.hijri.holidays && hijriInfo.hijri.holidays.length > 0;

                            // Styles based on fast days
                            let cellStyle = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-500";
                            let hijriTextStyle = "text-slate-400 dark:text-slate-500";

                            if (isTodayMarker) {
                                cellStyle = "bg-orange-500 dark:bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-500/30 ring-2 ring-white dark:ring-slate-950 scale-105 z-10";
                                hijriTextStyle = "text-orange-100";
                            } else if (hasHoliday) {
                                cellStyle = "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50";
                                hijriTextStyle = "text-rose-500 dark:text-rose-400 font-bold";
                            } else if (isAyyamul) {
                                cellStyle = "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50";
                                hijriTextStyle = "text-amber-600 dark:text-amber-400 font-bold";
                            }

                            return (
                                <div
                                    key={`day-${masehiDay}`}
                                    className={`relative h-14 sm:h-20 md:h-24 p-1.5 sm:p-3 flex flex-col justify-between rounded-xl sm:rounded-2xl border transition-all duration-300 ${cellStyle} group cursor-default`}
                                >
                                    {/* Masehi Date */}
                                    <span className={`text-base sm:text-lg font-black leading-none ${isTodayMarker ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                                        {masehiDay}
                                    </span>

                                    {/* Content Container */}
                                    <div className="flex flex-col items-end gap-1">
                                        {/* Dots indicator for Sunnah fasts (if not ayyamul bidh, but is senin-kamis) */}
                                        {isSK && !isAyyamul && !hasHoliday && !isTodayMarker && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_5px_rgba(45,212,191,0.5)]"></div>
                                        )}

                                        {/* Hijri Date */}
                                        <span className={`text-xs sm:text-lg font-medium font-arabic leading-none ${hijriTextStyle} group-hover:scale-110 transition-transform origin-bottom-right`}>
                                            {hijriDayStr || "-"}
                                        </span>
                                    </div>

                                    {/* Tooltip for Holidays */}
                                    {hasHoliday && hijriInfo && (
                                        <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[150px] bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded-lg shadow-xl z-50 text-center">
                                            {hijriInfo.hijri.holidays.join(', ')}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Legend & Events Panel */}
                <div className="lg:col-span-1 space-y-4 sm:space-y-6 order-1 lg:order-2">

                    {/* Legend Card */}
                    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <Info className="w-5 h-5 text-orange-500" /> Keterangan
                        </h3>

                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-md bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">13</span>
                                </div>
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Puasa Ayyamul Bidh</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                                </div>
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Puasa Senin Kamis</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-md bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-rose-500 dark:text-rose-400">1</span>
                                </div>
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Hari Besar / Libur</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-md bg-orange-500 ring-2 ring-orange-500/20 flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-white tracking-tighter">H</span>
                                </div>
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Hari Ini</span>
                            </li>
                        </ul>
                    </div>

                    {/* Info Puasa Card */}
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-[2rem] shadow-lg text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
                        <h3 className="font-bold text-lg mb-2 relative z-10">Keutamaan Puasa</h3>
                        <p className="text-sm leading-relaxed text-emerald-50 font-medium relative z-10">
                            "Barangsiapa berpuasa sehari di jalan Allah, maka Allah akan menjauhkan wajahnya dari api neraka sejauh tujuh puluh musim." <br /><br />
                            <span className="text-[10px] uppercase tracking-wider text-emerald-200">(HR. Bukhari & Muslim)</span>
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
}
