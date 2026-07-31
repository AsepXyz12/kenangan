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

const BASE_URL = "https://al-quran-id-silk.vercel.app/";
const SITE_TITLE = "Mushaf — Al-Qur'an, Rukun Islam, Rukun Iman & Amalan Malam Jumat";
const SITE_DESCRIPTION =
  "Baca Al-Qur'an 30 juz lengkap dengan harakat, terjemahan, dan murottal audio. Bisa dibaca offline — cocok untuk anak-anak yang belum punya mushaf sendiri.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Mushaf",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Al-Quran online",
    "Al-Quran anak",
    "murottal audio",
    "hadits bukhari muslim",
    "panduan sholat",
    "rukun islam",
    "rukun iman",
    "doa dan dzikir",
  ],
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "Mushaf",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/icons/icon-512.png",
        width: 512,
        height: 512,
        alt: "Mushaf — Al-Qur'an untuk anak-anak",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/icons/icon-512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  // TODO Asep: isi setelah verifikasi di Google Search Console
  // (Search Console -> Settings -> Ownership verification -> HTML tag -> copy value "content"-nya ke sini)
  // verification: {
  //   google: "isi-kode-verifikasi-di-sini",
  // },
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
