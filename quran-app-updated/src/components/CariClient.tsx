"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useSiteSearch } from "@/lib/use-site-search";
import SearchResultsList from "./SearchResultsList";

export default function CariClient() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const { results, loading } = useSiteSearch(query);

  return (
    <div>
      <div className="flex items-center gap-2 mb-8 px-4 py-3 rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 focus-within:border-[var(--gold)] transition-colors">
        <Search size={18} className="text-[var(--ink-soft)] shrink-0" />
        <input
          type="text"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari ayat, hadits, doa, panduan…"
          className="flex-1 bg-transparent outline-none text-[var(--ink)] placeholder:text-[var(--ink-soft)] text-sm md:text-base"
        />
      </div>
      <SearchResultsList results={results} loading={loading} query={query} />
    </div>
  );
}
