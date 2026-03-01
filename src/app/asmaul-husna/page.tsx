import Link from "next/link";
import { Heart, ArrowLeft, Info } from "lucide-react";

// Enable dynamic rendering if fetching fresh data, or we could leave it static 
// since Asmaul Husna rarely changes. Using static for better performance.
// export const dynamic = 'force-dynamic';

type AsmaulHusna = {
    urutan: number;
    latin: string;
    arab: string;
    arti: string;
};

async function getAsmaulHusna(): Promise<AsmaulHusna[]> {
    try {
        const res = await fetch("https://raw.githubusercontent.com/mikqi/dzikir-counter/master/www/asmaul-husna.json", {
            cache: "force-cache",
        });
        if (!res.ok) {
            console.error("Failed to fetch asmaul husna");
            return [];
        }
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error fetching asmaul husna:", error);
        return [];
    }
}

export default async function AsmaulHusnaPage() {
    const asmaulHusnaList = await getAsmaulHusna();

    return (
        <div className="flex flex-col gap-10 pb-16">
            {/* Ultra Premium Header Section */}
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-900 via-amber-950/80 to-slate-900 p-8 md:p-16 text-white shadow-[0_20px_60px_-15px_rgba(245,158,11,0.2)] border border-amber-500/20 group">

                {/* Animated Glow Orbs Component */}
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none group-hover:bg-amber-400/20 transition-colors duration-1000"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[400px] h-[400px] bg-orange-600/20 rounded-full blur-[80px] mix-blend-screen pointer-events-none group-hover:bg-orange-500/20 transition-colors duration-1000"></div>

                <div className="relative z-10 flex flex-col items-center text-center gap-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm font-semibold backdrop-blur-xl border border-white/10 text-amber-100 w-fit">
                        <Heart className="w-4 h-4 text-amber-400" />
                        <span>Nama-nama Agung Allah SWT</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-100 to-amber-300 drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                        Asmaul Husna
                    </h1>
                    <p className="text-amber-100/80 text-lg md:text-xl leading-relaxed font-medium max-w-2xl">
                        99 Nama Allah SWT yang baik dan agung, beserta arti dan pelafalannya. Berdzikir dengan Asmaul Husna menenangkan hati.
                    </p>
                </div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>
            </div>

            {asmaulHusnaList.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed py-16 px-6 text-center dark:border-slate-700">
                    <p className="text-slate-500 dark:text-slate-400">Sedang memuat atau gagal memuat Asmaul Husna. Silakan coba lagi nanti.</p>
                </div>
            ) : (
                <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 relative z-10">
                    {asmaulHusnaList.map((asma) => (
                        <div
                            key={asma.urutan}
                            className="group relative flex flex-col items-center justify-center p-5 sm:p-8 rounded-[2rem] border border-white/40 bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-400/50 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.2)] dark:border-slate-700/50 dark:bg-slate-800/40 dark:hover:border-amber-500/50 text-center overflow-hidden"
                        >
                            {/* Interactive hover background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            {/* Decorative numbering background */}
                            <div className="absolute -top-4 -right-4 text-[100px] font-black text-slate-100 dark:text-slate-800/30 opacity-40 z-0 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none select-none">
                                {asma.urutan}
                            </div>

                            <div className="relative z-10 flex flex-col items-center gap-5 w-full">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-amber-400 blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
                                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-white text-amber-700 shadow-inner border border-amber-100 font-extrabold text-lg dark:from-amber-900 dark:to-amber-950 dark:border-amber-800 dark:text-amber-400 group-hover:rotate-6 transition-transform duration-500">
                                        {asma.urutan}
                                    </div>
                                </div>

                                <h2 className="text-4xl font-arabic font-extrabold py-2 text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 drop-shadow-sm group-hover:from-amber-600 group-hover:to-amber-500 dark:group-hover:from-amber-400 dark:group-hover:to-amber-300 transition-all duration-500">
                                    {asma.arab}
                                </h2>

                                <div className="flex flex-col gap-2 w-full border-t border-slate-200/60 dark:border-slate-700/60 pt-5 mt-2">
                                    <h3 className="font-extrabold text-xl text-slate-900 dark:text-slate-100 tracking-tight">{asma.latin}</h3>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                                        {asma.arti}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-12 flex justify-center">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400 bg-slate-100 dark:bg-slate-800 px-5 py-2.5 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
}
