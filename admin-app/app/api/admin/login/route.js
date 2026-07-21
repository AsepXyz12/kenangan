import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, adminCookieOptions, checkAdminPassword, issueSessionToken } from "@/lib/auth";

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const password = (body.password || "").toString();

  const ok = await checkAdminPassword(password);
  if (!ok) {
    return NextResponse.json({ error: "Password salah" }, { status: 401 });
  }

  const opts = adminCookieOptions();
  cookies().set(COOKIE_NAME, issueSessionToken(), opts);
  return NextResponse.json({ ok: true });
}
