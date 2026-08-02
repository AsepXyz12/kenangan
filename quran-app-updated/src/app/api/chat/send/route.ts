import { NextResponse } from "next/server";
import { redis, redisConfigured } from "@/lib/redis";
import { sendToOwner, telegramConfigured, escapeHtml } from "@/lib/telegram";

export const dynamic = "force-dynamic";

const MAX_MESSAGE_LENGTH = 1000;
const MESSAGES_TTL_SECONDS = 60 * 60 * 24 * 14; // riwayat chat disimpan 14 hari
const TGMSG_TTL_SECONDS = 60 * 60 * 24 * 14; // pemetaan message_id -> sesi, 14 hari juga

// Cegah spam kasar: 1 pesan per 3 detik per sesi. Disimpan di Redis (bukan
// in-memory) karena serverless function bisa jalan di instance yang beda
// tiap request -- in-memory rate limit nggak bakal konsisten di Vercel.
async function bolehKirim(sessionId: string): Promise<boolean> {
  if (!redis) return true;
  const key = `chat:ratelimit:${sessionId}`;
  const sudahPernah = await redis.set(key, "1", { nx: true, ex: 3 });
  return sudahPernah !== null;
}

export async function POST(request: Request) {
  if (!redisConfigured || !redis) {
    return NextResponse.json(
      { error: "Fitur chat belum dikonfigurasi (Redis belum tersambung)." },
      { status: 503 }
    );
  }

  let body: { sessionId?: string; text?: string; nama?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid." }, { status: 400 });
  }

  const sessionId = (body.sessionId ?? "").trim();
  const text = (body.text ?? "").trim();
  const nama = (body.nama ?? "").trim().slice(0, 60);

  if (!sessionId || sessionId.length > 100) {
    return NextResponse.json({ error: "Sesi tidak valid." }, { status: 400 });
  }
  if (!text) {
    return NextResponse.json({ error: "Pesan kosong." }, { status: 400 });
  }
  if (text.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Pesan maksimal ${MAX_MESSAGE_LENGTH} karakter.` },
      { status: 400 }
    );
  }

  if (!(await bolehKirim(sessionId))) {
    return NextResponse.json(
      { error: "Terlalu cepat, tunggu sebentar sebelum kirim lagi." },
      { status: 429 }
    );
  }

  const ts = Date.now();
  const msgKey = `chat:msgs:${sessionId}`;

  await redis.rpush(msgKey, JSON.stringify({ from: "visitor", text, ts }));
  await redis.expire(msgKey, MESSAGES_TTL_SECONDS);

  // Kirim ke owner lewat Telegram (kalau sudah dikonfigurasi). Sesi
  // ditampilkan sebagai kode pendek + IP pengunjung supaya owner tahu ini
  // dari "siapa" tanpa perlu data pribadi apa pun -- dan supaya owner bisa
  // MEMBALAS pesan Telegram ini (swipe reply) untuk merutekannya balik ke
  // sesi yang tepat, tanpa perlu sistem "pilih dari daftar" terpisah.
  if (telegramConfigured) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "tidak diketahui";
    const kodeSesi = sessionId.slice(-6).toUpperCase();
    const label = nama ? `${escapeHtml(nama)} · ` : "";
    const pesanUntukOwner =
      `🔔 <b>Pesan baru dari IP ${escapeHtml(ip)}</b>\n` +
      `${label}Sesi #${kodeSesi}\n\n` +
      `${escapeHtml(text)}\n\n` +
      `<i>Balas pesan ini (swipe/reply) untuk membalas ke pengunjung.</i>`;

    const messageId = await sendToOwner(pesanUntukOwner);
    if (messageId) {
      // Simpan pemetaan message_id Telegram -> sessionId, dipakai webhook
      // buat tahu balasan owner ini ditujukan ke sesi mana.
      await redis.set(`chat:tgmsg:${messageId}`, sessionId, {
        ex: TGMSG_TTL_SECONDS,
      });
    }
  }

  return NextResponse.json({ ok: true, telegramConfigured });
}
