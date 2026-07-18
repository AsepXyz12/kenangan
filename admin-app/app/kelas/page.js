import { isAdminAuthed } from "@/lib/auth";
import { readKelas, getPromotionPreview } from "@/lib/kelas-store";
import LoginForm from "@/components/LoginForm";
import LogoutButton from "@/components/LogoutButton";
import KelasManager from "@/components/KelasManager";

export const dynamic = "force-dynamic";

export default async function KelasPage() {
  const authed = isAdminAuthed();
  const data = authed ? await readKelas() : { teachers: [], classes: [] };
  const promotion = authed ? getPromotionPreview(data) : null;

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-ink/50 mono">
            Galeri Kenangan MA
          </p>
          <h1 className="text-2xl font-semibold mt-1">Profil Kelas</h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-xs uppercase mono text-accent underline">
            &larr; Kembali ke panel
          </a>
          {authed && <LogoutButton />}
        </div>
      </div>

      {!authed ? (
        <>
          <p className="mt-3 text-sm text-ink/60">
            Masuk untuk mengelola guru, wali kelas, kelas, dan murid.
          </p>
          <LoginForm />
        </>
      ) : (
        <div className="mt-8">
          <p className="text-sm text-ink/60 mb-6">
            Kelola daftar guru & mapel, wali kelas, kelas, dan murid beserta
            fotonya. Klik &quot;Upload foto&quot; di kartu murid untuk unggah
            satu per satu — tidak perlu semuanya sekaligus.
          </p>
          <KelasManager
            initialTeachers={data.teachers}
            initialClasses={data.classes}
            initialPromotion={promotion}
          />
        </div>
      )}
    </main>
  );
}
