"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Clock, MoreHorizontal, Moon } from "lucide-react";

const mainNavItems = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/quran", label: "Al-Qur'an", icon: BookOpen },
    { href: "/jadwal-salat", label: "Salat", icon: Clock },
];

export default function BottomNavigation() {
    const pathname = usePathname();
    const [moreOpen, setMoreOpen] = React.useState(false);

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    const isMoreActive = !mainNavItems.some(item => isActive(item.href));

    return (
        <>
            {/* Backdrop for "More" sheet */}
            {moreOpen && (
                <div
                    className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm md:hidden"
                    onClick={() => setMoreOpen(false)}
                />
            )}

            {/* More / Drawer Sheet */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-[65] md:hidden transition-transform duration-300 ease-out ${moreOpen ? "translate-y-0" : "translate-y-full"}`}
                style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
                <div className="mx-3 mb-3 rounded-3xl border border-white/40 bg-white/95 dark:bg-slate-900/95 dark:border-slate-700/80 backdrop-blur-3xl shadow-[0_-8px_40px_rgba(0,0,0,0.15)] overflow-hidden">
                    {/* Handle bar */}
                    <div className="flex justify-center pt-3 pb-2">
                        <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                    </div>

                    <div className="px-4 pb-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 px-1">Menu Lainnya</p>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { href: "/doa", label: "Doa & Dzikir", emoji: "🤲" },
                                { href: "/hadits", label: "Hadits Harian", emoji: "📋" },
                                { href: "/asmaul-husna", label: "Asmaul Husna", emoji: "✨" },
                                { href: "/tasbih", label: "Tasbih", emoji: "📿" },
                                { href: "/zakat", label: "Zakat", emoji: "💛" },
                                { href: "/kalender", label: "Kalender", emoji: "📅" },
                                { href: "/qibla", label: "Kiblat", emoji: "🧭" },
                                { href: "/bookmarks", label: "Bookmark", emoji: "🔖" },
                                { href: "/dzikir", label: "Dzikir", emoji: "🌙" },
                            ].map(item => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMoreOpen(false)}
                                    className={`flex flex-col items-center gap-2 px-2 py-3 rounded-2xl transition-colors text-center ${pathname.startsWith(item.href)
                                        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        }`}
                                >
                                    <span className="text-2xl leading-none">{item.emoji}</span>
                                    <span className="text-[11px] font-semibold leading-tight">{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Tab Bar */}
            <nav
                className="fixed bottom-0 left-0 right-0 z-[60] md:hidden"
                style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
                <div className="mx-2 mb-2">
                    <div className="flex items-center justify-around h-[64px] px-2 rounded-[1.5rem] border border-white/50 bg-white/80 dark:bg-slate-900/85 dark:border-slate-700/60 backdrop-blur-2xl shadow-[0_-4px_30px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]">

                        {mainNavItems.map(({ href, label, icon: Icon }) => {
                            const active = isActive(href);
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => setMoreOpen(false)}
                                    className="relative flex flex-col items-center justify-center gap-[3px] flex-1 h-full group"
                                >
                                    {/* Active indicator pill */}
                                    {active && (
                                        <span className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                                    )}
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-200 ${active
                                        ? "bg-emerald-50 dark:bg-emerald-900/40 scale-110"
                                        : "group-active:scale-95"
                                        }`}>
                                        <Icon
                                            className={`w-5 h-5 transition-colors ${active
                                                ? "text-emerald-600 dark:text-emerald-400"
                                                : "text-slate-400 dark:text-slate-500"
                                                }`}
                                            strokeWidth={active ? 2.5 : 2}
                                        />
                                    </div>
                                    <span className={`text-[10px] font-semibold leading-none transition-colors ${active
                                        ? "text-emerald-600 dark:text-emerald-400"
                                        : "text-slate-400 dark:text-slate-500"
                                        }`}>
                                        {label}
                                    </span>
                                </Link>
                            );
                        })}

                        {/* More Button */}
                        <button
                            onClick={() => setMoreOpen(prev => !prev)}
                            className="relative flex flex-col items-center justify-center gap-[3px] flex-1 h-full group"
                        >
                            {isMoreActive && !moreOpen && (
                                <span className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                            )}
                            {moreOpen && (
                                <span className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-slate-400" />
                            )}
                            <div className={`flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-200 ${moreOpen
                                ? "bg-slate-100 dark:bg-slate-800 rotate-45"
                                : isMoreActive
                                    ? "bg-emerald-50 dark:bg-emerald-900/40 scale-110"
                                    : "group-active:scale-95"
                                }`}>
                                <MoreHorizontal
                                    className={`w-5 h-5 transition-colors ${isMoreActive || moreOpen
                                        ? "text-emerald-600 dark:text-emerald-400"
                                        : "text-slate-400 dark:text-slate-500"
                                        }`}
                                    strokeWidth={isMoreActive ? 2.5 : 2}
                                />
                            </div>
                            <span className={`text-[10px] font-semibold leading-none transition-colors ${isMoreActive || moreOpen
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-slate-400 dark:text-slate-500"
                                }`}>
                                Lainnya
                            </span>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}
