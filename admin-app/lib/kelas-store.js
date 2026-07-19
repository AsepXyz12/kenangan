import { put, head } from "@vercel/blob";
import { randomUUID } from "crypto";

// Data profil kelas (guru, wali kelas, kelas, dan murid per kelas) disimpan
// sebagai satu file JSON di Vercel Blob yang sama dengan data/photos.json,
// supaya tidak butuh database terpisah.
const KELAS_PATH = "data/kelas.json";

// Data awal — dipakai HANYA kalau file data/kelas.json belum pernah dibuat
// sama sekali. Begitu ada perubahan pertama (tambah/edit apa pun), data ini
// otomatis tersimpan permanen ke Blob lewat writeKelas().
function seedKelas() {
  const teacher = (name, subjects) => ({
    id: randomUUID(),
    name,
    subjects,
    photoUrl: null,
  });

  const t = {
    riska: teacher("Bu Riska", ["Sosiologi"]),
    era: teacher("Bu Era", ["Ekonomi", "Geografi"]),
    atus: teacher("Bu Atus", ["Ski", "Qurdis", "Fikih"]),
    ike: teacher("Bu Ike", ["B.Indonesia", "Sbk"]),
    jhon: teacher("Pak Jhon", ["Matematika", "Kimia", "Fisika"]),
    lukman: teacher("Pak Lukman", ["Tik", "Sejarah"]),
    imam: teacher("Pak Imam", ["B.Arab", "B.Inggris"]),
    wilan: teacher("Pak Wilan", ["Pjok", "Akidah"]),
    lasim: teacher("Pak Lasim", ["PPKn", "Aswaja"]),
  };

  const student = (name) => ({ id: randomUUID(), name, photoUrl: null, hobby: "", skills: [] });

  const classes = [
    {
      id: randomUUID(),
      name: "Kelas 1 (10/X)",
      order: 1,
      isAlumni: false,
      waliKelasIds: [t.lasim.id],
      students: [
        "Wildan",
        "Almakrifah",
        "Putra",
        "Firos",
        "Putri",
        "Iis",
        "Reza",
      ].map(student),
    },
    {
      id: randomUUID(),
      name: "Kelas 2 (11/XI)",
      order: 2,
      isAlumni: false,
      waliKelasIds: [t.jhon.id],
      students: [
        "Rama",
        "Arip",
        "Qodir",
        "Anak",
        "Rohim",
        "Vita",
        "Rita",
        "Erma",
        "Ida",
        "Nonik",
      ].map(student),
    },
    {
      id: randomUUID(),
      name: "Kelas 3 (12/XII)",
      order: 3,
      isAlumni: false,
      waliKelasIds: [t.atus.id, t.era.id],
      students: [
        "Fajar",
        "Hasan",
        "Alvin",
        "Dika",
        "Egi",
        "Ria",
        "Dea",
        "Tiara",
      ].map(student),
    },
  ];

  return { teachers: Object.values(t), classes };
}

// ---------- Kenaikan kelas otomatis ----------
//
// Cara kerja singkat (biar gampang dipahami pas dibaca lagi nanti):
// - Tiap kelas aktif (isAlumni: false) punya `order` = tingkat kelas (1, 2, 3, ...).
//   Anggap ini "wadah" tetap: Kelas 1, Kelas 2, Kelas 3 — nama, wali kelas, dan
//   urutan wadah ini TIDAK berubah selamanya.
// - Yang naik/pindah cuma ISI-nya (daftar murid). Saat kenaikan kelas terjadi:
//     1. Murid di wadah dengan `order` tertinggi (kelas paling akhir, misal
//        Kelas 3) di-copy jadi satu catatan baru bertanda isAlumni: true —
//        ini yang otomatis muncul di halaman "Alumni".
//     2. Murid di Kelas 2 pindah mengisi wadah Kelas 3 (menggantikan yang baru
//        lulus). Murid di Kelas 1 pindah mengisi wadah Kelas 2. Dan seterusnya
//        kalau ada lebih dari 3 tingkat.
//     3. Wadah Kelas 1 dikosongkan lagi — siap diisi murid baru oleh guru/admin.
// - Wali kelas TIDAK ikut pindah bareng murid (tetap jadi wali di wadah/tingkat
//   yang sama tiap tahun). Kalau wali kelas mau ikut naik bareng muridnya,
//   tinggal diatur manual lewat tombol wali kelas seperti biasa.
// - Semua ini dicek otomatis setiap kali data kelas dibaca (readKelas), jadi
//   tidak perlu ada yang mengklik apa pun. Supaya tidak dobel jalan, setelah
//   sebuah kenaikan terjadi, `graduationYear` langsung ditambah 1 (menunjuk ke
//   siklus kelulusan berikutnya), sehingga pengecekan berikutnya otomatis
//   "belum waktunya" sampai setahun ke depan.

