// Helper tipis buat manggil Telegram Bot API. Sengaja pakai fetch() polos
// (bukan library telegraf/grammy) supaya nggak nambah dependency besar cuma
// buat kirim 1 jenis pesan + baca 1 jenis webhook.
//
// Env var yang dibutuhkan (di-set di Vercel Project Settings -> Environment
// Variables, JANGAN di-commit ke git):
//   TELEGRAM_BOT_TOKEN     -> token dari @BotFather
//   TELEGRAM_OWNER_CHAT_ID -> chat_id akun Telegram kamu (lihat README-CHAT.md)
//   TELEGRAM_WEBHOOK_SECRET (opsional tapi disarankan) -> string acak, dipakai
//     buat verifikasi kalau request ke /api/chat/webhook beneran dari Telegram,
//     bukan orang iseng yang nembak endpoint-nya langsung.

export const telegramConfigured = Boolean(
  process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_OWNER_CHAT_ID
);

const API_BASE = process.env.TELEGRAM_BOT_TOKEN
  ? `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`
  : null;

// Kirim pesan ke owner. Mengembalikan message_id dari Telegram (dipakai
// sebagai kunci buat mencocokkan balasan owner nanti lewat reply-to-message).
export async function sendToOwner(text: string): Promise<number | null> {
  if (!API_BASE || !process.env.TELEGRAM_OWNER_CHAT_ID) return null;

  try {
    const res = await fetch(`${API_BASE}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_OWNER_CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    });
    const data = await res.json();
    if (!data.ok) {
      console.error("[telegram] sendMessage gagal:", data);
      return null;
    }
    return data.result.message_id as number;
  } catch (err) {
    console.error("[telegram] sendMessage error:", err);
    return null;
  }
}

// Escape basic HTML entities supaya isi pesan pengunjung nggak merusak
// parse_mode HTML kita atau (lebih parah) nyuntik markup ke chat Telegram
// pemilik.
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
