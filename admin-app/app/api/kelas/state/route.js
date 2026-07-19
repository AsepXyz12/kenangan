import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import { readKelas, getPromotionPreview } from "@/lib/kelas-store";

// GET: state terbaru (guru, kelas + murid, status kenaikan kelas) — dipakai
// KelasManager buat polling ringan tiap beberapa detik supaya perubahan
// (termasuk pindah murid) langsung kelihatan tanpa perlu refresh manual.
export async function GET() {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  const data = await readKelas();
  return NextResponse.json({
    teachers: data.teachers,
    classes: data.classes,
    promotion: getPromotionPreview(data),
  });
}
