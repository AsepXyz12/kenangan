import { NextResponse } from "next/server";
import { redis, redisConfigured } from "@/lib/redis";

export const dynamic = "force-dynamic";

type ChatMessage = { from: "visitor" | "owner"; text: string; ts: number };

export async function GET(request: Request) {
  if (!redisConfigured || !redis) {
    return NextResponse.json({ messages: [], unread: false, configured: false });
  }

  const { searchParams } = new URL(request.url);
  const sessionId = (searchParams.get("session") ?? "").trim();
  const markRead = searchParams.get("markRead") === "1";

  if (!sessionId || sessionId.length > 100) {
    return NextResponse.json({ error: "Sesi tidak valid." }, { status: 400 });
  }

  const raw = await redis.lrange(`chat:msgs:${sessionId}`, 0, -1);
  const messages: ChatMessage[] = raw
    .map((item) => {
      try {
        // Upstash kadang sudah auto-parse JSON, kadang masih string mentah
        // tergantung versi client -- tangani dua-duanya biar aman.
        return typeof item === "string" ? JSON.parse(item) : item;
      } catch {
        return null;
      }
    })
    .filter((m): m is ChatMessage => m !== null);

  // PENTING: jangan bandingin hasil redis.get() dengan string "1" -- client
  // @upstash/redis otomatis JSON.parse() value yang keliatan valid JSON,
  // jadi "1" balik sebagai number 1, bukan string "1", dan perbandingan
  // === "1" selalu false (ini penyebab notif "unread" nggak pernah nyala
  // walau flag-nya udah ke-set di Redis). Pakai exists() -- cuma peduli
  // key-nya ada atau nggak, gak peduli tipe value-nya.
  const unread = (await redis.exists(`chat:unread:${sessionId}`)) === 1;

  if (markRead && unread) {
    await redis.del(`chat:unread:${sessionId}`);
  }

  return NextResponse.json({
    messages,
    unread: markRead ? false : unread,
    configured: true,
  });
}
