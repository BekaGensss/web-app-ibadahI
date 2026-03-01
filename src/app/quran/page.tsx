import QuranListClient from "@/components/QuranListClient";

type Surah = {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    audioFull: Record<string, string>;
};

async function getSurahs(): Promise<Surah[]> {
    const res = await fetch("https://equran.id/api/v2/surat");
    if (!res.ok) {
        throw new Error("Failed to fetch surahs");
    }
    const data = await res.json();
    return data.data;
}

export default async function QuranPage() {
    const surahs = await getSurahs();

    return <QuranListClient initialSurahs={surahs} />;
}
