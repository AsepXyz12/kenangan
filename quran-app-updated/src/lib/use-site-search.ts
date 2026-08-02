"use client";

import { useEffect, useRef, useState } from "react";

export type SearchQuranResult = {
  surah: number;
  namaLatin: string;
  ayat: number;
  teksIndonesia: string;
  href: string;
};

export type SearchHaditsResult = {
  kitab: string;
  nama: string;
  nomor: number;
  terjemah: string;
  href: string;
};

export type SearchPageResult = {
  href: string;
  title: string;
  kategori: string;
  snippet: string;
};

export type SearchResults = {
  quran: SearchQuranResult[];
  hadits: SearchHaditsResult[];
  pages: SearchPageResult[];
};

const KOSONG: SearchResults = { quran: [], hadits: [], pages: [] };

export function useSiteSearch(query: string, aktif = true) {
  const [results, setResults] = useState<SearchResults>(KOSONG);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const q = query.trim();
    if (!aktif || q.length < 2) {
      setResults(KOSONG);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: controller.signal })
        .then((res) => res.json())
        .then((data: SearchResults) => {
          setResults(data);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name !== "AbortError") setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, aktif]);

  const totalHasil = results.quran.length + results.hadits.length + results.pages.length;

  return { results, loading, totalHasil };
}
