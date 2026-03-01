"use client";

import { useEffect } from "react";
import { SplashScreen } from "@capacitor/splash-screen";

export function SplashHandler() {
    useEffect(() => {
        const hideSplash = async () => {
            try {
                // Wait for components to hydrate a bit
                setTimeout(async () => {
                    await SplashScreen.hide();
                }, 500);
            } catch (e) {
                // Not on mobile
            }
        };
        hideSplash();
    }, []);

    return null;
}