function defaultPromotion() {
  return {
    enabled: false,
    // Tanggal kelulusan (1-31). Default tanggal 1, bisa diubah lewat UI.
    graduationDay: 1,
    // Bulan kelulusan (1-12). Rata-rata sekolah di Indonesia meluluskan
    // sekitar Mei-Juli; default dipasang Juli, bisa diubah lewat UI.
    graduationMonth: 7,
    // Tahun kelulusan untuk kelas TERTINGGI yang aktif sekarang. Diisi/di-
    // konfirmasi sekali oleh admin, sesudah itu nambah sendiri +1 tiap kali
    // kenaikan kelas otomatis benar-benar jalan.
    graduationYear: new Date().getFullYear(),
    lastRunAt: null,
    // Cadangan kondisi kelas SEBELUM kenaikan terakhir dijalankan — dipakai
    // tombol "Undo" kalau kenaikan itu ternyata tidak diinginkan (misal
    // kepencet tidak sengaja, atau tanggalnya keliru ke-set ke masa lalu).
    // Cuma menyimpan satu langkah undo (yang paling baru).
    lastSnapshot: null,
  };
}

// Tanggal yang aman dipakai buat suatu bulan/tahun (misal tanggal 31 di bulan
// Februari otomatis dipotong jadi tanggal terakhir Februari beneran, bukan
// "lompat" ke bulan berikutnya seperti perilaku default objek Date).
function clampDayInMonth(year, month1to12, day) {
  const lastDay = new Date(year, month1to12, 0).getDate();
  return Math.min(Math.max(day || 1, 1), lastDay);
}

