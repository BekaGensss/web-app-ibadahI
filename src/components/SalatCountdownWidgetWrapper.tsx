"use client";
// Client-side wrapper so the countdown (which uses browser APIs) is safe to
// import from a Server Component page without triggering the `ssr:false` error.
import dynamic from "next/dynamic";

const SalatCountdownWidget = dynamic(
    () => import("@/components/SalatCountdownWidget"),
    { ssr: false }
);

export default function SalatCountdownWidgetWrapper() {
    return <SalatCountdownWidget />;
}
