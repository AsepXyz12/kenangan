import type { Metadata } from "next";
import { Scheherazade_New, Fraunces, Literata } from "next/font/google";
import "./globals.css";

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
    "Baca Al-Qur'an 30 juz lengkap dengan harakat dan terjemahan, pelajari Rukun Islam, Rukun Iman, amalan malam Jumat lengkap dengan bacaan Yasin dan Al-Kahf, serta akses ensiklopedia hadits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${arabic.variable} ${display.variable} ${body.variable}`}>
        {children}
      </body>
    </html>
  );
}
