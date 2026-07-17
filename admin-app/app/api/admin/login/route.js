import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, adminCookieOptions } from "@/lib/auth";

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const password = (body.password || "").toString();

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD belum diatur di environment variable" },
      { status: 500 }
    );
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Password salah" }, { status: 401 });
  }

  const opts = adminCookieOptions();
  cookies().set(COOKIE_NAME, password, opts);
  return NextResponse.json({ ok: true });
}
