import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-5 text-center py-24">
        <div>
          <p className="font-arabic text-4xl text-[var(--ink)] mb-4" dir="rtl">
            لا يوجد
          </p>
          <h1 className="font-display text-2xl text-[var(--ink)] mb-3">
            Halaman tidak ditemukan
          </h1>
          <p className="text-[var(--ink-soft)] mb-6">
            Surat atau juz yang kamu cari tidak tersedia.
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 rounded-full bg-[var(--teal)] text-[var(--parchment)] hover:bg-[var(--teal-deep)] transition-colors text-sm"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
