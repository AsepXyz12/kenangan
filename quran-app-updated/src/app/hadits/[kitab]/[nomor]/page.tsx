import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Roundel from "@/components/Roundel";
import BackButton from "@/components/BackButton";
import { getHaditsDetail, getKitabList } from "@/lib/hadits-api";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kitab: string; nomor: string }>;
}) {
  const { kitab, nomor } = await params;
  const meta = getKitabList().find((k) => k.slug === kitab);
  return { title: meta ? `${meta.nama} No. ${nomor} — Mushaf` : "Hadits — Mushaf" };
}

export default async function HaditsDetailPage({
  params,
}: {
  params: Promise<{ kitab: string; nomor: string }>;
}) {
  const { kitab, nomor } = await params;
  const nomorHadits = Number(nomor);

  const meta = getKitabList().find((k) => k.slug === kitab);
  if (!meta || !Number.isInteger(nomorHadits)) {
    notFound();
  }

  const hadits = getHaditsDetail(kitab, nomorHadits);
  if (!hadits) {
    notFound();
  }

  const halamanListing = Math.ceil(nomorHadits / 20);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <BackButton href={`/hadits/${meta.slug}?halaman=${halamanListing}`} label={meta.nama} />

        <div className="ornament-border ornament-corner rounded-sm bg-[var(--parchment-deep)] px-6 py-7 md:px-10 md:py-9 text-center mb-8">
          <Roundel number={hadits.nomor} variant="maroon" size={44} className="mx-auto mb-3" />
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)]">
            {meta.nama} &middot; No. {hadits.nomor}
          </p>
        </div>

        <p className="ayat-arabic text-2xl md:text-[1.75rem] text-[var(--ink)] mb-6">
          {hadits.arab}
        </p>
        <p className="font-body text-[var(--ink)] text-[15px] md:text-base leading-relaxed">
          {hadits.terjemah}
        </p>

        <div className="flex items-center justify-between mt-12 pt-6 border-t border-[var(--parchment-line)]">
          {hadits.nomor > 1 ? (
            <Link
              href={`/hadits/${meta.slug}/${hadits.nomor - 1}`}
              className="text-sm text-[var(--heading)] hover:underline"
            >
              ← No. {hadits.nomor - 1}
            </Link>
          ) : (
            <span />
          )}
          {hadits.nomor < meta.totalHadits ? (
            <Link
              href={`/hadits/${meta.slug}/${hadits.nomor + 1}`}
              className="text-sm text-[var(--heading)] hover:underline"
            >
              No. {hadits.nomor + 1} →
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
