"use client";

import { useState, useRef, useEffect } from "react";
import { upload } from "@vercel/blob/client";
import PhotoCropModal from "./PhotoCropModal";

async function uploadPhoto(file) {
  const blob = await upload(file.name, file, {
    access: "public",
    handleUploadUrl: "/api/photos/upload-url",
  });
  return blob.url;
}

// Sama persis logikanya dengan versi public-app: IPA dikelompokkan di ATAS,
// IPS di BAWAH, yang belum diisi jurusan di tengah — urutan asli (laki-laki
// atas / perempuan bawah) tetap kejaga di dalam tiap kelompok. Ini cuma
// ngatur urutan TAMPILAN grid di admin (data mentahnya tidak diubah).
const JURUSAN_RANK = { IPA: 0, IPS: 2 };
function sortByJurusan(students) {
  return [...students]
    .map((s, i) => ({ s, i }))
    .sort((a, b) => {
      const ra = JURUSAN_RANK[a.s.jurusan] ?? 1;
      const rb = JURUSAN_RANK[b.s.jurusan] ?? 1;
      return ra !== rb ? ra - rb : a.i - b.i;
    })
    .map(({ s }) => s);
}

// ---------- Angkatan (tahun masuk / tahun lulus) ----------
//
// Sengaja diduplikasi dari lib/kelas-store.js (bukan di-import) karena file
// itu juga mengekspor fungsi server (pakai @vercel/blob & crypto) yang tidak
// boleh ikut ke bundle client. Logikanya harus tetap sama persis dengan versi
// server & versi public-app: MA 3 tahun, jadi tahun lulus = tahun masuk + 3.
function getEntryYear(kelas) {
  if (Number.isInteger(kelas.entryYear)) return kelas.entryYear;
  if (Number.isInteger(kelas.graduatedYear)) return kelas.graduatedYear - 3;
  return null;
}

function computeAngkatanGroups(classes) {
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
  return ascending.reverse(); // paling baru duluan
}

