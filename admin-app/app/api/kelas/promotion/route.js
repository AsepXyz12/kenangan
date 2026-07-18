import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import {
  readKelas,
  getPromotionPreview,
  updatePromotionSettings,
  forceRunPromotionNow,
} from "@/lib/kelas-store";

// GET: lihat status & pengaturan kenaikan kelas otomatis
export async function GET() {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  const data = await readKelas();
  return NextResponse.json(getPromotionPreview(data));
}

// PUT: ubah pengaturan (aktif/nonaktif, bulan kelulusan, tahun kelulusan
// kelas tertinggi saat ini)
export async function PUT(request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  const body = await request.json();
  const data = await updatePromotionSettings({
    enabled: typeof body.enabled === "boolean" ? body.enabled : undefined,
    graduationMonth: Number.isInteger(body.graduationMonth)
      ? body.graduationMonth
      : undefined,
    graduationYear: Number.isInteger(body.graduationYear)
      ? body.graduationYear
      : undefined,
  });
  return NextResponse.json(getPromotionPreview(data));
}

// POST: jalankan kenaikan kelas sekarang juga (buat testing / kalau admin
// mau majukan manual tanpa menunggu tanggalnya)
export async function POST() {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  const { ran, data } = await forceRunPromotionNow();
  return NextResponse.json({ ran, ...getPromotionPreview(data) });
}
