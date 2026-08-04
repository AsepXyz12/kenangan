// Util pemulihan total buat halaman error.
//
// KENAPA INI PERLU: tombol "Coba lagi" bawaan Next.js (reset()) cuma
// me-render ulang segment yang error -- kalau akar masalahnya adalah cache
// service worker yang nyangkut ke versi build LAMA (JS/CSS/RSC payload yang
// sudah tidak ada di server, penyebab paling umum di balik "This page
// couldn't load"), render ulang doang nggak bakal nolong: SW akan tetap
// balikin file basi yang sama lagi.
//
// resetTotal() ngelakuin "matiin-hidupin ulang" penuh: lepas semua service
// worker yang lagi aktif, kosongin seluruh Cache Storage punya situs ini,
// baru reload penuh dari server (bukan dari cache). Ini didesain supaya
// SATU tombol ini bisa nyelametin dari hampir semua skenario "nyangkut" --
// termasuk yang penyebab persisnya belum ketahuan -- tanpa perlu pengguna
// ngerti apa-apa soal cache/service worker.
export async function resetTotal() {
  try {
    if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((reg) => reg.unregister()));
    }
  } catch {
    // Lanjut aja walau gagal -- yang penting reload di bawah tetap jalan.
  }

  try {
    if (typeof caches !== "undefined") {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
  } catch {
    // Sama, jangan sampai kegagalan di sini menghalangi reload.
  }

  // PENTING (akar masalah kenapa dulu tombol ini kadang "keliatan jalan"
  // tapi masalahnya balik lagi): unregister() + caches.delete() di atas
  // cuma bersihin Cache Storage. Tapi browser register("/sw.js") secara
  // default (updateViaCache: "imports") tetap boleh ambil FILE sw.js itu
  // sendiri dari HTTP cache biasa kalau server pernah kasih header cache
  // yang mengizinkan itu. Akibatnya: abis "dibersihkan", begitu halaman baru
  // reload dan ServiceWorkerRegister daftar ulang, ia bisa dapet sw.js versi
  // BASI lagi dari HTTP cache -> BUILD_ID lama nyala lagi -> sampah balik.
  // Fix: paksa fetch sw.js langsung dari network (cache: "reload") supaya
  // HTTP cache-nya ikut ke-refresh sebelum halaman reload & registrasi ulang.
  try {
    if (typeof fetch !== "undefined") {
      await fetch("/sw.js", { cache: "reload" });
    }
  } catch {
    // Abaikan -- ini cuma usaha ekstra, bukan syarat wajib.
  }

  // Bersihin juga IndexedDB (kalau ada dipakai fitur apa pun sekarang/nanti)
  // supaya benar-benar "sampe akar-akarnya", bukan cuma Cache Storage.
  // localStorage SENGAJA TIDAK disentuh di sini -- itu tempat bacaan
  // terakhir & surat favorit kamu tersimpan (lihat src/lib/bookmark.ts).
  try {
    if (
      typeof indexedDB !== "undefined" &&
      "databases" in indexedDB &&
      typeof indexedDB.databases === "function"
    ) {
      const dbs = await indexedDB.databases();
      await Promise.all(
        dbs
          .filter((db) => !!db.name)
          .map(
            (db) =>
              new Promise<void>((resolve) => {
                const req = indexedDB.deleteDatabase(db.name as string);
                req.onsuccess = () => resolve();
                req.onerror = () => resolve();
                req.onblocked = () => resolve();
              })
          )
      );
    }
  } catch {
    // Abaikan, sama seperti di atas.
  }

  if (typeof window !== "undefined") {
    // Cache-bust lewat query param + reload penuh (bukan router.refresh)
    // supaya browser benar-benar minta ulang dokumen HTML dari server, tidak
    // ada satu byte pun yang masih diambil dari bfcache/HTTP cache lokal.
    const url = new URL(window.location.href);
    url.searchParams.set("_r", Date.now().toString());
    window.location.replace(url.toString());
  }
}
