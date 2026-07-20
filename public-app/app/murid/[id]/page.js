import Link from "next/link";
import { notFound } from "next/navigation";
import hljs from "highlight.js";
import { getStudentDetail } from "@/lib/kelas-store";

export const dynamic = "force-dynamic";

const LANG_LABEL = {
  html: "HTML",
  xml: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  cpp: "C++",
  php: "PHP",
  sql: "MySQL",
};

// Skill lama disimpan sebagai string biasa (mis. "React"). Skill baru bisa
// berupa objek kode { label, lang, code } — dua bentuk ini dibedakan di sini
// supaya skill lama tetap tampil seperti biasa (badge), sedangkan yang baru
// tampil sebagai blok kode berwarna sesuai bahasanya.
function isCodeSkill(skill) {
  return skill && typeof skill === "object" && typeof skill.code === "string" && skill.code.trim();
}

function highlightCode(code, lang) {
  try {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  } catch (err) {
    // Kalau ada apa pun yang gagal saat highlight, tampilkan kode apa adanya
    // (di-escape) daripada bikin halaman error.
    return code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}

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
          <div
            className={`w-full bg-parchment2 flex items-center justify-center overflow-hidden ${
              student.photoUrl ? "" : "aspect-square"
            }`}
          >
            {student.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={student.photoUrl}
                alt={student.name}
                // Sama kayak di kartu grid: foto udah dalam rasio
                // asli/pilihan admin sendiri, jadi tampilin apa adanya,
                // gak dipaksa persegi/cover lagi.
                className="w-full h-auto block"
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
        {(student.jurusan === "IPA" || student.jurusan === "IPS") && (
          <span
            className={`inline-block mt-2 font-display italic font-bold text-xl px-3 py-0.5 rounded shadow-sm ${
              student.jurusan === "IPA" ? "bg-emerald text-parchment" : "bg-clay text-parchment"
            }`}
          >
            {student.jurusan}
          </span>
        )}
        <p className="mt-2 font-stamp text-xs uppercase tracking-wide text-ink/50">
          {kelas.name}
          {wali.length > 0 && <> · Wali: {wali.map((w) => w.name).join(" & ")}</>}
        </p>

        {student.roles && student.roles.length > 0 && (
          // Semua jabatan ditampilkan lengkap di sini (beda dari kartu murid
          // yang cuma nunjukin 1 badge biar gak penuh) — jadi kalau seorang
          // murid rangkap jabatan (mis. Wakil Ketua Kelas + Anggota OSIS),
          // dua-duanya kelihatan jelas di sini tanpa bentrok/tertutup.
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {student.roles.map((role, i) => (
              <span
                key={i}
                className="font-stamp text-[10px] uppercase tracking-wide bg-gold text-parchment px-2.5 py-1"
              >
                {role}
              </span>
            ))}
          </div>
        )}

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

        {student.favoriteSubject && (
          // Sama persis gaya blok "Hobi" di atas biar konsisten & tetap
          // elegan — cuma diberi jarak (mt-6) supaya kedua blok tidak
          // nempel kalau dua-duanya keisi, dan warna label dibedakan
          // (emerald, bukan gold) biar sekilas kebeda dari blok hobi.
          <div className="w-full mt-6">
            <p className="font-stamp text-[11px] uppercase tracking-[0.2em] text-emerald">
              Mapel Favorit
            </p>
            <p className="font-display italic text-2xl mt-1 text-ink">
              {student.favoriteSubject}
            </p>
          </div>
        )}

        {student.skills && student.skills.length > 0 && (() => {
          const tagSkills = student.skills.filter((s) => !isCodeSkill(s));
          const codeSkills = student.skills.filter(isCodeSkill);
          return (
            <div className="w-full mt-8 space-y-6">
              {tagSkills.length > 0 && (
                <div>
                  <p className="font-stamp text-[11px] uppercase tracking-[0.2em] text-gold">
                    Skill yang dikuasai
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {tagSkills.map((skill) => (
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

              {codeSkills.length > 0 && (
                <div className="text-left">
                  <p className="font-stamp text-[11px] uppercase tracking-[0.2em] text-gold text-center">
                    Cuplikan kode
                  </p>
                  <div className="mt-3 space-y-4">
                    {codeSkills.map((skill, i) => (
                      <div
                        key={i}
                        className="overflow-hidden rounded-md border border-emerald/20 shadow-sm"
                      >
                        <div className="flex items-center justify-between bg-[#282c34] px-4 py-2">
                          <span className="font-stamp text-[11px] text-white/70 truncate">
                            {skill.label || "snippet"}
                          </span>
                          <span className="font-stamp text-[10px] uppercase tracking-wide text-gold/80">
                            {LANG_LABEL[skill.lang] || skill.lang || "code"}
                          </span>
                        </div>
                        <pre className="hljs !m-0 overflow-x-auto whitespace-pre-wrap break-words text-[12px] leading-relaxed px-4 py-3">
                          <code
                            className="whitespace-pre-wrap break-words"
                            dangerouslySetInnerHTML={{
                              __html: highlightCode(skill.code, skill.lang),
                            }}
                          />
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </main>
  );
}
