"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Bell, Send, X } from "lucide-react";

type ChatMessage = { from: "visitor" | "owner"; text: string; ts: number };

const SESSION_KEY = "mushaf_chat_session";
const POLL_INTERVAL_MS = 6000;

// Ambil (atau buat sekali lalu simpan) ID sesi chat unik untuk pengunjung
// ini. Disimpan di localStorage supaya kalau pengunjung nutup tab lalu buka
// lagi nanti, riwayat chat & status "sudah dibalas belum"-nya tetap nyambung
// ke percakapan yang sama -- bukan mulai sesi baru tiap kali buka halaman.
function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export default function ChatPemilikWidget() {
  const [terbuka, setTerbuka] = useState(false);
  const [pesan, setPesan] = useState<ChatMessage[]>([]);
  const [belumDibaca, setBelumDibaca] = useState(false);
  const [draft, setDraft] = useState("");
  const [mengirim, setMengirim] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionIdRef = useRef<string>("");
  const listEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sessionIdRef.current = getSessionId();
  }, []);

  // Polling berkala: cek ada balasan baru atau tidak. Kalau panel lagi
  // TERTUTUP, jangan tandai "sudah dibaca" -- biarkan flag unread menyala
  // supaya lonceng tetap kelihatan sampai pengunjung benar-benar membuka
  // panelnya.
  useEffect(() => {
    let batal = false;

    async function poll() {
      const sessionId = sessionIdRef.current;
      if (!sessionId) return;
      try {
        const res = await fetch(
          `/api/chat/poll?session=${encodeURIComponent(sessionId)}${
            terbuka ? "&markRead=1" : ""
          }`
        );
        if (!res.ok || batal) return;
        const data = await res.json();
        if (batal) return;
        setPesan(data.messages ?? []);
        setBelumDibaca(Boolean(data.unread));
      } catch {
        // Diam-diam gagal -- ini cuma polling background, jangan ganggu UI
        // dengan pesan error tiap 6 detik kalau koneksi lagi jelek.
      }
    }

    poll();
    const interval = setInterval(poll, POLL_INTERVAL_MS);
    return () => {
      batal = true;
      clearInterval(interval);
    };
  }, [terbuka]);

  useEffect(() => {
    if (terbuka) listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [pesan, terbuka]);

  async function kirimPesan() {
    const text = draft.trim();
    if (!text || mengirim) return;
    setMengirim(true);
    setError(null);

    // Optimistic update: langsung tampilkan pesan sendiri di UI, nggak
    // nunggu roundtrip server -- terasa instan.
    const optimis: ChatMessage = { from: "visitor", text, ts: Date.now() };
    setPesan((prev) => [...prev, optimis]);
    setDraft("");

    try {
      const res = await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionIdRef.current, text }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Gagal mengirim pesan, coba lagi.");
      }
    } catch {
      setError("Gagal mengirim pesan, periksa koneksi kamu.");
    } finally {
      setMengirim(false);
    }
  }

  return (
    <>
      {/* Tombol pembuka + lonceng notifikasi */}
      <button
        onClick={() => setTerbuka((v) => !v)}
        className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--gold)]/50 text-[var(--ink)] hover:bg-[var(--gold)]/10 transition-colors text-sm font-medium"
      >
        {belumDibaca ? (
          <Bell size={16} className="text-[var(--gold)] animate-pulse" />
        ) : (
          <MessageCircle size={16} />
        )}
        Chat Pemilik
        {belumDibaca && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-[var(--parchment)]" />
        )}
      </button>

      {terbuka && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-0 sm:px-4">
          <div className="w-full sm:max-w-sm bg-[var(--parchment)] rounded-t-2xl sm:rounded-2xl border border-[var(--parchment-line)] shadow-xl flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--parchment-line)]">
              <div>
                <p className="font-display text-sm text-[var(--heading)]">
                  Chat dengan Pemilik
                </p>
                <p className="text-[11px] text-[var(--ink-soft)]">
                  Biasanya dibalas dalam beberapa jam
                </p>
              </div>
              <button
                onClick={() => setTerbuka(false)}
                className="p-1.5 rounded-full hover:bg-[var(--parchment-deep)] text-[var(--ink-soft)]"
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 min-h-[220px]">
              {pesan.length === 0 && (
                <p className="text-xs text-[var(--ink-soft)] text-center mt-6">
                  Belum ada percakapan. Tulis pesanmu di bawah — bisa soal
                  bug, saran, atau apa saja.
                </p>
              )}
              {pesan.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.from === "visitor" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                      m.from === "visitor"
                        ? "bg-[var(--gold)] text-[var(--parchment)] rounded-br-sm"
                        : "bg-[var(--parchment-deep)] text-[var(--ink)] rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={listEndRef} />
            </div>

            {error && (
              <p className="px-4 text-xs text-red-600 pb-1">{error}</p>
            )}

            <div className="flex items-center gap-2 px-3 py-3 border-t border-[var(--parchment-line)]">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") kirimPesan();
                }}
                placeholder="Tulis pesan..."
                maxLength={1000}
                className="flex-1 rounded-full border border-[var(--parchment-line)] bg-white/60 px-4 py-2 text-sm outline-none focus:border-[var(--gold)]"
              />
              <button
                onClick={kirimPesan}
                disabled={mengirim || !draft.trim()}
                className="btn-gold w-9 h-9 rounded-full flex items-center justify-center disabled:opacity-50 shrink-0"
                aria-label="Kirim"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
