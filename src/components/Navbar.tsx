"use client";

import * as React from "react";
import Link from "next/link";
import {
    Moon, X, Menu, Home, BookOpen, Clock, HandHeart, Heart,
    Compass, Pocket, Calculator, CalendarDays, Bookmark, Instagram, BookMarked
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";
import AdzanSettingsPanel from "@/components/AdzanSettingsPanel";

const navItems = [
    { href: "/", label: "Beranda", icon: Home, exact: true },
    { href: "/quran", label: "Al-Qur'an", icon: BookOpen },
    { href: "/jadwal-salat", label: "Jadwal Salat", icon: Clock },
    { href: "/doa", label: "Doa & Dzikir", icon: HandHeart },
    { href: "/hadits", label: "Hadits Harian", icon: BookMarked },
    { href: "/asmaul-husna", label: "Asmaul Husna", icon: Heart },
    { href: "/tasbih", label: "Tasbih", icon: Pocket },
    { href: "/zakat", label: "Kalkulator Zakat", icon: Calculator },
    { href: "/kalender", label: "Kalender Hijriah", icon: CalendarDays },
    { href: "/qibla", label: "Arah Kiblat", icon: Compass },
    { href: "/bookmarks", label: "Bookmark Saya", icon: Bookmark },
];

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const pathname = usePathname();

    const isActive = (href: string, exact?: boolean) => {
        if (exact) return pathname === href;
        return pathname.startsWith(href);
    };

    // Close on route change
    React.useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    React.useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* === Full-screen backdrop for mobile menu === */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-[45] bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* === Mobile Sheet Menu === */}
            <div
                className={`fixed top-0 right-0 bottom-0 z-[50] w-[85vw] max-w-sm md:hidden transition-transform duration-300 ease-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
                aria-modal="true"
                role="dialog"
            >
                <div className="h-full overflow-y-auto bg-white/95 dark:bg-slate-950/95 backdrop-blur-3xl border-l border-white/30 dark:border-slate-800/80 shadow-[-20px_0_60px_rgba(0,0,0,0.15)] flex flex-col">
                    {/* Sheet Header */}
                    <div
                        className="flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800/80 sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-10"
                        style={{ paddingTop: "calc(env(safe-area-inset-top) + 1rem)", paddingBottom: "1rem" }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/30">
                                <Moon className="w-5 h-5" />
                            </div>
                            <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                                IbadahKu<span className="text-emerald-500">.</span>
                            </span>
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            aria-label="Tutup menu"
                        >
                            <X size={18} strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Nav Items */}
                    <nav className="flex-1 px-4 py-4 overflow-y-auto">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 px-3 mb-2">Navigasi</p>
                        {navItems.map(({ href, label, icon: Icon, exact }) => {
                            const active = isActive(href, exact);
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`flex items-center gap-4 px-3 py-3 rounded-2xl mb-1 font-semibold transition-all duration-200 ${active
                                        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        }`}
                                >
                                    <div className={`flex items-center justify-center w-9 h-9 rounded-xl transition-colors ${active
                                        ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                                        }`}>
                                        <Icon className="w-[18px] h-[18px]" strokeWidth={active ? 2.5 : 2} />
                                    </div>
                                    <span>{label}</span>
                                    {active && (
                                        <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Sheet Footer — FIXED: padding accounts for bottom nav bar (68px) + safe area */}
                    <div
                        className="px-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50"
                        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 80px)" }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-medium text-slate-400">Tema Tampilan</span>
                            <ThemeToggle />
                        </div>
                        {/* Instagram link */}
                        <a
                            href="https://www.instagram.com/Suma.Liebert"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                        >
                            <Instagram className="w-3.5 h-3.5" />
                            @Suma.Liebert
                        </a>
                        <p className="text-[10px] text-slate-300 dark:text-slate-600 mt-2">@2026 DEV BK, IbadahKu</p>
                    </div>
                </div>
            </div>

            {/* === Main Sticky Navbar === */}
            <header className="sticky top-0 z-40 w-full px-4 md:px-8 pt-[var(--safe-area-top)] pointer-events-none">
                <div className="max-w-5xl mx-auto pt-3 sm:pt-5 pointer-events-auto relative">
                    <div className="relative flex h-14 sm:h-[4.5rem] items-center justify-between px-4 sm:px-6 rounded-2xl sm:rounded-full border border-white/50 bg-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-2xl dark:border-slate-700/60 dark:bg-slate-900/50 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2.5 group relative z-10">
                            <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 border border-emerald-400/50 text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 group-hover:rotate-6 transition-all duration-500">
                                <Moon className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
                            </div>
                            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                                IbadahKu<span className="text-emerald-500">.</span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 text-xs lg:text-sm font-semibold relative z-10">
                            {[
                                { href: "/", label: "Beranda", exact: true },
                                { href: "/quran", label: "Qur'an" },
                                { href: "/jadwal-salat", label: "Salat" },
                                { href: "/doa", label: "Doa" },
                                { href: "/hadits", label: "Hadits" },
                                { href: "/asmaul-husna", label: "99 Nama" },
                                { href: "/tasbih", label: "Tasbih" },
                                { href: "/zakat", label: "Zakat" },
                                { href: "/kalender", label: "Kalender" },
                            ].map(({ href, label, exact }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`px-2.5 lg:px-3 py-1.5 rounded-full transition-all ${isActive(href, exact)
                                        ? "text-emerald-700 bg-emerald-50/90 dark:text-emerald-300 dark:bg-emerald-900/50"
                                        : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/80 dark:text-slate-300 dark:hover:text-emerald-300 dark:hover:bg-emerald-900/30"
                                        }`}
                                >
                                    {label}
                                </Link>
                            ))}
                            <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />
                            <Link
                                href="/bookmarks"
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all border ${isActive("/bookmarks")
                                    ? "text-emerald-800 bg-emerald-100 dark:bg-emerald-900/70 dark:text-emerald-200 border-emerald-300/50 dark:border-emerald-700/50"
                                    : "text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50 border-emerald-200/50 dark:border-emerald-800/50"
                                    }`}
                            >
                                <Bookmark className="w-3.5 h-3.5" />
                                Save
                            </Link>
                        </nav>

                        {/* Right Controls */}
                        <div className="flex items-center gap-2 relative z-10">
                            <AdzanSettingsPanel />
                            <ThemeToggle />
                            {/* Hamburger — mobile only */}
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-white/60 hover:bg-white/80 text-slate-700 dark:bg-slate-800/60 dark:hover:bg-slate-700/80 dark:text-slate-200 transition-colors border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-md shadow-sm"
                                aria-label="Buka menu"
                            >
                                <Menu size={18} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
