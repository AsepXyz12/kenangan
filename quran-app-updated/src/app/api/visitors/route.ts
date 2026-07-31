import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { redis, redisConfigured } from "@/lib/redis";

export const dynamic = "force-dynamic";

const COUNT_KEY = "mushaf:visitor_count";
const COOKIE_NAME = "mushaf_vid";
const ONE_YEAR = 60 * 60 * 24 * 365;

export async function GET(request: Request) {
  if (!redisConfigured || !redis) {
    // Belum di-setup Redis-nya — jangan bikin error, cuma kasih tau 0.
    return NextResponse.json({ count: 0, configured: false });
  }

  const cookieHeader = request.headers.get("cookie") ?? "";
  const hasVisitorCookie = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .some((c) => c.startsWith(`${COOKIE_NAME}=`));

  let count: number;

  if (hasVisitorCookie) {
    count = (await redis.get<number>(COUNT_KEY)) ?? 0;
    return NextResponse.json({ count, configured: true });
  }

  count = await redis.incr(COUNT_KEY);

  const res = NextResponse.json({ count, configured: true });
  res.cookies.set(COOKIE_NAME, randomUUID(), {
    maxAge: ONE_YEAR,
    path: "/",
    sameSite: "lax",
  });
  return res;
}
