import { put, head, del } from "@vercel/blob";

// Semua data foto & pengaturan galeri disimpan sebagai file JSON di Vercel
// Blob. Cukup untuk skala galeri sekolah, dan tidak butuh database terpisah.
// Project publik membaca file yang sama ini, jadi kedua project HARUS
// terhubung ke Blob store yang sama (BLOB_READ_WRITE_TOKEN identik).
const DATA_PATH = "data/photos.json";
const SETTINGS_PATH = "data/settings.json";

async function getDataUrl() {
  try {
    const info = await head(DATA_PATH);
    return info.url;
  } catch (err) {
    return null; // belum pernah dibuat
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
  const url = await getDataUrl();
  if (!url) return [];
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data.map(normalizePhoto) : [];
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
  // Hapus juga semua file media grup ini dari Blob storage supaya tidak menumpuk.
  const urls = Array.isArray(photo.items) && photo.items.length > 0
    ? photo.items.map((it) => it.url)
    : [photo.url].filter(Boolean);
  for (const url of urls) {
    try {
      await del(url);
    } catch (err) {
      // Kalau gagal hapus salah satu file blob-nya, lanjut ke yang lain;
      // metadata sudah terhapus jadi tidak perlu menggagalkan operasi ini.
    }
  }
  return true;
}

export async function removeMediaItem(id, index) {
  const photos = await readPhotos();
  const photo = photos.find((p) => p.id === id);
  if (!photo) return null;
  const items = Array.isArray(photo.items) ? photo.items : [];
  const removed = items[index];
  if (!removed) return photo;

  photo.items = items.filter((_, i) => i !== index);
  // Jaga field url/mediaType/contentType (dipakai kode lama) tetap mengarah
  // ke item pertama yang tersisa.
  if (photo.items[0]) {
    photo.url = photo.items[0].url;
    photo.mediaType = photo.items[0].mediaType;
    photo.contentType = photo.items[0].contentType;
  } else {
    photo.url = "";
    photo.mediaType = "";
    photo.contentType = "";
  }

  await writePhotos(photos);
  try {
    await del(removed.url);
  } catch (err) {
    // File blob gagal dihapus, tapi metadata sudah terupdate — tidak fatal.
  }
  return photo;
}

export async function readSettings() {
  try {
    const info = await head(SETTINGS_PATH);
    const res = await fetch(info.url, { cache: "no-store" });
    if (!res.ok) return {};
    return res.json();
  } catch (err) {
    return {}; // belum pernah diset
  }
}

export async function writeSettings(patch) {
  const current = await readSettings();
  const next = { ...current, ...patch };
  await put(SETTINGS_PATH, JSON.stringify(next, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
  return next;
}
