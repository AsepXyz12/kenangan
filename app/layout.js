import { Fraunces, Karla, Space_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata = {
  title: "Galeri Kenangan MA",
  description:
    "Album digital kenangan Madrasah Aliyah — kumpulan foto, cerita, dan jejak kebersamaan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${display.variable} ${body.variable} ${stamp.variable} font-body bg-parchment text-ink`}
      >
        {children}
      </body>
    </html>
  );
}