// Mengecek apakah sudah waktunya naik kelas, dan kalau iya, langsung
// menjalankan pemindahan murid + pembuatan arsip alumni. Fungsi ini MENGUBAH
// `data` secara langsung (in place). Mengembalikan true kalau ada perubahan
// yang perlu disimpan.
//
// PENTING: dulu fungsi ini cuma mengecek & menjalankan SATU siklus per
// panggilan. Masalahnya, readKelas() dipanggil setiap kali admin membuka
// halaman apa pun — jadi kalau pengaturan tanggalnya kebetulan sudah lewat
// (misal gara-gara tanggal/tahun gagal tersimpan), maka SETIAP kali admin
// membuka dashboard, kelas naik SATU tingkat lagi, membuat siswa "meloncat"
// beberapa tingkat sekaligus hanya dalam beberapa kali buka halaman, dan
// arsip alumni menumpuk terus tanpa henti. Sekarang fungsi ini "mengejar"
// semua siklus yang kelewat dalam SATU kali panggilan saja, supaya sekali
// caught-up, tidak akan jalan lagi sampai tanggal berikutnya benar-benar
// tercapai.
function runAutoPromotionIfDue(data) {
  if (!data.promotion) data.promotion = defaultPromotion();
  const p = data.promotion;
  if (!p.enabled) return false;

  let ranAny = false;
  let snapshotTaken = false;
  let safety = 0;

  while (safety++ < 50) {
    const month = Math.min(Math.max(p.graduationMonth || 7, 1), 12);
    const day = clampDayInMonth(p.graduationYear, month, p.graduationDay);
    const target = new Date(p.graduationYear, month - 1, day);
    const now = new Date();
    if (now < target) break;

    // Ambil snapshot HANYA sekali, sebelum siklus pertama dalam panggilan
    // ini — supaya "Undo" bisa balikin ke kondisi sebelum semua kenaikan
    // yang baru saja dikejar sekaligus ini, bukan cuma langkah terakhir.
    if (!snapshotTaken) {
      p.lastSnapshot = {
        classes: JSON.parse(JSON.stringify(data.classes)),
        graduationYear: p.graduationYear,
        savedAt: new Date().toISOString(),
      };
      snapshotTaken = true;
    }

    const active = data.classes
      .filter((c) => !c.isAlumni)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    if (active.length === 0) {
      // Tidak ada kelas aktif sama sekali — tidak ada yang bisa dinaikkan.
      // Majukan saja penanda tahunnya supaya tidak terus-menerus dicek.
      p.graduationYear += 1;
      p.lastRunAt = new Date().toISOString();
      ranAny = true;
      continue;
    }

    const maxOrder = active[active.length - 1].order || 0;
    const graduating = active.filter((c) => (c.order || 0) === maxOrder);

    // 1) Arsipkan isi kelas tertinggi jadi alumni (catatan baru, terpisah
    //    dari wadah aslinya supaya wadahnya bisa dipakai lagi tahun depan).
    graduating.forEach((slot) => {
      data.classes.push({
        id: randomUUID(),
        name: `${slot.name} — Lulus ${p.graduationYear}`,
        order: slot.order,
        isAlumni: true,
        graduatedYear: p.graduationYear,
        waliKelasIds: [...(slot.waliKelasIds || [])],
        students: slot.students.map((s) => ({ ...s })),
      });
    });

    // 2) Geser murid naik satu tingkat: dari yang kedua tertinggi turun
    //    sampai yang paling bawah. Wadahnya (nama, wali kelas, order) tetap,
    //    cuma daftar muridnya yang pindah.
    for (let i = active.length - 2; i >= 0; i--) {
      active[i + 1].students = active[i].students;
    }

    // 3) Kosongkan wadah kelas paling bawah (Kelas 1) — siap diisi anak baru.
    active[0].students = [];

    // 4) Catat & majukan siklus. Loop akan cek lagi di iterasi berikutnya —
    //    kalau tanggal target yang baru masih di masa lalu (backlog lebih
    //    dari 1 tahun), siklus berikutnya langsung dikejar juga sekarang,
    //    bukan menunggu kunjungan halaman berikutnya.
    p.graduationYear += 1;
    p.lastRunAt = new Date().toISOString();
    ranAny = true;
  }

  return ranAny;
}

// Info ringkas buat ditampilkan di UI (tanggal kenaikan berikutnya, dst),
// tanpa perlu menjalankan apa pun.
export function getPromotionPreview(data) {
  const p = data.promotion || defaultPromotion();
  const { lastSnapshot, ...rest } = p;
  const active = data.classes
    .filter((c) => !c.isAlumni)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  const maxOrder = active.length ? active[active.length - 1].order || 0 : null;
  const nextGraduating = active.filter((c) => (c.order || 0) === maxOrder);
  return {
    ...rest,
    hasUndo: !!lastSnapshot,
    nextGraduatingClassNames: nextGraduating.map((c) => c.name),
  };
}

export async function updatePromotionSettings(patch) {
  const data = await readKelasRaw();
  const p = data.promotion || defaultPromotion();
  if (typeof patch.enabled === "boolean") p.enabled = patch.enabled;
  if (Number.isInteger(patch.graduationMonth)) {
    p.graduationMonth = Math.min(Math.max(patch.graduationMonth, 1), 12);
  }
  if (Number.isInteger(patch.graduationDay)) {
    p.graduationDay = Math.min(Math.max(patch.graduationDay, 1), 31);
  }
  if (Number.isInteger(patch.graduationYear)) p.graduationYear = patch.graduationYear;
  data.promotion = p;
  await writeKelas(data);
  return data;
}

