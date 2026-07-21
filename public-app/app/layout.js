import { Fraunces, Karla, Space_Mono } from "next/font/google";
import { readSettings } from "@/lib/store";
import EnhancedModeToggle from "@/components/EnhancedModeToggle";
import "./globals.css";
import "highlight.js/styles/atom-one-dark.css";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

const stamp = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-stamp",
});

export async function generateMetadata() {
  const settings = await readSettings();
  const siteName = settings.siteName || "Galeri Kenangan MA";
  return {
    title: siteName,
    description:
      "Album digital kenangan Madrasah Aliyah — kumpulan foto, video, cerita, dan jejak kebersamaan.",
    icons: settings.logoUrl ? { icon: settings.logoUrl } : undefined,
  };
}

export default async function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${display.variable} ${body.variable} ${stamp.variable} font-body bg-parchment text-ink`}
      >
        {children}
        <EnhancedModeToggle />
      </body>
    </html>
  );
}
