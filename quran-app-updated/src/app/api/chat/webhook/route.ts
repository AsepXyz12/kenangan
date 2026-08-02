import { NextResponse } from "next/server";
import { redis, redisConfigured } from "@/lib/redis";
import { sendToOwner } from "@/lib/telegram";

export const dynamic = "force-dynamic";

const MESSAGES_TTL_SECONDS = 60 * 60 * 24 * 14;

// Bentuk minimal update Telegram yang kita butuhkan saja (bukan tipe resmi
// lengkap dari Telegram Bot API -- sengaja diringkas).
type TelegramUpdate = {
  message?: {
    text?: string;
    reply_to_message?: { message_id: number };
  };
};

// PENTING: endpoint ini dipanggil LANGSUNG oleh server Telegram, bukan oleh
// browser pengunjung. Kita verifikasi header rahasia yang Telegram kirim
// balik persis seperti yang di-set lewat parameter secret_token saat
// setWebhook (lihat README-CHAT.md) -- supaya orang lain nggak bisa nembak
// endpoint ini buat nyuntik "balasan palsu" ke sesi pengunjung manapun.
function requestValid(request: Request): boolean {
  const expected = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!expected) return true; // belum di-set -> jangan blokir, cuma kurang aman
  const got = request.headers.get("x-telegram-bot-api-secret-token");
  return got === expected;
}

export async function POST(request: Request) {
  if (!requestValid(request)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!redisConfigured || !redis) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  let update: TelegramUpdate;
  try {
    update = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const message = update.message;
  const replyTo = message?.reply_to_message?.message_id;
  const text = message?.text?.trim();

  // Cuma proses kalau owner me-reply salah satu notifikasi pesan pengunjung.
  // Pesan Telegram lain (mis. owner ngobrol sendiri, atau command) diabaikan.
  if (replyTo && text) {
    const sessionId = await redis.get<string>(`chat:tgmsg:${replyTo}`);
    if (sessionId) {
      const msgKey = `chat:msgs:${sessionId}`;
      await redis.rpush(
        msgKey,
        JSON.stringify({ from: "owner", text, ts: Date.now() })
      );
      await redis.expire(msgKey, MESSAGES_TTL_SECONDS);
      await redis.set(`chat:unread:${sessionId}`, "1", {
        ex: MESSAGES_TTL_SECONDS,
      });
      // Kasih tau owner kalau balasannya udah kekirim ke pengunjung.
      await sendToOwner("✅ <b>Sukses terkirim</b>", replyTo);
    } else {
      // Sesi udah expired (>14 hari) atau message_id-nya bukan notifikasi
      // pesan pengunjung -- kasih tau owner biar gak nunggu-nunggu padahal
      // balasannya nggak kekirim kemana-mana.
      await sendToOwner(
        "⚠️ Gagal terkirim — sesi pengunjung ini sudah kedaluwarsa atau pesan yang di-reply bukan notifikasi chat.",
        replyTo
      );
    }
  }

  // Telegram cuma butuh respons 200 OK secepatnya -- isi body diabaikan.
  return NextResponse.json({ ok: true });
}
