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

  if (typeof window !== "undefined") {
    // Cache-bust lewat query param + reload penuh (bukan router.refresh)
    // supaya browser benar-benar minta ulang dokumen HTML dari server, tidak
    // ada satu byte pun yang masih diambil dari bfcache/HTTP cache lokal.
    const url = new URL(window.location.href);
    url.searchParams.set("_r", Date.now().toString());
    window.location.replace(url.toString());
  }
}
