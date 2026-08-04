"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";

type HasilCari = { nomor: number; cuplikan: string };

export default function HaditsSearchBox({
  slug,
  totalHadits,
}: {
  slug: string;
  totalHadits: number;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [hasil, setHasil] = useState<HasilCari[] | null>(null);
  const [mencari, setMencari] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  const angkaMurni = /^\d+$/.test(value.trim());

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nomor = Number(value);
    if (Number.isInteger(nomor) && nomor >= 1 && nomor <= totalHadits) {
      router.push(`/hadits/${slug}/${nomor}`);
    }
  }

  // Cari teks (bukan nomor) -> debounce 350ms lalu panggil API pencarian
  // yang di-scope ke SATU kitab ini saja (lihat src/app/api/hadits/search).
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const q = value.trim();
    if (!q || angkaMurni) {
      setHasil(null);
      setMencari(false);
      return;
    }

    setMencari(true);
    const myId = ++requestIdRef.current;

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/hadits/search?kitab=${encodeURIComponent(slug)}&q=${encodeURIComponent(q)}`
        );
        const data = await res.json();
        // Abaikan hasil kalau sudah ada ketikan lebih baru -> cegah hasil
        // pencarian lama "menyalip" balik nampilin sesuatu yang basi.
        if (myId === requestIdRef.current) {
          setHasil(Array.isArray(data.items) ? data.items : []);
        }
      } catch {
        if (myId === requestIdRef.current) setHasil([]);
      } finally {
        if (myId === requestIdRef.current) setMencari(false);
      }
    }, 350);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, angkaMurni, slug]);

  const sedangCariTeks = value.trim().length > 0 && !angkaMurni;

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="relative">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-soft)] pointer-events-none"
        />
        <input
          type="text"
          inputMode="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Cari kata di kitab ini, atau ketik nomor (1-${totalHadits})...`}
          className="w-full pl-11 pr-10 py-3 rounded-full border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 text-[var(--ink)] placeholder:text-[var(--ink-soft)] focus:border-[var(--teal)] outline-none text-sm"
        />
        {value ? (
          <button
            type="button"
            onClick={() => setValue("")}
            aria-label="Hapus pencarian"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-[var(--ink-soft)] hover:text-[var(--heading)]"
          >
            <X size={15} />
          </button>
        ) : null}
      </form>

      {angkaMurni && (
        <button
          onClick={handleSubmit}
          className="mt-2 text-xs text-[var(--heading)] hover:underline"
        >
          Buka hadits nomor {value} →
        </button>
      )}

      {sedangCariTeks && (
        <div className="mt-3">
          {mencari ? (
            <p className="flex items-center gap-2 text-xs text-[var(--ink-soft)]">
              <Loader2 size={13} className="animate-spin" /> Mencari di kitab ini...
            </p>
          ) : hasil && hasil.length > 0 ? (
            <div className="divide-y divide-[var(--parchment-line)] border-t border-b border-[var(--parchment-line)]">
              {hasil.map((h) => (
                <Link
                  key={h.nomor}
                  href={`/hadits/${slug}/${h.nomor}`}
                  className="block py-3 px-1 hover:bg-[var(--parchment-deep)]/40 transition-colors"
                >
                  <span className="text-xs text-[var(--heading)] font-medium">
                    Hadits no. {h.nomor}
                  </span>
                  <p className="text-sm text-[var(--ink-soft)] mt-0.5">{h.cuplikan}</p>
                </Link>
              ))}
            </div>
          ) : hasil ? (
            <p className="text-xs text-[var(--ink-soft)]">
              Tidak ada hadits di kitab ini yang cocok dengan &ldquo;{value}&rdquo;.
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}
