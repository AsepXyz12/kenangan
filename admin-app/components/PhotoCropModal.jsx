"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const MAX_BOX = 320; // sisi terpanjang kotak crop di layar (px)
const OUTPUT_MAX = 900; // sisi terpanjang hasil crop yang diupload (px)

// Modal crop foto, manual (drag buat geser posisi, slider buat zoom).
// PENTING: kotak crop-nya sekarang ngikutin rasio ASLI foto (bukan
// dipaksa persegi), jadi di zoom = 1 foto selalu pas nutupin seluruh
// kotak tanpa sisa ruang kosong DAN tanpa motong bagian foto sama
// sekali — apapun bentuk/ukuran fotonya. Zoom > 1 baru dipakai kalau
// admin sengaja mau crop lebih rapat (misalnya biar muka lebih besar).
export default function PhotoCropModal({ file, onCancel, onConfirm }) {
  const [imgEl, setImgEl] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const dragState = useRef(null);

  // Load file jadi <img> buat ambil natural size-nya
  useEffect(() => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      setImgEl(img);
      setZoom(1);
    };
    img.onerror = () => setError("Gagal membaca gambar ini.");
    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Kotak crop di layar: rasio-nya SAMA PERSIS kayak rasio asli foto
  // (bukan persegi tetap), dibatasi cuma biar gak lebih besar dari
  // MAX_BOX di sisi terpanjangnya. Dengan ini, "cover-fit" di zoom = 1
  // otomatis == "seluruh foto keliatan", jadi gak akan pernah ada
  // ruang kosong DAN gak akan pernah kepotong secara paksa.
  const { boxW, boxH } = useMemo(() => {
    if (!imgEl) return { boxW: MAX_BOX, boxH: MAX_BOX };
    const fit = MAX_BOX / Math.max(imgEl.naturalWidth, imgEl.naturalHeight);
    return {
      boxW: imgEl.naturalWidth * fit,
      boxH: imgEl.naturalHeight * fit,
    };
  }, [imgEl]);

  // Skala dasar: di zoom = 1, foto pas nutupin seluruh kotak (yang
  // rasionya udah disamain sama foto di atas), jadi otomatis "cover"
  // = "utuh", dua-duanya sekaligus.
  const baseScale = boxW && imgEl ? boxW / imgEl.naturalWidth : 1;

  const scale = baseScale * zoom;
  const dispW = imgEl ? imgEl.naturalWidth * scale : 0;
  const dispH = imgEl ? imgEl.naturalHeight * scale : 0;

  function clampAxis(pos, dispSize, boxSize) {
    if (dispSize <= boxSize) {
      // Toleransi pembulatan floating-point — taruh di tengah aja.
      return (boxSize - dispSize) / 2;
    }
    const min = boxSize - dispSize;
    return Math.min(0, Math.max(min, pos));
  }

  function clampOffset(next, w = dispW, h = dispH) {
    return {
      x: clampAxis(next.x, w, boxW),
      y: clampAxis(next.y, h, boxH),
    };
  }

  // Pas pertama kali gambar muncul, taruh di tengah (di zoom 1 ini
  // otomatis (0,0) karena dispW/H == boxW/H, tapi tetap dihitung biar
  // aman kalau ada sisa pembulatan)
  useEffect(() => {
    if (!imgEl) return;
    setOffset(
      clampOffset(
        {
          x: (boxW - imgEl.naturalWidth * baseScale) / 2,
          y: (boxH - imgEl.naturalHeight * baseScale) / 2,
        },
        imgEl.naturalWidth * baseScale,
        imgEl.naturalHeight * baseScale
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgEl]);

  function handlePointerDown(e) {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragState.current = { startX: e.clientX, startY: e.clientY, offset };
  }

  function handlePointerMove(e) {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    setOffset(
      clampOffset({
        x: dragState.current.offset.x + dx,
        y: dragState.current.offset.y + dy,
      })
    );
  }

  function handlePointerUp() {
    dragState.current = null;
  }

  function handleZoomChange(e) {
    const nextZoom = Number(e.target.value);
    const nextScale = baseScale * nextZoom;
    const nextW = imgEl.naturalWidth * nextScale;
    const nextH = imgEl.naturalHeight * nextScale;
    // Jaga titik tengah kotak crop tetap nunjuk ke bagian gambar yang sama
    // pas di-zoom, biar gak "loncat" posisinya.
    const centerX = boxW / 2 - offset.x;
    const centerY = boxH / 2 - offset.y;
    const ratio = nextScale / scale;
    const nextOffset = clampOffset(
      {
        x: boxW / 2 - centerX * ratio,
        y: boxH / 2 - centerY * ratio,
      },
      nextW,
      nextH
    );
    setZoom(nextZoom);
    setOffset(nextOffset);
  }

  async function confirm() {
    if (!imgEl) return;
    setSaving(true);
    setError("");
    try {
      // Resolusi output ngikutin rasio ASLI foto juga (bukan dipaksa
      // persegi), dibatasi di sisi terpanjang OUTPUT_MAX px.
      const outFit =
        OUTPUT_MAX / Math.max(imgEl.naturalWidth, imgEl.naturalHeight);
      const outW = Math.round(imgEl.naturalWidth * outFit);
      const outH = Math.round(imgEl.naturalHeight * outFit);

      const canvas = document.createElement("canvas");
      canvas.width = outW;
      canvas.height = outH;
      const ctx = canvas.getContext("2d");
      const ratio = outW / boxW;
      // Foto selalu nutupin penuh kotak crop dari zoom = 1 ke atas
      // (lihat komentar baseScale di atas), jadi gak akan pernah nyisa
      // ruang kosong — fill warna ini cuma jaga-jaga kalau ada kondisi
      // aneh, harusnya gak pernah kepake.
      ctx.fillStyle = "#EFE7D2";
      ctx.fillRect(0, 0, outW, outH);
      ctx.drawImage(
        imgEl,
        offset.x * ratio,
        offset.y * ratio,
        dispW * ratio,
        dispH * ratio
      );
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", 0.9)
      );
      if (!blob) throw new Error("gagal membuat hasil crop");
      const croppedFile = new File(
        [blob],
        file.name.replace(/\.[^.]+$/, "") + ".jpg",
        { type: "image/jpeg" }
      );
      onConfirm(croppedFile);
    } catch (err) {
      setError("Gagal memproses foto. Coba lagi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink/70 flex items-center justify-center p-4">
      <div className="bg-paper border border-line p-4 w-full max-w-sm">
        <p className="mono text-[11px] uppercase tracking-wide text-ink/70 mb-3">
          Atur posisi foto
        </p>

        <div
          className="relative mx-auto overflow-hidden bg-line/30 touch-none select-none cursor-move"
          style={{ width: boxW, height: boxH }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {imgEl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imgEl.src}
              alt="Pratinjau crop"
              draggable={false}
              className="absolute pointer-events-none max-w-none"
              style={{
                width: dispW,
                height: dispH,
                left: offset.x,
                top: offset.y,
              }}
            />
          )}
        </div>

        <div className="flex items-center gap-2 mt-3">
          <span className="mono text-[10px] text-ink/50">Zoom</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={handleZoomChange}
            disabled={!imgEl}
            className="flex-1"
          />
        </div>

        <p className="mono text-[9px] text-ink/40 mt-1">
          Default-nya foto udah keliatan utuh (gak kepotong). Geser buat
          reposisi, atau naikin zoom kalau mau crop lebih rapat (misalnya
          biar muka lebih besar).
        </p>

        {error && <p className="text-danger text-[11px] mt-2">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="btn-outline border border-line text-[11px] uppercase mono px-3 py-1.5"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={confirm}
            disabled={!imgEl || saving}
            className="btn text-[11px] uppercase mono px-3 py-1.5 disabled:opacity-60"
          >
            {saving ? "Menyimpan..." : "Pakai foto ini"}
          </button>
        </div>
      </div>
    </div>
  );
}
