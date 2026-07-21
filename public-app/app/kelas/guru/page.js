import Link from "next/link";
import { readKelas } from "@/lib/kelas-store";
import { readSettings } from "@/lib/store";
import GuruSearch from "@/components/GuruSearch";

export const dynamic = "force-dynamic";

export default async function GuruPage() {
  const { teachers } = await readKelas();
  const settings = await readSettings();
  const siteName = settings.siteName || "Galeri Kenangan MA";

  return (
    <main>
      <header className="max-w-5xl mx-auto px-6 pt-14 pb-4">
        <p className="font-stamp text-xs tracking-[0.25em] uppercase text-emerald-light">
          {siteName}
        </p>
        <h1 className="font-display italic text-5xl sm:text-6xl mt-3 text-emerald leading-[1.05]">
          Guru & Mata Pelajaran
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            href="/kelas"
            className="font-stamp text-xs uppercase tracking-wide text-emerald underline"
          >
            &larr; Kembali ke semua kelas
          </Link>
        </div>
        <hr className="thread mt-8" />
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <GuruSearch teachers={teachers} />
      </div>

      <footer className="max-w-5xl mx-auto px-6 py-10 text-center">
        <hr className="thread mb-6" />
        <p className="font-stamp text-xs text-ink/40">{siteName} · Madrasah Aliyah</p>
      </footer>
    </main>
  );
}
