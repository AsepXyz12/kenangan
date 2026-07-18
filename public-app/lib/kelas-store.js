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
