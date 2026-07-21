import { NextResponse } from "next/server";
import { isAdminAuthed, changeAdminPassword } from "@/lib/auth";

export async function POST(request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const oldPassword = (body.oldPassword || "").toString();
  const newPassword = (body.newPassword || "").toString();

  const result = await changeAdminPassword(oldPassword, newPassword);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
