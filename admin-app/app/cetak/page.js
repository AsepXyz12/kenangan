import { isAdminAuthed } from "@/lib/auth";
import { readPhotos, readSettings } from "@/lib/store";
import { redirect } from "next/navigation";
import PrintButton from "@/components/PrintButton";

export const dynamic = "force-dynamic";

function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}

export default async function CetakPage() {
  if (!isAdminAuthed()) redirect("/");

  const photos = await readPhotos();
  photos.sort((a, b) => (a.eventDate < b.eventDate ? 1 : -1));
  const settings = await readSettings();
  const siteName = settings.siteName || "Galeri Kenangan MA";

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 print:px-0 print:py-0 print:max-w-full">
      <div className="flex items-center justify-between print:hidden">
        <a href="/" className="text-xs uppercase tracking-wide mono text-accent">
          ← Kembali ke panel
        </a>
        <PrintButton />
      </div>

      {/* Header, ikut kecetak juga */}
      <div className="mt-8 print:mt-0 text-center border-b border-ink/15 pb-6">
        {settings.logoUrl && (
          // eslint-disable-next-line @next/next/no-img-element -- perlu <img> biasa
          // biar konsisten muncul juga saat print (next/image kadang gak sempat load pas print).
          <img src={settings.logoUrl} alt={siteName} className="h-16 w-auto mx-auto mb-3 object-contain" />
        )}
        <h1 className="text-2xl font-semibold">{siteName}</h1>
        <p className="text-sm text-ink/50 mt-1">
          {photos.length} kenangan · dicetak {formatDate(new Date().toISOString().slice(0, 10))}
        </p>
      </div>

      {/* Grid kartu — mirip tampilan galeri publik, tapi disederhanakan biar rapi
          dicetak: 2 kolom, tiap kartu gak boleh kepotong antar halaman print. */}
      <div className="mt-8 grid grid-cols-2 gap-6 print:gap-4">
        {photos.map((photo) => {
          const items = Array.isArray(photo.items) && photo.items.length > 0
            ? photo.items
            : [{ url: photo.url, mediaType: photo.mediaType }];

          return (
            <div
              key={photo.id}
              className="border border-ink/15 p-3 break-inside-avoid"
              style={{ pageBreakInside: "avoid" }}
            >
              {/* Kalau medianya banyak, semua foto ikut ditampilin (bukan cuma cover) */}
              <div className={items.length > 1 ? "grid grid-cols-2 gap-1.5" : ""}>
                {items.map((item, i) =>
                  item.mediaType === "video" ? (
                    <div
                      key={i}
                      className="aspect-[4/3] bg-ink/5 flex items-center justify-center text-[10px] text-ink/40 uppercase"
                    >
                      Video (buka di web)
                    </div>
                  ) : item.mediaType === "audio" ? (
                    <div
                      key={i}
                      className="aspect-[4/3] bg-ink/5 flex items-center justify-center text-[10px] text-ink/40 uppercase"
                    >
                      Audio (buka di web)
                    </div>
                  ) : item.mediaType === "file" ? (
                    <div
                      key={i}
                      className="aspect-[4/3] bg-ink/5 flex items-center justify-center text-[10px] text-ink/40 uppercase"
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

              <p className="text-xs text-ink/50 mt-2">{formatDate(photo.eventDate)}</p>
              <p className="font-semibold text-sm mt-0.5">{photo.title}</p>
              {photo.caption && (
                <p className="text-xs text-ink/70 mt-1 leading-relaxed">{photo.caption}</p>
              )}
              <p className="text-[10px] text-ink/40 mt-1.5">
                {photo.uploader || "Admin"}
                {items.length > 1 ? ` · ${items.length} media` : ""}
              </p>
            </div>
          );
        })}
      </div>

      {photos.length === 0 && (
        <p className="mt-6 text-sm text-ink/40 text-center">Belum ada kenangan yang diunggah.</p>
      )}
    </main>
  );
}
