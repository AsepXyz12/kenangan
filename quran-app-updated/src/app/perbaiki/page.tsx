"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, Home } from "lucide-react";
import { resetTotal } from "@/lib/reset-total";

// Halaman bantuan mandiri satu tombol.
//
// KENAPA HALAMAN INI ADA: error.tsx/global-error.tsx cuma muncul kalau React
// SEMPAT mendeteksi ada yang error. Ada kelas masalah lain yang lebih licik:
// halaman terlihat "kosong"/"nyangkut separuh" tanpa React pernah nge-throw
// apa pun (mis. service worker balikin HTML basi dari build lama yang render-nya
// nggak crash, cuma nggak update-update / hilang beberapa bagian). Di kondisi
// begini nggak ada error boundary yang kepicu sama sekali.
//
// Solusinya: satu URL statis yang gampang diingat/dibagikan (/perbaiki),
// linknya ada permanen di Footer setiap halaman (bukan cuma di error state),
// isinya SATU tombol besar yang ngelakuin pemulihan total. Orang yang nggak
// ngerti apa-apa soal cache/service worker cukup diarahkan: "buka /perbaiki,
// terus pencet tombolnya" -- selesai.
export default function PerbaikiPage() {
  const [memperbaiki, setMemperbaiki] = useState(false);

  const handlePerbaikiTotal = () => {
    setMemperbaiki(true);
    resetTotal();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-5 py-16">
        <div className="max-w-md w-full text-center rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/50 px-6 py-10 md:px-10 md:py-12">
          <div className="w-14 h-14 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/40 flex items-center justify-center mx-auto mb-5">
            <Wrench size={24} className="text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-xl text-[var(--ink)] mb-3">
            Halaman terasa nyangkut, error, atau gagal dimuat?
          </h1>
          <p className="text-sm text-[var(--ink-soft)] mb-8 leading-relaxed">
            Pencet tombol di bawah ini. Ini akan membersihkan data tersimpan
            di HP kamu yang mungkin sudah usang (bukan bacaan/progress kamu —
            itu aman), lalu memuat ulang aplikasi dari awal. Cocok dipakai
            kapan saja aplikasi terasa aneh, tidak perlu tahu penyebabnya apa.
          </p>
          <button
            onClick={handlePerbaikiTotal}
            disabled={memperbaiki}
            className="btn-gold w-full px-5 py-3.5 rounded-full text-base font-semibold mb-4 disabled:opacity-70"
          >
            <Wrench size={17} className={memperbaiki ? "animate-spin" : ""} />
            {memperbaiki ? "Sedang memperbaiki..." : "Perbaiki & Muat Ulang"}
          </button>
          <p className="text-xs text-[var(--ink-soft)]/70 mb-6">
            Aman dipencet berkali-kali. Tidak menghapus hafalan bacaan
            terakhir kamu.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-[var(--ink-soft)] hover:text-[var(--heading)] underline underline-offset-4"
          >
            <Home size={13} />
            atau kembali ke Beranda dulu
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
