import { BookMarked, ExternalLink } from "lucide-react";

// Kredit metode Iqro. Konten di jilid 1-6 kita susun ulang & sederhanakan
// sendiri (bukan hasil scan/salin persis dari buku cetak) supaya nyaman
// dibaca di layar HP, TAPI urutan & metodenya mengikuti karya asli di bawah
// ini — jadi kreditnya wajib tetap ditampilkan.
export default function IqroCredit({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`rounded-sm border border-[var(--gold)]/40 bg-[var(--teal)]/[0.06] ${
        compact ? "px-4 py-3" : "px-5 py-4"
      } flex flex-col gap-3`}
    >
      <div className="flex gap-3 items-start">
        <BookMarked size={18} className="text-[var(--gold)] shrink-0 mt-0.5" />
        <p className="text-xs md:text-[13px] text-[var(--ink-soft)] leading-relaxed">
          Metode & urutan belajar jilid 1–6 di halaman ini mengikuti{" "}
          <span className="text-[var(--ink)] font-medium">
            buku Iqro &mdash; Cara Cepat Belajar Membaca Al-Qur&apos;an
          </span>{" "}
          karya <span className="text-[var(--ink)] font-medium">KH. As&apos;ad Humam</span>,
          terbitan Balai Litbang LPTQ Nasional Team Tadarus &ldquo;AMM&rdquo; Yogyakarta. Contoh
          di sini disusun ulang untuk tampilan digital, bukan hasil pindai buku aslinya.
        </p>
      </div>
      <a
        href="https://www.gramedia.com/products/buku-iqro-besarbundel-kertas-hvs"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="group flex items-center justify-between gap-3 rounded-sm border border-[var(--gold)]/30 bg-[var(--parchment)]/60 px-3.5 py-2.5 hover:border-[var(--gold)] transition-colors"
      >
        <span className="text-xs md:text-[13px] text-[var(--ink)]">
          Dukung penulis &amp; guru ngaji Anda — lengkapi belajar dengan{" "}
          <span className="font-medium">buku Iqro cetak asli</span>{" "}
          <span className="text-[var(--ink-soft)]">
            (ISBN 978-979-25-6412-9, penerbit AMM Yogyakarta)
          </span>
        </span>
        <ExternalLink
          size={15}
          className="text-[var(--gold)] shrink-0 group-hover:translate-x-0.5 transition-transform"
        />
      </a>
    </div>
  );
}
