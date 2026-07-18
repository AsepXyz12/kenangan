import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import { updateStudent, deleteStudent } from "@/lib/kelas-store";

export async function PUT(request, { params }) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  const body = await request.json();
  const student = await updateStudent(params.id, params.studentId, body);
  if (!student) {
    return NextResponse.json({ error: "Murid tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(student);
}

export async function DELETE(request, { params }) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  await deleteStudent(params.id, params.studentId);
  return NextResponse.json({ ok: true });
}
