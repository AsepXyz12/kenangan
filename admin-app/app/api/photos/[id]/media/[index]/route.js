import { NextResponse } from "next/server";
import { removeMediaItem } from "@/lib/store";
import { isAdminAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function DELETE(_req, { params }) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  const index = Number(params.index);
  if (Number.isNaN(index)) {
    return NextResponse.json({ error: "Index tidak valid" }, { status: 400 });
  }
  const photo = await removeMediaItem(params.id, index);
  if (!photo) {
    return NextResponse.json({ error: "Kenangan tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ photo });
}
