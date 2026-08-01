import { TIDAK_ADA_BASMALAH } from "@/lib/quran-constants";

type SurahHeaderProps = {
  nomor: number;
  nama: string;
  namaLatin: string;
  arti: string;
  tempatTurun: string;
  jumlahAyat: number;
};

export default function SurahHeader({
  nomor,
  nama,
  namaLatin,
  arti,
  tempatTurun,
  jumlahAyat,
}: SurahHeaderProps) {
  const tampilkanBasmalah = !TIDAK_ADA_BASMALAH.has(nomor);

  return (
    <div className="mb-10">
      <div className="ornament-border ornament-corner rounded-sm bg-[var(--parchment-deep)] px-6 py-7 md:px-10 md:py-9 text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
          Surat ke-{nomor} &middot; {tempatTurun} &middot; {jumlahAyat} ayat
        </p>
        <h1 className="font-arabic text-4xl md:text-5xl text-[var(--ink)] mb-2" dir="rtl">
          {nama}
        </h1>
        <p className="font-display text-xl md:text-2xl text-[var(--heading)]">
          {namaLatin}
        </p>
        <p className="text-sm text-[var(--ink-soft)] mt-1">&ldquo;{arti}&rdquo;</p>
      </div>
      {tampilkanBasmalah && (
        <p className="bismillah text-center text-3xl md:text-4xl text-[var(--ink)] mt-8">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      )}
    </div>
  );
}