// Dipakai tombol "Jalankan sekarang" (buat testing) DAN oleh cron harian —
// beda dengan pengecekan otomatis di readKelas, ini memaksa jalan meski
// tanggalnya belum sampai target (dipakai admin buat coba dulu sebelum yakin).
export async function forceRunPromotionNow() {
  const data = await readKelasRaw();
  if (!data.promotion) data.promotion = defaultPromotion();
  const enabledBefore = data.promotion.enabled;
  const monthBefore = data.promotion.graduationMonth;
  const dayBefore = data.promotion.graduationDay;

  // Paksa syarat tanggal terpenuhi (mundurkan target 1 hari dari hari ini),
  // lalu jalankan logika yang sama persis dengan yang otomatis supaya
  // hasilnya konsisten dengan kenaikan kelas beneran.
  const target = new Date();
  target.setDate(target.getDate() - 1);
  data.promotion.enabled = true;
  data.promotion.graduationYear = target.getFullYear();
  data.promotion.graduationMonth = target.getMonth() + 1;
  data.promotion.graduationDay = target.getDate();

  const ran = runAutoPromotionIfDue(data);

  // Kembalikan setelan enabled/bulan/tanggal sesuai pilihan admin sebelumnya
  // — cuma tahun siklusnya yang memang harus lanjut maju (sudah ditambah +1
  // di dalam runAutoPromotionIfDue kalau ran === true).
  data.promotion.enabled = enabledBefore;
  data.promotion.graduationMonth = monthBefore;
  data.promotion.graduationDay = dayBefore;
  await writeKelas(data);
  return { ran, data };
}

// Membalikkan kenaikan kelas terakhir yang sempat jalan (baik otomatis
// maupun lewat "Jalankan sekarang"), pakai snapshot yang disimpan sebelum
// kenaikan itu terjadi. Auto-jalan otomatis DIMATIKAN setelah undo, supaya
// kalau tanggalnya masih ke-set ke masa lalu, kenaikan yang sama tidak
// langsung jalan lagi begitu ada yang membuka halaman admin. Admin perlu
// mengecek & memperbaiki tanggalnya dulu, baru mengaktifkan lagi manual.
export async function undoLastPromotion() {
  const data = await readKelasRaw();
  const p = data.promotion;
  if (!p || !p.lastSnapshot) {
    return { undone: false, data };
  }
  data.classes = p.lastSnapshot.classes;
  p.graduationYear = p.lastSnapshot.graduationYear;
  p.lastSnapshot = null;
  p.lastRunAt = null;
  p.enabled = false;
  await writeKelas(data);
  return { undone: true, data };
}

async function getUrl() {
  try {
    const info = await head(KELAS_PATH);
    return info.url;
  } catch (err) {
    return null; // belum pernah dibuat
  }
}

// Baca data apa adanya dari Blob, TANPA menjalankan pengecekan kenaikan
// kelas otomatis. Dipakai oleh fungsi pengaturan kenaikan kelas sendiri
// (updatePromotionSettings, forceRunPromotionNow) supaya tidak dobel jalan
// dalam satu request yang sama.
async function fetchWithRetry(url, options, retries = 1) {
  try {
    return await fetch(url, options);
  } catch (err) {
    if (retries <= 0) throw err;
    await new Promise((r) => setTimeout(r, 300));
    return fetchWithRetry(url, options, retries - 1);
  }
}

