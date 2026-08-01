import Link from "next/link";

// Catatan: daftar href di sini juga di-precache untuk offline di public/sw.js
// (APP_SHELL). Kalau nambah/hapus menu di sini, update juga di sw.js.
const NAV_ITEMS = [
  { href: "/quran", label: "Al-Qur'an" },
  { href: "/hadits", label: "Hadits" },
  { href: "/thaharah", label: "Thaharah" },
  { href: "/panduan-sholat", label: "Panduan Sholat" },
  { href: "/doa-dzikir", label: "Doa & Dzikir" },
  { href: "/panduan-puasa", label: "Panduan Puasa" },
  { href: "/panduan-zakat", label: "Panduan Zakat" },
  { href: "/panduan-haji-umrah", label: "Haji & Umrah" },
  { href: "/sholat-khusus", label: "Sholat Khusus" },
  { href: "/asmaul-husna", label: "Asmaul Husna" },
  { href: "/kisah-nabi", label: "Kisah Nabi" },
  { href: "/sirah-nabawiyah", label: "Sirah Nabawiyah" },
  { href: "/rukun-islam", label: "Rukun Islam" },
  { href: "/rukun-iman", label: "Rukun Iman" },
  { href: "/aqidah", label: "Aqidah & Tauhid" },
  { href: "/fiqih-madzhab", label: "Fiqih & Madzhab" },
  { href: "/akhlak-adab", label: "Akhlak & Adab" },
  { href: "/ilmu-tajwid", label: "Ilmu Tajwid" },
  { href: "/sirah-sahabat", label: "Sirah Sahabat" },
  { href: "/wanita-dalam-islam", label: "Wanita dalam Islam" },
  { href: "/sejarah-islam", label: "Sejarah Islam" },
  { href: "/malam-jumat", label: "Amalan Malam" },
];

export default function Navbar() {
  return (
    <header className="border-b border-[var(--parchment-line)] bg-[var(--parchment)]/95 backdrop-blur sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="font-display italic text-xl md:text-2xl text-[var(--teal-deep)]" style={{ fontWeight: 600 }}>
            Mushaf
          </span>
        </Link>
        <nav className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm md:text-[15px] px-3 py-2 rounded-full text-[var(--ink-soft)] hover:text-[var(--teal-deep)] hover:bg-[var(--parchment-deep)] transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
