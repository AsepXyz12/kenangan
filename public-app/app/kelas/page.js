import Link from "next/link";
import { readKelas } from "@/lib/kelas-store";
import { readSettings } from "@/lib/store";

export const dynamic = "force-dynamic";

const TAPES = ["gold", "clay", "dusk"];

function initials(name) {
  return (
    (name || "?")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "?"
  );
}

function StudentCard({ student, tape }) {
  return (
    <Link
      href={`/murid/${student.id}`}
      data-tape={tape}
      className="polaroid relative block w-full max-w-[150px] mx-auto rotate-[var(--r)]"
      style={{ "--r": `${((student.name?.length || 0) % 5) - 2}deg` }}
    >
      <span className="stamp-tape" />
      <div className="aspect-square w-full bg-parchment2 flex items-center justify-center overflow-hidden">
        {student.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={student.photoUrl}
            alt={student.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-stamp text-2xl text-emerald/30">
            {initials(student.name)}
          </span>
        )}
      </div>
      <p className="mt-2 text-center font-stamp text-xs uppercase tracking-wide text-ink/70 truncate">
        {student.name}
      </p>
      {student.hobby && (
        <p className="text-center text-[9px] text-gold uppercase tracking-wide mt-0.5 truncate">
          {student.hobby}
        </p>
      )}
    </Link>
  );
}

function ClassSection({ kelas, teachers }) {
  const wali = (kelas.waliKelasIds || [])
    .map((id) => teachers.find((t) => t.id === id))
    .filter(Boolean);

  return (
    <section className="mb-16">
      <h2 className="font-display italic text-3xl sm:text-4xl text-emerald">
        {kelas.name}
      </h2>
      {wali.length > 0 && (
        <p className="mt-2 font-stamp text-xs uppercase tracking-wide text-ink/50">
          Wali kelas: {wali.map((w) => w.name).join(" & ")}
        </p>
      )}
      <hr className="thread mt-5 mb-7" />
      {kelas.students.length === 0 ? (
        <p className="text-sm text-ink/40">Belum ada data murid.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-8">
          {kelas.students.map((s, i) => (
            <StudentCard key={s.id} student={s} tape={TAPES[i % TAPES.length]} />
          ))}
        </div>
      )}
    </section>
  );
}

export default async function KelasPage() {
  const { teachers, classes } = await readKelas();
  const settings = await readSettings();
  const siteName = settings.siteName || "Galeri Kenangan MA";

  const active = [...classes]
    .filter((c) => !c.isAlumni)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  const alumni = [...classes]
    .filter((c) => c.isAlumni)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <main>
      <header className="max-w-5xl mx-auto px-6 pt-14 pb-4">
        <p className="font-stamp text-xs tracking-[0.25em] uppercase text-emerald-light">
          {siteName}
        </p>
        <h1 className="font-display italic text-5xl sm:text-6xl mt-3 text-emerald leading-[1.05]">
          Profil Kelas
        </h1>
        <p className="mt-4 max-w-xl text-ink/70 leading-relaxed">
          Wali kelas, guru mata pelajaran, dan wajah-wajah setiap kelas —
          dikumpulkan sedikit demi sedikit sampai lengkap.
        </p>
        <a
          href="/"
          className="inline-block mt-4 font-stamp text-xs uppercase tracking-wide text-emerald underline"
        >
          &larr; Kembali ke galeri
        </a>
        <hr className="thread mt-8" />
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {classes.length === 0 && (
          <p className="text-ink/50 text-sm">Belum ada data kelas.</p>
        )}

        {active.map((kelas) => (
          <ClassSection key={kelas.id} kelas={kelas} teachers={teachers} />
        ))}

        {teachers.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display italic text-3xl sm:text-4xl text-emerald">
              Guru & Mata Pelajaran
            </h2>
            <hr className="thread mt-5 mb-7" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-8">
              {teachers.map((t, i) => (
                <div key={t.id} data-tape={TAPES[i % TAPES.length]} className="polaroid relative w-full max-w-[150px] mx-auto">
                  <span className="stamp-tape" />
                  <div className="aspect-square w-full bg-parchment2 flex items-center justify-center overflow-hidden">
                    {t.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.photoUrl} alt={t.name} className="w-full h-full object-cover" />
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
          </section>
        )}

        {alumni.length > 0 && (
          <section>
            <p className="font-stamp text-xs tracking-[0.25em] uppercase text-clay mb-2">
              Arsip
            </p>
            <h2 className="font-display italic text-4xl sm:text-5xl text-emerald mb-6">
              Alumni
            </h2>
            {alumni.map((kelas) => (
              <ClassSection key={kelas.id} kelas={kelas} teachers={teachers} />
            ))}
          </section>
        )}
      </div>

      <footer className="max-w-5xl mx-auto px-6 py-10 text-center">
        <hr className="thread mb-6" />
        <p className="font-stamp text-xs text-ink/40">{siteName} · Madrasah Aliyah</p>
      </footer>
    </main>
  );
}
