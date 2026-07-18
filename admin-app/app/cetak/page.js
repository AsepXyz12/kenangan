import { Fraunces, Karla, Space_Mono } from "next/font/google";
import { isAdminAuthed } from "@/lib/auth";
import { readPhotos, readSettings } from "@/lib/store";
import { redirect } from "next/navigation";
import PrintButton from "@/components/PrintButton";

export const dynamic = "force-dynamic";

// Font trio yang sama persis dengan situs publik (kenangan-five.vercel.app),
// supaya hasil cetak/PDF terasa satu keluarga dengan galeri aslinya
// alih-alih pakai font default admin panel.
const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "900"],
  style: ["normal", "italic"],
  variable: "--font-cetak-display",
});
const body = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-cetak-body",
});
const stamp = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cetak-stamp",
});

const BULAN_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];
const TAPES = ["gold", "clay", "dusk"];

function parseDateParts(dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return null;
  return { y, m, d };
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}

// Kelompokkan foto per tanggal kejadian, sama seperti galeri publik, supaya
// tiap halaman cetak punya "kepala tanggal" gaya kalender alih-alih cuma
// tanggal kecil di tiap kartu.
function groupByDate(photos) {
  const result = [];
  let current = null;
  for (const photo of photos) {
    const key = photo.eventDate || "";
    if (!current || current.key !== key) {
      current = { key, date: parseDateParts(key), items: [] };
      result.push(current);
    }
    current.items.push(photo);
  }
  return result;
}

export default async function CetakPage() {
  if (!isAdminAuthed()) redirect("/");

  const photos = await readPhotos();
  photos.sort((a, b) => (a.eventDate < b.eventDate ? 1 : -1));
  const settings = await readSettings();
  const siteName = settings.siteName || "Galeri Kenangan MA";
  const groups = groupByDate(photos);

  let globalIndex = 0;

  return (
    <main
      className={`${display.variable} ${body.variable} ${stamp.variable} font-cetakBody cetak-page min-h-screen text-cetakInk print:min-h-0`}
    >
      <div className="max-w-4xl mx-auto px-6 py-10 print:px-0 print:py-0 print:max-w-full">
        <div className="flex items-center justify-between print:hidden">
          <a href="/" className="font-cetakStamp text-xs uppercase tracking-wide text-cetakEmerald">
            ← Kembali ke panel
          </a>
          <PrintButton />
        </div>

        {/* Header, ikut kecetak juga — disamain sama header galeri publik:
            eyebrow kecil, judul serif italic, lalu meta tipis. */}
        <div className="mt-8 print:mt-0 text-center pb-6">
          {settings.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element -- perlu <img> biasa
            // biar konsisten muncul juga saat print (next/image kadang gak sempat load pas print).
            <img src={settings.logoUrl} alt={siteName} className="h-16 w-auto mx-auto mb-3 object-contain" />
          )}
          <p className="font-cetakStamp text-[11px] uppercase tracking-[0.2em] text-cetakGold">
            Madrasah Aliyah — Arsip Bersama
          </p>
          <h1 className="font-cetakDisplay italic font-semibold text-3xl sm:text-4xl text-cetakEmerald mt-1">
            {siteName}
          </h1>
          <p className="font-cetakStamp text-xs text-cetakInk/50 mt-2">
            {photos.length} kenangan · dicetak {formatDate(new Date().toISOString().slice(0, 10))}
          </p>
          <hr className="cetak-thread mt-6" />
        </div>

        {groups.map((group) => (
          <div key={group.key || "tanpa-tanggal"} className="mt-8 break-inside-avoid">
            {group.date ? (
              <div className="flex items-end gap-3 mb-4">
                <div className="font-cetakDisplay text-4xl sm:text-5xl leading-none text-cetakEmerald">
                  {String(group.date.d).padStart(2, "0")}
                </div>
                <div className="pb-1">
                  <div className="font-cetakStamp text-xs sm:text-sm uppercase tracking-wider text-cetakEmerald-light">
                    {BULAN_ID[group.date.m - 1]}
                  </div>
                  <div className="font-cetakStamp text-[10px] text-cetakInk/50">{group.date.y}</div>
                </div>
                <hr className="cetak-thread flex-1 ml-1" />
              </div>
            ) : (
              <div className="mb-4">
                <p className="font-cetakStamp text-xs uppercase tracking-wide text-cetakInk/40">
                  Tanpa tanggal
                </p>
                <hr className="cetak-thread mt-1" />
              </div>
            )}

            {/* Grid kartu — gaya polaroid situs publik, disederhanakan biar rapi
                dicetak: 2 kolom, tiap kartu gak boleh kepotong antar halaman print. */}
            <div className="grid grid-cols-2 gap-6 print:gap-4">
              {group.items.map((photo) => {
                const idx = globalIndex++;
                const items = Array.isArray(photo.items) && photo.items.length > 0
                  ? photo.items
                  : [{ url: photo.url, mediaType: photo.mediaType }];
                const tape = TAPES[idx % TAPES.length];

                return (
                  <div
                    key={photo.id}
                    className="relative bg-[#fffdf8] border border-cetakEmerald/15 shadow-sm p-3 pb-4 break-inside-avoid"
                    style={{ pageBreakInside: "avoid" }}
                  >
                    <span className="cetak-tape" data-tape={tape} aria-hidden="true" />

                    {/* Kalau medianya banyak, semua foto ikut ditampilin (bukan cuma cover) */}
                    <div className={items.length > 1 ? "grid grid-cols-2 gap-1.5" : ""}>
                      {items.map((item, i) =>
                        item.mediaType === "video" ? (
                          <div
                            key={i}
                            className="aspect-[4/3] bg-cetakEmerald/5 flex items-center justify-center font-cetakStamp text-[10px] text-cetakEmerald/40 uppercase"
                          >
                            Video (buka di web)
                          </div>
                        ) : item.mediaType === "audio" ? (
                          <div
                            key={i}
                            className="aspect-[4/3] bg-cetakEmerald/5 flex items-center justify-center font-cetakStamp text-[10px] text-cetakEmerald/40 uppercase"
                          >
                            Audio (buka di web)
                          </div>
                        ) : item.mediaType === "file" ? (
                          <div
                            key={i}
                            className="aspect-[4/3] bg-cetakEmerald/5 flex items-center justify-center font-cetakStamp text-[10px] text-cetakEmerald/40 uppercase"
                          >
                            File (buka di web)
                          </div>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={i}
                            src={item.url}
                            alt={photo.title}
                            className="w-full aspect-[4/3] object-cover"
                          />
                        )
                      )}
                    </div>

                    <p className="font-cetakDisplay text-sm font-semibold mt-2.5">{photo.title}</p>
                    {photo.caption && (
                      <p className="font-cetakBody text-xs text-cetakInk/70 mt-1 leading-relaxed">
                        {photo.caption}
                      </p>
                    )}
                    <p className="font-cetakStamp text-[10px] text-cetakInk/40 mt-1.5">
                      {photo.uploader || "Admin"}
                      {items.length > 1 ? ` · ${items.length} media` : ""}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {photos.length === 0 && (
          <p className="mt-6 font-cetakBody text-sm text-cetakInk/40 text-center">
            Belum ada kenangan yang diunggah.
          </p>
        )}
      </div>
    </main>
  );
}
