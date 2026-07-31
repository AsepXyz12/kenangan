// Konversi Masehi ke Hijriah pakai algoritma tabular Kuwaiti.
// Sengaja gak pakai Intl.DateTimeFormat(..., { calendar: "islamic-umalqura" })
// karena dukungan kalender Hijriah di Intl API gak konsisten di banyak
// browser/WebView Android — kadang diam-diam salah tanggal atau nyampur
// nama bulan Masehi. Perhitungan manual di sini selalu sama hasilnya
// di semua device.

const HIJRI_MONTHS = [
  "Muharram",
  "Safar",
  "Rabiul Awal",
  "Rabiul Akhir",
  "Jumadil Awal",
  "Jumadil Akhir",
  "Rajab",
  "Sya'ban",
  "Ramadhan",
  "Syawal",
  "Dzulqaidah",
  "Dzulhijjah",
];

export function toHijri(date: Date): { day: number; month: number; year: number; label: string } {
  // Ambil tanggal Masehi berdasarkan zona WIB, biar konsisten dengan sisa komponen.
  const wibParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const y = Number(wibParts.find((p) => p.type === "year")!.value);
  const m = Number(wibParts.find((p) => p.type === "month")!.value);
  const d = Number(wibParts.find((p) => p.type === "day")!.value);

  // Julian Day Number dari tanggal Masehi (algoritma standar).
  const a = Math.floor((14 - m) / 12);
  const yy = y + 4800 - a;
  const mm = m + 12 * a - 3;
  const jdn =
    d +
    Math.floor((153 * mm + 2) / 5) +
    365 * yy +
    Math.floor(yy / 4) -
    Math.floor(yy / 100) +
    Math.floor(yy / 400) -
    32045;

  // JDN -> tanggal Hijriah (algoritma tabular Kuwaiti).
  const l = jdn - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j =
    Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) +
    Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 =
    l2 -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;
  const hMonth = Math.floor((24 * l3) / 709);
  const hDay = l3 - Math.floor((709 * hMonth) / 24);
  const hYear = 30 * n + j - 30;

  return {
    day: hDay,
    month: hMonth,
    year: hYear,
    label: `${hDay} ${HIJRI_MONTHS[hMonth - 1]} ${hYear}`,
  };
}
