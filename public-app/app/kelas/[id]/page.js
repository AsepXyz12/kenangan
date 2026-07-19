import Link from "next/link";
import { notFound } from "next/navigation";
import { readKelas } from "@/lib/kelas-store";
import { readSettings } from "@/lib/store";
import { StudentCard, TAPES } from "@/components/KelasCards";

export const dynamic = "force-dynamic";

export default async function KelasDetailPage({ params }) {
  const { teachers, classes } = await readKelas();
  const settings = await readSettings();
  const siteName = settings.siteName || "Galeri Kenangan MA";

  const kelas = classes.find((c) => c.id === params.id);
  if (!kelas) notFound();

  const wali = (kelas.waliKelasIds || [])
    .map((id) => teachers.find((t) => t.id === id))
    .filter(Boolean);

  return (
    <main>
      <header className="max-w-5xl mx-auto px-6 pt-14 pb-4">
        <p className="font-stamp text-xs tracking-[0.25em] uppercase text-emerald-light">
          {siteName}
        </p>
        <h1 className="font-display italic text-5xl sm:text-6xl mt-3 text-emerald leading-[1.05]">
          {kelas.name}
        </h1>
        {wali.length > 0 && (
          <p className="mt-3 font-stamp text-xs uppercase tracking-wide text-ink/50">
            Wali kelas: {wali.map((w) => w.name).join(" & ")}
          </p>
        )}
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
        {kelas.groupPhotoUrl && (
          <div
            className="polaroid relative w-full max-w-sm mx-auto mb-12"
            data-tape="gold"
            style={{ transform: "rotate(-1.5deg)" }}
          >
            <span className="stamp-tape" aria-hidden="true" />
            <div className="aspect-[4/3] w-full bg-parchment2 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={kelas.groupPhotoUrl}
                alt={kelas.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-center font-stamp text-xs uppercase tracking-wide text-ink/50">
              Foto bersama
            </p>
          </div>
        )}

        {kelas.students.length === 0 ? (
          <p className="text-sm text-ink/40 text-center">Belum ada data murid.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-8">
            {kelas.students.map((s, i) => (
              <StudentCard key={s.id} student={s} tape={TAPES[i % TAPES.length]} />
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
