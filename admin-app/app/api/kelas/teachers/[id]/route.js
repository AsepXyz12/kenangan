import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import { updateTeacher, deleteTeacher } from "@/lib/kelas-store";

export async function PUT(request, { params }) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  const body = await request.json();
  const teacher = await updateTeacher(params.id, body);
  if (!teacher) {
    return NextResponse.json({ error: "Guru tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(teacher);
}

export async function DELETE(request, { params }) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  await deleteTeacher(params.id);
  return NextResponse.json({ ok: true });
}
