"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  href: string;
  label?: string;
};

/**
 * Tombol "kembali" di dalam aplikasi.
 *
 * RIWAYAT MASALAH:
 * v1: SELALU pergi ke `href` tetap yang di-hardcode tiap halaman (mis.
 *     halaman surat selalu balik ke "/quran"). Masalahnya: kalau user
 *     datang dari tempat LAIN (mis. kartu "Ayat Pilihan Hari Ini" di
 *     Beranda), klik "kembali" malah ke "/quran", bukan ke Beranda.
 * v2: Ganti pakai `router.back()`. Ternyata LEBIH parah: router.back()
 *     manggil history BROWSER asli (bukan riwayat navigasi di dalam app
 *     ini saja). Kalau tab ini pernah membuka halaman lain sebelumnya
 *     (mis. Juz 30) di sesi manapun, "kembali" bisa nyasar ke situ,
 *     bahkan bisa mendarat di state cache yang rusak ("halaman tidak
 *     bisa dimuat") karena back() browser kadang menyajikan versi
 *     halaman yang sudah usang dari bfcache.
 *
 * FIX (v3): jangan pernah tebak-tebak dari history browser. Sumber
 * (kartu "Ayat Pilihan Hari Ini", "Lanjutkan Bacaan", dst di Beranda)
 * secara EKSPLISIT menandai asalnya lewat query param `?dari=beranda`
 * di link yang mereka pakai. Tombol ini tinggal baca penanda itu dan
 * navigasi LANGSUNG (router.push) ke tujuan yang pasti benar — tidak
 * pernah bergantung pada apa isi history tab sebelumnya.
 */
function BackButtonInner({ href, label = "Kembali" }: BackButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dari = searchParams.get("dari");

  // Peta penanda "dari" -> tujuan pasti. Tambah entri baru di sini kalau
  // ada halaman lain yang perlu jadi titik asal eksplisit.
  const target = dari === "beranda" ? "/" : href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(target);
  };

  return (
    <a
      href={target}
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 mb-5 text-sm font-medium text-[var(--ink)] hover:text-[var(--heading)] transition-colors group"
    >
      <span className="flex items-center justify-center w-7 h-7 rounded-full border border-[var(--gold)]/50 bg-[var(--parchment-deep)] text-[var(--ink)] shadow-sm group-hover:border-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-[var(--parchment)] transition-colors">
        <ArrowLeft size={14} strokeWidth={2.6} />
      </span>
      {label}
    </a>
  );
}

export default function BackButton(props: BackButtonProps) {
  return (
    <Suspense
      fallback={
        <span className="inline-flex items-center gap-1.5 mb-5 text-sm font-medium text-[var(--ink)] opacity-60">
          <span className="flex items-center justify-center w-7 h-7 rounded-full border border-[var(--gold)]/50 bg-[var(--parchment-deep)]">
            <ArrowLeft size={14} strokeWidth={2.6} />
          </span>
          {props.label ?? "Kembali"}
        </span>
      }
    >
      <BackButtonInner {...props} />
    </Suspense>
  );
}
