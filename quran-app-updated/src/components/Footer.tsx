export default function Footer() {
  return (
    <footer className="border-t border-[var(--parchment-line)] mt-20">
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="font-display italic text-lg text-[var(--teal-deep)]">Mushaf</p>
          <p className="text-sm text-[var(--ink-soft)] mt-1 max-w-md">
            Al-Qur&apos;an 30 juz, Rukun Islam, Rukun Iman, dan amalan malam
            dalam satu tempat. Semoga bermanfaat dan menjadi ladang pahala
            bagi siapa saja yang membangunnya.
          </p>
        </div>
        <p className="text-xs text-[var(--ink-soft)] max-w-xs text-right">
          Teks Al-Qur&apos;an dari The Noble Qur&apos;an Encyclopedia,
          terjemahan Kemenag RI, disusun dari dataset quran-json (CC BY-SA
          4.0). Basis data hadits disusun dari hadits-database oleh
          Irsyadul Ibad, sumber carihadits.com (MIT License)
        </p>
      </div>
    </footer>
  );
}
