import { isAdminAuthed } from "@/lib/auth";
import { readKelas } from "@/lib/kelas-store";
import LoginForm from "@/components/LoginForm";
import LogoutButton from "@/components/LogoutButton";
import { AlumniManager } from "@/components/KelasManager";

export const dynamic = "force-dynamic";

export default async function AlumniPage() {
  const authed = isAdminAuthed();
  const data = authed ? await readKelas() : { teachers: [], classes: [] };

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between flex-wrap gap-y-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-ink/50 mono">
            Galeri Kenangan MA
          </p>
          <h1 className="text-2xl font-semibold mt-1">Dashboard Alumni</h1>
        </div>
        <div className="flex items-center flex-wrap gap-3 gap-y-2">
          <a href="/kelas" className="text-xs uppercase mono text-accent underline">
            Profil Kelas
          </a>
          <a href="/" className="text-xs uppercase mono text-accent underline">
            &larr; Panel
          </a>
          {authed && <LogoutButton />}
        </div>
      </div>

      {!authed ? (
        <>
          <p className="mt-3 text-sm text-ink/60">
            Masuk untuk mengelola data alumni & angkatan.
          </p>
          <LoginForm />
        </>
      ) : (
        <div className="mt-8">
          <p className="text-sm text-ink/60 mb-6">
            Khusus kelas yang sudah jadi alumni, dikelompokkan otomatis per
            angkatan (tahun masuk &rarr; 3 tahun kemudian jadi tahun lulus).
            Angkatan paling baru ditampilkan di paling atas. Buat kelas baru
            atau kelola kelas yang masih aktif tetap di halaman{" "}
            <a href="/kelas" className="underline text-accent">
              Profil Kelas
            </a>
            .
          </p>
          <AlumniManager initialTeachers={data.teachers} initialClasses={data.classes} />
        </div>
      )}
    </main>
  );
}
