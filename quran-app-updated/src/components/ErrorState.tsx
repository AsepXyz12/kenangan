"use client";

import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Home, BookOpenText, RotateCw } from "lucide-react";

// Komponen error bersama untuk semua route segment (quran, iqro, hadits, dll).
//
// KENAPA INI DIBUAT: sebelumnya tiap error.tsx cuma render <div> kecil berisi
// tombol "Coba lagi" TANPA Navbar/Footer sama sekali. Karena Navbar diimpor di
// masing-masing page.tsx (bukan di root layout.tsx), begitu sebuah halaman
// gagal render, seluruh Navbar ikut hilang -> pengguna kejebak di halaman
// "Terjadi kesalahan" tanpa jalan keluar. Kalau lagi apes (mis. koneksi
// sempat putus pas pindah dari "Ayat pilihan hari ini" ke Mushaf/Beranda),
// yang kelihatan ya cuma "Terjadi kesalahan" itu lagi dan itu lagi, walau
// sudah pencet apapun. Sekarang Navbar & link ke Beranda/Mushaf SELALU ada,
// jadi pengguna selalu punya jalan pindah halaman lain walau satu halaman
// tertentu lagi bermasalah.
export default function ErrorState({
  reset,
  pesan = "Halaman ini gagal dimuat. Coba muat ulang, atau pindah ke halaman lain dulu.",
}: {
  reset: () => void;
  pesan?: string;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-5 py-20">
        <div className="max-w-md w-full text-center rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/50 px-6 py-10 md:px-10 md:py-12">
          <p className="font-arabic text-4xl text-[var(--gold)] mb-4" dir="rtl">
            عَفْوًا
          </p>
          <h1 className="font-display text-xl text-[var(--ink)] mb-3">
            Terjadi kesalahan
          </h1>
          <p className="text-sm text-[var(--ink-soft)] mb-8 leading-relaxed">
            {pesan}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="btn-gold px-5 py-2.5 rounded-full text-sm font-medium"
            >
              <RotateCw size={15} />
              Coba lagi
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--gold)] text-[var(--ink)] hover:bg-[var(--gold)]/15 transition-colors text-sm"
            >
              <Home size={15} />
              Ke Beranda
            </Link>
            <Link
              href="/quran"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--parchment-line)] text-[var(--ink-soft)] hover:border-[var(--gold)] hover:text-[var(--ink)] transition-colors text-sm"
            >
              <BookOpenText size={15} />
              Buka Mushaf
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
