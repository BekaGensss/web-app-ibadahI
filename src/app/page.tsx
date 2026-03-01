import Link from "next/link";
import LastReadWidget from "@/components/LastReadWidget";
import SalatCountdownWidget from "@/components/SalatCountdownWidgetWrapper";
import { BookOpen, Clock, Heart, Pocket, Compass, Bookmark, HandHeart, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 lg:gap-14 pb-12">
      {/* Ultra Premium Hero Section */}
      <section className="relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 px-5 sm:px-8 py-14 md:py-32 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)] border border-emerald-500/20 group">

        {/* Animated Glow Orbs Behind Hero */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none group-hover:bg-emerald-400/20 transition-colors duration-1000"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-teal-600/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none group-hover:bg-teal-500/20 transition-colors duration-1000"></div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-8">



          <h1 className="text-3xl font-black tracking-tight sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-white">
            Tingkatkan <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 drop-shadow-[0_0_40px_rgba(52,211,153,0.4)]">
              Ibadah Anda
            </span>
          </h1>

          <p className="max-w-2xl text-sm sm:text-lg md:text-xl text-emerald-100/70 leading-relaxed font-medium">
            Platform Islami eksklusif dengan antarmuka elegan kelas dunia. Jelajahi Al-Qur'an, Jadwal Salat presisi, dan fitur spiritual komprehensif.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 sm:mt-4 w-full sm:w-auto">
            <Link href="/quran" className="w-full sm:w-auto rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 text-white px-7 sm:px-10 py-3.5 sm:py-4 font-bold hover:from-emerald-300 hover:to-emerald-500 transition-all shadow-[0_10px_40px_-10px_rgba(16,185,129,0.8)] hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.9)] hover:-translate-y-1 flex items-center justify-center gap-2.5 sm:gap-3 text-base sm:text-lg border border-emerald-400/50">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              Telusuri Al-Qur'an
            </Link>
            <Link href="/jadwal-salat" className="w-full sm:w-auto rounded-full bg-white/5 backdrop-blur-xl text-emerald-50 border border-white/10 px-7 sm:px-10 py-3.5 sm:py-4 font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2.5 sm:gap-3 text-base sm:text-lg hover:-translate-y-1">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300" />
              Jadwal Salat Cerdas
            </Link>
          </div>
        </div>

        {/* Premium Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      </section>

      {/* Salat Countdown + Last Read — connected widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <SalatCountdownWidget />
        <LastReadWidget />
      </div>

      {/* Main Features Grid */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Compass className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Jelajahi Fitur</h2>
        </div>

        <div className="grid gap-4 sm:gap-5 grid-cols-2 lg:grid-cols-4 relative z-10">
          {/* Decorative background glow for grid */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-[100px] -z-10 rounded-full pointer-events-none"></div>

          {/* Al-Qur'an Card */}
          <Link
            href="/quran"
            className="group relative flex flex-col gap-3 rounded-[1.5rem] sm:rounded-[2rem] border border-white/40 bg-white/40 px-4 py-4 sm:px-6 sm:py-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-400/50 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] dark:border-slate-700/50 dark:bg-slate-800/40 dark:hover:border-emerald-500/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500 rounded-full"></div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-white border border-emerald-100 text-emerald-600 shadow-inner dark:from-emerald-900 dark:to-emerald-950 dark:border-emerald-800 dark:text-emerald-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-1.5 mt-2">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">Al-Qur'an Digital</h3>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                114 Surah lengkap dengan pilihan Qari, audio auto-play, dan terjemahan.
              </p>
            </div>
          </Link>

          {/* Jadwal Salat Card */}
          <Link
            href="/jadwal-salat"
            className="group relative flex flex-col gap-3 rounded-[1.5rem] sm:rounded-[2rem] border border-white/40 bg-white/40 px-4 py-4 sm:px-6 sm:py-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-400/50 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)] dark:border-slate-700/50 dark:bg-slate-800/40 dark:hover:border-blue-500/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500 rounded-full"></div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-white border border-blue-100 text-blue-600 shadow-inner dark:from-blue-900 dark:to-blue-950 dark:border-blue-800 dark:text-blue-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-1.5 mt-2">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">Jadwal Salat</h3>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                Waktu salat akurat berdasarkan lokasi dengan notifikasi Adzan otomatis.
              </p>
            </div>
          </Link>

          {/* Doa Card */}
          <Link
            href="/doa"
            className="group relative flex flex-col gap-3 rounded-[1.5rem] sm:rounded-[2rem] border border-white/40 bg-white/40 px-4 py-4 sm:px-6 sm:py-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-purple-400/50 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.3)] dark:border-slate-700/50 dark:bg-slate-800/40 dark:hover:border-purple-500/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative">
              <div className="absolute inset-0 bg-purple-400 blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500 rounded-full"></div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-white border border-purple-100 text-purple-600 shadow-inner dark:from-purple-900 dark:to-purple-950 dark:border-purple-800 dark:text-purple-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                <HandHeart className="w-6 h-6" />
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-1.5 mt-2">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">Kumpulan Doa</h3>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                Doa Harian, Doa Salat Sunnah Lengkap, dan Doa Khusus Jenazah.
              </p>
            </div>
          </Link>

          {/* Arah Kiblat Card */}
          <Link
            href="/qibla"
            className="group relative flex flex-col gap-3 rounded-[1.5rem] sm:rounded-[2rem] border border-white/40 bg-white/40 px-4 py-4 sm:px-6 sm:py-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-fuchsia-400/50 hover:shadow-[0_20px_40px_-15px_rgba(217,70,239,0.3)] dark:border-slate-700/50 dark:bg-slate-800/40 dark:hover:border-fuchsia-500/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative">
              <div className="absolute inset-0 bg-fuchsia-400 blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500 rounded-full"></div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-100 to-white border border-fuchsia-100 text-fuchsia-600 shadow-inner dark:from-fuchsia-900 dark:to-fuchsia-950 dark:border-fuchsia-800 dark:text-fuchsia-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <Compass className="w-6 h-6" />
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-1.5 mt-2">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight dark:text-white group-hover:text-fuchsia-700 dark:group-hover:text-fuchsia-400 transition-colors">
                Arah Kiblat
              </h3>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                Kompas penunjuk arah Mekah akurat berbasis sensor perangkat.
              </p>
            </div>
          </Link>

          {/* Kalkulator Zakat Card */}
          <Link
            href="/zakat"
            className="group relative flex flex-col gap-3 rounded-[1.5rem] sm:rounded-[2rem] border border-white/40 bg-white/40 px-4 py-4 sm:px-6 sm:py-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-yellow-400/50 hover:shadow-[0_20px_40px_-15px_rgba(234,179,8,0.3)] dark:border-slate-700/50 dark:bg-slate-800/40 dark:hover:border-yellow-500/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500 rounded-full"></div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-100 to-white border border-yellow-100 text-yellow-600 shadow-inner dark:from-yellow-900 dark:to-yellow-950 dark:border-yellow-800 dark:text-yellow-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-1.5 mt-2">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight dark:text-white group-hover:text-yellow-700 dark:group-hover:text-yellow-400 transition-colors">
                Zakat Pintar
              </h3>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                Kalkulasi otomatis Zakat Maal, Penghasilan, dan Zakat Fitrah.
              </p>
            </div>
          </Link>

          {/* Kalender Hijriah Card */}
          <Link
            href="/kalender"
            className="group relative flex flex-col gap-3 rounded-[1.5rem] sm:rounded-[2rem] border border-white/40 bg-white/40 px-4 py-4 sm:px-6 sm:py-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-orange-400/50 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.3)] dark:border-slate-700/50 dark:bg-slate-800/40 dark:hover:border-orange-500/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative">
              <div className="absolute inset-0 bg-orange-400 blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500 rounded-full"></div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-white border border-orange-100 text-orange-600 shadow-inner dark:from-orange-900 dark:to-orange-950 dark:border-orange-800 dark:text-orange-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="m9 16 2 2 4-4" /></svg>
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-1.5 mt-2">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight dark:text-white group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors">
                Kalender Islam
              </h3>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                Penanggalan Hijriah-Masehi dan pengingat puasa sunnah.
              </p>
            </div>
          </Link>

          {/* Asmaul Husna Card */}
          <Link
            href="/asmaul-husna"
            className="group relative flex flex-col gap-3 rounded-[1.5rem] sm:rounded-[2rem] border border-white/40 bg-white/40 px-4 py-4 sm:px-6 sm:py-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-400/50 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.3)] dark:border-slate-700/50 dark:bg-slate-800/40 dark:hover:border-amber-500/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative">
              <div className="absolute inset-0 bg-amber-400 blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500 rounded-full"></div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-white border border-amber-100 text-amber-600 shadow-inner dark:from-amber-900 dark:to-amber-950 dark:border-amber-800 dark:text-amber-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <Heart className="w-6 h-6" />
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-1.5 mt-2">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">Asmaul Husna</h3>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                Kontemplasi 99 Nama Agung dengan tampilan estetik.
              </p>
            </div>
          </Link>

          {/* Tasbih Digital Card */}
          <Link
            href="/tasbih"
            className="group relative flex flex-col gap-3 rounded-[1.5rem] sm:rounded-[2rem] border border-white/40 bg-white/40 px-4 py-4 sm:px-6 sm:py-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-teal-400/50 hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.3)] dark:border-slate-700/50 dark:bg-slate-800/40 dark:hover:border-teal-500/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative">
              <div className="absolute inset-0 bg-teal-400 blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500 rounded-full"></div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-white border border-teal-100 text-teal-600 shadow-inner dark:from-teal-900 dark:to-teal-950 dark:border-teal-800 dark:text-teal-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                <Pocket className="w-6 h-6" />
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-1.5 mt-2">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">Tasbih Digital</h3>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                Penghitung dzikir interaktif dengan target.
              </p>
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}
