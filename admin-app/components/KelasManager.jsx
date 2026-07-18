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

function SkillsInput({ classId, student, onChanged }) {
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);

  async function save(nextSkills) {
    setBusy(true);
    try {
      const res = await fetch(`/api/kelas/classes/${classId}/students/${student.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: nextSkills }),
      });
      if (res.ok) onChanged(await res.json());
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

  function removeSkill(value) {
    save((student.skills || []).filter((s) => s !== value));
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-1 justify-center mb-1">
        {(student.skills || []).map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-1 text-[9px] mono uppercase bg-accent/10 text-accent border border-accent/30 px-1.5 py-0.5"
          >
            {s}
            <button
              type="button"
              onClick={() => removeSkill(s)}
              className="text-accent/60 hover:text-danger"
              aria-label={`Hapus skill ${s}`}
            >
              ×
            </button>
          </span>
        ))}
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
    </div>
  );
}

function StudentCard({ classId, student, onChanged, onDeleted }) {
  const [name, setName] = useState(student.name);
  const [hobby, setHobby] = useState(student.hobby || "");
  const [uploading, setUploading] = useState(false);
  const [savingName, setSavingName] = useState(false);
  const [savingHobby, setSavingHobby] = useState(false);
  const [error, setError] = useState("");

  async function saveName() {
    if (name === student.name) return;
    setSavingName(true);
    setError("");
    try {
      const res = await fetch(`/api/kelas/classes/${classId}/students/${student.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        onChanged(await res.json());
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal menyimpan nama.");
      }
    } catch (err) {
      setError("Gagal menyimpan (koneksi bermasalah).");
    } finally {
      setSavingName(false);
    }
  }

  async function saveHobby() {
    if (hobby === (student.hobby || "")) return;
    setSavingHobby(true);
    setError("");
    try {
      const res = await fetch(`/api/kelas/classes/${classId}/students/${student.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hobby }),
      });
      if (res.ok) {
        onChanged(await res.json());
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal menyimpan hobi.");
      }
    } catch (err) {
      setError("Gagal menyimpan (koneksi bermasalah).");
    } finally {
      setSavingHobby(false);
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
        onBlur={saveName}
      />
      <input
        className="field text-center text-[10px] py-1 focus:border-cetakGold"
        placeholder="Hobi (mis. coding)"
        value={hobby}
        onChange={(e) => setHobby(e.target.value)}
        onBlur={saveHobby}
      />
      <SkillsInput classId={classId} student={student} onChanged={onChanged} />
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
      {(savingName || savingHobby) && (
        <span className="text-[10px] text-ink/40 mono">menyimpan...</span>
      )}
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
        setPromo(await res.json());
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
      const res = await fetch("/api/kelas/promotion", { method: "POST" });
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

      <div className="flex flex-wrap items-center gap-3 text-xs mono">
        <label className="flex items-center gap-1.5">
          Tanggal:
          <input
            type="number"
            className="field py-1 w-16 focus:border-accent"
            min={1}
            max={31}
            value={promo.graduationDay ?? 1}
            disabled={busy}
            onChange={(e) => setPromo({ ...promo, graduationDay: Number(e.target.value) })}
            onBlur={() => save({ graduationDay: promo.graduationDay })}
          />
        </label>
        <label className="flex items-center gap-1.5">
          Bulan kelulusan:
          <select
            className="field py-1 focus:border-accent"
            value={promo.graduationMonth}
            disabled={busy}
            onChange={(e) => save({ graduationMonth: Number(e.target.value) })}
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
            value={promo.graduationYear}
            disabled={busy}
            onChange={(e) => setPromo({ ...promo, graduationYear: Number(e.target.value) })}
            onBlur={() => save({ graduationYear: promo.graduationYear })}
          />
        </label>
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
        tersebut.
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

      <button
        type="button"
        disabled={busy}
        onClick={runNow}
        className="btn-outline border border-cetakClay text-cetakClay text-[11px] uppercase mono px-2 py-1 disabled:opacity-50 hover:bg-cetakClay hover:text-paper transition-colors"
      >
        Jalankan sekarang (testing)
      </button>

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
