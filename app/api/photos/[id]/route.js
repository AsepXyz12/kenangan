import { NextResponse } from "next/server";
import { getPhoto, deletePhoto } from "@/lib/store";
import { isAdminAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(_req, { params }) {
  const photo = await getPhoto(params.id);
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
