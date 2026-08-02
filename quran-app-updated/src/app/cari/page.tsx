import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import CariClient from "@/components/CariClient";

export const metadata = { title: "Cari — Mushaf" };

export default function CariPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <BackButton href="/" label="Beranda" />
        <div className="mb-8">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Pencarian
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-4">
            Cari di Mushaf
          </h1>
          <p className="text-[var(--ink-soft)] leading-relaxed">
            Cari ayat Al-Qur&apos;an, hadits dari sembilan kitab, doa &amp; dzikir, dan seluruh
            halaman panduan sekaligus di sini.
          </p>
        </div>
        <Suspense fallback={null}>
          <CariClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
