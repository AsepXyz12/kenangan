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
        <a
          href="/tentang"
          className="text-xs text-[var(--ink-soft)] underline decoration-[var(--parchment-line)] underline-offset-4 hover:text-[var(--teal-deep)] transition-colors"
        >
          Tentang &amp; sumber data
        </a>
      </div>
    </footer>
  );
}
