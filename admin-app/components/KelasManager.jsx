"use client";

import { useState, useRef } from "react";
import { upload } from "@vercel/blob/client";

async function uploadPhoto(file) {
  const blob = await upload(file.name, file, {
    access: "public",
    handleUploadUrl: "/api/photos/upload-url",
  });
  return blob.url;
}

function initials(name) {
  return (name || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || "?";
}

function Avatar({ name, photoUrl, size = 64 }) {
  return (
    <div
      className="shrink-0 overflow-hidden bg-line/30 flex items-center justify-center text-ink/40 mono"
      style={{ width: size, height: size, fontSize: size * 0.32 }}
    >
      {photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        initials(name)
      )}
    </div>
  );
}

function PhotoButton({ label, onPicked, busy }) {
  const ref = useRef(null);
  return (
    <>
      <button
        type="button"
        disabled={busy}
        onClick={() => ref.current?.click()}
        className="btn-outline border border-line text-[11px] uppercase mono px-2 py-1 disabled:opacity-50"
      >
        {busy ? "Mengunggah..." : label}
      </button>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) onPicked(file);
        }}
      />
    </>
  );
}

// ---------- Guru ----------

function TeacherRow({ teacher, onChanged, onDeleted }) {
  const [name, setName] = useState(teacher.name);
  const [subjects, setSubjects] = useState((teacher.subjects || []).join(", "));
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function save() {
    setBusy(true);
    try {
      const res = await fetch(`/api/kelas/teachers/${teacher.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          subjects: subjects.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      if (res.ok) onChanged(await res.json());
    } finally {
      setBusy(false);
    }
  }

  async function handlePhoto(file) {
    setUploading(true);
    try {
      const photoUrl = await uploadPhoto(file);
      const res = await fetch(`/api/kelas/teachers/${teacher.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoUrl }),
      });
      if (res.ok) onChanged(await res.json());
    } finally {
      setUploading(false);
    }
  }

  async function remove() {
    if (!confirm(`Hapus guru "${teacher.name}"?`)) return;
    await fetch(`/api/kelas/teachers/${teacher.id}`, { method: "DELETE" });
    onDeleted(teacher.id);
  }

  return (
    <div className="flex flex-wrap items-center gap-3 border border-line p-3">
      <Avatar name={teacher.name} photoUrl={teacher.photoUrl} size={48} />
      <input
        className="field flex-1 min-w-[140px]"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama guru"
      />
      <input
        className="field flex-[2] min-w-[180px]"
        value={subjects}
        onChange={(e) => setSubjects(e.target.value)}
        placeholder="Mapel, dipisah koma"
      />
      <div className="flex items-center gap-2">
        <PhotoButton label="Foto" busy={uploading} onPicked={handlePhoto} />
        <button
          type="button"
          disabled={busy}
          onClick={save}
          className="btn text-[11px] uppercase mono px-2 py-1"
        >
          Simpan
        </button>
        <button
          type="button"
          onClick={remove}
          className="btn-danger text-[11px] uppercase mono px-2 py-1 border"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}

function AddTeacher({ onAdded }) {
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/kelas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          subjects: subjects.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        onAdded(await res.json());
        setName("");
        setSubjects("");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-wrap gap-2 items-center">
      <input
        className="field flex-1 min-w-[140px]"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama guru baru"
      />
      <input
        className="field flex-[2] min-w-[180px]"
        value={subjects}
        onChange={(e) => setSubjects(e.target.value)}
        placeholder="Mapel, dipisah koma"
      />
      <button disabled={busy} className="btn text-[11px] uppercase mono px-3 py-1.5">
        + Tambah guru
      </button>
    </form>
  );
}

// ---------- Murid ----------

function StudentCard({ classId, student, onChanged, onDeleted }) {
  const [name, setName] = useState(student.name);
  const [uploading, setUploading] = useState(false);
  const [savingName, setSavingName] = useState(false);

  async function saveName() {
    if (name === student.name) return;
    setSavingName(true);
    try {
      const res = await fetch(`/api/kelas/classes/${classId}/students/${student.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) onChanged(await res.json());
    } finally {
      setSavingName(false);
    }
  }

  async function handlePhoto(file) {
    setUploading(true);
    try {
      const photoUrl = await uploadPhoto(file);
      const res = await fetch(`/api/kelas/classes/${classId}/students/${student.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoUrl }),
      });
      if (res.ok) onChanged(await res.json());
    } finally {
      setUploading(false);
    }
  }

  async function remove() {
    if (!confirm(`Hapus murid "${student.name}"?`)) return;
    await fetch(`/api/kelas/classes/${classId}/students/${student.id}`, { method: "DELETE" });
    onDeleted(student.id);
  }

  return (
    <div className="flex flex-col items-center gap-2 border border-line p-3 text-center">
      <Avatar name={student.name} photoUrl={student.photoUrl} size={72} />
      <input
        className="field text-center text-xs"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={saveName}
      />
      <div className="flex items-center gap-1.5">
        <PhotoButton
          label={student.photoUrl ? "Ganti foto" : "Upload foto"}
          busy={uploading}
          onPicked={handlePhoto}
        />
        <button
          type="button"
          onClick={remove}
          className="text-danger uppercase mono text-[10px]"
        >
          Hapus
        </button>
      </div>
      {savingName && <span className="text-[10px] text-ink/40 mono">menyimpan...</span>}
    </div>
  );
}

