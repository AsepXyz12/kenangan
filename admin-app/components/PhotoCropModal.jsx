"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const VIEWPORT = 280; // ukuran kotak crop yang keliatan di layar (px)
const OUTPUT = 800; // resolusi hasil crop yang diupload (px, persegi)

// Modal crop foto persegi, manual (drag buat geser posisi, slider buat
// zoom). Dipakai sebelum foto di-upload supaya bagian yang penting (muka)
// bisa diposisikan sendiri oleh admin, gak nebak-nebak pake object-position
// otomatis kayak sebelumnya.
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

  // Skala dasar supaya gambar selalu nutupin seluruh kotak crop (cover-fit)
  // di zoom = 1. Zoom > 1 tinggal ngali skala dasar ini.
  const baseScale = useMemo(() => {
    if (!imgEl) return 1;
    return VIEWPORT / Math.min(imgEl.naturalWidth, imgEl.naturalHeight);
  }, [imgEl]);

  const scale = baseScale * zoom;
  const dispW = imgEl ? imgEl.naturalWidth * scale : 0;
  const dispH = imgEl ? imgEl.naturalHeight * scale : 0;

  function clampAxis(pos, dispSize) {
    if (dispSize <= VIEWPORT) {
      // Fotonya lebih kecil dari kotak crop (lagi di-zoom out) — taruh di
      // tengah aja, gak perlu (dan gak bisa) di-drag.
      return (VIEWPORT - dispSize) / 2;
    }
    const min = VIEWPORT - dispSize;
    return Math.min(0, Math.max(min, pos));
  }

  function clampOffset(next, w = dispW, h = dispH) {
    return {
      x: clampAxis(next.x, w),
      y: clampAxis(next.y, h),
    };
  }

  // Pas pertama kali gambar muncul, taruh di tengah
  useEffect(() => {
    if (!imgEl) return;
    setOffset(
      clampOffset({
        x: (VIEWPORT - imgEl.naturalWidth * baseScale) / 2,
        y: (VIEWPORT - imgEl.naturalHeight * baseScale) / 2,
      })
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
    const centerX = VIEWPORT / 2 - offset.x;
    const centerY = VIEWPORT / 2 - offset.y;
    const ratio = nextScale / scale;
    const nextOffset = clampOffset(
      {
        x: VIEWPORT / 2 - centerX * ratio,
        y: VIEWPORT / 2 - centerY * ratio,
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
      const canvas = document.createElement("canvas");
      canvas.width = OUTPUT;
      canvas.height = OUTPUT;
      const ctx = canvas.getContext("2d");
      const ratio = OUTPUT / VIEWPORT;
      // Zoom minimal sekarang dikunci di 1x (lihat slider di bawah), jadi
      // foto selalu nutupin penuh kotak crop — gak akan pernah nyisain
      // ruang kosong. Fill warna ini cuma jaga-jaga (safety net) kalau ada
      // kondisi aneh, harusnya gak pernah kepake lagi.
      ctx.fillStyle = "#EFE7D2";
      ctx.fillRect(0, 0, OUTPUT, OUTPUT);
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
          style={{ width: VIEWPORT, height: VIEWPORT }}
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
          {/* Panduan bulat tipis di tengah, biar gampang nyamain posisi muka */}
          <div className="absolute inset-4 border border-dashed border-paper/70 rounded-full pointer-events-none" />
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
          Geser foto buat pas-in posisi, atur zoom kalau perlu. Bagian di
          dalam lingkaran putus-putus itu yang bakal kepake.
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
