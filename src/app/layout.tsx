import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import { Moon, Instagram } from "lucide-react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { WelcomeLoader } from "@/components/WelcomeLoader";
import { SplashHandler } from "@/components/SplashHandler";
import AdzanNotifier from "@/components/AdzanNotifier";
import AdzanScheduler from "@/components/AdzanScheduler";
import DailyReminderScheduler from "@/components/DailyReminderScheduler";
import BackButtonHandler from "@/components/BackButtonHandler";
import { ParticleBackground } from "@/components/ParticleBackground";
import BottomNavigation from "@/components/BottomNavigation";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const amiriFont = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "IbadahKu",
  description: "Aplikasi Islami Modern dengan fitur Al-Qur'an dan Jadwal Salat",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "IbadahKu",
  },
};

export const viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${interSans.variable} ${amiriFont.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col font-sans relative">
            <SplashHandler />

            {/* === Premium Layered Background === */}
            {/* Base solid color */}
            <div className="fixed inset-0 -z-30 bg-[#eef2f7] dark:bg-[#020617] transition-colors duration-500" />
            {/* Radial gradient top */}
            <div className="fixed inset-0 -z-20 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(16,185,129,0.18),transparent)] dark:bg-[radial-gradient(ellipse_100%_80%_at_50%_-15%,rgba(16,185,129,0.2),transparent)] transition-colors duration-500" />
            {/* Radial gradient bottom-right accent */}
            <div className="fixed inset-0 -z-20 bg-[radial-gradient(ellipse_60%_50%_at_100%_100%,rgba(59,130,246,0.07),transparent)] dark:bg-[radial-gradient(ellipse_60%_50%_at_100%_100%,rgba(59,130,246,0.08),transparent)]" />
            {/* Subtle mesh noise texture */}
            <div
              className="fixed inset-0 -z-10 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "256px 256px" }}
            />
            {/* Arabesque overlay */}
            <div className="fixed inset-0 -z-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.025] dark:opacity-[0.04] pointer-events-none mix-blend-overlay" />

            <ParticleBackground />
            <WelcomeLoader />
            <Navbar />
            <AdzanNotifier />
            <AdzanScheduler />
            <DailyReminderScheduler />
            <BackButtonHandler />

            <main className="flex-1 container mx-auto px-4 md:px-8 py-12 md:py-20 pb-[calc(var(--bottom-nav-h)+var(--safe-area-bottom)+2rem)] md:pb-20">
              {children}
            </main>

            {/* Bottom Navigation — mobile only */}
            <BottomNavigation />

            <footer className="relative mt-auto hidden md:block">
              {/* Subtle glow above footer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none"></div>

              <div className="border-t border-white/20 bg-white/30 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/40 py-10 relative z-10">
                <div className="container mx-auto px-4 text-center flex flex-col items-center gap-4">
                  <div className="flex justify-center items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-inner">
                      <Moon className="w-4 h-4" strokeWidth={2.5} />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">IbadahKu<span className="text-emerald-500">.</span></span>
                  </div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Aplikasi Islami Modern dengan antarmuka elegan kelas dunia. Dikembangkan dengan penuh dedikasi.
                  </p>
                  <div className="w-12 h-1 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                  <a
                    href="https://www.instagram.com/Suma.Liebert"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    @Suma.Liebert · DEV BK
                  </a>
                  <p className="text-xs text-slate-300 dark:text-slate-600">@2026 DEV BK, IbadahKu</p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
