import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import {
  readKelas,
  getPromotionPreview,
  updatePromotionSettings,
  forceRunPromotionNow,
  undoLastPromotion,
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
    graduationDay: Number.isInteger(body.graduationDay)
      ? body.graduationDay
      : undefined,
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
// mau majukan manual tanpa menunggu tanggalnya), ATAU kalau body-nya berisi
// { action: "undo" }, membalikkan kenaikan terakhir yang sempat jalan.
export async function POST(request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  let action = "run";
  try {
    const body = await request.json();
    if (body && body.action === "undo") action = "undo";
  } catch (err) {
    // Body kosong (request lama tanpa body) — anggap saja "run" seperti biasa.
  }

  if (action === "undo") {
    const { undone, data } = await undoLastPromotion();
    return NextResponse.json({ undone, ...getPromotionPreview(data) });
  }

  const { ran, data } = await forceRunPromotionNow();
  return NextResponse.json({ ran, ...getPromotionPreview(data) });
}
