import { readKelas } from "@/lib/kelas-store";
import { readSettings } from "@/lib/store";
import { TAPES, initials } from "@/components/KelasCards";
import KelasFolders from "@/components/KelasFolders";

export const dynamic = "force-dynamic";

export default async function KelasPage() {
  const { teachers, classes } = await readKelas();
  const settings = await readSettings();
  const siteName = settings.siteName || "Galeri Kenangan MA";

  // Halaman ini KHUSUS kelas yang masih aktif. Kelas yang sudah jadi alumni
  // (dikelompokkan per angkatan) ada di halaman terpisah: /alumni.
  const active = [...classes]
    .filter((c) => !c.isAlumni)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  const alumniCount = classes.filter((c) => c.isAlumni).length;

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
          Wali kelas, guru mata pelajaran, dan wajah-wajah setiap kelas yang
          masih aktif — dikumpulkan sedikit demi sedikit sampai lengkap.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href="/"
            className="font-stamp text-xs uppercase tracking-wide text-emerald underline"
          >
            &larr; Kembali ke galeri
          </a>
          {alumniCount > 0 && (
            <a
              href="/alumni"
              className="font-stamp text-xs uppercase tracking-wide text-clay underline"
            >
              Lihat Alumni &amp; Angkatan &rarr;
            </a>
          )}
        </div>
        <hr className="thread mt-8" />
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {classes.length === 0 && (
          <p className="text-ink/50 text-sm">Belum ada data kelas.</p>
        )}
        {classes.length > 0 && active.length === 0 && (
          <p className="text-ink/50 text-sm mb-10">
            Belum ada kelas aktif saat ini.
          </p>
        )}

        {active.length > 0 && <KelasFolders classes={active} teachers={teachers} />}

        {teachers.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display italic text-3xl sm:text-4xl text-emerald">
              Guru & Mata Pelajaran
            </h2>
            <hr className="thread mt-5 mb-7" />
            <div className="space-y-10">
              {teachers.map((t, i) => (
                <div key={t.id} data-tape={TAPES[i % TAPES.length]} className="polaroid relative w-full max-w-sm mx-auto">
                  <span className="stamp-tape" />
                  <div className="aspect-[9/16] w-full bg-parchment2 flex items-center justify-center overflow-hidden">
                    {t.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.photoUrl} alt={t.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <span className="font-stamp text-5xl text-emerald/30">{initials(t.name)}</span>
                    )}
                  </div>
                  <p className="mt-3 text-center font-stamp text-sm uppercase tracking-wide text-ink/70">
                    {t.name}
                  </p>
                  <p className="text-center text-xs text-ink/40 mt-1 leading-tight">
                    {(t.subjects || []).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {alumniCount > 0 && (
          <a
            href="/alumni"
            className="block border border-dashed border-clay/40 px-6 py-8 text-center hover:bg-clay/5 transition-colors"
          >
            <p className="font-stamp text-xs tracking-[0.25em] uppercase text-clay mb-2">
              Arsip
            </p>
            <p className="font-display italic text-2xl text-emerald">
              Lihat {alumniCount} kelas alumni, dikelompokkan per angkatan &rarr;
            </p>
          </a>
        )}
      </div>

      <footer className="max-w-5xl mx-auto px-6 py-10 text-center">
        <hr className="thread mb-6" />
        <p className="font-stamp text-xs text-ink/40">{siteName} · Madrasah Aliyah</p>
      </footer>
    </main>
  );
}
