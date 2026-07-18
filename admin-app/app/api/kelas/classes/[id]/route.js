import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import { updateClass, deleteClass } from "@/lib/kelas-store";

export async function PUT(request, { params }) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  const body = await request.json();
  const kelas = await updateClass(params.id, body);
  if (!kelas) {
    return NextResponse.json({ error: "Kelas tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(kelas);
}

export async function DELETE(request, { params }) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  await deleteClass(params.id);
  return NextResponse.json({ ok: true });
}
