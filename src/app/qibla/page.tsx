"use client";

import { useState, useEffect } from "react";
import { Compass, MapPin, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Mecca Coordinates
const MECCA_LAT = 21.422487;
const MECCA_LNG = 39.826206;

export default function QiblaPage() {
    const [heading, setHeading] = useState<number | null>(null);
    const [qiblaBearing, setQiblaBearing] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
    const [locationName, setLocationName] = useState<string>("Sistem sedang mencari lokasi...");

    // Calculate bearing to Mecca
    function getQiblaBearing(lat: number, lng: number) {
        const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
        const toDegrees = (radians: number) => (radians * 180) / Math.PI;

        const lat1 = toRadians(lat);
        const lng1 = toRadians(lng);
        const lat2 = toRadians(MECCA_LAT);
        const lng2 = toRadians(MECCA_LNG);

        const dLng = lng2 - lng1;

        const y = Math.sin(dLng) * Math.cos(lat2);
        const x =
            Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

        let bearing = Math.atan2(y, x);
        bearing = toDegrees(bearing);
        return (bearing + 360) % 360;
    }

    // Handle device orientation
    const handleOrientation = (event: DeviceOrientationEvent) => {
        let absoluteHeading: number | null = null;

        // WebKit (iOS) logic mapping device orientation to compass heading
        const devEvent = event as any;
        if (devEvent.webkitCompassHeading) {
            absoluteHeading = devEvent.webkitCompassHeading;
        }
        // Android/Standard fallback using absolute alpha
        else if (event.absolute && event.alpha !== null) {
            absoluteHeading = 360 - event.alpha;
        }

        if (absoluteHeading !== null) {
            setHeading(absoluteHeading);
        } else {
            // If we don't get the correct data, but permissions were granted, log error gracefully
            if (permissionGranted) {
                setError("Sensor kompas tidak terdeteksi atau tidak presisi di perangkat ini. Anda mungkin perlu mengalibrasi (gerakkan HP membentuk angka 8).");
            }
        }
    };

    const requestAccess = async () => {
        setError(null);
        setPermissionGranted(true);

        // 1. Get Geolocation FIRST to calculate the target bearing
        if (!navigator.geolocation) {
            setError("Geolokasi tidak didukung oleh browser ini.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const bearing = getQiblaBearing(userLat, userLng);
                setQiblaBearing(bearing);

                // Reverse Geocoding attempt with free API
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLat}&lon=${userLng}`);
                    const data = await res.json();
                    setLocationName(data.address?.city || data.address?.town || data.address?.county || "Lokasi Anda");
                } catch (e) {
                    setLocationName(`${userLat.toFixed(2)}, ${userLng.toFixed(2)}`);
                }

                // 2. Request Compass Sensor Access (iOS requires specific request call)
                // @ts-ignore
                if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                    // @ts-ignore
                    DeviceOrientationEvent.requestPermission()
                        .then((permissionState: string) => {
                            if (permissionState === 'granted') {
                                window.addEventListener('deviceorientationabsolute', handleOrientation, true);
                                window.addEventListener("deviceorientation", handleOrientation, true);
                            } else {
                                setError("Izin akses sensor orientasi ditolak.");
                                setPermissionGranted(false);
                            }
                        })
                        .catch(console.error);
                } else {
                    // Non-iOS devices typically don't require explicit event request
                    window.addEventListener('deviceorientationabsolute', handleOrientation, true);
                    window.addEventListener("deviceorientation", handleOrientation, true);
                }
            },
            (err) => {
                setError(`Akses geolokasi ditolak atau gagal (${err.message}). Aktifkan GPS Anda.`);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    useEffect(() => {
        return () => {
            window.removeEventListener('deviceorientationabsolute', handleOrientation);
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, []);

    // Calculate the rotation needed for the compass needle.
    // The compass rose rotates to counter the phone's heading, keeping North pointing up relative to Earth
    const compassRotation = heading ? 360 - heading : 0;

    // The Kaaba indicator rotates relative to the compass rose, pointing to Qibla bearing
    // But wait, if we rotate the needle DIRECTLY to (QiblaBearing - Heading), it points straight to Kaaba relative to phone.
    const needleRotation = (qiblaBearing !== null && heading !== null) ? qiblaBearing - heading : 0;

    return (
        <div className="max-w-md mx-auto min-h-[80vh] flex flex-col items-center">

            {/* Header */}
            <div className="w-full flex items-center mb-8 gap-4">
                <Link href="/" className="p-2 rounded-xl bg-white/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                        Arah Kiblat <Compass className="w-6 h-6 text-fuchsia-500" />
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Temukan arah Ka'bah secara akurat.</p>
                </div>
            </div>

            {/* Main Container */}
            <div className="w-full flex-grow flex flex-col items-center justify-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/60 dark:border-slate-800 p-8 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(217,70,239,0.15)] relative overflow-hidden">

                {/* Glow overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-[80px] pointer-events-none"></div>

                {!permissionGranted ? (
                    <div className="text-center flex flex-col items-center gap-6 relative z-10 w-full">
                        <div className="w-24 h-24 bg-gradient-to-tr from-fuchsia-100 to-white dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center shadow-lg border border-fuchsia-100 dark:border-slate-600">
                            <MapPin className="w-10 h-10 text-fuchsia-500 animate-bounce" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-purple-600 dark:from-fuchsia-400 dark:to-purple-400 mb-2">Akses GPS & Sensor</h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Untuk menentukan arah kiblat, aplikasi memerlukan izin akses geolokasi dan sensor kompas.</p>
                        </div>

                        <button
                            onClick={requestAccess}
                            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-400 hover:to-purple-500 text-white font-bold text-lg shadow-[0_10px_30px_-10px_rgba(217,70,239,0.6)] hover:shadow-[0_15px_40px_-5px_rgba(217,70,239,0.7)] transition-all hover:-translate-y-1 active:scale-95 flex justify-center items-center gap-2"
                        >
                            Izinkan Akses Lokasi
                        </button>
                    </div>
                ) : (
                    <div className="w-full relative z-10 flex flex-col items-center">

                        {/* Status Info */}
                        <div className="bg-slate-100/50 dark:bg-slate-800/50 w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 mb-10 flex items-center justify-between backdrop-blur-md">
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Lokasi Deteksi</span>
                                <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5 text-fuchsia-500" /> {locationName}
                                </span>
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Derajat Kiblat</span>
                                <span className="text-sm font-bold text-slate-900 dark:text-white bg-fuchsia-100 dark:bg-fuchsia-500/20 text-fuchsia-700 dark:text-fuchsia-300 px-2 py-0.5 rounded-md inline-block">
                                    {qiblaBearing !== null ? `${qiblaBearing.toFixed(1)}°` : '...'}
                                </span>
                            </div>
                        </div>

                        {error && (
                            <div className="w-full bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500/50 text-red-700 dark:text-red-300 p-3 rounded-xl text-xs flex items-start gap-2 mb-6">
                                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* THE COMPASS */}
                        <div className="relative w-64 h-64 md:w-72 md:h-72 my-8">
                            {/* Compass Outer Ring */}
                            <div className="absolute inset-0 rounded-full border-[10px] border-slate-200 shadow-[inset_0_4px_10px_rgba(0,0,0,0.1)] dark:border-slate-800 dark:shadow-[inset_0_4px_15px_rgba(0,0,0,0.5)] bg-white dark:bg-slate-900 flex items-center justify-center">

                                {/* Compass Tick Marks (Rose) that rotates indicating North */}
                                <div
                                    className="w-[90%] h-[90%] rounded-full relative transition-transform duration-200 ease-out"
                                    style={{ transform: `rotate(${compassRotation}deg)` }}
                                >
                                    {/* North Marker */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 font-bold text-red-500 text-lg">U</div>
                                    {/* East */}
                                    <div className="absolute top-1/2 right-1 -translate-y-1/2 font-bold text-slate-400 text-sm">T</div>
                                    {/* South */}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-bold text-slate-400 text-sm">S</div>
                                    {/* West */}
                                    <div className="absolute top-1/2 left-1 -translate-y-1/2 font-bold text-slate-400 text-sm">B</div>

                                    {/* Subtle crosshairs */}
                                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-200 dark:bg-slate-800"></div>
                                    <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-200 dark:bg-slate-800"></div>
                                </div>

                                {/* Central Dot */}
                                <div className="absolute z-30 w-4 h-4 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.8)] border-2 border-white dark:border-slate-900"></div>

                                {/* KIBLA NEEDLE (Rotates pointing to Qibla relative to screen) */}
                                <div
                                    className="absolute z-20 w-1.5 h-full transition-transform duration-200 ease-out drop-shadow-xl"
                                    style={{ transform: `rotate(${needleRotation}deg)` }}
                                >
                                    {/* Pointer Head (Kaaba Icon placeholder) */}
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-10 bg-black flex flex-col border border-yellow-500 shadow-[0_0_20px_rgba(217,70,239,0.5)]">
                                        <div className="h-2 w-full bg-yellow-500 mt-2"></div>
                                    </div>
                                    {/* Line */}
                                    <div className="absolute top-14 bottom-1/2 left-1/2 -translate-x-1/2 w-1.5 bg-gradient-to-b from-fuchsia-500 to-transparent"></div>
                                </div>

                            </div>
                        </div>

                        {/* Instruction / Accuracy Helper */}
                        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-[250px]">
                            <strong className="block mb-1 text-slate-700 dark:text-slate-300">Tips Kalibrasi</strong>
                            Gerakkan HP Anda membentuk angka 8 di udara selama beberapa detik untuk memastikan sensor akurat. Jauhkan dari benda magnetis.
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                            className="flex items-center gap-2 text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400 hover:text-fuchsia-500 transition-colors"
                            type="button"
                        >
                            <RefreshCw className="w-4 h-4" /> Reset Sensor
                        </button>

                    </div>
                )}
            </div>

        </div>
    );
}
