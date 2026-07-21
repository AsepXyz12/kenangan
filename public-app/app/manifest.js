import { readSettings } from "@/lib/store";

export default async function manifest() {
  const settings = await readSettings();
  const siteName = settings.siteName || "Galeri Kenangan MA";

  return {
    name: siteName,
    short_name: siteName,
    description:
      "Album digital kenangan Madrasah Aliyah — foto, video, cerita, dan jejak kebersamaan.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F1E4",
    theme_color: "#123832",
    // Logo dari settings admin dipakai sebagai satu-satunya ikon. Karena
    // ukuran aslinya tidak diketahui pasti, "any" dipakai supaya browser
    // tidak menolak ikon karena mismatch ukuran — kebanyakan browser modern
    // menskalakan sendiri.
    icons: settings.logoUrl
      ? [{ src: settings.logoUrl, sizes: "any", type: "image/png" }]
      : [],
  };
}
