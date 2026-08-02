# Setup "Chat Pemilik" (Telegram)

Fitur ini biarin pengunjung chat langsung ke kamu dari web, balesan kamu di
Telegram otomatis muncul lagi di web mereka (dengan notifikasi lonceng).

Alurnya: pengunjung kirim pesan → web kirim ke Telegram kamu → kamu **reply**
(swipe) pesan itu di Telegram seperti biasa → balasan otomatis nyampe ke
pengunjung yang tepat. Nggak perlu bot command atau UI "pilih dari daftar" —
history chat Telegram kamu SENDIRI yang jadi daftarnya.

## 1. Bikin bot di BotFather

1. Buka Telegram, chat ke [@BotFather](https://t.me/BotFather).
2. Kirim `/newbot`, ikuti instruksinya (kasih nama & username bot, mis.
   `MushafSupportBot`).
3. BotFather bakal kasih **token**, bentuknya kira-kira
   `123456789:AAExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`. Simpan ini — itu
   `TELEGRAM_BOT_TOKEN`.

## 2. Cari chat_id akun Telegram kamu

1. Chat bot kamu sendiri (buka username bot yang baru dibuat), kirim pesan
   apa saja, mis. "halo".
2. Buka di browser (ganti `<TOKEN>` dengan token dari langkah 1):
   `https://api.telegram.org/bot<TOKEN>/getUpdates`
3. Cari `"chat":{"id":XXXXXXXXX` di hasil JSON-nya. Angka itu adalah
   `TELEGRAM_OWNER_CHAT_ID` kamu.

## 3. Set environment variables di Vercel

Buka **Vercel Dashboard → Project → Settings → Environment Variables**,
tambahkan:

| Key | Value |
|---|---|
| `TELEGRAM_BOT_TOKEN` | token dari langkah 1 |
| `TELEGRAM_OWNER_CHAT_ID` | chat_id dari langkah 2 |
| `TELEGRAM_WEBHOOK_SECRET` | string acak bebas, mis. hasil dari `openssl rand -hex 20` — buat keamanan webhook |

Redis (`UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` atau
`KV_REST_API_URL` / `KV_REST_API_TOKEN`) harus SUDAH ada juga (dipakai
bareng fitur penghitung pengunjung) — kalau belum, sambungkan Upstash Redis
lewat Vercel Marketplace dulu.

Setelah nambah env var baru, **redeploy** project (env var lama nggak
otomatis kepakai ke deployment yang sudah jalan).

## 4. Daftarkan webhook ke Telegram

Setelah deploy sukses, jalankan (ganti semua `<...>`):

```bash
curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook" \
  -d "url=https://<domain-vercel-kamu>/api/chat/webhook" \
  -d "secret_token=<TELEGRAM_WEBHOOK_SECRET>"
```

Cek berhasil:

```bash
curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getWebhookInfo"
```

Harus muncul `"url"` sesuai yang di-set dan `"last_error_message"` kosong.

## Cara pakai sehari-hari

- Pengunjung buka halaman `/perbaiki` (atau tombol "Chat Pemilik" yang
  muncul di halaman error), kirim pesan.
- Kamu bakal dapat notifikasi Telegram: `🔔 Pesan baru dari IP ... · Sesi
  #ABCDEF`.
- **Reply** (swipe / tap "Reply") pesan itu langsung di Telegram, ketik
  balasan seperti chat biasa → otomatis nyampe ke pengunjung itu, lonceng
  di web mereka nyala.
- Kalau banyak yang chat bersamaan, masing-masing masuk sebagai pesan
  terpisah di Telegram — tinggal reply satu-satu sesuai yang mau dibalas,
  nggak akan ketuker karena routing-nya berdasarkan pesan mana yang kamu
  reply, bukan urutan.

## Kalau belum di-setup

Selama env var di atas belum di-set, tombol "Chat Pemilik" tetap muncul
tapi otomatis nonaktif dengan aman (fitur lain di web tidak terganggu) —
kamu bisa nyalain ini kapan saja tanpa perlu ubah kode lagi.
