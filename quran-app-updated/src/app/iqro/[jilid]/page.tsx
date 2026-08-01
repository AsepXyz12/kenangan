import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IqroReader from "@/components/IqroReader";
import IqroCredit from "@/components/IqroCredit";
import { IQRO_DATA, getIqroJilid } from "@/lib/iqro-data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return IQRO_DATA.map((j) => ({ jilid: String(j.jilid) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ jilid: string }>;
}) {
  const { jilid } = await params;
  const data = getIqroJilid(Number(jilid));
  return { title: data ? `${data.judul} — Iqro` : "Iqro" };
}

export default async function IqroJilidPage({
  params,
}: {
  params: Promise<{ jilid: string }>;
}) {
  const { jilid } = await params;
  const nomorJilid = Number(jilid);

  if (!Number.isInteger(nomorJilid) || nomorJilid < 1 || nomorJilid > 6) {
    notFound();
  }

  const data = getIqroJilid(nomorJilid);
  if (!data) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
          Iqro Jilid {data.jilid}
        </p>
        <h1 className="font-display text-2xl md:text-3xl text-[var(--ink)] mb-4">
          {data.judul}
        </h1>
        <ul className="text-sm text-[var(--ink-soft)] leading-relaxed mb-8 list-disc pl-5 space-y-1">
          {data.tujuan.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="mb-8">
          <IqroCredit compact />
        </div>
        <IqroReader jilid={data} />
      </main>
      <Footer />
    </div>
  );
}
