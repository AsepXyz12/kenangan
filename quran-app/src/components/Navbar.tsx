import Link from "next/link";

const NAV_ITEMS = [
  { href: "/quran", label: "Al-Qur'an" },
  { href: "/rukun-islam", label: "Rukun Islam" },
  { href: "/rukun-iman", label: "Rukun Iman" },
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
          <a
            href="https://www.carihadits.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-[15px] px-3 py-2 rounded-full bg-[var(--teal)] text-[var(--parchment)] hover:bg-[var(--teal-deep)] transition-colors whitespace-nowrap"
          >
            Hadits ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
