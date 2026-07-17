import { put, head, del } from "@vercel/blob";

// Semua data foto & komentar disimpan sebagai satu file JSON di Vercel Blob.
// Cukup untuk skala galeri sekolah, dan tidak butuh database terpisah.
// Project publik membaca file yang sama ini, jadi kedua project HARUS
// terhubung ke Blob store yang sama (BLOB_READ_WRITE_TOKEN identik).
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

export async function updatePhoto(id, patch) {
  const photos = await readPhotos();
  const photo = photos.find((p) => p.id === id);
  if (!photo) return null;
  if (typeof patch.title === "string") photo.title = patch.title;
  if (typeof patch.caption === "string") photo.caption = patch.caption;
  if (typeof patch.eventDate === "string") photo.eventDate = patch.eventDate;
  if (typeof patch.uploader === "string") photo.uploader = patch.uploader;
  await writePhotos(photos);
  return photo;
}

export async function deletePhoto(id) {
  const photos = await readPhotos();
  const photo = photos.find((p) => p.id === id);
  if (!photo) return false;
  const remaining = photos.filter((p) => p.id !== id);
  await writePhotos(remaining);
  // Hapus juga file gambarnya dari Blob storage supaya tidak menumpuk.
  try {
    await del(photo.url);
  } catch (err) {
    // Kalau gagal hapus file blob-nya, data metadata tetap sudah terhapus;
    // tidak perlu menggagalkan seluruh operasi karena ini.
  }
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

export async function deleteComment(id, commentId) {
  const photos = await readPhotos();
  const photo = photos.find((p) => p.id === id);
  if (!photo) return null;
  photo.comments = (photo.comments || []).filter((c) => c.id !== commentId);
  await writePhotos(photos);
  return photo;
}
