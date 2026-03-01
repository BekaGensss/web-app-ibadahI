"use client";

import { useEffect, useRef } from "react";

/**
 * DailyReminderScheduler — Schedules native daily reminders for Dzikir Pagi & Petang
 * using Capacitor Local Notifications. Fires even when app is closed.
 */
export default function DailyReminderScheduler() {
    const hasScheduled = useRef(false);

    useEffect(() => {
        if (hasScheduled.current) return;
        hasScheduled.current = true;
        scheduleReminders();
    }, []);

    const scheduleReminders = async () => {
        try {
            const { LocalNotifications } = await import("@capacitor/local-notifications");

            const perm = await LocalNotifications.checkPermissions();
            if (perm.display !== "granted") return; // Only schedule if already granted

            // Cancel old reminders
            const pending = await LocalNotifications.getPending();
            const reminderNotifs = pending.notifications.filter(n => n.id >= 2000 && n.id <= 2010);
            if (reminderNotifs.length > 0) {
                await LocalNotifications.cancel({ notifications: reminderNotifs });
            }

            // Ensure channel exists
            try {
                await LocalNotifications.createChannel({
                    id: "reminder_channel",
                    name: "Pengingat Dzikir Harian",
                    description: "Pengingat dzikir pagi dan petang",
                    importance: 4,
                    vibration: true,
                });
            } catch { /* channel may already exist */ }

            const now = new Date();
            const notifications = [];

            // Dzikir Pagi — 05:30 AM
            const pagiTime = new Date(now);
            pagiTime.setHours(5, 30, 0, 0);
            if (pagiTime <= now) pagiTime.setDate(pagiTime.getDate() + 1); // If past, schedule tomorrow

            notifications.push({
                id: 2000,
                title: "🌅 Waktunya Dzikir Pagi",
                body: "Mulai hari dengan dzikir pagi. 'Barangsiapa yang membaca dzikir pagi, ia mendapat perlindungan Allah sepanjang hari.'",
                schedule: {
                    at: pagiTime,
                    repeats: true,
                    every: "day" as const,
                    allowWhileIdle: true,
                },
                channelId: "reminder_channel",
                smallIcon: "ic_notification",
                iconColor: "#10b981",
            });

            // Dzikir Petang — 15:30 PM
            const petangTime = new Date(now);
            petangTime.setHours(15, 30, 0, 0);
            if (petangTime <= now) petangTime.setDate(petangTime.getDate() + 1);

            notifications.push({
                id: 2001,
                title: "🌇 Waktunya Dzikir Petang",
                body: "Tutup sore dengan dzikir petang. Jangan lewatkan amalan sore yang penuh berkah ini.",
                schedule: {
                    at: petangTime,
                    repeats: true,
                    every: "day" as const,
                    allowWhileIdle: true,
                },
                channelId: "reminder_channel",
                smallIcon: "ic_notification",
                iconColor: "#10b981",
            });

            await LocalNotifications.schedule({ notifications });
            console.info("[DailyReminderScheduler] ✅ Scheduled dzikir pagi & petang reminders");
        } catch {
            // Not in Capacitor or no permission — silent fail
        }
    };

    return null;
}
