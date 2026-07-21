import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import { readKelas, addTeacher, addClass } from "@/lib/kelas-store";

export async function GET() {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  const data = await readKelas();
  return NextResponse.json(data);
}

// Tambah guru baru
export async function POST(request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  const body = await request.json();
  if (body.type === "class") {
    const kelas = await addClass({ name: body.name, entryYear: body.entryYear });
    return NextResponse.json(kelas);
  }
  const teacher = await addTeacher({
    name: body.name,
    subjects: body.subjects,
    photoUrl: body.photoUrl,
    roles: body.roles,
  });
  return NextResponse.json(teacher);
}