async function readKelasRaw() {
  const url = await getUrl();
  if (!url) {
    // Belum pernah ada file sama sekali — buat & simpan sekarang juga supaya
    // ID guru/kelas/murid stabil di request-request berikutnya. Kalau seed
    // ini cuma "dipinjemin" tanpa disimpan, ID-nya akan beda-beda tiap kali
    // dibaca ulang dan operasi simpan/edit akan selalu gagal menemukan datanya.
    const seeded = seedKelas();
    await writeKelas(seeded);
    return seeded;
  }
  // PENTING: URL blob ini stabil (addRandomSuffix: false, allowOverwrite:
  // true), jadi CDN di depan Vercel Blob bisa saja masih nyimpen respons
  // versi lama beberapa saat setelah writeKelas() barusan menimpa isinya —
  // walau cacheControlMaxAge sudah 0. Ini yang bikin data abis pindah/edit
  // kadang "belum keupdate" pas dibaca lagi (bug tombol pindah kelas: bukan
  // gagal beneran, cuma baca versi lama). Tambahin cache-buster + header
  // no-cache eksplisit di SETIAP baca, bukan cuma andalin fetch cache Next.js.
  const bustedUrl = `${url}${url.includes("?") ? "&" : "?"}_=${Date.now()}`;
  let res;
  try {
    res = await fetchWithRetry(bustedUrl, {
      cache: "no-store",
      next: { revalidate: 0 },
      headers: { "Cache-Control": "no-cache, no-store, must-revalidate", Pragma: "no-cache" },
    });
  } catch (err) {
    // Gagal konek sama sekali (bukan cuma status non-2xx) walau sudah
    // dicoba ulang — JANGAN diam-diam balik ke seedKelas() di sini, karena
    // itu data contoh bawaan dengan ID acak baru; kalau ini kepanggil dari
    // readKelas() yang bisa lanjut nulis balik, data ASLI sekolah bisa
    // ketiban ganti sama data contoh gara-gara gangguan jaringan sesaat.
    // Lempar error-nya biar route API yang manggil bisa laporin jelas ke
    // admin (bukan diam-diam ganti data), daripada nyembunyiin masalahnya.
    throw new Error(`Gagal konek ke penyimpanan data kelas: ${err?.message || err}`);
  }
  if (!res.ok) {
    throw new Error(`Gagal membaca data kelas dari penyimpanan (status ${res.status})`);
  }
  const data = await res.json();
  if (!data || !Array.isArray(data.teachers) || !Array.isArray(data.classes)) {
    throw new Error("Data kelas yang tersimpan rusak/tidak terbaca (format tidak sesuai)");
  }
  return data;
}

// Baca data kelas — dipakai di mana-mana. Setiap kali dipanggil, otomatis
// mengecek "sudah waktunya naik kelas belum?" dan langsung menjalankannya
// kalau iya, sehingga tidak perlu ada tombol yang perlu diklik siapa pun.
export async function readKelas() {
  const data = await readKelasRaw();
  const changed = runAutoPromotionIfDue(data);
  if (changed) await writeKelas(data);
  return data;
}

