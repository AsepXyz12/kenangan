import { isAdminAuthed } from "@/lib/auth";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

function Section({ title, children }) {
  return (
    <section className="border border-line p-4 rounded-lg space-y-2">
      <h2 className="text-base font-semibold text-ink">{title}</h2>
      <div className="text-sm text-ink/70 leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

// Halaman ini sengaja ditulis dengan bahasa se-awam mungkin (bukan istilah
// teknis) karena target pembacanya adalah GURU yang akan mewarisi akses
// admin di masa depan, bukan programmer. Kalimat pendek, tanpa jargon.
export default function PanduanPage() {
  if (!isAdminAuthed()) notFound();

  return (
    <main className="max-w-2xl mx-auto px-6 py-10 space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wide text-ink/50 mono">Galeri Kenangan MA</p>
        <h1 className="text-2xl font-semibold mt-1">Panduan Admin</h1>
        <p className="mt-2 text-sm text-ink/60">
          Halaman ini menjelaskan cara memakai panel admin, ditulis untuk
          siapa pun yang memegang akses ini nanti — tidak perlu paham coding
          untuk mengikutinya.
        </p>
        <a href="/" className="inline-block mt-4 text-xs uppercase mono text-accent underline">
          ← Kembali ke dashboard
        </a>
      </div>

      <Section title="1. Menambah foto atau video baru">
        <p>
          Di halaman utama admin, ada kotak "Unggah media baru". Pilih foto
          atau video dari HP/komputer, isi judul dan cerita singkatnya, lalu
          tekan tombol unggah. Video besar (dari HP) tetap bisa, hanya butuh
          waktu lebih lama untuk selesai terunggah — tunggu sampai muncul di
          daftar foto di bawahnya.
        </p>
      </Section>

      <Section title="2. Mengubah atau menghapus foto">
        <p>
          Di daftar "Semua media", setiap foto punya tombol edit (mengubah
          judul/cerita) dan tombol hapus. Menghapus tidak bisa dibatalkan,
          jadi pastikan dulu foto itu benar yang ingin dihapus.
        </p>
      </Section>

      <Section title="3. Mengelola kelas dan murid">
        <p>
          Buka menu "Profil Kelas" di pojok atas. Di sana kamu bisa menambah
          kelas baru, menambah murid ke kelas, mengisi hobi/jabatan/skill
          tiap murid, dan menambah data guru beserta jabatannya (Kepala
          Sekolah, Wali Kelas, dsb).
        </p>
        <p>
          Setiap akhir tahun ajaran, sistem otomatis menaikkan semua kelas
          satu tingkat (dan memindahkan kelas 3 ke Alumni) — kamu tidak perlu
          melakukan ini manual, cukup pastikan tanggal kenaikan kelas di
          pengaturan sudah benar.
        </p>
      </Section>

      <Section title="4. Komentar dari pengunjung">
        <p>
          Pengunjung situs publik bisa menulis komentar di foto. Kalau ada
          komentar yang tidak pantas, kamu bisa menghapusnya lewat halaman
          admin di bagian foto terkait.
        </p>
      </Section>

      <Section title="5. Backup data (PENTING, lakukan sesekali)">
        <p>
          Di halaman utama admin, ada tombol{" "}
          <strong>&quot;Unduh Backup Data&quot;</strong>. Menekan tombol ini
          akan mengunduh satu file yang berisi SEMUA data situs (foto,
          kelas, murid, guru, pengaturan). Simpan file ini di Google Drive
          atau kirim ke email sendiri, sebagai jaga-jaga kalau suatu saat ada
          masalah teknis. Lakukan ini setidaknya beberapa bulan sekali, atau
          setelah menambah banyak data baru.
        </p>
      </Section>

      <Section title="6. Mengganti password admin">
        <p>
          Buka menu <strong>"Ganti Password"</strong> di pojok atas dashboard.
          Masukkan password lama dan password baru. Setelah itu, siapa pun
          yang butuh login harus pakai password baru itu — beri tahu semua
          admin lain kalau passwordnya diganti.
        </p>
      </Section>

      <Section title="Kalau ada masalah teknis">
        <p>
          Situs ini dibuat dengan Next.js, di-hosting di Vercel, dan
          datanya disimpan di Vercel Blob Storage. Kalau situs benar-benar
          tidak bisa diakses (bukan sekadar lupa password), kemungkinan
          perlu bantuan seseorang yang mengerti pemrograman web — tunjukkan
          halaman ini dan file backup data ke orang tersebut sebagai titik
          awal.
        </p>
      </Section>
    </main>
  );
}
