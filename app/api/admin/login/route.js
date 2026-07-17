import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, adminCookieOptions } from "@/lib/auth";
import { checkRateLimit, recordFailedAttempt, clearAttempts } from "@/lib/rateLimit";

export async function POST(req) {
  const { allowed, secondsLeft, ip } = checkRateLimit(req);
  if (!allowed) {
    const minutes = Math.ceil(secondsLeft / 60);
    return NextResponse.json(
      { error: `Terlalu banyak percobaan gagal. Coba lagi dalam ${minutes} menit.` },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const password = (body.password || "").toString();

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD belum diatur di environment variable" },
      { status: 500 }
    );
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    recordFailedAttempt(ip);
    return NextResponse.json({ error: "Password salah" }, { status: 401 });
  }

  clearAttempts(ip);
  const opts = adminCookieOptions();
  cookies().set(COOKIE_NAME, password, opts);
  return NextResponse.json({ ok: true });
}
