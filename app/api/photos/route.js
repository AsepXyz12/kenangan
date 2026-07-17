import { NextResponse } from "next/server";
import { readPhotos, addPhoto } from "@/lib/store";
import { isAdminAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const photos = await readPhotos();
  // urutkan berdasarkan tanggal kenangan (terbaru dulu), bukan waktu upload
  photos.sort((a, b) => (a.eventDate < b.eventDate ? 1 : -1));
  return NextResponse.json({ photos });
}

// Catatan: file foto TIDAK lagi dikirim ke endpoint ini. File sudah
// diunggah langsung dari browser ke Vercel Blob (lihat
// app/api/photos/upload-url/route.js) agar tidak terbentur batas ukuran
// request server function (~4.5MB), sehingga foto ukuran berapa pun bisa
// diunggah. Endpoint ini hanya menyimpan metadata + URL blob yang sudah jadi.
export async function POST(req) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const url = (body.url || "").toString().trim();
  const title = (body.title || "").toString().trim();
  const caption = (body.caption || "").toString().trim();
  const eventDate = (body.eventDate || "").toString().trim();
  const uploader = (body.uploader || "Admin").toString().trim();

  if (!url) {
    return NextResponse.json({ error: "Foto wajib diunggah" }, { status: 400 });
  }
  if (!title) {
    return NextResponse.json({ error: "Judul wajib diisi" }, { status: 400 });
  }
  if (!eventDate) {
    return NextResponse.json({ error: "Tanggal kenangan wajib diisi" }, { status: 400 });
  }

  const photo = {
    id: crypto.randomUUID(),
    url,
    title,
    caption,
    eventDate, // format YYYY-MM-DD, dipilih lewat input date (hari/bulan/tahun)
    uploader,
    uploadedAt: new Date().toISOString(),
    comments: [],
  };

  await addPhoto(photo);
  return NextResponse.json({ photo }, { status: 201 });
}
