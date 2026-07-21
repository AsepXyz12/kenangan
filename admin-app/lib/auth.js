import { cookies } from "next/headers";
import { scryptSync, randomBytes, timingSafeEqual, createHmac } from "crypto";
import { readSettings, writeSettings } from "@/lib/store";

const COOKIE_NAME = "ma_admin_session";
// Dipakai untuk menandatangani token sesi (BUKAN untuk menyimpan password).
// Kalau env var ini belum diset di Vercel, fallback ke ADMIN_PASSWORD lama
// supaya deployment yang sudah ada tidak tiba-tiba log-out semua orang;
// tetap disarankan set SESSION_SECRET sendiri suatu saat nanti.
const SESSION_SIGNING_KEY = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || "";

function signSessionToken() {
  return createHmac("sha256", SESSION_SIGNING_KEY).update("admin-session").digest("hex");
}

// Password admin BUKAN lagi disimpan mentah di mana pun, termasuk di cookie
// sesi. Yang disimpan di settings.json cuma HASH (scrypt + salt acak) lewat
// field `adminPasswordHash`. Ini penting karena settings.json disimpan
// dengan access:"public" di Vercel Blob (URL-nya bisa saja bocor/ketebak) —
// kalau yang disimpan password asli, siapa pun yang tahu URL itu bisa
// langsung tahu passwordnya. Dengan hash, isi file itu saja tidak cukup.
//
// ADMIN_PASSWORD di environment variable HANYA dipakai sebagai password
// AWAL/DEFAULT (sebelum siapa pun pernah mengganti password lewat halaman
// "Ganti Password"). Setelah pernah diganti sekali lewat UI,
// adminPasswordHash di settings.json yang jadi satu-satunya sumber
// kebenaran — env var lama tidak dibaca lagi untuk password (tapi tetap
// dipakai sebagai fallback kunci penandatanganan sesi, lihat di atas).
function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = (stored || "").split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(candidate, expected);
}

export async function checkAdminPassword(password) {
  if (!password) return false;
  const settings = await readSettings();
  if (settings.adminPasswordHash) {
    return verifyPassword(password, settings.adminPasswordHash);
  }
  // Belum pernah diganti lewat UI sama sekali — cocokkan ke env var lama.
  return Boolean(process.env.ADMIN_PASSWORD) && password === process.env.ADMIN_PASSWORD;
}

export async function changeAdminPassword(oldPassword, newPassword) {
  const ok = await checkAdminPassword(oldPassword);
  if (!ok) return { ok: false, error: "Password lama salah." };
  if (!newPassword || newPassword.length < 6) {
    return { ok: false, error: "Password baru minimal 6 karakter." };
  }
  await writeSettings({ adminPasswordHash: hashPassword(newPassword) });
  return { ok: true };
}

// isAdminAuthed() dipakai di banyak tempat (API routes) sebagai pengecekan
// SESSION cepat, secara sinkron — cookie berisi token yang ditandatangani
// (bukan password), dicocokkan ke tanda tangan yang dihitung ulang di
// server. Ini supaya ganti password lewat UI TIDAK bikin cookie yang sudah
// aktif otomatis invalid (cookie tidak berisi password sama sekali), dan
// supaya pengecekan sesi tidak perlu hash-check (scrypt) yang lambat di
// SETIAP request.
export function isAdminAuthed() {
  const cookieStore = cookies();
  const val = cookieStore.get(COOKIE_NAME)?.value;
  return Boolean(val) && val === signSessionToken();
}

export function issueSessionToken() {
  return signSessionToken();
}

export function adminCookieOptions() {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  };
}

export { COOKIE_NAME };
