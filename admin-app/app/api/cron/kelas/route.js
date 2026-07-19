import { NextResponse } from "next/server";
import { readKelas, getPromotionPreview } from "@/lib/kelas-store";

// Dipanggil otomatis oleh Vercel Cron (lihat vercel.json) tiap hari, TANPA
// perlu ada admin yang buka dashboard. Cukup manggil readKelas() yang sudah
// otomatis ngecek & jalanin kenaikan kelas kalau sudah lewat tanggal target
// (logic-nya sama persis dengan yang dipakai dashboard admin, cuma dipicu
// dari sini juga sekarang).
//
// Diproteksi pakai CRON_SECRET supaya endpoint ini gak bisa dipanggil
// sembarang orang dari luar buat maksa-maksa kenaikan kelas jalan sebelum
// waktunya. Vercel otomatis ngirim header
// `Authorization: Bearer <CRON_SECRET>` tiap manggil cron job kalau env
// var CRON_SECRET sudah diset di project settings.
export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  const data = await readKelas();
  return NextResponse.json({
    checkedAt: new Date().toISOString(),
    promotion: getPromotionPreview(data),
  });
}
