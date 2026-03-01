"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, Coins, Briefcase, Plus, Minus, Info, AlertCircle } from "lucide-react";

type ZakatType = 'penghasilan' | 'maal' | 'fitrah';

// Constant based on 2024/2025 general prices in IDR
const GOLD_PRICE_PER_GRAM = 1200000;
const NISAB_GOLD_GRAMS = 85;
const NISAB_MAAL_RICE_GRAMS = 85; // Standard is gold for Maal
const ZAKAT_FITRAH_RICE_KG = 2.5;
const RICE_PRICE_PER_KG = 15000;

export default function ZakatPage() {
    const [activeTab, setActiveTab] = useState<ZakatType>('penghasilan');

    // Per Bulan (Penghasilan)
    const [gaji, setGaji] = useState("");
    const [pendapatanLain, setPendapatanLain] = useState("");
    const [hutangBulan, setHutangBulan] = useState("");

    // Per Tahun (Maal/Harta)
    const [tabungan, setTabungan] = useState("");
    const [logamMulia, setLogamMulia] = useState("");
    const [asetLain, setAsetLain] = useState("");
    const [hutangTahun, setHutangTahun] = useState("");

    // Fitrah
    const [jumlahJiwa, setJumlahJiwa] = useState("1");
    const [hargaBerasCustom, setHargaBerasCustom] = useState(RICE_PRICE_PER_KG.toString());

    // Formatting Helper
    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(number);
    };

    const parseNumber = (val: string) => {
        const parsed = parseInt(val.replace(/[^0-9]/g, ''));
        return isNaN(parsed) ? 0 : parsed;
    };

    const handleCurrencyInput = (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^0-9]/g, '');
        if (raw === '') setter('');
        else setter(formatRupiah(parseInt(raw)).replace('Rp', '').trim());
    };


    // --- CALCULATION LOGIC ---

    // 1. Penghasilan
    const totalPenghasilan = parseNumber(gaji) + parseNumber(pendapatanLain);
    const netPenghasilan = totalPenghasilan - parseNumber(hutangBulan);
    const nisabPenghasilanBulan = (NISAB_GOLD_GRAMS * GOLD_PRICE_PER_GRAM) / 12; // Pendapatan qiyas ke emas, dibagi 12 bulan
    const wajibZakatPenghasilan = netPenghasilan >= nisabPenghasilanBulan;
    const zakatPenghasilan = netPenghasilan > 0 ? netPenghasilan * 0.025 : 0; // Selalu dihitung untuk simulasi

    // 2. Maal
    const totalHarta = parseNumber(tabungan) + parseNumber(logamMulia) + parseNumber(asetLain);
    const netHarta = totalHarta - parseNumber(hutangTahun);
    const nisabMaal = NISAB_GOLD_GRAMS * GOLD_PRICE_PER_GRAM;
    const wajibZakatMaal = netHarta >= nisabMaal;
    const zakatMaal = netHarta > 0 ? netHarta * 0.025 : 0; // Selalu dihitung untuk simulasi

    // 3. Fitrah
    const totalFitrahUang = parseNumber(jumlahJiwa) * parseNumber(hargaBerasCustom) * ZAKAT_FITRAH_RICE_KG;
    const totalFitrahBeras = parseNumber(jumlahJiwa) * ZAKAT_FITRAH_RICE_KG;


    return (
        <div className="max-w-5xl mx-auto pb-20">

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/" className="p-2 rounded-xl bg-white/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                        Zakat Pintar <Calculator className="w-7 h-7 text-yellow-500" />
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Tunaikan kewajiban dengan perhitungan presisi.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-white/40 dark:bg-slate-900/40 p-1.5 rounded-2xl border border-white/60 dark:border-slate-800 backdrop-blur-md mb-8 shadow-sm">
                {(['penghasilan', 'maal', 'fitrah'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 flex flex-col items-center gap-1.5 py-4 px-2 rounded-xl text-sm font-bold transition-all ${activeTab === tab
                            ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-md scale-[1.02]'
                            : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50'
                            }`}
                    >
                        {tab === 'penghasilan' && <Briefcase className="w-5 h-5" />}
                        {tab === 'maal' && <Coins className="w-5 h-5" />}
                        {tab === 'fitrah' && <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></svg>}
                        <span className="capitalize text-xs md:text-sm">Zakat {tab}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Form Section */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/60 dark:border-slate-800 p-6 md:p-8 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] h-full">

                        {/* Penghasilan Form */}
                        {activeTab === 'penghasilan' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-5">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">Pemasukan Bulanan</h2>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Gaji Pokok / Pendapatan Utama</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                                        <input type="text" value={gaji} onChange={handleCurrencyInput(setGaji)} placeholder="0" className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 pl-12 pr-4 py-4 rounded-2xl font-bold dark:text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all shadow-sm" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Pemasukan Tambahan (Bonus, dll)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                                        <input type="text" value={pendapatanLain} onChange={handleCurrencyInput(setPendapatanLain)} placeholder="0" className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 pl-12 pr-4 py-4 rounded-2xl font-bold dark:text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all shadow-sm" />
                                    </div>
                                </div>

                                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Utang / Cicilan Jatuh Tempo Bulan Ini</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                                        <input type="text" value={hutangBulan} onChange={handleCurrencyInput(setHutangBulan)} placeholder="0" className="w-full bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 pl-12 pr-4 py-4 rounded-2xl font-bold text-red-600 dark:text-red-400 focus:ring-2 focus:ring-red-400 focus:outline-none transition-all shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Maal Form */}
                        {activeTab === 'maal' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-5">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">Harta Tertahan (Yang Tlah Haul 1 Tahun)</h2>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Total Saldo Tabungan / Deposito</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                                        <input type="text" value={tabungan} onChange={handleCurrencyInput(setTabungan)} placeholder="0" className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 pl-12 pr-4 py-4 rounded-2xl font-bold dark:text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all shadow-sm" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Nilai Emas / Perak / Logam Mulia</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                                        <input type="text" value={logamMulia} onChange={handleCurrencyInput(setLogamMulia)} placeholder="0" className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 pl-12 pr-4 py-4 rounded-2xl font-bold dark:text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all shadow-sm" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Aset Lain Berharga (Saham, dll)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                                        <input type="text" value={asetLain} onChange={handleCurrencyInput(setAsetLain)} placeholder="0" className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 pl-12 pr-4 py-4 rounded-2xl font-bold dark:text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all shadow-sm" />
                                    </div>
                                </div>

                                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Utang Pribadi / Cicilan</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                                        <input type="text" value={hutangTahun} onChange={handleCurrencyInput(setHutangTahun)} placeholder="0" className="w-full bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 pl-12 pr-4 py-4 rounded-2xl font-bold text-red-600 dark:text-red-400 focus:ring-2 focus:ring-red-400 focus:outline-none transition-all shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Fitrah Form */}
                        {activeTab === 'fitrah' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-5">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">Jumlah Jiwa (Keluarga)</h2>

                                <div className="flex items-center justify-center gap-6 py-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
                                    <button
                                        className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all shadow-sm"
                                        onClick={() => setJumlahJiwa((prev) => Math.max(1, parseInt(prev) - 1).toString())}
                                    >
                                        <Minus strokeWidth={3} />
                                    </button>
                                    <div className="text-5xl font-black text-slate-900 dark:text-white tabular-nums w-20 text-center">
                                        {jumlahJiwa}
                                    </div>
                                    <button
                                        className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all shadow-sm"
                                        onClick={() => setJumlahJiwa((prev) => (parseInt(prev) + 1).toString())}
                                    >
                                        <Plus strokeWidth={3} />
                                    </button>
                                </div>

                                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide flex justify-between">
                                        <span>Harga Beras / Kg (Default Rp15.000)</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                                        <input type="text" value={formatRupiah(parseInt(hargaBerasCustom.replace(/[^0-9]/g, '') || "0")).replace('Rp', '').trim()} onChange={(e) => {
                                            const raw = e.target.value.replace(/[^0-9]/g, '');
                                            setHargaBerasCustom(raw);
                                        }} className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 pl-12 pr-4 py-4 rounded-2xl font-bold dark:text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Result Section */}
                <div className="lg:col-span-5 border-t lg:border-t-0 pt-8 lg:pt-0">

                    {/* Dynamic Result Card */}
                    <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 p-6 lg:p-8 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(245,158,11,0.5)] text-white h-full flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-48 h-48 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-colors"></div>
                        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-32 h-32 bg-amber-900/20 rounded-full blur-2xl"></div>

                        <div className="relative z-10">
                            <p className="font-bold text-yellow-100 mb-1 uppercase tracking-widest text-xs">Total Kewajiban Zakat</p>

                            <div className="my-6">
                                <span className={`text-3xl lg:text-4xl xl:text-5xl font-black drop-shadow-md break-words block leading-tight ${(!wajibZakatPenghasilan && activeTab === 'penghasilan' && totalPenghasilan > 0) || (!wajibZakatMaal && activeTab === 'maal' && totalHarta > 0) ? 'text-yellow-100/50' : ''}`}>
                                    {activeTab === 'penghasilan' ? formatRupiah(Math.max(0, zakatPenghasilan))
                                        : activeTab === 'maal' ? formatRupiah(Math.max(0, zakatMaal))
                                            : formatRupiah(Math.max(0, totalFitrahUang))}
                                </span>

                                {activeTab === 'fitrah' && (
                                    <div className="mt-2 text-yellow-100 font-medium">
                                        Atau berupa beras: <strong className="text-white text-lg">{totalFitrahBeras} Kg</strong>
                                    </div>
                                )}
                            </div>


                            {/* Status Information */}
                            {activeTab === 'penghasilan' && (
                                <div className="bg-black/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 mt-6">
                                    {(totalPenghasilan) === 0 ? (
                                        <p className="text-sm font-medium">Silakan masukkan data penghasilan Anda.</p>
                                    ) : wajibZakatPenghasilan ? (
                                        <div className="flex gap-3 items-start">
                                            <AlertCircle className="w-5 h-5 shrink-0 text-white fill-emerald-500" />
                                            <p className="text-sm font-semibold">Anda telah mencapai Nisab (Rp {(nisabPenghasilanBulan).toLocaleString('id-ID')}/bulan). Anda wajib menunaikan zakat 2.5%.</p>
                                        </div>
                                    ) : (
                                        <div className="flex gap-3 items-start">
                                            <Info className="w-5 h-5 shrink-0 text-yellow-200" />
                                            <p className="text-sm font-medium text-yellow-50">Penghasilan bersih Anda belum mencapai Nisab bulanan. Belum wajib zakat.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'maal' && (
                                <div className="bg-black/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 mt-6">
                                    {totalHarta === 0 ? (
                                        <p className="text-sm font-medium">Silakan masukkan data harta simpanan Anda selama 1 tahun terakhir.</p>
                                    ) : wajibZakatMaal ? (
                                        <div className="flex gap-3 items-start">
                                            <AlertCircle className="w-5 h-5 shrink-0 text-white fill-emerald-500" />
                                            <p className="text-sm font-semibold">Harta Anda telah mencapai Nisab (85 gram Emas / Rp {(nisabMaal).toLocaleString('id-ID')}). Anda wajib menunaikan zakat 2.5%.</p>
                                        </div>
                                    ) : (
                                        <div className="flex gap-3 items-start">
                                            <Info className="w-5 h-5 shrink-0 text-yellow-200" />
                                            <p className="text-sm font-medium text-yellow-50">Harta Anda belum mencapai nisab (85 gram emas). Belum wajib zakat harta.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Small Notes */}
                            <p className="text-[10px] text-yellow-100/70 mt-4 leading-relaxed font-medium">
                                *Asumsi harga emas Rp {GOLD_PRICE_PER_GRAM.toLocaleString('id-ID')}/gr. Nisab Emas = 85gr. Nisab Fitrah = {ZAKAT_FITRAH_RICE_KG}Kg Makanan Pokok per jiwa.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
