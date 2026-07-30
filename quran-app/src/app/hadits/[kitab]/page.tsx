import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Roundel from "@/components/Roundel";
import HaditsJumpBox from "@/components/HaditsJumpBox";
import { getHaditsList, getKitabList } from "@/lib/hadits-api";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kitab: string }>;
}) {
  const { kitab } = await params;
  const meta = getKitabList().find((k) => k.slug === kitab);
  return { title: meta ? `${meta.nama} — Mushaf` : "Hadits — Mushaf" };
}

function ringkas(teks: string, maxLen = 160) {
  if (teks.length <= maxLen) return teks;
  return teks.slice(0, maxLen).trim() + "…";
}

export default async function HaditsKitabPage({
  params,
  searchParams,
}: {
  params: Promise<{ kitab: string }>;
  searchParams: Promise<{ halaman?: string }>;
}) {
  const { kitab } = await params;
  const { halaman } = await searchParams;
  const page = Number(halaman) || 1;

  const result = getHaditsList(kitab, page, 20);
  if (!result) {
    notFound();
  }

  const { meta, items, totalPages } = result;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <div className="mb-8">
          <Link href="/hadits" className="text-xs text-[var(--ink-soft)] hover:text-[var(--teal-deep)]">
            ← Semua Kitab
          </Link>
          <h1 className="font-display text-3xl text-[var(--ink)] mt-2 mb-1">
            {meta.nama}
          </h1>
          <p className="text-sm text-[var(--ink-soft)]">
            {meta.totalHadits.toLocaleString("id-ID")} hadits &middot; Halaman {result.page} dari {totalPages}
          </p>
        </div>

        <HaditsJumpBox slug={meta.slug} totalHadits={meta.totalHadits} />

        <div className="divide-y divide-[var(--parchment-line)] border-t border-b border-[var(--parchment-line)] mb-8">
          {items.map((h) => (
            <Link
              key={h.nomor}
              href={`/hadits/${meta.slug}/${h.nomor}`}
              className="flex items-start gap-4 py-4 hover:bg-[var(--parchment-deep)]/40 transition-colors px-2"
            >
              <Roundel number={h.nomor} variant="teal" size={34} className="mt-0.5" />
              <p className="text-sm text-[var(--ink)] leading-relaxed">
                {ringkas(h.terjemah)}
              </p>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between">
          {result.page > 1 ? (
            <Link
              href={`/hadits/${meta.slug}?halaman=${result.page - 1}`}
              className="text-sm text-[var(--teal-deep)] hover:underline"
            >
              ← Halaman sebelumnya
            </Link>
          ) : (
            <span />
          )}
          {result.page < totalPages ? (
            <Link
              href={`/hadits/${meta.slug}?halaman=${result.page + 1}`}
              className="text-sm text-[var(--teal-deep)] hover:underline"
            >
              Halaman selanjutnya →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
