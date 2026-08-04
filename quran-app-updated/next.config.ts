import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/hadits/**/*": ["./src/data/hadits/**/*.json"],
  },
  // PENTING: /sw.js WAJIB no-cache di level HTTP. Kalau CDN/browser boleh
  // nyimpen file ini dengan cache biasa, versi baru yang di-deploy (BUILD_ID
  // baru) bisa nggak kedeteksi untuk sekian lama -> ini akar dari kenapa
  // "Perbaiki & Muat Ulang" kadang kelihatan nggak beneran ngebersihin
  // sampai ke akarnya (lihat catatan di reset-total.ts & ServiceWorkerRegister.tsx).
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
