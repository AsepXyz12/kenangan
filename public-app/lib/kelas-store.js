import { head } from "@vercel/blob";

// Sumber data yang sama dengan project admin: data/kelas.json di Vercel Blob.
// Project publik ini HANYA membaca data — semua pengelolaan (tambah/edit
// guru, kelas, murid, foto) ada di project admin.
const KELAS_PATH = "data/kelas.json";

export async function readKelas() {
  try {
    const info = await head(KELAS_PATH);
    const res = await fetch(info.url, { cache: "no-store" });
    if (!res.ok) return { teachers: [], classes: [] };
    const data = await res.json();
    if (!data || !Array.isArray(data.teachers) || !Array.isArray(data.classes)) {
      return { teachers: [], classes: [] };
    }
    return data;
  } catch (err) {
    return { teachers: [], classes: [] }; // belum pernah dibuat oleh admin
  }
}

// ---------- Angkatan (tahun masuk / tahun lulus) ----------
//
// MA di sini ditempuh 3 tahun, jadi begitu tahun masuk diketahui, tahun
// lulusnya otomatis tahun masuk + 3. `entryYear` diisi otomatis oleh admin
// waktu sebuah kelas jadi alumni; buat data lama yang cuma punya
// `graduatedYear`, kita turunkan tahun masuknya dari situ.

export function getEntryYear(kelas) {
  if (Number.isInteger(kelas.entryYear)) return kelas.entryYear;
  if (Number.isInteger(kelas.graduatedYear)) return kelas.graduatedYear - 3;
  return null;
}

export function getGraduationYear(kelas) {
  const entryYear = getEntryYear(kelas);
  return entryYear != null ? entryYear + 3 : null;
}

// Kelompokkan kelas alumni jadi per-angkatan (satu tahun masuk = satu
// angkatan, walau ada beberapa "kelas" yang lulus bareng di tahun yang
// sama). Nomor angkatan: paling lama = Angkatan 1, makin baru makin besar.
// Hasil dikembalikan terurut dari yang PALING BARU dulu (biar publik lihat
// angkatan terbaru di paling atas).
export function getAngkatanGroups(classes) {
  const groups = new Map();
  for (const kelas of classes) {
    const entryYear = getEntryYear(kelas);
    if (entryYear == null) continue;
    if (!groups.has(entryYear)) {
      groups.set(entryYear, { entryYear, graduationYear: entryYear + 3, classes: [] });
    }
    groups.get(entryYear).classes.push(kelas);
  }
  const ascending = Array.from(groups.values()).sort((a, b) => a.entryYear - b.entryYear);
  ascending.forEach((group, i) => {
    group.angkatanNumber = i + 1;
  });
  return ascending.reverse();
}

// Cari satu murid (buat halaman detail /murid/[id]) beserta kelas & wali
// kelasnya. Mengembalikan null kalau tidak ketemu.
export async function getStudentDetail(studentId) {
  const { teachers, classes } = await readKelas();
  for (const kelas of classes) {
    const student = (kelas.students || []).find((s) => s.id === studentId);
    if (student) {
      const wali = (kelas.waliKelasIds || [])
        .map((id) => teachers.find((t) => t.id === id))
        .filter(Boolean);
      return { student, kelas, wali };
    }
  }
  return null;
}
