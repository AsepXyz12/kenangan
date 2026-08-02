"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Home, BookOpenText, RotateCw, Wrench } from "lucide-react";
import { resetTotal } from "@/lib/reset-total";
import ChatPemilikWidget from "./ChatPemilikWidget";

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
//
// TAMBAHAN: "Coba lagi" (reset() dari Next.js) cuma me-render ulang segment
// yang error -- kalau akar masalahnya cache service worker yang nyangkut ke
// build lama, itu nggak bakal nolong. Makanya sekarang ada SATU tombol lagi
// yang lebih "keras": Perbaiki & Muat Ulang. Ini melakukan reset total
// (lepas service worker + hapus semua cache + reload penuh dari server) --
// dirancang supaya orang awam yang nggak ngerti apa-apa soal cache/SW tetap
// bisa "nyelametin diri" cuma dengan satu kali tap, apa pun akar masalahnya.
export default function ErrorState({
  reset,
  pesan = "Halaman ini gagal dimuat. Coba muat ulang, atau pindah ke halaman lain dulu.",
}: {
  reset: () => void;
  pesan?: string;
}) {
  const [memperbaiki, setMemperbaiki] = useState(false);

  const handlePerbaikiTotal = () => {
    setMemperbaiki(true);
    resetTotal();
  };

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
          <p className="text-sm text-[var(--ink-soft)] mb-6 leading-relaxed">
            {pesan}
          </p>

          <button
            onClick={handlePerbaikiTotal}
            disabled={memperbaiki}
            className="btn-gold w-full px-5 py-3 rounded-full text-sm font-semibold mb-3 disabled:opacity-70"
          >
            <Wrench size={16} className={memperbaiki ? "animate-spin" : ""} />
            {memperbaiki ? "Sedang memperbaiki..." : "Perbaiki & Muat Ulang"}
          </button>
          <p className="text-xs text-[var(--ink-soft)]/80 mb-6">
            Kalau bingung tombol mana yang dipencet, pencet ini saja — aman
            dan otomatis membenahi semuanya.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-[var(--parchment-line)]">
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--parchment-line)] text-[var(--ink-soft)] hover:border-[var(--gold)] hover:text-[var(--ink)] transition-colors text-xs"
            >
              <RotateCw size={13} />
              Coba lagi (ringan)
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--parchment-line)] text-[var(--ink-soft)] hover:border-[var(--gold)] hover:text-[var(--ink)] transition-colors text-xs"
            >
              <Home size={13} />
              Ke Beranda
            </Link>
            <Link
              href="/quran"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--parchment-line)] text-[var(--ink-soft)] hover:border-[var(--gold)] hover:text-[var(--ink)] transition-colors text-xs"
            >
              <BookOpenText size={13} />
              Buka Mushaf
            </Link>
          </div>

          <div className="mt-5 pt-5 border-t border-[var(--parchment-line)] flex justify-center">
            <ChatPemilikWidget />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
