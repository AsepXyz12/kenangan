import { NextResponse } from "next/server";
import { readSettings, writeSettings } from "@/lib/store";
import { isAdminAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  const settings = await readSettings();
  return NextResponse.json({ settings });
}

export async function PATCH(req) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const patch = {};
  if (typeof body.logoUrl === "string") patch.logoUrl = body.logoUrl.trim();
  if (typeof body.siteName === "string") patch.siteName = body.siteName.trim();

  const settings = await writeSettings(patch);
  return NextResponse.json({ settings });
}
