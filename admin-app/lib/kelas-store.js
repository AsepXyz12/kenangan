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

  const student = (name) => ({ id: randomUUID(), name, photoUrl: null });

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

async function getUrl() {
  try {
    const info = await head(KELAS_PATH);
    return info.url;
  } catch (err) {
    return null; // belum pernah dibuat
  }
}

export async function readKelas() {
  const url = await getUrl();
  if (!url) return seedKelas();
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return seedKelas();
  const data = await res.json();
  if (!data || !Array.isArray(data.teachers) || !Array.isArray(data.classes)) {
    return seedKelas();
  }
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
  const data = await readKelas();
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
  const data = await readKelas();
  const teacher = data.teachers.find((t) => t.id === id);
  if (!teacher) return null;
  if (typeof patch.name === "string") teacher.name = patch.name;
  if (Array.isArray(patch.subjects)) teacher.subjects = patch.subjects;
  if (patch.photoUrl !== undefined) teacher.photoUrl = patch.photoUrl;
  await writeKelas(data);
  return teacher;
}

export async function deleteTeacher(id) {
  const data = await readKelas();
  data.teachers = data.teachers.filter((t) => t.id !== id);
  data.classes.forEach((c) => {
    c.waliKelasIds = (c.waliKelasIds || []).filter((wid) => wid !== id);
  });
  await writeKelas(data);
  return true;
}

// ---------- Kelas ----------

export async function addClass({ name }) {
  const data = await readKelas();
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
  const data = await readKelas();
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
  const data = await readKelas();
  data.classes = data.classes.filter((c) => c.id !== id);
  await writeKelas(data);
  return true;
}

// ---------- Murid ----------

export async function addStudent(classId, { name, photoUrl }) {
  const data = await readKelas();
  const kelas = data.classes.find((c) => c.id === classId);
  if (!kelas) return null;
  const student = { id: randomUUID(), name: name || "", photoUrl: photoUrl || null };
  kelas.students.push(student);
  await writeKelas(data);
  return student;
}

export async function updateStudent(classId, studentId, patch) {
  const data = await readKelas();
  const kelas = data.classes.find((c) => c.id === classId);
  if (!kelas) return null;
  const student = kelas.students.find((s) => s.id === studentId);
  if (!student) return null;
  if (typeof patch.name === "string") student.name = patch.name;
  if (patch.photoUrl !== undefined) student.photoUrl = patch.photoUrl;
  await writeKelas(data);
  return student;
}

export async function deleteStudent(classId, studentId) {
  const data = await readKelas();
  const kelas = data.classes.find((c) => c.id === classId);
  if (!kelas) return false;
  kelas.students = kelas.students.filter((s) => s.id !== studentId);
  await writeKelas(data);
  return true;
}
