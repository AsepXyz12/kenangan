// Rate limiter sederhana berbasis memori untuk mencegah brute-force pada
// login admin. Disimpan per-IP di dalam Map, di-scope ke instance server
// function yang sedang aktif (warm instance Vercel biasanya bertahan
// beberapa menit-jam, jadi cukup efektif menahan percobaan berulang dari
// sumber yang sama tanpa perlu database tambahan).
//
// Catatan: karena serverless function bisa "cold start" ulang (memori
// ke-reset), ini bukan proteksi 100% sempurna untuk skala besar/serangan
// terdistribusi. Tapi untuk galeri sekolah, ini sudah menahan mayoritas
// percobaan tebak password otomatis.

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 menit
const LOCKOUT_MS = 10 * 60 * 1000; // 10 menit kunci setelah melebihi batas

const attempts = new Map(); // ip -> { count, firstAttemptAt, lockedUntil }

function getClientIp(req) {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export function checkRateLimit(req) {
  const ip = getClientIp(req);
  const now = Date.now();
  const entry = attempts.get(ip);

  if (entry?.lockedUntil && now < entry.lockedUntil) {
    const secondsLeft = Math.ceil((entry.lockedUntil - now) / 1000);
    return { allowed: false, secondsLeft };
  }

  // Reset window kalau sudah lewat atau belum pernah nyoba
  if (!entry || now - entry.firstAttemptAt > WINDOW_MS) {
    attempts.set(ip, { count: 0, firstAttemptAt: now, lockedUntil: 0 });
  }

  return { allowed: true, ip };
}

export function recordFailedAttempt(ip) {
  const now = Date.now();
  const entry = attempts.get(ip) || { count: 0, firstAttemptAt: now, lockedUntil: 0 };
  entry.count += 1;
  if (entry.count >= MAX_ATTEMPTS) {
    entry.lockedUntil = now + LOCKOUT_MS;
  }
  attempts.set(ip, entry);
}

export function clearAttempts(ip) {
  attempts.delete(ip);
}
