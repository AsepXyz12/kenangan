"use client";

export default function PrintButton() {
  return (
    <button onClick={() => window.print()} className="btn">
      Cetak / Simpan sebagai PDF
    </button>
  );
}
