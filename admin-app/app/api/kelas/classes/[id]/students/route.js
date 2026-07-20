import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import { addStudent } from "@/lib/kelas-store";

export async function POST(request, { params }) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  const body = await request.json();
  const student = await addStudent(params.id, {
    name: body.name,
    photoUrl: body.photoUrl,
    hobby: body.hobby,
    favoriteSubject: body.favoriteSubject,
    roles: body.roles,
    skills: body.skills,
    gender: body.gender,
    jurusan: body.jurusan,
  });
  if (!student) {
    return NextResponse.json({ error: "Kelas tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(student);
}
