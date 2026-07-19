import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import { updateGuruFolder } from "@/lib/kelas-store";

export async function PUT(request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  const body = await request.json();
  const folder = await updateGuruFolder(body);
  return NextResponse.json(folder);
}
