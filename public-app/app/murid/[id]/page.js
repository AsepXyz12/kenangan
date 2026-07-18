import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getStudentDetail } from "@/lib/kelas-store";

export const dynamic = "force-dynamic";

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

export default async function MuridPage({ params }) {
  const detail = await getStudentDetail(params.id);
  if (!detail) notFound();

  const { student, kelas, wali } = detail;

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <Link
        href="/kelas"
        className="font-stamp text-xs uppercase tracking-wide text-emerald-light"
      >
        ← Kembali ke profil kelas
      </Link>

      <div className="mt-8 flex flex-col items-center text-center">
        <div
          className="polaroid relative w-full max-w-[220px]"
          data-tape="gold"
          style={{ transform: "rotate(-1.5deg)" }}
        >
          <span className="stamp-tape" aria-hidden="true" />
          <div className="aspect-square w-full bg-parchment2 flex items-center justify-center overflow-hidden">
            {student.photoUrl ? (
              <Image
                src={student.photoUrl}
                alt={student.name}
                width={440}
                height={440}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-stamp text-5xl text-emerald/30">
                {initials(student.name)}
              </span>
            )}
          </div>
        </div>

        <h1 className="font-display italic text-4xl mt-8 text-emerald">
          {student.name}
        </h1>
        <p className="mt-2 font-stamp text-xs uppercase tracking-wide text-ink/50">
          {kelas.name}
          {wali.length > 0 && <> · Wali: {wali.map((w) => w.name).join(" & ")}</>}
        </p>

        <hr className="thread mt-8 mb-8 w-full" />

        {student.hobby ? (
          <div className="w-full">
            <p className="font-stamp text-[11px] uppercase tracking-[0.2em] text-gold">
              Hobi
            </p>
            <p className="font-display italic text-2xl mt-1 text-ink">
              {student.hobby}
            </p>
          </div>
        ) : (
          <p className="text-sm text-ink/40">Hobi belum diisi.</p>
        )}

        {student.skills && student.skills.length > 0 && (
          <div className="w-full mt-8">
            <p className="font-stamp text-[11px] uppercase tracking-[0.2em] text-gold">
              Skill yang dikuasai
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {student.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-stamp text-xs uppercase tracking-wide bg-emerald/10 text-emerald border border-emerald/30 px-3 py-1.5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
