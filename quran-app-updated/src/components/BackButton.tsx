import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  href: string;
  label?: string;
};

/**
 * Tombol "kembali" di dalam aplikasi (bukan andalkan tombol back browser).
 * Dipasang di atas halaman baca (surat, juz, tafsir) supaya user selalu
 * punya jalan pulang yang pasti kerja, walau riwayat browser-nya
 * bermasalah/reload gagal seperti pas buka dari notifikasi atau PWA.
 */
export default function BackButton({ href, label = "Kembali" }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 mb-5 text-sm font-medium text-[var(--ink)] hover:text-[var(--heading)] transition-colors group"
    >
      <span className="flex items-center justify-center w-7 h-7 rounded-full border border-[var(--gold)]/50 bg-[var(--parchment-deep)] text-[var(--ink)] shadow-sm group-hover:border-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-[var(--parchment)] transition-colors">
        <ArrowLeft size={14} strokeWidth={2.6} />
      </span>
      {label}
    </Link>
  );
}
