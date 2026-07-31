import type { MetadataRoute } from "next";
import { getKitabList } from "@/lib/hadits-api";

const BASE_URL = "https://al-quran-id-silk.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "quran",
    "hadits",
    "doa-dzikir",
    "asmaul-husna",
    "rukun-islam",
    "rukun-iman",
    "panduan-sholat",
    "sholat-khusus",
    "panduan-puasa",
    "panduan-zakat",
    "panduan-haji-umrah",
    "thaharah",
    "kisah-nabi",
    "sirah-nabawiyah",
    "malam-jumat",
    "tentang",
  ].map((route) => ({
    url: `${BASE_URL}${route ? `/${route}` : ""}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const surahRoutes = Array.from({ length: 114 }, (_, i) => ({
    url: `${BASE_URL}/quran/surah/${i + 1}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const juzRoutes = Array.from({ length: 30 }, (_, i) => ({
    url: `${BASE_URL}/quran/juz/${i + 1}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  let kitabRoutes: MetadataRoute.Sitemap = [];
  try {
    kitabRoutes = getKitabList().map((k) => ({
      url: `${BASE_URL}/hadits/${k.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    kitabRoutes = [];
  }

  return [...staticRoutes, ...surahRoutes, ...juzRoutes, ...kitabRoutes];
}
