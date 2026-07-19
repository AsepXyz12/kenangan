import { readKelas, getAngkatanGroups } from "@/lib/kelas-store";
import { readSettings } from "@/lib/store";
import { ClassSection } from "@/components/KelasCards";

export const dynamic = "force-dynamic";

export default async function AlumniPage() {
  const { teachers, classes } = await readKelas();
  const settings = await readSettings();
  const siteName = settings.siteName || "Galeri Kenangan MA";

  const alumniClasses = classes.filter((c) => c.isAlumni);
  const angkatanGroups = getAngkatanGroups(alumniClasses);
  // Kelas alumni yang tahun masuknya belum diketahui (data lama tanpa
  // graduatedYear/entryYear) tetap ditampilkan, tapi di luar pengelompokan
  // angkatan — supaya datanya tidak hilang begitu saja dari halaman publik.
  const groupedIds = new Set(angkatanGroups.flatMap((g) => g.classes.map((c) => c.id)));
  const alumniTanpaAngkatan = alumniClasses
    .filter((c) => !groupedIds.has(c.id))
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <main>
      <header className="max-w-5xl mx-auto px-6 pt-14 pb-4">
        <p className="font-stamp text-xs tracking-[0.25em] uppercase text-clay">
          {siteName}
        </p>
        <h1 className="font-display italic text-5xl sm:text-6xl mt-3 text-emerald leading-[1.05]">
          Alumni
        </h1>
        <p className="mt-4 max-w-xl text-ink/70 leading-relaxed">
          Arsip angkatan yang sudah lulus, dikelompokkan per tahun masuk —
          angkatan paling baru di paling atas. MA di sini ditempuh 3 tahun,
          jadi tahun lulus otomatis tahun masuk + 3.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href="/"
            className="font-stamp text-xs uppercase tracking-wide text-emerald underline"
          >
            &larr; Kembali ke galeri
          </a>
          <a
            href="/kelas"
            className="font-stamp text-xs uppercase tracking-wide text-emerald underline"
          >
            Lihat Kelas Aktif &rarr;
          </a>
        </div>
        <hr className="thread mt-8" />
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {angkatanGroups.length === 0 && alumniTanpaAngkatan.length === 0 && (
          <p className="text-ink/50 text-sm">Belum ada angkatan alumni.</p>
        )}

        {angkatanGroups.map((group) => (
          <section key={group.entryYear} className="mb-20">
            <div className="flex flex-wrap items-baseline gap-3 mb-1">
              <span className="font-stamp text-xs uppercase tracking-wide bg-emerald text-parchment px-2 py-0.5">
                Angkatan {group.angkatanNumber}
              </span>
              <span className="font-stamp text-xs uppercase tracking-wide text-ink/50">
                Masuk {group.entryYear} &middot; Lulus {group.graduationYear}
              </span>
            </div>
            <hr className="thread mt-4 mb-7" />
            {group.classes.map((kelas) => (
              <ClassSection key={kelas.id} kelas={kelas} teachers={teachers} />
            ))}
          </section>
        ))}

        {alumniTanpaAngkatan.length > 0 && (
          <section>
            <p className="font-stamp text-xs tracking-[0.25em] uppercase text-clay mb-2">
              Arsip
            </p>
            <h2 className="font-display italic text-3xl sm:text-4xl text-emerald mb-6">
              Alumni lainnya
            </h2>
            {alumniTanpaAngkatan.map((kelas) => (
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
