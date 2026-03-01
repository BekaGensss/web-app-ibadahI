"use client";

import { useEffect, useRef } from "react";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
import { useAdzanSettings } from "@/hooks/useAdzanSettings";

/**
 * AdzanScheduler — Schedules native Android notifications for all 5 prayer times
 * using @capacitor/local-notifications. Notifications fire even when app is CLOSED.
 * Re-schedules every time the app opens.
 */
export default function AdzanScheduler() {
    const { settings, loaded, selectedCity } = useAdzanSettings();
    const hasScheduled = useRef(false);

    useEffect(() => {
        if (!loaded) return;
        if (!settings.notificationsEnabled) return;
        if (hasScheduled.current) return;
        hasScheduled.current = true;

        schedulePrayerNotifications();
    }, [loaded, settings.notificationsEnabled, selectedCity]);

    const schedulePrayerNotifications = async () => {
        try {
            const { LocalNotifications } = await import("@capacitor/local-notifications");

            // Check & request permission
            const perm = await LocalNotifications.checkPermissions();
            if (perm.display !== "granted") {
                const req = await LocalNotifications.requestPermissions();
                if (req.display !== "granted") return;
            }

            // Cancel existing adzan notifications to avoid duplicates
            const pending = await LocalNotifications.getPending();
            const adzanNotifs = pending.notifications.filter(n => n.id >= 1000 && n.id <= 1010);
            if (adzanNotifs.length > 0) {
                await LocalNotifications.cancel({ notifications: adzanNotifs });
            }

            const coords = new Coordinates(selectedCity.lat, selectedCity.lng);
            const params = CalculationMethod.Singapore(); // Indonesia/Kemenag

            const scheduled = [];

            // Schedule for today AND tomorrow (so notifications still work overnight)
            for (let dayOffset = 0; dayOffset <= 1; dayOffset++) {
                const targetDate = new Date();
                targetDate.setDate(targetDate.getDate() + dayOffset);
                targetDate.setHours(0, 0, 0, 0);

                const prayerTimes = new PrayerTimes(coords, targetDate, params);

                const prayers = [
                    { key: "fajr", name: "Subuh", time: prayerTimes.fajr, id: 1000 + dayOffset * 5 },
                    { key: "dhuhr", name: "Dzuhur", time: prayerTimes.dhuhr, id: 1001 + dayOffset * 5 },
                    { key: "asr", name: "Ashar", time: prayerTimes.asr, id: 1002 + dayOffset * 5 },
                    { key: "maghrib", name: "Maghrib", time: prayerTimes.maghrib, id: 1003 + dayOffset * 5 },
                    { key: "isha", name: "Isya", time: prayerTimes.isha, id: 1004 + dayOffset * 5 },
                ];

                const now = new Date();
                for (const prayer of prayers) {
                    // Only schedule future prayers
                    if (prayer.time > now) {
                        scheduled.push({
                            id: prayer.id,
                            title: `🕌 Waktu Salat ${prayer.name}`,
                            body: `Waktunya melaksanakan salat ${prayer.name} di ${selectedCity.name}. Semoga Allah menerima ibadah kita.`,
                            sound: "adzan",
                            smallIcon: "ic_notification",
                            iconColor: "#10b981",
                            schedule: { at: prayer.time, allowWhileIdle: true },
                            channelId: "adzan_channel",
                        });
                    }
                }
            }

            if (scheduled.length > 0) {
                // Ensure channel exists (Android 8+)
                try {
                    await LocalNotifications.createChannel({
                        id: "adzan_channel",
                        name: "Pengingat Adzan",
                        description: "Notifikasi waktu salat 5 waktu",
                        importance: 5, // IMPORTANCE_HIGH
                        sound: "adzan",
                        vibration: true,
                        lights: true,
                        lightColor: "#10b981",
                    });
                } catch { /* channel may already exist */ }

                await LocalNotifications.schedule({ notifications: scheduled });
                console.info(`[AdzanScheduler] ✅ Scheduled ${scheduled.length} prayer notifications for ${selectedCity.name}`);
            }
        } catch (err) {
            // Not in Capacitor or permission denied — silent fail
            console.info("[AdzanScheduler] Running in web mode, skipping native scheduling:", err);
        }
    };

    return null;
}
