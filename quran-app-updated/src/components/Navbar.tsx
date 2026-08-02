"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BookOpenText, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";
import SearchOverlay from "@/components/SearchOverlay";

// Catatan: daftar href di sini juga di-precache untuk offline di public/sw.js
// (APP_SHELL). Kalau nambah/hapus menu di sini, update juga di sw.js.
const NAV_GROUPS: { label: string; items: { href: string; label: string }[] }[] = [
  {
    label: "Bacaan Utama",
    items: [
      { href: "/cari", label: "Cari" },
      { href: "/quran", label: "Al-Qur'an" },
      { href: "/iqro", label: "Iqro Anak (Jilid 1-6)" },
      { href: "/hadits", label: "Hadits" },
      { href: "/doa-dzikir", label: "Doa & Dzikir" },
      { href: "/asmaul-husna", label: "Asmaul Husna" },
    ],
  },
  {
    label: "Panduan Ibadah",
    items: [
      { href: "/thaharah", label: "Thaharah" },
      { href: "/panduan-sholat", label: "Panduan Sholat" },
      { href: "/sholat-khusus", label: "Sholat Khusus" },
      { href: "/panduan-puasa", label: "Panduan Puasa" },
      { href: "/panduan-zakat", label: "Panduan Zakat" },
      { href: "/panduan-haji-umrah", label: "Haji & Umrah" },
    ],
  },
  {
    label: "Ilmu & Akidah",
    items: [
      { href: "/rukun-islam", label: "Rukun Islam" },
      { href: "/rukun-iman", label: "Rukun Iman" },
      { href: "/aqidah", label: "Aqidah & Tauhid" },
      { href: "/fiqih-madzhab", label: "Fiqih & Madzhab" },
      { href: "/hukum-islam", label: "Hukum-Hukum Islam" },
      { href: "/akhlak-adab", label: "Akhlak & Adab" },
      { href: "/ilmu-tajwid", label: "Ilmu Tajwid" },
    ],
  },
  {
    label: "Sejarah & Kisah",
    items: [
      { href: "/kisah-nabi", label: "Kisah Nabi" },
      { href: "/sirah-nabawiyah", label: "Sirah Nabawiyah" },
      { href: "/sirah-sahabat", label: "Sirah Sahabat" },
      { href: "/wanita-dalam-islam", label: "Wanita dalam Islam" },
      { href: "/sejarah-islam", label: "Sejarah Islam" },
    ],
  },
  {
    label: "Amalan & Acara",
    items: [
      { href: "/malam-jumat", label: "Amalan Malam" },
      { href: "/tahlil-yasin", label: "Tahlil & Yasin" },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // Tutup drawer otomatis tiap kali pindah halaman.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Kunci scroll body & tutup dengan tombol Escape selama drawer terbuka.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="header-glass sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[var(--gold-bright)] to-[var(--gold)] text-[var(--heading)] shadow-[0_4px_16px_-4px_rgba(224,184,79,0.6)] transition-transform group-hover:rotate-[12deg]">
              <BookOpenText size={18} strokeWidth={2.2} />
            </span>
            <span
              className="font-display italic text-xl md:text-2xl bg-gradient-to-r from-[var(--gold-bright)] to-[var(--heading)] bg-clip-text text-transparent"
              style={{ fontWeight: 600 }}
            >
              Mushaf
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <SearchOverlay />

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
              className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[var(--gold)]/40 bg-[var(--teal-deep)] text-[var(--gold-bright)] hover:border-[var(--gold)] hover:bg-[var(--teal)] active:scale-90 transition-all duration-200 shadow-[0_6px_18px_-8px_rgba(17,38,32,0.7)]"
            >
              <Sun
                size={17}
                className={`absolute transition-all duration-300 ${
                  theme === "dark" ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <Moon
                size={17}
                className={`absolute transition-all duration-300 ${
                  theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
                }`}
              />
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Buka menu navigasi"
              aria-expanded={open}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--gold)]/40 bg-[var(--teal-deep)] text-[var(--text-on-dark)] hover:bg-[var(--teal)] hover:border-[var(--gold)] active:scale-95 transition-all duration-200 shadow-[0_6px_18px_-8px_rgba(17,38,32,0.7)]"
            >
              <Menu size={18} />
              <span className="text-sm hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden={!open}
        className={`fixed inset-0 z-50 bg-[var(--teal-deep)]/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <nav
        aria-label="Navigasi utama"
        className={`fixed top-0 right-0 z-50 h-dvh w-[86%] max-w-sm bg-[var(--teal-deep)] text-[var(--text-on-dark)] shadow-[-24px_0_60px_-24px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-[var(--gold)]/20 sticky top-0 bg-[var(--teal-deep)] z-10">
          <span className="font-display italic text-lg text-[var(--gold-bright)]">
            Daftar Menu
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Tutup menu"
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-5 py-6 flex flex-col gap-7">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--gold)] mb-3">
                {group.label}
              </p>
              <div className="flex flex-col">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`py-2.5 text-[15px] border-b border-white/[0.06] transition-colors ${
                        active
                          ? "text-[var(--gold-bright)]"
                          : "text-[var(--text-on-dark)]/90 hover:text-[var(--gold-bright)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
