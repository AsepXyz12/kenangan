import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSessionToken, setSessionCookie } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";
import { logActivity } from "@/lib/audit";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body request tidak valid." }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Username atau password tidak valid." }, { status: 400 });
  }
  const { username, password, remember } = parsed.data;

  // Rate limit per IP + username combo to slow down brute force attempts.
  const rl = checkRateLimit(`login:${ip}:${username.toLowerCase()}`);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `Terlalu banyak percobaan login. Coba lagi dalam ${Math.ceil(rl.retryAfterMs / 1000)} detik.` },
      { status: 429 }
    );
  }

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || user.status !== "ACTIVE") {
    await logActivity({
      username,
      action: "LOGIN_FAILED",
      status: "FAILED",
      detail: !user ? "User tidak ditemukan" : "Akun disuspend",
      request,
    });
    return NextResponse.json({ error: "Username atau password salah." }, { status: 401 });
  }

  const validPassword = await verifyPassword(password, user.passwordHash);
  if (!validPassword) {
    await logActivity({
      userId: user.id,
      username,
      action: "LOGIN_FAILED",
      status: "FAILED",
      detail: "Password salah",
      request,
    });
    return NextResponse.json({ error: "Username atau password salah." }, { status: 401 });
  }

  const { token, sessionId, maxAge } = await createSessionToken(
    { sub: user.id, username: user.username, role: user.role },
    remember
  );

  setSessionCookie(token, maxAge);

  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

  await logActivity({
    userId: user.id,
    username: user.username,
    action: "LOGIN",
    sessionId,
    request,
  });

  return NextResponse.json({
    user: {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
      avatarSeed: user.avatarSeed,
    },
  });
}
