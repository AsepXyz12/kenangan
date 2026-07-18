import { NextResponse } from "next/server";
import { readPhotos, addPhoto } from "@/lib/store";
import { isAdminAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  const photos = await readPhotos();
  photos.sort((a, b) => (a.eventDate < b.eventDate ? 1 : -1));
  return NextResponse.json({ photos });
}

// Catatan: file foto TIDAK dikirim ke endpoint ini. File sudah diunggah
// langsung dari browser ke Vercel Blob (lihat app/api/photos/upload-url/route.js).
// Endpoint ini hanya menyimpan metadata + URL blob yang sudah jadi.
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
  const contentType = (body.contentType || "").toString().trim();
  // "image" | "video" | "audio" | "file" — dipakai frontend buat pilih cara render.
  const mediaType = contentType.startsWith("video/")
    ? "video"
    : contentType.startsWith("audio/")
    ? "audio"
    : contentType.startsWith("image/")
    ? "image"
    : "file";

  if (!url) {
    return NextResponse.json({ error: "Media wajib diunggah" }, { status: 400 });
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
    mediaType,
    contentType,
    title,
    caption,
    eventDate, // format YYYY-MM-DD
    uploader,
    uploadedAt: new Date().toISOString(),
  };

  await addPhoto(photo);
  return NextResponse.json({ photo }, { status: 201 });
}
