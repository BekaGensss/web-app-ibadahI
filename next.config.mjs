/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  customWorkerSrc: "sw-custom.js",
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig = {
  output: "export",
  // Required: tell Next.js 16 to use webpack (not turbopack) for production builds
  // so that next-pwa webpack plugin works correctly
  turbopack: {},
};

export default withPWA(nextConfig);
