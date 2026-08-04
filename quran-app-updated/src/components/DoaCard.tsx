// Dipisah dari src/app/doa-dzikir/page.tsx supaya bisa dipakai bareng oleh
// DoaSearchBox.tsx (client component, buat fitur cari) tanpa duplikasi.
export type Doa = {
  judul: string;
  arab: string;
  latin: string;
  arti: string;
  keterangan?: string;
};

export function Kartu({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--parchment-line)] bg-[var(--parchment)] p-5 md:p-6">
      {children}
    </div>
  );
}

export function DoaCard({ d }: { d: Doa }) {
  return (
    <Kartu>
      <h3 className="font-medium text-[var(--ink)] mb-2">{d.judul}</h3>
      <p dir="rtl" className="font-arabic text-xl md:text-2xl leading-loose text-[var(--ink)]">
        {d.arab}
      </p>
      <p className="text-sm italic text-[var(--ink-soft)] mt-2">{d.latin}</p>
      <p className="text-sm text-[var(--ink-soft)] mt-1">&ldquo;{d.arti}&rdquo;</p>
      {d.keterangan && (
        <p className="text-xs text-[var(--ink-soft)] mt-2 border-t border-[var(--parchment-line)] pt-2">
          {d.keterangan}
        </p>
      )}
    </Kartu>
  );
}
