import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import { readPhotos, readSettings } from "@/lib/store";
import { readKelas } from "@/lib/kelas-store";

// Menggabungkan SEMUA data situs (foto+komentar, pengaturan/logo, kelas+
// guru+murid) jadi satu file JSON yang bisa diunduh. Ini bukan pengganti
// backup otomatis, tapi jaring pengaman manual: kalau suatu saat Vercel
// Blob store hilang/rusak/akun ditutup, admin (siapa pun itu di masa depan)
// masih punya salinan mentah semua data untuk dipulihkan atau setidaknya
// dibaca ulang secara manual.
export async function GET() {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  const [photos, settings, kelas] = await Promise.all([
    readPhotos(),
    readSettings(),
    readKelas(),
  ]);

  const backup = {
    exportedAt: new Date().toISOString(),
    note:
      "Backup lengkap data Galeri Kenangan MA. Berisi semua foto (termasuk komentar), pengaturan situs, serta data kelas/guru/murid. Simpan file ini di tempat aman (Google Drive, email, dsb).",
    photos,
    settings,
    kelas,
  };

  return new NextResponse(JSON.stringify(backup, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="backup-kenangan-${new Date()
        .toISOString()
        .slice(0, 10)}.json"`,
    },
  });
}
