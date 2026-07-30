import Roundel from "./Roundel";

type AyatBlockProps = {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  tampilkanLatin: boolean;
};

export default function AyatBlock({
  nomorAyat,
  teksArab,
  teksLatin,
  teksIndonesia,
  tampilkanLatin,
}: AyatBlockProps) {
  return (
    <div
      id={`ayat-${nomorAyat}`}
      className="py-7 border-b border-[var(--parchment-line)] scroll-mt-24"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <Roundel number={nomorAyat} variant="gold" size={34} />
      </div>
      <p className="ayat-arabic text-2xl md:text-[2rem] text-[var(--ink)]">{teksArab}</p>
      {tampilkanLatin && (
        <p className="font-body italic text-[var(--ink-soft)] text-[15px] md:text-base mt-4 leading-relaxed">
          {teksLatin}
        </p>
      )}
      <p className="font-body text-[var(--ink)] text-[15px] md:text-base mt-3 leading-relaxed">
        {teksIndonesia}
      </p>
    </div>
  );
}
