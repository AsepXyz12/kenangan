import { NextResponse } from "next/server";
import { deleteComment } from "@/lib/store";
import { isAdminAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function DELETE(_req, { params }) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  const photo = await deleteComment(params.id, params.commentId);
  if (!photo) {
    return NextResponse.json({ error: "Foto tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ photo });
}
