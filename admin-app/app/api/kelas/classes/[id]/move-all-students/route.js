import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import { moveAllStudents } from "@/lib/kelas-store";

// POST: pindahin SEMUA murid di kelas ini ke kelas lain sekaligus
// (body: { toClassId }).
export async function POST(request, { params }) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  try {
    const body = await request.json();
    if (!body?.toClassId) {
      return NextResponse.json({ error: "Kelas tujuan wajib diisi" }, { status: 400 });
    }
    const moved = await moveAllStudents(params.id, body.toClassId);
    if (!moved) {
      return NextResponse.json({ error: "Kelas tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ moved });
  } catch (err) {
    // Sebelumnya kalau ada error tak terduga di sini (mis. koneksi ke Blob
    // storage sempat gagal), Next.js balikin error generik yang bukan JSON
    // rapi, jadi client cuma nampilin pesan default tanpa alasan aslinya.
    // Sekarang errornya dicatat di log server (buka di Vercel > Deployments
    // > Functions/Logs) DAN pesannya ikut dikirim ke client biar kelihatan.
    console.error("[move-all-students] gagal:", err);
    return NextResponse.json(
      { error: `Gagal memindahkan semua murid: ${err?.message || "error tidak diketahui"}` },
      { status: 500 }
    );
  }
}
