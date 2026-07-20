import Link from "next/link";
import { readKelas } from "@/lib/kelas-store";
import { readSettings } from "@/lib/store";
import { TAPES, initials } from "@/components/KelasCards";

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
        {teachers.length === 0 ? (
          <p className="text-sm text-ink/40 text-center">Belum ada data guru.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-8">
            {teachers.map((t, i) => (
              <div
                key={t.id}
                data-tape={TAPES[i % TAPES.length]}
                className="polaroid relative w-full max-w-[150px] mx-auto"
              >
                <span className="stamp-tape" />
                <div
                  className={`w-full bg-parchment2 flex items-center justify-center overflow-hidden ${
                    t.photoUrl ? "" : "aspect-square"
                  }`}
                >
                  {t.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.photoUrl}
                      alt={t.name}
                      className="w-full h-auto block"
                    />
                  ) : (
                    <span className="font-stamp text-2xl text-emerald/30">{initials(t.name)}</span>
                  )}
                </div>
                <p className="mt-2 text-center font-stamp text-xs uppercase tracking-wide text-ink/70">
                  {t.name}
                </p>
                <p className="text-center text-[10px] text-ink/40 mt-0.5 leading-tight">
                  {(t.subjects || []).join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="max-w-5xl mx-auto px-6 py-10 text-center">
        <hr className="thread mb-6" />
        <p className="font-stamp text-xs text-ink/40">{siteName} · Madrasah Aliyah</p>
      </footer>
    </main>
  );
}
