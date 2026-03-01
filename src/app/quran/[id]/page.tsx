import { notFound } from "next/navigation";
import SurahClientView from "@/components/SurahClientView";

// Remove force-dynamic to allow static export for Capacitor APK
// export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
    // There are 114 Surahs in the Quran. We generate paths for all of them so they can be exported statically.
    return Array.from({ length: 114 }, (_, i) => ({
        id: (i + 1).toString(),
    }));
}

type Ayat = {
    nomorAyat: number;
    teksArab: string;
    teksLatin: string;
    teksIndonesia: string;
    audio: Record<string, string>;
};

type SurahDetail = {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    audioFull: Record<string, string>;
    ayat: Ayat[];
};

async function getSurah(id: string): Promise<SurahDetail | null> {
    const res = await fetch(`https://equran.id/api/v2/surat/${id}`, {
        cache: "force-cache",
    });
    if (!res.ok) {
        return null;
    }
    const data = await res.json();
    return data.data;
}

export default async function SurahPage({ params }: { params: Promise<{ id: string }> }) {
    // Await the params promise in Next.js 15+ 
    const resolvedParams = await params;
    const surah = await getSurah(resolvedParams.id);

    if (!surah) {
        notFound();
    }

    return <SurahClientView surah={surah} />;
}
