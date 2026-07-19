import { NextResponse } from "next/server";
import { addMediaItems } from "@/lib/store";
import { isAdminAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

function detectMediaType(contentType) {
  const ct = (contentType || "").toString().trim();
  if (ct.startsWith("video/")) return "video";
  if (ct.startsWith("audio/")) return "audio";
  if (ct.startsWith("image/")) return "image";
  return "file";
}

// Catatan: sama seperti POST /api/photos, file TIDAK dikirim ke endpoint
// ini. File sudah diunggah langsung dari browser ke Vercel Blob (lihat
// app/api/photos/upload-url/route.js). Endpoint ini cuma menambahkan
// metadata + URL blob yang sudah jadi ke kenangan yang SUDAH ADA (dipakai
// dari halaman edit, lewat MediaGrid), tanpa perlu hapus & upload ulang
// seluruh kenangan cuma buat nambah/benerin satu foto yang salah.
export async function POST(req, { params }) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const rawItems = Array.isArray(body.items) ? body.items : [];
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

  const photo = await addMediaItems(params.id, items);
  if (!photo) {
    return NextResponse.json({ error: "Kenangan tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ photo });
}
