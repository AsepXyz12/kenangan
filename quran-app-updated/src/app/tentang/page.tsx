import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Tentang — Mushaf" };

export default function TentangPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Tentang
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-4">
            Tentang Mushaf
          </h1>
          <p className="text-[var(--ink-soft)] leading-relaxed">
            Mushaf disusun sebagai satu tempat untuk membaca Al-Qur&apos;an,
            mempelajari Rukun Islam dan Rukun Iman, serta panduan sholat dan
            amalan sehari-hari. Semoga bermanfaat dan menjadi ladang pahala
            bagi siapa saja yang membangun dan menggunakannya.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="font-display text-xl text-[var(--ink)] mb-4">
            Dibuat oleh
          </h2>
          <div className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6 md:p-7">
            <p className="font-display text-lg text-[var(--teal-deep)] mb-2">Ramzz</p>
            <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
              Mushaf dibangun dan dirawat oleh Ramzz, dengan niat sederhana:
              menyediakan satu tempat yang mudah diakses siapa saja untuk
              membaca Al-Qur&apos;an, belajar hadits, dan memahami ajaran
              Islam dari berbagai sisi. Semoga apa yang tersusun di sini
              menjadi ladang pahala yang terus mengalir, dan bermanfaat bagi
              siapa pun yang membacanya — sekarang maupun di masa depan.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl text-[var(--ink)] mb-4">
            Sumber Data
          </h2>
          <div className="space-y-4 text-sm text-[var(--ink-soft)] leading-relaxed">
            <p>
              Teks Al-Qur&apos;an bersumber dari The Noble Qur&apos;an
              Encyclopedia dan terjemahan Kementerian Agama Republik
              Indonesia, disusun ulang dari dataset terbuka{" "}
              <span className="font-medium">quran-json</span>, yang
              dilisensikan di bawah{" "}
              <span className="font-medium">CC BY-SA 4.0</span>.
            </p>
            <p>
              Basis data hadits disusun dari{" "}
              <span className="font-medium">hadits-database</span> oleh
              Irsyadul Ibad, bersumber dari carihadits.com, yang
              dilisensikan di bawah <span className="font-medium">MIT
              License</span>.
            </p>
            <p className="text-xs opacity-75">
              Pencantuman sumber ini merupakan syarat dari lisensi terbuka di
              atas, dan tetap dijaga sebagai bentuk penghormatan atas kerja
              para penyusun dataset.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
