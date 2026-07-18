import { head } from "@vercel/blob";

// Sumber data yang sama dengan project admin: file-file JSON di Vercel Blob.
// Project publik ini HANYA membaca data — semua operasi tulis (upload/edit/
// hapus foto, ganti logo) ada di project admin.
const DATA_PATH = "data/photos.json";
const SETTINGS_PATH = "data/settings.json";

async function getUrl(path) {
  try {
    const info = await head(path);
    return info.url;
  } catch (err) {
    return null; // belum pernah dibuat oleh admin
  }
}

function normalizePhoto(photo) {
  if (Array.isArray(photo.items) && photo.items.length > 0) return photo;
  if (!photo.url) return { ...photo, items: [] };
  return {
    ...photo,
    items: [{ url: photo.url, contentType: photo.contentType, mediaType: photo.mediaType }],
  };
}

export async function readPhotos() {
  const url = await getUrl(DATA_PATH);
  if (!url) return [];
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data.map(normalizePhoto) : [];
}

export async function getPhoto(id) {
  const photos = await readPhotos();
  return photos.find((p) => p.id === id) || null;
}

export async function readSettings() {
  const url = await getUrl(SETTINGS_PATH);
  if (!url) return {};
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return {};
  return res.json();
}
