import { NextResponse } from "next/server";
import { getPhoto, updatePhoto, deletePhoto } from "@/lib/store";
import { isAdminAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(_req, { params }) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  const photo = await getPhoto(params.id);
  if (!photo) {
    return NextResponse.json({ error: "Foto tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ photo });
}

export async function PATCH(req, { params }) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const title = (body.title ?? "").toString().trim();
  const eventDate = (body.eventDate ?? "").toString().trim();

  if (body.title !== undefined && !title) {
    return NextResponse.json({ error: "Judul wajib diisi" }, { status: 400 });
  }
  if (body.eventDate !== undefined && !eventDate) {
    return NextResponse.json({ error: "Tanggal kenangan wajib diisi" }, { status: 400 });
  }

  const photo = await updatePhoto(params.id, {
    title,
    caption: (body.caption ?? "").toString().trim(),
    eventDate,
    uploader: (body.uploader ?? "Admin").toString().trim(),
  });

  if (!photo) {
    return NextResponse.json({ error: "Foto tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ photo });
}

export async function DELETE(_req, { params }) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  const ok = await deletePhoto(params.id);
  if (!ok) {
    return NextResponse.json({ error: "Foto tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
