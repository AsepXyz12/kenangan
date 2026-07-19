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
  const [error, setError] = useState("");

  async function save() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/kelas/teachers/${teacher.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          subjects: subjects.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        onChanged(await res.json());
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal menyimpan. Coba muat ulang halaman.");
      }
    } catch (err) {
      setError("Gagal menyimpan (koneksi bermasalah).");
    } finally {
      setBusy(false);
    }
  }

  async function handlePhoto(file) {
    setUploading(true);
    setError("");
    try {
      const photoUrl = await uploadPhoto(file);
      const res = await fetch(`/api/kelas/teachers/${teacher.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoUrl }),
      });
      if (res.ok) {
        onChanged(await res.json());
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal upload foto. Coba muat ulang halaman.");
      }
    } catch (err) {
      setError("Gagal upload foto (koneksi bermasalah).");
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
    <div className="border border-line p-3">
      <div className="flex flex-wrap items-center gap-3">
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
      {error && <p className="text-xs text-danger mono mt-2">{error}</p>}
    </div>
  );
}

function AddTeacher({ onAdded }) {
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    setError("");
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
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal menambah guru.");
      }
    } catch (err) {
      setError("Gagal menambah guru (koneksi bermasalah).");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <div className="flex flex-wrap gap-2 items-center">
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
      </div>
      {error && <p className="text-xs text-danger mono">{error}</p>}
    </form>
  );
}

// ---------- Murid ----------

// Bahasa yang didukung buat skill berupa cuplikan kode. `value` di sini harus
// cocok dengan nama bahasa yang dikenali highlight.js di sisi public-app,
// supaya kodenya kewarnain otomatis pas ditampilkan di halaman murid.
const CODE_LANGS = [
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "cpp", label: "C++" },
  { value: "php", label: "PHP" },
  { value: "sql", label: "MySQL" },
];

// Nama-nama penanda bahasa yang dikenali saat parsing paste multi-bahasa —
// bisa lebih dari satu alias per bahasa (mis. "SQL" dan "MySQL" dua-duanya
// mengarah ke value "sql"), beda dari daftar dropdown di atas yang cuma satu
// label per bahasa.
const SPLIT_ALIASES = [
  { names: ["HTML"], value: "html", label: "HTML" },
  { names: ["CSS"], value: "css", label: "CSS" },
  { names: ["JavaScript", "JS"], value: "javascript", label: "JavaScript" },
  { names: ["TypeScript", "TS"], value: "typescript", label: "TypeScript" },
  { names: ["Python", "Py"], value: "python", label: "Python" },
  { names: ["C\\+\\+", "Cpp"], value: "cpp", label: "C++" },
  { names: ["PHP"], value: "php", label: "PHP" },
  { names: ["MySQL", "SQL"], value: "sql", label: "MySQL" },
];

function isCodeSkill(skill) {
  return skill && typeof skill === "object" && typeof skill.code === "string";
}

// Kalau murid nge-paste banyak bahasa sekaligus dalam satu blok (format
// "Nama: kode..." berulang, kayak yang biasa ditulis orang pas nunjukkin
// beberapa cuplikan kode berbeda bahasa), pisahkan otomatis jadi beberapa
// entri skill kode terpisah — masing-masing dapat bahasa & warnanya sendiri.
// Kalau cuma ketemu 0-1 penanda bahasa, dianggap satu snippet biasa saja.
function splitMultiLangBlob(text) {
  const allNames = SPLIT_ALIASES.flatMap((l) => l.names);
  const re = new RegExp(`(?:^|\\n)\\s*(${allNames.join("|")})\\s*:\\s*`, "gi");
  const matches = [...text.matchAll(re)];
  if (matches.length < 2) return null;

  const parts = [];
  for (let i = 0; i < matches.length; i++) {
    const rawName = matches[i][1];
    const start = matches[i].index + matches[i][0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
    const code = text.slice(start, end).trim();
    if (!code) continue;
    const found = SPLIT_ALIASES.find((l) =>
      l.names.some((n) => n.replace(/\\/g, "").toLowerCase() === rawName.toLowerCase())
    );
    parts.push({
      label: found ? found.label : rawName,
      lang: found ? found.value : "plaintext",
      code,
    });
  }
  return parts.length >= 2 ? parts : null;
}

function SkillsInput({ classId, student, onChanged }) {
  const [draft, setDraft] = useState("");
  const [showCodeForm, setShowCodeForm] = useState(false);
  const [codeLabel, setCodeLabel] = useState("");
  const [codeLang, setCodeLang] = useState("javascript");
  const [codeDraft, setCodeDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function save(nextSkills) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/kelas/classes/${classId}/students/${student.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: nextSkills }),
      });
      if (res.ok) {
        onChanged(await res.json());
      } else {
        setError("Gagal menyimpan skill.");
      }
    } catch (err) {
      setError("Gagal menyimpan (koneksi bermasalah).");
    } finally {
      setBusy(false);
    }
  }

  function addSkill(e) {
    e.preventDefault();
    const value = draft.trim();
    if (!value) return;
    const existing = student.skills || [];
    if (existing.includes(value)) {
      setDraft("");
      return;
    }
    save([...existing, value]);
    setDraft("");
  }

  function addCodeSkill(e) {
    e.preventDefault();
    setInfo("");
    const raw = codeDraft.trim();
    if (!raw) return;
    const existing = student.skills || [];
    const multi = splitMultiLangBlob(raw);
    if (multi) {
      save([...existing, ...multi]);
      setInfo(`Kepisah otomatis jadi ${multi.length} cuplikan (${multi.map((p) => p.label).join(", ")}).`);
    } else {
      save([
        ...existing,
        { label: codeLabel.trim() || "Cuplikan kode", lang: codeLang, code: raw },
      ]);
    }
    setCodeLabel("");
    setCodeDraft("");
    setShowCodeForm(false);
  }

  function removeSkillAt(index) {
    save((student.skills || []).filter((_, i) => i !== index));
  }

  function clearAllSkills() {
    if (!confirm(`Hapus SEMUA skill "${student.name}"? Ini mengosongkan semua tag & cuplikan kode yang ada sekarang.`)) return;
    save([]);
  }

  return (
    <div className="w-full">
      {(student.skills || []).length > 0 && (
        <div className="flex justify-center mb-1">
          <button
            type="button"
            onClick={clearAllSkills}
            disabled={busy}
            className="text-[9px] mono uppercase text-danger/70 hover:text-danger underline underline-offset-2"
          >
            Hapus semua skill ({student.skills.length})
          </button>
        </div>
      )}
      <div className="flex flex-wrap gap-1 justify-center mb-1">
        {(student.skills || []).map((s, i) =>
          isCodeSkill(s) ? (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-[9px] mono uppercase bg-ink/5 text-ink/70 border border-ink/20 px-1.5 py-0.5"
              title={s.code}
            >
              {"</>"} {s.label} · {s.lang}
              <button
                type="button"
                onClick={() => removeSkillAt(i)}
                className="text-ink/40 hover:text-danger"
                aria-label={`Hapus kode ${s.label}`}
              >
                ×
              </button>
            </span>
          ) : (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-[9px] mono uppercase bg-accent/10 text-accent border border-accent/30 px-1.5 py-0.5"
            >
              {s}
              <button
                type="button"
                onClick={() => removeSkillAt(i)}
                className="text-accent/60 hover:text-danger"
                aria-label={`Hapus skill ${s}`}
              >
                ×
              </button>
            </span>
          )
        )}
      </div>

      <form onSubmit={addSkill} className="flex gap-1">
        <input
          className="field text-center text-[10px] py-1"
          placeholder="Tambah skill..."
          value={draft}
          disabled={busy}
          onChange={(e) => setDraft(e.target.value)}
        />
      </form>

      <button
        type="button"
        onClick={() => setShowCodeForm((v) => !v)}
        className="mt-1 text-[9px] mono uppercase text-ink/40 hover:text-accent underline underline-offset-2"
      >
        {showCodeForm ? "Batal tambah kode" : "+ Tambah cuplikan kode"}
      </button>

      {showCodeForm && (
        <form onSubmit={addCodeSkill} className="mt-2 space-y-1 border border-line p-2 text-left">
          <p className="text-[9px] text-ink/40 leading-relaxed">
            Mau 1 bahasa aja? Isi judul + pilih bahasa di bawah, lalu tempel
            kode di kotak besar. Mau beberapa bahasa sekaligus (kayak
            "HTML: ... CSS: ... JavaScript: ...")? Tempel semuanya langsung
            di kotak besar — nanti otomatis kepisah & diwarnain per bahasa,
            judul & pilihan bahasa di atas boleh dikosongin.
          </p>
          <div className="flex gap-1">
            <input
              className="field text-[10px] py-1 flex-1"
              placeholder="Judul (mis. Fungsi memo) — opsional kalau paste banyak bahasa"
              value={codeLabel}
              disabled={busy}
              onChange={(e) => setCodeLabel(e.target.value)}
            />
            <select
              className="field text-[10px] py-1"
              value={codeLang}
              disabled={busy}
              onChange={(e) => setCodeLang(e.target.value)}
            >
              {CODE_LANGS.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
          <textarea
            className="field text-[10px] py-1 font-mono w-full"
            rows={8}
            placeholder={"Tempel kodenya di sini...\n\nBisa 1 bahasa saja, atau paste semua bahasa sekaligus format:\nHTML: <kode>\nCSS: <kode>\nJavaScript: <kode>\n..."}
            value={codeDraft}
            disabled={busy}
            onChange={(e) => setCodeDraft(e.target.value)}
          />
          <button
            disabled={busy || !codeDraft.trim()}
            className="btn text-[10px] uppercase mono px-2 py-1 disabled:opacity-50"
          >
            Simpan kode
          </button>
          {info && <p className="text-[9px] text-accent mono">{info}</p>}
        </form>
      )}

      {error && <p className="text-[9px] text-danger mono mt-1">{error}</p>}
    </div>
  );
}

function StudentCard({ classId, student, onChanged, onDeleted }) {
  const [name, setName] = useState(student.name);
  const [hobby, setHobby] = useState(student.hobby || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [error, setError] = useState("");

  async function save() {
    setSaving(true);
    setError("");
    setJustSaved(false);
    try {
      const res = await fetch(`/api/kelas/classes/${classId}/students/${student.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, hobby }),
      });
      if (res.ok) {
        onChanged(await res.json());
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 1500);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal menyimpan.");
      }
    } catch (err) {
      setError("Gagal menyimpan (koneksi bermasalah).");
    } finally {
      setSaving(false);
    }
  }

  async function handlePhoto(file) {
    setUploading(true);
    setError("");
    try {
      const photoUrl = await uploadPhoto(file);
      const res = await fetch(`/api/kelas/classes/${classId}/students/${student.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoUrl }),
      });
      if (res.ok) {
        onChanged(await res.json());
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal upload foto.");
      }
    } catch (err) {
      setError("Gagal upload foto (koneksi bermasalah).");
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
      />
      <input
        className="field text-center text-[10px] py-1 focus:border-cetakGold"
        placeholder="Hobi (mis. coding)"
        value={hobby}
        onChange={(e) => setHobby(e.target.value)}
      />
      <SkillsInput classId={classId} student={student} onChanged={onChanged} />
      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="w-full text-[11px] uppercase mono px-2 py-1.5 border border-accent btn transition-colors disabled:opacity-60"
      >
        {saving ? "Menyimpan..." : justSaved ? "Tersimpan ✓" : "Simpan"}
      </button>
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
      {error && <p className="text-[10px] text-danger mono">{error}</p>}
    </div>
  );
}

function AddStudent({ classId, onAdded }) {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/kelas/classes/${classId}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        onAdded(await res.json());
        setName("");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal menambah murid.");
      }
    } catch (err) {
      setError("Gagal menambah murid (koneksi bermasalah).");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
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
      {error && <p className="text-xs text-danger mono mt-1">{error}</p>}
    </div>
  );
}

// ---------- Kelas ----------

function ClassBlock({ kelas, teachers, onChanged, onDeleted }) {
  const [name, setName] = useState(kelas.name);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function patch(body) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/kelas/classes/${kelas.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        onChanged(await res.json());
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal menyimpan perubahan kelas.");
      }
    } catch (err) {
      setError("Gagal menyimpan (koneksi bermasalah).");
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
        {error && <p className="text-xs text-danger mono">{error}</p>}
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
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/kelas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "class", name }),
      });
      if (res.ok) {
        onAdded(await res.json());
        setName("");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal menambah kelas.");
      }
    } catch (err) {
      setError("Gagal menambah kelas (koneksi bermasalah).");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
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
      {error && <p className="text-xs text-danger mono mt-1">{error}</p>}
    </div>
  );
}

// ---------- Kenaikan kelas otomatis ----------

const BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function formatTanggal(iso) {
  if (!iso) return "Belum pernah";
  const d = new Date(iso);
  return d.toLocaleString("id-ID", {
    day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function PromotionPanel({ initialPromotion }) {
  const [promo, setPromo] = useState(initialPromotion);
  const [draftDay, setDraftDay] = useState(initialPromotion?.graduationDay ?? 1);
  const [draftMonth, setDraftMonth] = useState(initialPromotion?.graduationMonth ?? 7);
  const [draftYear, setDraftYear] = useState(initialPromotion?.graduationYear ?? new Date().getFullYear());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function save(patch) {
    setBusy(true);
    setError("");
    setInfo("");
    try {
      const res = await fetch("/api/kelas/promotion", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (res.ok) {
        const data = await res.json();
        setPromo(data);
        setDraftDay(data.graduationDay);
        setDraftMonth(data.graduationMonth);
        setDraftYear(data.graduationYear);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal menyimpan pengaturan.");
      }
    } catch (err) {
      setError("Gagal menyimpan (koneksi bermasalah).");
    } finally {
      setBusy(false);
    }
  }

  // Tanggal, bulan, dan tahun disimpan SEKALIGUS dalam satu request lewat
  // tombol ini — bukan tersebar di beberapa event (onBlur per kolom) yang
  // gampang gagal ke-trigger di HP dan bisa bikin salah satu nilai gagal
  // tersimpan tanpa ketahuan.
  async function saveDate() {
    await save({
      graduationDay: Number(draftDay) || 1,
      graduationMonth: Number(draftMonth) || 7,
      graduationYear: Number(draftYear) || new Date().getFullYear(),
    });
    setInfo("Tanggal kenaikan kelas tersimpan.");
  }

  async function runNow() {
    if (
      !confirm(
        "Ini akan langsung menjalankan kenaikan kelas sekarang juga: kelas " +
          "tertinggi jadi alumni, semua kelas lain naik satu tingkat, dan " +
          "kelas paling bawah dikosongkan. Yakin mau jalankan sekarang?"
      )
    )
      return;
    setBusy(true);
    setError("");
    setInfo("");
    try {
      const res = await fetch("/api/kelas/promotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "run" }),
      });
      if (res.ok) {
        const data = await res.json();
        setPromo(data);
        setInfo(
          data.ran
            ? "Selesai — kenaikan kelas sudah dijalankan. Muat ulang halaman untuk lihat perubahan kelas & murid."
            : "Tidak ada perubahan (mungkin belum ada kelas aktif)."
        );
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal menjalankan kenaikan kelas.");
      }
    } catch (err) {
      setError("Gagal menjalankan (koneksi bermasalah).");
    } finally {
      setBusy(false);
    }
  }

  async function undoLast() {
    if (
      !confirm(
        "Ini akan membalikkan kenaikan kelas TERAKHIR ke kondisi sebelumnya " +
          "(murid & arsip alumni yang baru dibuat dari kenaikan itu akan " +
          "hilang lagi). Kenaikan otomatis juga akan dimatikan sementara " +
          "supaya tidak langsung jalan lagi — aktifkan lagi setelah tanggal " +
          "sudah benar. Yakin mau undo?"
      )
    )
      return;
    setBusy(true);
    setError("");
    setInfo("");
    try {
      const res = await fetch("/api/kelas/promotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "undo" }),
      });
      if (res.ok) {
        const data = await res.json();
        setPromo(data);
        setDraftDay(data.graduationDay);
        setDraftMonth(data.graduationMonth);
        setDraftYear(data.graduationYear);
        setInfo(
          data.undone
            ? "Kenaikan terakhir sudah dibalikin. Kenaikan otomatis dimatikan sementara — cek & benerin tanggalnya dulu sebelum diaktifkan lagi. Muat ulang halaman untuk lihat perubahan."
            : "Tidak ada kenaikan yang bisa dibalikin."
        );
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal membalikkan kenaikan kelas.");
      }
    } catch (err) {
      setError("Gagal membalikkan (koneksi bermasalah).");
    } finally {
      setBusy(false);
    }
  }

  if (!promo) return null;

  return (
    <div className="border border-line border-l-4 border-l-accent bg-accent/[0.03] p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm font-medium text-ink">
          <input
            type="checkbox"
            className="accent-accent w-4 h-4"
            checked={!!promo.enabled}
            disabled={busy}
            onChange={(e) => save({ enabled: e.target.checked })}
          />
          Aktifkan kenaikan kelas otomatis
        </label>
        <span
          className={
            "text-[10px] uppercase mono px-2 py-0.5 border " +
            (promo.enabled
              ? "border-accent text-accent bg-accent/10"
              : "border-line text-ink/40")
          }
        >
          {promo.enabled ? "Aktif" : "Nonaktif"}
        </span>
      </div>

      <div className="flex flex-wrap items-end gap-3 text-xs mono">
        <label className="flex items-center gap-1.5">
          Tanggal:
          <input
            type="number"
            className="field py-1 w-16 focus:border-accent"
            min={1}
            max={31}
            value={draftDay}
            disabled={busy}
            onChange={(e) => setDraftDay(e.target.value)}
          />
        </label>
        <label className="flex items-center gap-1.5">
          Bulan kelulusan:
          <select
            className="field py-1 focus:border-accent"
            value={draftMonth}
            disabled={busy}
            onChange={(e) => setDraftMonth(e.target.value)}
          >
            {BULAN.map((b, i) => (
              <option key={b} value={i + 1}>
                {b}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-1.5">
          Tahun kelulusan kelas tertinggi saat ini:
          <input
            type="number"
            className="field py-1 w-24 focus:border-accent"
            value={draftYear}
            disabled={busy}
            onChange={(e) => setDraftYear(e.target.value)}
          />
        </label>
        <button
          type="button"
          onClick={saveDate}
          disabled={busy}
          className="btn text-[11px] uppercase mono px-3 py-1.5 disabled:opacity-60"
        >
          Simpan tanggal
        </button>
      </div>

      <p className="text-xs text-ink/60 leading-relaxed">
        Begitu tanggal{" "}
        <span className="text-cetakGold font-semibold">
          {promo.graduationDay || 1} {BULAN[(promo.graduationMonth || 7) - 1]}{" "}
          {promo.graduationYear}
        </span>{" "}
        tercapai, sistem otomatis akan menjadikan{" "}
        <span className="text-accent font-medium">
          {promo.nextGraduatingClassNames?.length
            ? promo.nextGraduatingClassNames.join(", ")
            : "kelas tertinggi"}
        </span>{" "}
        sebagai alumni, semua kelas lain naik satu tingkat, dan kelas paling
        bawah dikosongkan untuk murid baru. Tidak perlu klik apa pun — ini
        jalan sendiri saat ada yang membuka halaman ini setelah tanggal
        tersebut. Perubahan di atas baru berlaku setelah tombol "Simpan
        tanggal" di atas diklik.
      </p>
      <p className="text-xs text-ink/40 flex items-center gap-1.5">
        <span
          className={
            "inline-block w-1.5 h-1.5 rounded-full " +
            (promo.lastRunAt ? "bg-accent" : "bg-line")
          }
        />
        Terakhir kenaikan kelas jalan: {formatTanggal(promo.lastRunAt)}
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={runNow}
          className="btn-outline border border-cetakClay text-cetakClay text-[11px] uppercase mono px-2 py-1 disabled:opacity-50 hover:bg-cetakClay hover:text-paper transition-colors"
        >
          Jalankan sekarang (permanen, bukan cuma preview)
        </button>
        {promo.hasUndo && (
          <button
            type="button"
            disabled={busy}
            onClick={undoLast}
            className="border border-danger text-danger text-[11px] uppercase mono px-2 py-1 disabled:opacity-50 hover:bg-danger hover:text-paper transition-colors"
          >
            Undo kenaikan terakhir
          </button>
        )}
      </div>

      {error && <p className="text-xs text-danger mono">{error}</p>}
      {info && <p className="text-xs text-accent mono">{info}</p>}
    </div>
  );
}

// ---------- Root ----------

export default function KelasManager({ initialTeachers, initialClasses, initialPromotion }) {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [classes, setClasses] = useState(
    [...initialClasses].sort((a, b) => (a.order || 0) - (b.order || 0))
  );

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xs uppercase tracking-wide text-accent mono mb-3 font-semibold">
          Kenaikan kelas otomatis
        </h2>
        <PromotionPanel initialPromotion={initialPromotion} />
      </section>

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
