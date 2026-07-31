import type { Metadata, Viewport } from "next";
import { Scheherazade_New, Fraunces, Literata } from "next/font/google";
import "./globals.css";
import { AudioPlayerProvider } from "@/components/AudioPlayerContext";
import { FontSizeProvider } from "@/components/FontSizeContext";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import InstallPrompt from "@/components/InstallPrompt";

const arabic = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Literata({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mushaf — Al-Qur'an, Rukun Islam, Rukun Iman & Amalan Malam Jumat",
  description:
    "Baca Al-Qur'an 30 juz lengkap dengan harakat, terjemahan, dan murottal audio. Bisa dibaca offline — cocok untuk anak-anak yang belum punya mushaf sendiri.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mushaf",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#24463d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${arabic.variable} ${display.variable} ${body.variable}`}>
        <FontSizeProvider>
          <AudioPlayerProvider>
            {children}
            <InstallPrompt />
          </AudioPlayerProvider>
        </FontSizeProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