function initials(name) {
  return (name || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || "?";
}

// Ambil pesan error paling informatif dari response gagal. Kalau body-nya
// JSON dengan field `error`, pakai itu. Kalau bukan JSON sama sekali (mis.
// halaman timeout/gateway error dari platform hosting), JANGAN diam-diam
// jatuh ke teks generik — tetap kasih tau status code & sedikit isi mentah
// biar ketauan ini masalah apa, bukan cuma "gagal" tanpa penjelasan.
async function describeErrorResponse(res, fallbackLabel) {
  let raw = "";
  try {
    raw = await res.text();
  } catch (err) {
    return `${fallbackLabel} (status ${res.status}, respons tidak terbaca)`;
  }
  try {
    const data = JSON.parse(raw);
    if (data?.error) return data.error;
  } catch (err) {
    // bukan JSON — lanjut ke fallback di bawah
  }
  const snippet = raw ? raw.replace(/\s+/g, " ").trim().slice(0, 120) : "";
  return `${fallbackLabel} (status ${res.status}${snippet ? `: ${snippet}` : ""})`;
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
  const [roles, setRoles] = useState((teacher.roles || []).join(", "));
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [cropFile, setCropFile] = useState(null);

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
          roles: roles.split(",").map((s) => s.trim()).filter(Boolean),
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
        <input
          className="field flex-[2] min-w-[180px]"
          value={roles}
          onChange={(e) => setRoles(e.target.value)}
          placeholder="Jabatan, dipisah koma (mis. Kepala Sekolah)"
        />
        <div className="flex items-center gap-2">
          <PhotoButton label="Foto" busy={uploading} onPicked={setCropFile} />
          {cropFile && (
            <PhotoCropModal
              file={cropFile}
              onCancel={() => setCropFile(null)}
              onConfirm={(croppedFile) => {
                setCropFile(null);
                handlePhoto(croppedFile);
              }}
            />
          )}
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
  const [roles, setRoles] = useState("");
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
          roles: roles.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        onAdded(await res.json());
        setName("");
        setSubjects("");
        setRoles("");
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
        <input
          className="field flex-[2] min-w-[180px]"
          value={roles}
          onChange={(e) => setRoles(e.target.value)}
          placeholder="Jabatan, dipisah koma (opsional)"
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
  // Sama seperti RolesInput: pakai state lokal sebagai sumber kebenaran +
  // antrian penyimpanan berurutan, supaya nambah beberapa skill/cuplikan
  // kode secara cepat gak saling menimpa (lihat catatan panjang di
  // RolesInput di atas untuk detail race condition-nya).
  const [skills, setSkills] = useState(student.skills || []);
  const [draft, setDraft] = useState("");
  const [showCodeForm, setShowCodeForm] = useState(false);
  const [codeLabel, setCodeLabel] = useState("");
  const [codeLang, setCodeLang] = useState("javascript");
  const [codeDraft, setCodeDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const queueRef = useRef(Promise.resolve());
  // Sama seperti fix di RolesInput: optimistic update sebelumnya gak pernah
  // dibatalkan kalau save-nya gagal, jadi chip skill kelihatan "berhasil"
  // walau server nolak — bikin serasa kesimpen padahal enggak. confirmedRef
  // nyimpen versi terakhir yang BENERAN dikonfirmasi server, dipakai buat
  // balikin state kalau ada request yang gagal.
  const confirmedRef = useRef(student.skills || []);

  useEffect(() => {
    if (!busy) {
      setSkills(student.skills || []);
      confirmedRef.current = student.skills || [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student.skills]);

  function queueSave(nextSkills) {
    setSkills(nextSkills);
    queueRef.current = queueRef.current.then(async () => {
      setBusy(true);
      try {
        const res = await fetch(`/api/kelas/classes/${classId}/students/${student.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skills: nextSkills }),
        });
        if (res.ok) {
          const updated = await res.json();
          confirmedRef.current = updated.skills || [];
          setError("");
          onChanged(updated);
        } else {
          const data = await res.json().catch(() => ({}));
          setSkills(confirmedRef.current);
          setError(
            data.error
              ? `Gagal menyimpan skill: ${data.error} (dibatalkan, coba lagi)`
              : "Gagal menyimpan skill — sesi admin mungkin habis, coba login ulang. Dibatalkan."
          );
        }
      } catch (err) {
        setSkills(confirmedRef.current);
        setError("Gagal menyimpan (koneksi bermasalah) — dibatalkan, coba lagi.");
      } finally {
        setBusy(false);
      }
    });
  }

  function addSkill(e) {
    e.preventDefault();
    const value = draft.trim();
    if (!value) return;
    if (skills.includes(value)) {
      setDraft("");
      return;
    }
    queueSave([...skills, value]);
    setDraft("");
  }

  function addCodeSkill(e) {
    e.preventDefault();
    setInfo("");
    const raw = codeDraft.trim();
    if (!raw) return;
    const multi = splitMultiLangBlob(raw);
    if (multi) {
      queueSave([...skills, ...multi]);
      setInfo(`Kepisah otomatis jadi ${multi.length} cuplikan (${multi.map((p) => p.label).join(", ")}).`);
    } else {
      queueSave([
        ...skills,
        { label: codeLabel.trim() || "Cuplikan kode", lang: codeLang, code: raw },
      ]);
    }
    setCodeLabel("");
    setCodeDraft("");
    setShowCodeForm(false);
  }

  function removeSkillAt(index) {
    queueSave(skills.filter((_, i) => i !== index));
  }

  function clearAllSkills() {
    if (!confirm(`Hapus SEMUA skill "${student.name}"? Ini mengosongkan semua tag & cuplikan kode yang ada sekarang.`)) return;
    queueSave([]);
  }

  return (
    <div className="w-full">
      {skills.length > 0 && (
        <div className="flex justify-center mb-1">
          <button
            type="button"
            onClick={clearAllSkills}
            disabled={busy}
            className="text-[9px] mono uppercase text-danger/70 hover:text-danger underline underline-offset-2"
          >
            Hapus semua skill ({skills.length})
          </button>
        </div>
      )}
      <div className="flex flex-wrap gap-1 justify-center mb-1">
        {skills.map((s, i) =>
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

      {error && (
        <p className="text-[11px] font-semibold text-danger mono mt-1.5 bg-danger/10 border border-danger/40 px-2 py-1">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

// ---------- Jabatan/Peran murid (Ketua Kelas, Wakil, Anggota OSIS, dst) ----------
//
// Diisi bebas teks (bukan dropdown tetap) karena satu murid bisa punya lebih
// dari satu peran sekaligus (mis. "Wakil Ketua Kelas" + "Anggota OSIS"), dan
// nama-nama jabatan tiap kelas/angkatan bisa beda-beda. Polanya sengaja
// dibikin sederhana (tag chip biasa), beda dari SkillsInput yang lebih rumit
// karena SkillsInput juga harus nanganin cuplikan kode.
function RolesInput({ classId, student, onChanged }) {
  // BUG LAMA: komponen ini sebelumnya baca `student.roles` langsung dari
  // props tiap kali nambah/hapus jabatan. Props itu cuma keupdate SETELAH
  // request PUT sebelumnya selesai & bubble balik ke parent — jadi kalau
  // admin nambah 2 jabatan dengan cepat (mis. ketik "Ketua Kelas" lalu Enter,
  // langsung disusul "Wakil OSIS" + Enter sebelum request pertama beres),
  // request kedua masih mikir daftar jabatannya "kosong" (belum tau ada yang
  // pertama), jadi yang kesimpen ke server cuma jabatan terakhir — punya
  // duluan ketiban alias hilang. Efeknya kelihatan kayak "jabatan gak
  // kesimpen" padahal sebenarnya konflik penulisan.
  //
  // FIX: simpen jabatan di state LOKAL (`roles`) sebagai sumber kebenaran
  // untuk UI + perhitungan tambah/hapus berikutnya (bukan props), dan semua
  // penyimpanan ke server diantrikan satu-satu lewat `queueRef` (promise
  // chain) supaya gak ada dua request yang jalan bersamaan/tumpang tindih.
  const [roles, setRoles] = useState(student.roles || []);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const queueRef = useRef(Promise.resolve());
  // BUG BARU yang ketemu belakangan (setelah fix race condition di atas):
  // optimistic update di queueSave() langsung nampilin chip di layar SEBELUM
  // request ke server kelar — itu jelas emang tujuannya (biar berasa cepat).
  // Masalahnya, kalau request itu ternyata GAGAL (401 sesi admin abis, 500
  // dari server, dst), state optimistic-nya TIDAK PERNAH dibatalkan — cuma
  // muncul pesan error super kecil (9px, gampang keluput) di bawah, sementara
  // chip jabatan tetap kelihatan "berhasil" ketambah di layar. Makanya admin
  // ngerasa udah kesimpen, padahal cuma optimistic UI doang — begitu di-
  // refresh (ambil ulang dari server), balik ke kondisi asli sebelum
  // ditambah. Ini kemungkinan besar penyebab sebenarnya laporan "jabatan
  // kesimpen tapi ilang lagi abis refresh", BUKAN race condition yang tadi.
  // FIX: simpen `confirmedRef` = jabatan terakhir yang BENERAN dikonfirmasi
  // server. Kalau save gagal, balikin `roles` ke situ (bukan diam-diam
  // dibiarkan salah) + tampilin error yang jelas kelihatan, bukan teks kecil.
  const confirmedRef = useRef(student.roles || []);

  // Kalau data murid berubah dari luar (misalnya abis dipindah kelas, atau
  // polling ambil versi terbaru dari server), sinkron ulang — tapi JANGAN
  // pas masih ada penyimpanan jabatan yang lagi berjalan, biar gak ketiban
  // versi lama saat proses tambah/hapus di komponen ini masih berlangsung.
  useEffect(() => {
    if (!busy) {
      setRoles(student.roles || []);
      confirmedRef.current = student.roles || [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student.roles]);

  function queueSave(nextRoles) {
    setRoles(nextRoles); // langsung kelihatan di UI (optimistic)
    queueRef.current = queueRef.current.then(async () => {
      setBusy(true);
      try {
        const res = await fetch(`/api/kelas/classes/${classId}/students/${student.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roles: nextRoles }),
        });
        if (res.ok) {
          const updated = await res.json();
          confirmedRef.current = updated.roles || [];
          setError("");
          onChanged(updated);
        } else {
          const data = await res.json().catch(() => ({}));
          // Batalkan optimistic update — jangan biarkan UI bohong bilang
          // "kesimpen" padahal server nolak.
          setRoles(confirmedRef.current);
          setError(
            data.error
              ? `Gagal menyimpan jabatan: ${data.error} (perubahan dibatalkan, coba lagi)`
              : "Gagal menyimpan jabatan — sesi admin mungkin habis, coba login ulang. Perubahan dibatalkan."
          );
        }
      } catch (err) {
        setRoles(confirmedRef.current);
        setError("Gagal menyimpan (koneksi bermasalah) — perubahan dibatalkan, coba lagi.");
      } finally {
        setBusy(false);
      }
    });
  }

  function addRole(e) {
    e.preventDefault();
    const value = draft.trim();
    if (!value) return;
    if (roles.includes(value)) {
      setDraft("");
      return;
    }
    queueSave([...roles, value]);
    setDraft("");
  }

  function removeRoleAt(index) {
    queueSave(roles.filter((_, i) => i !== index));
  }

  return (
    <div className="w-full">
      {roles.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center mb-1">
          {roles.map((r, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-[9px] mono uppercase bg-cetakGold/10 text-cetakGold border border-cetakGold/40 px-1.5 py-0.5"
            >
              {r}
              <button
                type="button"
                onClick={() => removeRoleAt(i)}
                className="text-cetakGold/70 hover:text-danger"
                aria-label={`Hapus jabatan ${r}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      <form onSubmit={addRole} className="flex gap-1">
        <input
          className="field text-center text-[10px] py-1"
          placeholder="Jabatan (mis. Ketua Kelas)"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
      </form>
      {error && (
        <p className="text-[11px] font-semibold text-danger mono mt-1.5 bg-danger/10 border border-danger/40 px-2 py-1">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

function StudentCard({ classId, student, otherClasses, onChanged, onDeleted, onMoved }) {
  const [name, setName] = useState(student.name);
  const [gender, setGender] = useState(student.gender || null);
  const [jurusan, setJurusan] = useState(student.jurusan || null);
  const [hobby, setHobby] = useState(student.hobby || "");
  const [favoriteSubject, setFavoriteSubject] = useState(student.favoriteSubject || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [error, setError] = useState("");
  const [moveTarget, setMoveTarget] = useState("");
  const [moving, setMoving] = useState(false);
  const [cropFile, setCropFile] = useState(null);

  async function save() {
    setSaving(true);
    setError("");
    setJustSaved(false);
    try {
      const res = await fetch(`/api/kelas/classes/${classId}/students/${student.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, hobby, favoriteSubject, gender, jurusan }),
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

  async function moveToClass() {
    if (!moveTarget) return;
    const target = (otherClasses || []).find((c) => c.id === moveTarget);
    if (!target) return;
    if (!confirm(`Pindahkan "${student.name}" ke "${target.name}"?`)) return;
    setMoving(true);
    setError("");
    try {
      const res = await fetch(
        `/api/kelas/classes/${classId}/students/${student.id}/move`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ toClassId: moveTarget }),
        }
      );
      if (res.ok) {
        onMoved(moveTarget);
        setMoveTarget("");
      } else {
        setError(await describeErrorResponse(res, "Gagal memindahkan murid"));
      }
    } catch (err) {
      setError("Gagal memindahkan (koneksi bermasalah).");
    } finally {
      setMoving(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2 border border-line p-3 text-center">
      <Avatar name={student.name} photoUrl={student.photoUrl} size={72} />
      <input
        className="field text-center text-xs"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex items-center gap-1">
        {[
          { value: "L", label: "Laki-laki" },
          { value: "P", label: "Perempuan" },
        ].map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setGender(opt.value)}
            className={`text-[9px] mono uppercase px-1.5 py-1 border ${
              gender === opt.value
                ? "bg-accent text-paper border-accent"
                : "border-line text-ink/60"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1">
        {[
          { value: null, label: "Umum" },
          { value: "IPA", label: "IPA" },
          { value: "IPS", label: "IPS" },
        ].map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => setJurusan(opt.value)}
            className={`text-[9px] mono uppercase px-1.5 py-1 border ${
              (jurusan || null) === opt.value
                ? "bg-accent text-paper border-accent"
                : "border-line text-ink/60"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <input
        className="field text-center text-[10px] py-1 focus:border-cetakGold"
        placeholder="Hobi (mis. coding)"
        value={hobby}
        onChange={(e) => setHobby(e.target.value)}
      />
      <input
        className="field text-center text-[10px] py-1 focus:border-cetakGold"
        placeholder="Mapel favorit (mis. Matematika)"
        value={favoriteSubject}
        onChange={(e) => setFavoriteSubject(e.target.value)}
      />
      <RolesInput classId={classId} student={student} onChanged={onChanged} />
      <SkillsInput classId={classId} student={student} onChanged={onChanged} />
      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="w-full text-[11px] uppercase mono px-2 py-1.5 border border-accent btn transition-colors disabled:opacity-60"
      >
        {saving ? "Menyimpan..." : justSaved ? "Tersimpan ✓" : "Simpan"}
      </button>

      {otherClasses && otherClasses.length > 0 && (
        <div className="w-full flex gap-1">
          <select
            className="field text-[9px] py-1 flex-1"
            value={moveTarget}
            disabled={moving}
            onChange={(e) => setMoveTarget(e.target.value)}
          >
            <option value="">Pindah ke kelas...</option>
            {otherClasses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
                {c.isAlumni ? " (alumni)" : ""}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={moveToClass}
            disabled={moving || !moveTarget}
            className="text-[9px] mono uppercase border border-line px-2 disabled:opacity-40"
          >
            {moving ? "..." : "Pindah"}
          </button>
        </div>
      )}

      <div className="flex items-center gap-1.5">
        <PhotoButton
          label={student.photoUrl ? "Ganti foto" : "Upload foto"}
          busy={uploading}
          onPicked={setCropFile}
        />
        {cropFile && (
          <PhotoCropModal
            file={cropFile}
            onCancel={() => setCropFile(null)}
            onConfirm={(croppedFile) => {
              setCropFile(null);
              handlePhoto(croppedFile);
            }}
          />
        )}
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

  async function submit(gender) {
    if (!name.trim()) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/kelas/classes/${classId}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, gender }),
      });
      if (res.ok) {
        onAdded(await res.json(), gender);
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
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-wrap items-center gap-2"
      >
        <input
          className="field text-xs flex-1 min-w-[140px]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama murid baru"
        />
        <button
          type="button"
          disabled={busy || !name.trim()}
          onClick={() => submit("L")}
          title="Ditambah di paling atas daftar"
          className="btn text-[11px] uppercase mono px-2.5 py-1.5 shrink-0 disabled:opacity-50"
        >
          + Laki-laki
        </button>
        <button
          type="button"
          disabled={busy || !name.trim()}
          onClick={() => submit("P")}
          title="Ditambah di paling bawah daftar"
          className="btn text-[11px] uppercase mono px-2.5 py-1.5 shrink-0 disabled:opacity-50"
        >
          + Perempuan
        </button>
      </form>
      {error && <p className="text-xs text-danger mono mt-1">{error}</p>}
    </div>
  );
}

// ---------- Kelas ----------

function ClassBlock({
  kelas,
  teachers,
  allClasses,
  angkatanNumber,
  onChanged,
  onDeleted,
  onStudentMoved,
  onAllStudentsMoved,
}) {
  const [name, setName] = useState(kelas.name);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [moveAllTarget, setMoveAllTarget] = useState("");
  const [movingAll, setMovingAll] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [coverCropFile, setCoverCropFile] = useState(null);

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

  async function moveAllToClass() {
    if (!moveAllTarget) return;
    const target = (allClasses || []).find((c) => c.id === moveAllTarget);
    if (!target) return;
    if (
      !confirm(
        `Pindahkan SEMUA ${kelas.students.length} murid dari "${kelas.name}" ke "${target.name}"?`
      )
    )
      return;
    setMovingAll(true);
    setError("");
    try {
      const res = await fetch(`/api/kelas/classes/${kelas.id}/move-all-students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toClassId: moveAllTarget }),
      });
      if (res.ok) {
        onAllStudentsMoved(kelas.id, moveAllTarget, kelas.students);
        setMoveAllTarget("");
      } else {
        setError(await describeErrorResponse(res, "Gagal memindahkan semua murid"));
      }
    } catch (err) {
      setError("Gagal memindahkan (koneksi bermasalah).");
    } finally {
      setMovingAll(false);
    }
  }

  const coverFit = kelas.groupPhotoFit === "contain" ? "contain" : "cover";

  async function handleCoverPhoto(file) {
    setUploadingCover(true);
    setError("");
    try {
      const groupPhotoUrl = await uploadPhoto(file);
      await patch({ groupPhotoUrl });
    } catch (err) {
      setError("Gagal upload foto bersama (koneksi bermasalah).");
    } finally {
      setUploadingCover(false);
    }
  }

  // Kalau mode "utuh" (contain), gak usah dipotong persegi dulu — upload
  // fotonya apa adanya, biar semua orang di foto bersama tetap kelihatan.
  function pickCoverPhoto(file) {
    if (coverFit === "contain") {
      handleCoverPhoto(file);
    } else {
      setCoverCropFile(file);
    }
  }

  function removeCoverPhoto() {
    if (!confirm("Hapus foto bersama (cover folder) kelas ini?")) return;
    patch({ groupPhotoUrl: null });
  }

  function setWali(teacherId) {
    // Dropdown single-select: pilih 1 guru langsung GANTI wali kelas yang
    // lama (bukan nambah), dan pilih opsi kosong ("— Belum ada wali —")
    // untuk mengosongkan wali kelas ini.
    patch({ waliKelasIds: teacherId ? [teacherId] : [] });
  }

  // Kelas yang murid-muridnya sudah campur IPA & IPS (mis. kelas 11/XI
  // sebelum benar-benar dipecah jadi 2 folder terpisah) butuh 2 wali
  // sekaligus. Default checkbox ini otomatis ON kalau kelas SUDAH pernah
  // diisi salah satu wali jurusan sebelumnya, supaya tidak "reset" ke mode
  // 1-wali cuma karena reload halaman.
  const [splitWali, setSplitWali] = useState(
    Boolean(kelas.waliIpaId || kelas.waliIpsId)
  );

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
  function addStudentInPlace(student, gender) {
    onChanged({
      ...kelas,
      students:
        gender === "L" ? [student, ...kelas.students] : [...kelas.students, student],
    });
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
          {kelas.isAlumni && angkatanNumber != null && (
            <span className="text-[10px] uppercase mono px-1.5 py-0.5 border border-cetakGold text-cetakGold">
              Angkatan {angkatanNumber}
            </span>
          )}
          <button
            type="button"
            disabled={busy}
            onClick={removeClass}
            className="btn-danger text-[11px] uppercase mono px-2 py-1 border"
          >
            Hapus kelas
          </button>
        </div>

        {kelas.isAlumni && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs mono text-ink/60">
            <label className="flex items-center gap-1.5">
              Tahun masuk:
              <input
                type="number"
                placeholder="mis. 2022"
                defaultValue={kelas.entryYear ?? (kelas.graduatedYear ? kelas.graduatedYear - 3 : "")}
                onBlur={(e) => {
                  const val = e.target.value.trim();
                  patch({ entryYear: val === "" ? null : Number(val) });
                }}
                className="field py-1 w-20 focus:border-accent"
              />
            </label>
            <span className="text-ink/40">
              (MA 3 tahun, jadi lulus otomatis dihitung{" "}
              {(kelas.entryYear ?? (kelas.graduatedYear ? kelas.graduatedYear - 3 : null)) != null
                ? (kelas.entryYear ?? kelas.graduatedYear - 3) + 3
                : "—"}
              )
            </span>
          </div>
        )}

        {kelas.students.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs mono text-ink/50">
              Pindah SEMUA {kelas.students.length} murid ke:
            </span>
            <select
              className="field text-xs py-1"
              value={moveAllTarget}
              disabled={movingAll}
              onChange={(e) => setMoveAllTarget(e.target.value)}
            >
              <option value="">Pilih kelas tujuan...</option>
              {(allClasses || [])
                .filter((c) => c.id !== kelas.id)
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                    {c.isAlumni ? " (alumni)" : ""}
                  </option>
                ))}
            </select>
            <button
              type="button"
              onClick={moveAllToClass}
              disabled={movingAll || !moveAllTarget}
              className="text-[11px] mono uppercase border border-line px-2 py-1 disabled:opacity-40"
            >
              {movingAll ? "Memindahkan..." : "Pindah semua"}
            </button>
          </div>
        )}

        <div>
          <p className="text-xs uppercase tracking-wide text-ink/50 mono mb-1.5">
            Foto bersama (cover folder di halaman publik)
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div
              className={`w-16 h-16 shrink-0 overflow-hidden bg-line/30 flex items-center justify-center ${
                coverFit === "contain" ? "bg-line/10" : ""
              }`}
            >
              {kelas.groupPhotoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={kelas.groupPhotoUrl}
                  alt={kelas.name}
                  className={`w-full h-full ${
                    coverFit === "contain" ? "object-contain" : "object-cover"
                  }`}
                />
              ) : (
                <span className="text-[10px] text-ink/40 mono text-center px-1">
                  Belum ada
                </span>
              )}
            </div>
            <PhotoButton
              label={kelas.groupPhotoUrl ? "Ganti foto" : "Unggah foto"}
              busy={uploadingCover}
              onPicked={pickCoverPhoto}
            />
            {coverCropFile && (
              <PhotoCropModal
                file={coverCropFile}
                onCancel={() => setCoverCropFile(null)}
                onConfirm={(croppedFile) => {
                  setCoverCropFile(null);
                  handleCoverPhoto(croppedFile);
                }}
              />
            )}
            {kelas.groupPhotoUrl && (
              <button
                type="button"
                onClick={removeCoverPhoto}
                className="btn-danger text-[11px] uppercase mono px-2 py-1 border"
              >
                Hapus
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-[11px] mono text-ink/50">Mode:</span>
            <button
              type="button"
              onClick={() => patch({ groupPhotoFit: "cover" })}
              className={`text-[11px] mono px-2 py-1 border ${
                coverFit === "cover"
                  ? "bg-accent text-paper border-accent"
                  : "border-line text-ink/60"
              }`}
            >
              Dipotong (persegi)
            </button>
            <button
              type="button"
              onClick={() => patch({ groupPhotoFit: "contain" })}
              className={`text-[11px] mono px-2 py-1 border ${
                coverFit === "contain"
                  ? "bg-accent text-paper border-accent"
                  : "border-line text-ink/60"
              }`}
            >
              Utuh (tanpa potong)
            </button>
          </div>
          <p className="text-[11px] text-ink/40 mt-1">
            {coverFit === "cover"
              ? "Foto dipotong pas kotak — bagian pinggir bisa terpotong, tapi rapi & selalu penuh."
              : "Foto ditampilkan utuh, tidak dipotong — semua orang di foto tetap kelihatan, tapi bisa ada sedikit ruang kosong di kotaknya."}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
            <p className="text-xs uppercase tracking-wide text-ink/50 mono">
              Wali kelas untuk <span className="text-ink font-semibold">{kelas.name || "(kelas belum diberi nama)"}</span>
            </p>
            <label className="flex items-center gap-1.5 text-[11px] mono text-ink/60">
              <input
                type="checkbox"
                checked={splitWali}
                onChange={(e) => {
                  setSplitWali(e.target.checked);
                  if (!e.target.checked) {
                    // Balik ke mode 1 wali: kosongkan wali IPA/IPS supaya
                    // tidak ada data "nyantol" yang bingung dibaca nanti.
                    patch({ waliIpaId: null, waliIpsId: null });
                  }
                }}
              />
              Kelas ini campur IPA &amp; IPS
            </label>
          </div>

          {teachers.length === 0 ? (
            <span className="text-xs text-ink/40">Belum ada data guru.</span>
          ) : splitWali ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <p className="text-[10px] uppercase mono text-ink/40 mb-1">Wali Kelas (IPA)</p>
                <select
                  className="field text-sm w-full"
                  value={kelas.waliIpaId || ""}
                  onChange={(e) => patch({ waliIpaId: e.target.value || null })}
                >
                  <option value="">— Belum ada wali —</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-[10px] uppercase mono text-ink/40 mb-1">Wali Kelas (IPS)</p>
                <select
                  className="field text-sm w-full"
                  value={kelas.waliIpsId || ""}
                  onChange={(e) => patch({ waliIpsId: e.target.value || null })}
                >
                  <option value="">— Belum ada wali —</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <select
              className="field text-sm"
              value={(kelas.waliKelasIds || [])[0] || ""}
              onChange={(e) => setWali(e.target.value || null)}
            >
              <option value="">— Belum ada wali —</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          )}
        </div>
        {error && <p className="text-xs text-danger mono">{error}</p>}
      </div>

      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-ink/50 mono mb-2">
          Murid ({kelas.students.length})
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
          {sortByJurusan(kelas.students).map((s) => (
            <StudentCard
              key={s.id}
              classId={kelas.id}
              student={s}
              otherClasses={(allClasses || []).filter((c) => c.id !== kelas.id)}
              onChanged={updateStudentInPlace}
              onDeleted={removeStudentInPlace}
              onMoved={(toClassId) => onStudentMoved(kelas.id, toClassId, s)}
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

// Berapa sering polling ke server buat ngambil data terbaru (ms). Cukup
// pendek biar kerasa "real-time" tapi gak spam server tiap detik.
const POLL_INTERVAL_MS = 4000;

// Cover foto buat "folder guru" di halaman publik — satu foto buat semua
// guru (bukan per-guru), sama polanya kayak groupPhotoUrl/groupPhotoFit di
// tiap kelas, cuma disimpan terpisah (data.guruFolder) lewat endpoint sendiri.
function GuruFolderPanel({ initialGuruFolder }) {
  const [folder, setFolder] = useState(
    initialGuruFolder || { photoUrl: null, photoFit: "cover" }
  );
  const [uploading, setUploading] = useState(false);
  const [cropFile, setCropFile] = useState(null);
  const [error, setError] = useState("");

  const fit = folder.photoFit === "contain" ? "contain" : "cover";

  async function save(patch) {
    setError("");
    try {
      const res = await fetch("/api/kelas/guru-folder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (res.ok) {
        setFolder(await res.json());
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal menyimpan foto folder guru.");
      }
    } catch (err) {
      setError("Gagal menyimpan (koneksi bermasalah).");
    }
  }

  async function handlePhoto(file) {
    setUploading(true);
    setError("");
    try {
      const photoUrl = await uploadPhoto(file);
      await save({ photoUrl });
    } catch (err) {
      setError("Gagal upload foto (koneksi bermasalah).");
    } finally {
      setUploading(false);
    }
  }

  function pickPhoto(file) {
    if (fit === "contain") {
      handlePhoto(file);
    } else {
      setCropFile(file);
    }
  }

  function removePhoto() {
    if (!confirm("Hapus foto folder guru?")) return;
    save({ photoUrl: null });
  }

  return (
    <div className="border border-line p-4">
      <p className="text-xs uppercase tracking-wide text-ink/50 mono mb-1.5">
        Foto folder guru (cover halaman publik /kelas/guru)
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <div
          className={`w-16 h-16 shrink-0 overflow-hidden bg-line/30 flex items-center justify-center ${
            fit === "contain" ? "bg-line/10" : ""
          }`}
        >
          {folder.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={folder.photoUrl}
              alt="Folder guru"
              className={`w-full h-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
            />
          ) : (
            <span className="text-[10px] text-ink/40 mono text-center px-1">Belum ada</span>
          )}
        </div>
        <PhotoButton
          label={folder.photoUrl ? "Ganti foto" : "Unggah foto"}
          busy={uploading}
          onPicked={pickPhoto}
        />
        {cropFile && (
          <PhotoCropModal
            file={cropFile}
            onCancel={() => setCropFile(null)}
            onConfirm={(croppedFile) => {
              setCropFile(null);
              handlePhoto(croppedFile);
            }}
          />
        )}
        {folder.photoUrl && (
          <button
            type="button"
            onClick={removePhoto}
            className="btn-danger text-[11px] uppercase mono px-2 py-1 border"
          >
            Hapus
          </button>
        )}
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        <span className="text-[11px] mono text-ink/50">Mode:</span>
        <button
          type="button"
          onClick={() => save({ photoFit: "cover" })}
          className={`text-[11px] mono px-2 py-1 border ${
            fit === "cover" ? "bg-accent text-paper border-accent" : "border-line text-ink/60"
          }`}
        >
          Dipotong (persegi)
        </button>
        <button
          type="button"
          onClick={() => save({ photoFit: "contain" })}
          className={`text-[11px] mono px-2 py-1 border ${
            fit === "contain" ? "bg-accent text-paper border-accent" : "border-line text-ink/60"
          }`}
        >
          Utuh (tanpa potong)
        </button>
      </div>
      {error && <p className="text-xs text-danger mono mt-2">{error}</p>}
    </div>
  );
}

export default function KelasManager({
  initialTeachers,
  initialClasses,
  initialPromotion,
  initialGuruFolder,
}) {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [classes, setClasses] = useState(
    [...initialClasses].sort((a, b) => (a.order || 0) - (b.order || 0))
  );
  // Filter tampilan kelas aktif di dashboard ini — sama polanya kayak
  // filter tahun di dashboard kenangan publik. Berguna kalau kelasnya udah
  // banyak: abis upload foto/simpen sesuatu & halaman lompat ke atas,
  // gak perlu scroll ngelewatin semua kelas buat balik ke kelas yang
  // lagi dikerjain — tinggal pilih tab kelasnya lagi.
  const [classFilter, setClassFilter] = useState("all");
  // Dipakai buat jeda polling sesaat pas ada aksi lokal (pindah/tambah/hapus)
  // lagi jalan, supaya hasil optimistic-update di layar gak "ketimpa" balik
  // sama data server yang belum sempat konsisten (lihat catatan di
  // kelas-store.js soal delay propagasi cache blob). Default dinaikkan dari
  // 2.5 detik jadi 6 detik — 2.5 detik kadang lebih pendek dari waktu
  // propagasi Blob storage-nya sendiri, jadi kadang keburu poll ulang &
  // "menimpa balik" perubahan yang baru aja disimpan (kelihatan kayak
  // gagal kesimpen padahal sebenarnya sudah tersimpan di server).
  const pausedUntilRef = useRef(0);
  const inFlightRef = useRef(false);

  function pausePolling(ms = 6000) {
    pausedUntilRef.current = Date.now() + ms;
  }

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      if (inFlightRef.current) return;
      if (document.visibilityState !== "visible") return;
      if (Date.now() < pausedUntilRef.current) return;
      inFlightRef.current = true;
      try {
        const res = await fetch("/api/kelas/state", { cache: "no-store" });
        if (res.ok && !cancelled) {
          const data = await res.json();
          const sortedClasses = [...(data.classes || [])].sort(
            (a, b) => (a.order || 0) - (b.order || 0)
          );
          // Cuma trigger re-render kalau isinya beneran beda, biar gak
          // ganggu state lokal (mis. teks lagi diketik di kolom lain) tanpa
          // alasan tiap 4 detik.
          setTeachers((prev) =>
            JSON.stringify(prev) === JSON.stringify(data.teachers) ? prev : data.teachers
          );
          setClasses((prev) =>
            JSON.stringify(prev) === JSON.stringify(sortedClasses) ? prev : sortedClasses
          );
        }
      } catch (err) {
        // Diem-diem gagal aja, biar gak ganggu — nanti dicoba lagi di
        // interval berikutnya. Aksi manual (klik tombol) tetap kasih error
        // sendiri lewat jalurnya masing-masing.
      } finally {
        inFlightRef.current = false;
      }
    }

    const id = setInterval(poll, POLL_INTERVAL_MS);
    document.addEventListener("visibilitychange", poll);
    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", poll);
    };
  }, []);

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
        <div className="mb-4">
          <GuruFolderPanel initialGuruFolder={initialGuruFolder} />
        </div>
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
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs uppercase tracking-wide text-ink/50 mono">
            Kelas & murid aktif ({classes.filter((c) => !c.isAlumni).length})
          </h2>
          <a
            href="/alumni"
            className="text-[11px] uppercase mono text-accent underline shrink-0"
          >
            Kelola alumni &rarr;
          </a>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          <button
            type="button"
            onClick={() => setClassFilter("all")}
            className={`text-[11px] uppercase mono px-2.5 py-1 border transition-colors ${
              classFilter === "all"
                ? "bg-accent text-paper border-accent"
                : "border-line text-ink/60 hover:border-accent/50"
            }`}
          >
            Semua
          </button>
          {classes
            .filter((c) => !c.isAlumni)
            .map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setClassFilter(c.id)}
                className={`text-[11px] uppercase mono px-2.5 py-1 border transition-colors ${
                  classFilter === c.id
                    ? "bg-accent text-paper border-accent"
                    : "border-line text-ink/60 hover:border-accent/50"
                }`}
              >
                {c.name}
              </button>
            ))}
        </div>
        <div className="space-y-6">
          {classes
            .filter((c) => !c.isAlumni)
            .filter((c) => classFilter === "all" || c.id === classFilter)
            .map((c) => (
            <ClassBlock
              key={c.id}
              kelas={c}
              teachers={teachers}
              allClasses={classes}
              onChanged={(updated) => {
                pausePolling();
                setClasses((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
              }}
              onDeleted={(id) => {
                pausePolling();
                setClasses((prev) => prev.filter((x) => x.id !== id));
              }}
              onStudentMoved={(fromClassId, toClassId, student) => {
                pausePolling();
                setClasses((prev) =>
                  prev.map((x) => {
                    if (x.id === fromClassId) {
                      return { ...x, students: x.students.filter((s) => s.id !== student.id) };
                    }
                    if (x.id === toClassId) {
                      return { ...x, students: [...x.students, student] };
                    }
                    return x;
                  })
                );
              }}
              onAllStudentsMoved={(fromClassId, toClassId, movedStudents) => {
                pausePolling();
                setClasses((prev) =>
                  prev.map((x) => {
                    if (x.id === fromClassId) {
                      return { ...x, students: [] };
                    }
                    if (x.id === toClassId) {
                      return { ...x, students: [...x.students, ...movedStudents] };
                    }
                    return x;
                  })
                );
              }}
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

// ---------- Dashboard Alumni (terpisah dari dashboard Kelas) ----------
//
// Fokusnya beda dari KelasManager: di sini isinya CUMA kelas yang sudah jadi
// alumni, dikelompokkan per angkatan (tahun masuk → tahun lulus), diurutkan
// dari angkatan paling baru. Tambah kelas baru & kelola kelas aktif tetap di
// dashboard Kelas — dashboard ini murni buat mengelola arsip alumni.
export function AlumniManager({ initialTeachers, initialClasses }) {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [classes, setClasses] = useState(initialClasses);
  const pausedUntilRef = useRef(0);
  const inFlightRef = useRef(false);

  function pausePolling(ms = 6000) {
    pausedUntilRef.current = Date.now() + ms;
  }

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      if (inFlightRef.current) return;
      if (document.visibilityState !== "visible") return;
      if (Date.now() < pausedUntilRef.current) return;
      inFlightRef.current = true;
      try {
        const res = await fetch("/api/kelas/state", { cache: "no-store" });
        if (res.ok && !cancelled) {
          const data = await res.json();
          setTeachers((prev) =>
            JSON.stringify(prev) === JSON.stringify(data.teachers) ? prev : data.teachers
          );
          setClasses((prev) =>
            JSON.stringify(prev) === JSON.stringify(data.classes) ? prev : data.classes
          );
        }
      } catch (err) {
        // Diam-diam gagal aja, coba lagi di interval berikutnya.
      } finally {
        inFlightRef.current = false;
      }
    }

    const id = setInterval(poll, POLL_INTERVAL_MS);
    document.addEventListener("visibilitychange", poll);
    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", poll);
    };
  }, []);

  const alumni = classes.filter((c) => c.isAlumni);
  const groups = computeAngkatanGroups(alumni);
  const groupedIds = new Set(groups.flatMap((g) => g.classes.map((c) => c.id)));
  // Alumni lama yang belum ada tahun masuknya (data lama tanpa entryYear
  // ataupun graduatedYear) — tetap ditampilkan biar gak "hilang", tinggal
  // diisi tahun masuknya lewat kartu kelasnya masing-masing.
  const ungrouped = alumni.filter((c) => !groupedIds.has(c.id));

  function handleChanged(updated) {
    pausePolling();
    setClasses((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
  }
  function handleDeleted(id) {
    pausePolling();
    setClasses((prev) => prev.filter((x) => x.id !== id));
  }
  function handleStudentMoved(fromClassId, toClassId, student) {
    pausePolling();
    setClasses((prev) =>
      prev.map((x) => {
        if (x.id === fromClassId) {
          return { ...x, students: x.students.filter((s) => s.id !== student.id) };
        }
        if (x.id === toClassId) {
          return { ...x, students: [...x.students, student] };
        }
        return x;
      })
    );
  }
  function handleAllStudentsMoved(fromClassId, toClassId, movedStudents) {
    pausePolling();
    setClasses((prev) =>
      prev.map((x) => {
        if (x.id === fromClassId) return { ...x, students: [] };
        if (x.id === toClassId) return { ...x, students: [...x.students, ...movedStudents] };
        return x;
      })
    );
  }

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xs uppercase tracking-wide text-ink/50 mono mb-3">
          Angkatan alumni ({alumni.length} kelas)
        </h2>

        {alumni.length === 0 && (
          <p className="text-sm text-ink/40">
            Belum ada kelas alumni. Kelas jadi alumni otomatis lewat kenaikan
            kelas di dashboard Kelas, atau bisa ditandai manual di sana.
          </p>
        )}

        <div className="space-y-10">
          {groups.map((group) => (
            <div key={group.entryYear}>
              <div className="flex flex-wrap items-baseline gap-2 mb-3">
                <span className="text-[11px] uppercase mono px-2 py-0.5 border border-cetakGold text-cetakGold font-semibold">
                  Angkatan {group.angkatanNumber}
                </span>
                <span className="text-xs mono text-ink/50">
                  Masuk {group.entryYear} &middot; Lulus {group.graduationYear}
                </span>
              </div>
              <div className="space-y-6">
                {group.classes.map((c) => (
                  <ClassBlock
                    key={c.id}
                    kelas={c}
                    teachers={teachers}
                    allClasses={classes}
                    angkatanNumber={group.angkatanNumber}
                    onChanged={handleChanged}
                    onDeleted={handleDeleted}
                    onStudentMoved={handleStudentMoved}
                    onAllStudentsMoved={handleAllStudentsMoved}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {ungrouped.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xs uppercase tracking-wide text-ink/50 mono mb-3">
              Alumni tanpa tahun masuk ({ungrouped.length})
            </h3>
            <p className="text-xs text-ink/40 mb-3">
              Isi &quot;Tahun masuk&quot; di kartu kelas di bawah biar otomatis
              masuk ke pengelompokan angkatan di atas.
            </p>
            <div className="space-y-6">
              {ungrouped.map((c) => (
                <ClassBlock
                  key={c.id}
                  kelas={c}
                  teachers={teachers}
                  allClasses={classes}
                  onChanged={handleChanged}
                  onDeleted={handleDeleted}
                  onStudentMoved={handleStudentMoved}
                  onAllStudentsMoved={handleAllStudentsMoved}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
