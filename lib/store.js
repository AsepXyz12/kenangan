import { put, head } from "@vercel/blob";

// Semua data foto & komentar disimpan sebagai satu file JSON di Vercel Blob.
// Cukup untuk skala galeri sekolah, dan tidak butuh database terpisah.
const DATA_PATH = "data/photos.json";

async function getDataUrl() {
  try {
    const info = await head(DATA_PATH);
    return info.url;
  } catch (err) {
    return null; // belum pernah dibuat
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

export async function writePhotos(photos) {
  await put(DATA_PATH, JSON.stringify(photos, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}

export async function addPhoto(photo) {
  const photos = await readPhotos();
  photos.unshift(photo);
  await writePhotos(photos);
  return photo;
}

export async function getPhoto(id) {
  const photos = await readPhotos();
  return photos.find((p) => p.id === id) || null;
}

export async function deletePhoto(id) {
  const photos = await readPhotos();
  const idx = photos.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  photos.splice(idx, 1);
  await writePhotos(photos);
  return true;
}

export async function addComment(id, comment) {
  const photos = await readPhotos();
  const photo = photos.find((p) => p.id === id);
  if (!photo) return null;
  if (!photo.comments) photo.comments = [];
  photo.comments.push(comment);
  await writePhotos(photos);
  return photo;
}
