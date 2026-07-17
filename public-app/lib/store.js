import { head } from "@vercel/blob";

// Sumber data yang sama dengan project admin: satu file JSON di Vercel Blob.
// Project publik ini HANYA membaca foto & menambah komentar — semua
// operasi tulis untuk foto (upload/edit/hapus) ada di project admin.
const DATA_PATH = "data/photos.json";

async function getDataUrl() {
  try {
    const info = await head(DATA_PATH);
    return info.url;
  } catch (err) {
    return null; // belum pernah dibuat oleh admin
  }
}

export async function readPhotos() {
  const url = await getDataUrl();
  if (!url) return [];
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function getPhoto(id) {
  const photos = await readPhotos();
  return photos.find((p) => p.id === id) || null;
}

// Komentar tetap ditulis dari project publik (siapa saja boleh berkomentar),
// jadi butuh `put` juga di sini, tapi hanya untuk field comments.
export async function addComment(id, comment) {
  const { put } = await import("@vercel/blob");
  const photos = await readPhotos();
  const photo = photos.find((p) => p.id === id);
  if (!photo) return null;
  if (!photo.comments) photo.comments = [];
  photo.comments.push(comment);
  await put(DATA_PATH, JSON.stringify(photos, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
  return photo;
}
