import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import { moveStudent } from "@/lib/kelas-store";

// POST: pindahin murid dari kelas ini ke kelas lain (body: { toClassId }),
// sambil mempertahankan foto/hobi/skill yang sudah diisi.
export async function POST(request, { params }) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  try {
    const body = await request.json();
    if (!body?.toClassId) {
      return NextResponse.json({ error: "Kelas tujuan wajib diisi" }, { status: 400 });
    }
    const student = await moveStudent(params.id, params.studentId, body.toClassId);
    if (!student) {
      return NextResponse.json({ error: "Murid atau kelas tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json(student);
  } catch (err) {
    console.error("[move-student] gagal:", err);
    return NextResponse.json(
      { error: `Gagal memindahkan murid: ${err?.message || "error tidak diketahui"}` },
      { status: 500 }
    );
  }
}
