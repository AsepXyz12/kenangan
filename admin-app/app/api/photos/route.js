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

function detectMediaType(contentType) {
  const ct = (contentType || "").toString().trim();
  if (ct.startsWith("video/")) return "video";
  if (ct.startsWith("audio/")) return "audio";
  if (ct.startsWith("image/")) return "image";
  return "file";
}

// Catatan: file TIDAK dikirim ke endpoint ini. File sudah diunggah langsung
// dari browser ke Vercel Blob (lihat app/api/photos/upload-url/route.js).
// Endpoint ini hanya menyimpan metadata + URL blob yang sudah jadi.
//
// Body bisa berupa satu file (`url` + `contentType`, cara lama) atau banyak
// file sekaligus (`items`: [{ url, contentType }, ...]) yang dikelompokkan
// jadi SATU kenangan dengan judul/cerita/tanggal yang sama.
export async function POST(req) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const title = (body.title || "").toString().trim();
  const caption = (body.caption || "").toString().trim();
  const eventDate = (body.eventDate || "").toString().trim();
  const uploader = (body.uploader || "Admin").toString().trim();

  let rawItems = Array.isArray(body.items) ? body.items : [];
  if (rawItems.length === 0 && body.url) {
    rawItems = [{ url: body.url, contentType: body.contentType }];
  }

  const items = rawItems
    .map((it) => ({
      url: (it.url || "").toString().trim(),
      contentType: (it.contentType || "").toString().trim(),
      mediaType: detectMediaType(it.contentType),
    }))
    .filter((it) => it.url);

  if (items.length === 0) {
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
    items,
    // Field ini dipertahankan (menunjuk ke item pertama) supaya kode lama
    // yang masih baca photo.url/photo.mediaType langsung tetap jalan.
    url: items[0].url,
    mediaType: items[0].mediaType,
    contentType: items[0].contentType,
    title,
    caption,
    eventDate, // format YYYY-MM-DD
    uploader,
    uploadedAt: new Date().toISOString(),
  };

  await addPhoto(photo);
  return NextResponse.json({ photo }, { status: 201 });
}
