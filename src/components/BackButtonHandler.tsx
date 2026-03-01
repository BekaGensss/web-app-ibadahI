"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * BackButtonHandler — handles Android hardware back button via Capacitor App plugin.
 * - If there is browser history to go back to, goes back.
 * - If at root (/), exits the app.
 * This component renders nothing, only adds the listener.
 */
export default function BackButtonHandler() {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        let cleanup: (() => void) | null = null;

        const setup = async () => {
            try {
                const { App } = await import("@capacitor/app");
                const handle = await App.addListener("backButton", ({ canGoBack }) => {
                    if (canGoBack) {
                        router.back();
                    } else {
                        App.exitApp();
                    }
                });
                cleanup = () => handle.remove();
            } catch {
                // Not running in Capacitor (web browser) — ignore
            }
        };

        setup();
        return () => { cleanup?.(); };
    }, [pathname, router]);

    return null;
}