export async function writeKelas(data) {
  await put(KELAS_PATH, JSON.stringify(data, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
  return data;
}

// ---------- Guru ----------

export async function addTeacher({ name, subjects, photoUrl }) {
  const data = await readKelasRaw();
  const teacher = {
    id: randomUUID(),
    name: name || "",
    subjects: Array.isArray(subjects) ? subjects : [],
    photoUrl: photoUrl || null,
  };
  data.teachers.push(teacher);
  await writeKelas(data);
  return teacher;
}

export async function updateTeacher(id, patch) {
  const data = await readKelasRaw();
  const teacher = data.teachers.find((t) => t.id === id);
  if (!teacher) return null;
  if (typeof patch.name === "string") teacher.name = patch.name;
  if (Array.isArray(patch.subjects)) teacher.subjects = patch.subjects;
  if (patch.photoUrl !== undefined) teacher.photoUrl = patch.photoUrl;
  await writeKelas(data);
  return teacher;
}

export async function deleteTeacher(id) {
  const data = await readKelasRaw();
  data.teachers = data.teachers.filter((t) => t.id !== id);
  data.classes.forEach((c) => {
    c.waliKelasIds = (c.waliKelasIds || []).filter((wid) => wid !== id);
  });
  await writeKelas(data);
  return true;
}

// ---------- Kelas ----------

export async function addClass({ name }) {
  const data = await readKelasRaw();
  const kelas = {
    id: randomUUID(),
    name: name || "Kelas baru",
    order: data.classes.length + 1,
    isAlumni: false,
    waliKelasIds: [],
    students: [],
  };
  data.classes.push(kelas);
  await writeKelas(data);
  return kelas;
}

export async function updateClass(id, patch) {
  const data = await readKelasRaw();
  const kelas = data.classes.find((c) => c.id === id);
  if (!kelas) return null;
  if (typeof patch.name === "string") kelas.name = patch.name;
  if (Array.isArray(patch.waliKelasIds)) kelas.waliKelasIds = patch.waliKelasIds;
  if (typeof patch.isAlumni === "boolean") kelas.isAlumni = patch.isAlumni;
  if (typeof patch.order === "number") kelas.order = patch.order;
  await writeKelas(data);
  return kelas;
}

export async function deleteClass(id) {
  const data = await readKelasRaw();
  data.classes = data.classes.filter((c) => c.id !== id);
  await writeKelas(data);
  return true;
}

// ---------- Murid ----------

export async function addStudent(classId, { name, photoUrl, hobby, skills }) {
  const data = await readKelasRaw();
  const kelas = data.classes.find((c) => c.id === classId);
  if (!kelas) return null;
  const student = {
    id: randomUUID(),
    name: name || "",
    photoUrl: photoUrl || null,
    hobby: hobby || "",
    skills: Array.isArray(skills) ? skills.filter(Boolean) : [],
  };
  kelas.students.push(student);
  await writeKelas(data);
  return student;
}

export async function updateStudent(classId, studentId, patch) {
  const data = await readKelasRaw();
  const kelas = data.classes.find((c) => c.id === classId);
  if (!kelas) return null;
  const student = kelas.students.find((s) => s.id === studentId);
  if (!student) return null;
  if (typeof patch.name === "string") student.name = patch.name;
  if (patch.photoUrl !== undefined) student.photoUrl = patch.photoUrl;
  if (typeof patch.hobby === "string") student.hobby = patch.hobby;
  if (Array.isArray(patch.skills)) student.skills = patch.skills.filter(Boolean);
  await writeKelas(data);
  return student;
}

export async function deleteStudent(classId, studentId) {
  const data = await readKelasRaw();
  const kelas = data.classes.find((c) => c.id === classId);
  if (!kelas) return false;
  kelas.students = kelas.students.filter((s) => s.id !== studentId);
  await writeKelas(data);
  return true;
}

// Pindahin satu murid dari satu wadah kelas ke wadah kelas lain, sambil
// mempertahankan semua data yang sudah diisi (foto, hobi, skill/cuplikan
// kode) — dipakai buat benerin manual kalau susunan kelas kacau (misal
// gara-gara kenaikan kelas otomatis yang salah tanggal).
export async function moveStudent(fromClassId, studentId, toClassId) {
  const data = await readKelasRaw();
  const fromKelas = data.classes.find((c) => c.id === fromClassId);
  const toKelas = data.classes.find((c) => c.id === toClassId);
  if (!fromKelas || !toKelas) return null;
  const idx = fromKelas.students.findIndex((s) => s.id === studentId);
  if (idx === -1) return null;
  const [student] = fromKelas.students.splice(idx, 1);
  toKelas.students.push(student);
  await writeKelas(data);
  return student;
}

// Pindahin SEMUA murid dari satu kelas ke kelas lain sekaligus (dipakai
// waktu susunan kelas berantakan dan perlu digeser borongan, bukan satu-satu).
export async function moveAllStudents(fromClassId, toClassId) {
  const data = await readKelasRaw();
  const fromKelas = data.classes.find((c) => c.id === fromClassId);
  const toKelas = data.classes.find((c) => c.id === toClassId);
  if (!fromKelas || !toKelas) return null;
  const moved = fromKelas.students;
  fromKelas.students = [];
  toKelas.students = [...toKelas.students, ...moved];
  await writeKelas(data);
  return moved;
}
