"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  href: string;
  label?: string;
};

/**
 * Tombol "kembali" di dalam aplikasi.
 *
 * Sebelumnya tombol ini SELALU pergi ke `href` tetap yang di-hardcode tiap
 * halaman (mis. halaman surat selalu balik ke "/quran"). Masalahnya: kalau
 * user datang dari tempat LAIN (mis. dari kartu "Ayat Pilihan Hari Ini" di
 * Beranda), klik "kembali" malah melempar mereka ke "/quran" — bukan ke
 * Beranda tempat mereka sebenarnya berasal. Membingungkan.
 *
 * Sekarang: coba `router.back()` dulu (balik ke halaman PERSIS yang user
 * datangi sebelumnya, apa pun itu). `href` cuma dipakai sebagai FALLBACK
 * kalau ternyata tidak ada riwayat untuk dikembalikan (mis. tab ini dibuka
 * langsung dari notifikasi/shortcut PWA, jadi halaman ini adalah entry
 * pertama) — di situ baru kita paksa ke tujuan default yang masuk akal.
 */
export default function BackButton({ href, label = "Kembali" }: BackButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Gak ada riwayat sama sekali di tab ini (window.history.length === 1)
    // -> jelas gak bisa "back", langsung ke fallback.
    if (typeof window === "undefined" || window.history.length <= 1) {
      router.push(href);
      return;
    }

    const pathBeforeBack = pathname;
    router.back();

    // Jaga-jaga: kalau setelah dicoba path-nya TETAP sama (artinya back()
    // gagal pindah ke mana pun, mis. history entry sebelumnya di luar situs
    // dan navigasi diblokir, atau situasi lain yang gak terduga), paksa ke
    // fallback supaya tombol ini gak pernah kelihatan "gak ngapa-ngapain".
    window.setTimeout(() => {
      if (window.location.pathname === pathBeforeBack) {
        router.push(href);
      }
    }, 350);
  };

  return (
    <a
      href={href}
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
