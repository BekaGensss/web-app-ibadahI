// Custom Service Worker event handlers for next-pwa
// This file extends the auto-generated service worker

// ── Background Adzan Notification Push handler ─────────────────────────────
self.addEventListener("push", (event) => {
    if (!event.data) return;
    try {
        const data = event.data.json();
        event.waitUntil(
            self.registration.showNotification(data.title || "🕌 Waktu Salat", {
                body: data.body || "Waktunya melaksanakan salat.",
                icon: "/icon-192x192.png",
                badge: "/icon-192x192.png",
                tag: data.tag || "adzan",
                renotify: true,
                vibrate: [200, 100, 200],
                data: { url: data.url || "/" },
            })
        );
    } catch (_) { }
});

// ── Notification click → open app ──────────────────────────────────────────
self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    const url = event.notification.data?.url || "/";
    event.waitUntil(
        clients
            .matchAll({ type: "window", includeUncontrolled: true })
            .then((clientList) => {
                for (const client of clientList) {
                    if (client.url.includes(self.location.origin) && "focus" in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) return clients.openWindow(url);
            })
    );
});

// ── Background Sync for scheduled adzan (fallback) ─────────────────────────
self.addEventListener("sync", (event) => {
    if (event.tag === "adzan-check") {
        event.waitUntil(Promise.resolve()); // placeholder for background sync
    }
});