function AddStudent({ classId, onAdded }) {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/kelas/classes/${classId}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        onAdded(await res.json());
        setName("");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <input
        className="field text-xs"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama murid baru"
      />
      <button disabled={busy} className="btn text-[11px] uppercase mono px-3 py-1.5 shrink-0">
        + Tambah
      </button>
    </form>
  );
}

// ---------- Kelas ----------

function ClassBlock({ kelas, teachers, onChanged, onDeleted }) {
  const [name, setName] = useState(kelas.name);
  const [busy, setBusy] = useState(false);

  async function patch(body) {
    setBusy(true);
    try {
      const res = await fetch(`/api/kelas/classes/${kelas.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) onChanged(await res.json());
    } finally {
      setBusy(false);
    }
  }

  function toggleWali(teacherId) {
    const current = kelas.waliKelasIds || [];
    const next = current.includes(teacherId)
      ? current.filter((id) => id !== teacherId)
      : [...current, teacherId];
    patch({ waliKelasIds: next });
  }

  async function removeClass() {
    if (!confirm(`Hapus kelas "${kelas.name}" beserta semua muridnya?`)) return;
    await fetch(`/api/kelas/classes/${kelas.id}`, { method: "DELETE" });
    onDeleted(kelas.id);
  }

  function updateStudentInPlace(student) {
    onChanged({
      ...kelas,
      students: kelas.students.map((s) => (s.id === student.id ? student : s)),
    });
  }
  function removeStudentInPlace(studentId) {
    onChanged({ ...kelas, students: kelas.students.filter((s) => s.id !== studentId) });
  }
  function addStudentInPlace(student) {
    onChanged({ ...kelas, students: [...kelas.students, student] });
  }

  return (
    <div className="border border-line">
      <div className="p-4 space-y-3 bg-line/5">
        <div className="flex flex-wrap items-center gap-2">
          <input
            className="field flex-1 min-w-[160px] font-semibold"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => name !== kelas.name && patch({ name })}
          />
          <label className="flex items-center gap-1.5 text-xs mono text-ink/60">
            <input
              type="checkbox"
              checked={!!kelas.isAlumni}
              onChange={(e) => patch({ isAlumni: e.target.checked })}
            />
            Alumni
          </label>
          <button
            type="button"
            disabled={busy}
            onClick={removeClass}
            className="btn-danger text-[11px] uppercase mono px-2 py-1 border"
          >
            Hapus kelas
          </button>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-ink/50 mono mb-1.5">
            Wali kelas
          </p>
          <div className="flex flex-wrap gap-1.5">
            {teachers.length === 0 && (
              <span className="text-xs text-ink/40">Belum ada data guru.</span>
            )}
            {teachers.map((t) => {
              const active = (kelas.waliKelasIds || []).includes(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => toggleWali(t.id)}
                  className={`text-[11px] mono px-2 py-1 border ${
                    active
                      ? "bg-accent text-paper border-accent"
                      : "border-line text-ink/60"
                  }`}
                >
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-ink/50 mono mb-2">
          Murid ({kelas.students.length})
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
          {kelas.students.map((s) => (
            <StudentCard
              key={s.id}
              classId={kelas.id}
              student={s}
              onChanged={updateStudentInPlace}
              onDeleted={removeStudentInPlace}
            />
          ))}
        </div>
        <AddStudent classId={kelas.id} onAdded={addStudentInPlace} />
      </div>
    </div>
  );
}

function AddClass({ onAdded }) {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/kelas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "class", name }),
      });
      if (res.ok) {
        onAdded(await res.json());
        setName("");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <input
        className="field flex-1"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Contoh: "Kelas 1 (10/X)"'
      />
      <button disabled={busy} className="btn text-[11px] uppercase mono px-3 py-1.5 shrink-0">
        + Tambah kelas
      </button>
    </form>
  );
}

// ---------- Root ----------

export default function KelasManager({ initialTeachers, initialClasses }) {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [classes, setClasses] = useState(
    [...initialClasses].sort((a, b) => (a.order || 0) - (b.order || 0))
  );

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xs uppercase tracking-wide text-ink/50 mono mb-3">
          Guru & mata pelajaran ({teachers.length})
        </h2>
        <div className="space-y-2">
          {teachers.map((t) => (
            <TeacherRow
              key={t.id}
              teacher={t}
              onChanged={(updated) =>
                setTeachers((prev) => prev.map((x) => (x.id === updated.id ? updated : x)))
              }
              onDeleted={(id) => setTeachers((prev) => prev.filter((x) => x.id !== id))}
            />
          ))}
        </div>
        <div className="mt-3">
          <AddTeacher onAdded={(t) => setTeachers((prev) => [...prev, t])} />
        </div>
      </section>

      <section>
        <h2 className="text-xs uppercase tracking-wide text-ink/50 mono mb-3">
          Kelas & murid ({classes.length})
        </h2>
        <div className="space-y-6">
          {classes.map((c) => (
            <ClassBlock
              key={c.id}
              kelas={c}
              teachers={teachers}
              onChanged={(updated) =>
                setClasses((prev) => prev.map((x) => (x.id === updated.id ? updated : x)))
              }
              onDeleted={(id) => setClasses((prev) => prev.filter((x) => x.id !== id))}
            />
          ))}
        </div>
        <div className="mt-4">
          <AddClass onAdded={(c) => setClasses((prev) => [...prev, c])} />
        </div>
      </section>
    </div>
  );
}
