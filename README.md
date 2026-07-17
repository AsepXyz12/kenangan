# Galeri Kenangan MA — versi 2 URL terpisah (public + admin)

Sekarang repo ini punya 2 project Next.js yang berdiri sendiri-sendiri:

```
ma-gallery/
  public-app/   → yang dilihat semua orang (galeri + komentar), TANPA login admin sama sekali
  admin-app/    → panel kelola foto, lengkap (upload, edit, hapus foto, hapus komentar)
```

Keduanya membaca & menulis data yang sama (`data/photos.json` + file foto) di satu
**Vercel Blob store yang sama**. Jadi begitu admin upload foto di `admin-app`,
foto itu langsung muncul di `public-app` — tanpa perlu sinkronisasi manual.

## Kenapa dipisah begini

- Biar link admin dan link publik **beda domain/URL** (2 project Vercel terpisah),
  bukan `/admin` di domain yang sama seperti sebelumnya.
- `public-app` sama sekali tidak punya kode login/upload/hapus — jadi tidak akan
  pernah ada tombol "login admin" nongol di sisi publik, karena kodenya memang
  tidak ada di sana.
- `admin-app` sengaja dibuat polos (tanpa font dekoratif, tanpa nuansa scrapbook)
  supaya cepat dan fokus ke fungsi, tapi fiturnya lengkap: upload, edit judul/
  cerita/tanggal/uploader, hapus foto (otomatis hapus file blob-nya juga), dan
  moderasi komentar (lihat + hapus per komentar).

## Cara deploy ke Vercel (2 project)

### 1. Push repo ini ke GitHub
Push folder `ma-gallery/` (berisi `public-app/` dan `admin-app/`) ke repo GitHub kamu,
menggantikan struktur lama.

### 2. Buat project Vercel untuk admin dulu
1. Vercel → **Add New → Project** → pilih repo ini.
2. Di step konfigurasi, set **Root Directory** ke `admin-app`.
3. Beri nama project misalnya `kenangan-admin` (nanti URL-nya jadi
   `kenangan-admin.vercel.app`, atau custom domain sendiri).
4. Sebelum deploy pertama, tambahkan environment variable:
   - `ADMIN_PASSWORD` → password admin kamu.
5. Deploy dulu satu kali (boleh gagal soal Blob, tidak apa — kita sambungkan
   Blob store setelah ini).
6. Buka project ini di dashboard → **Storage → Create → Blob** → connect ke
   project `admin-app`. Vercel akan otomatis mengisi `BLOB_READ_WRITE_TOKEN`.
7. Redeploy project admin.

### 3. Buat project Vercel untuk public
1. **Add New → Project** → pilih repo yang sama lagi.
2. Set **Root Directory** ke `public-app`.
3. Beri nama project misalnya `kenangan` (ini yang dibagikan ke semua orang).
4. Tambahkan environment variable `BLOB_READ_WRITE_TOKEN` — **salin persis**
   nilai token dari project admin (dashboard admin → Settings → Environment
   Variables → copy value `BLOB_READ_WRITE_TOKEN`). Ini WAJIB sama, karena
   itulah cara kedua project mengakses Blob store yang sama.
5. Public **tidak butuh** `ADMIN_PASSWORD`.
6. Deploy.

### 4. Selesai
- Bagikan URL project `public-app` ke semua orang → mereka lihat galeri &
  bisa komentar, tidak akan pernah lihat apa pun soal admin.
- Simpan URL project `admin-app` untuk diri sendiri → di sinilah kamu upload,
  edit, hapus foto, dan moderasi komentar. Halaman ini juga sudah diset
  `noindex` + `robots.txt` disallow, jadi tidak akan muncul di hasil pencarian
  Google, tapi tetap **jaga URL & password itu supaya tidak disebar**, karena
  siapa pun yang tahu URL + password bisa masuk.

## Soal error yang kemarin muncul

Karena saya tidak bisa melihat log build/runtime dari deployment Vercel kamu
langsung, saya tidak bisa memastikan 100% akar masalah versi lama. Tapi dua
penyebab paling umum untuk kasus "admin dan publik jadi satu terus error":

- Environment variable (`ADMIN_PASSWORD` / `BLOB_READ_WRITE_TOKEN`) belum
  diset di project Vercel-nya, sehingga saat halaman mencoba baca data Blob,
  request-nya gagal dan Next.js menampilkan halaman error.
- `/admin` sebagai path di domain yang sama membuat satu build harus
  membawa kode admin + publik sekaligus; kalau salah satu bagian error saat
  build (misalnya karena token belum ada saat build-time), seluruh domain ikut
  terganggu.

Struktur baru ini menghilangkan masalah kedua sepenuhnya karena admin & publik
sekarang benar-benar dua build, dua project, dua domain yang independen. Kalau
nanti masih ada error spesifik saat deploy, kirim saya pesan error yang muncul
di Vercel (tab **Deployments → klik deployment yang gagal → Build Logs** atau
**Runtime Logs**) dan saya bisa bantu diagnosis lebih pasti.
