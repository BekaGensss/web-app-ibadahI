import Link from "next/link";
import { Pocket, ArrowLeft } from "lucide-react";
import DoaContent from "@/components/DoaContent";
import { doaSalat, doaSetelahSalat } from "@/data/doa";

// export const dynamic = 'force-dynamic';

type DoaHarian = {
    doa: string;
    ayat: string;
    latin: string;
    artinya: string;
};

async function getDoaList(): Promise<DoaHarian[]> {
    // Using an open API for basic daily prayers
    const res = await fetch("https://doa-doa-api-ahmadramadhan.fly.dev/api", {
        cache: "force-cache",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch doa");
    }
    const data = await res.json();
    return data;
}

export default async function DoaHarianPage() {
    let doaList: DoaHarian[] = [];
    try {
        doaList = await getDoaList();
    } catch (error) {
        console.error("Error fetching Doa:", error);
    }

    return (
        <div className="flex flex-col gap-10 pb-16">
            {/* Ultra Premium Header Section */}
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 p-8 md:p-16 text-white shadow-[0_20px_60px_-15px_rgba(168,85,247,0.2)] border border-purple-500/20 group">

                {/* Animated Glow Orbs Component */}
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[100px] mix-blend-screen pointer-events-none group-hover:bg-purple-400/30 transition-colors duration-1000"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[400px] h-[400px] bg-indigo-600/30 rounded-full blur-[80px] mix-blend-screen pointer-events-none group-hover:bg-indigo-500/30 transition-colors duration-1000"></div>

                <div className="relative z-10 flex flex-col items-center text-center gap-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm font-semibold backdrop-blur-xl border border-white/10 text-purple-100 w-fit">
                        <Pocket className="w-4 h-4 text-purple-400" />
                        <span>Kumpulan Doa Pilihan</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-100 to-purple-300 drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                        Kumpulan Doa
                    </h1>
                    <p className="text-purple-100/80 text-lg md:text-xl leading-relaxed font-medium max-w-3xl">
                        Doa-doa pilihan dari Al-Qur'an dan Hadis untuk mendampingi setiap aktivitas Anda, termasuk doa di dalam dan di luar salat.
                    </p>
                </div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>
            </div>

            {doaList.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-[3rem] border border-dashed py-20 px-6 text-center border-slate-300 dark:border-slate-700 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10">
                    <p className="text-xl font-bold text-slate-600 dark:text-slate-300">Gagal memuat kumpulan doa.</p>
                    <p className="mt-2 text-slate-500 dark:text-slate-400">Silakan coba muat ulang halaman.</p>
                </div>
            ) : (
                <div className="relative z-10">
                    <DoaContent doaHarian={doaList} doaSalat={doaSalat} doaSetelahSalat={doaSetelahSalat} />
                </div>
            )}

            <div className="mt-12 flex justify-center">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 bg-slate-100 dark:bg-slate-800 px-5 py-2.5 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
}
