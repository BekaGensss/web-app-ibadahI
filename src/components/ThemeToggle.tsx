"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="p-2 sm:p-2.5 rounded-full bg-slate-100/50 text-slate-400 border border-slate-200/50 backdrop-blur-md w-[38px] h-[38px] sm:w-[42px] sm:h-[42px]">
                <span className="sr-only">Toggle theme</span>
            </button>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 sm:p-2.5 rounded-full bg-slate-100/50 hover:bg-slate-200/50 text-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-700/50 dark:text-slate-200 transition-colors border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md flex items-center justify-center w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] pointer-events-auto"
            title="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5 transition-all" />
            ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5 transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
