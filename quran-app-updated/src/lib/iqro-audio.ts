"use client";

// Iqro tidak punya sumber audio rekaman qari per potongan huruf seperti
// Al-Qur'an (yang pakai everyayah.com per ayat). Supaya tetap ada "suara"
// tanpa mengarang sumber file yang tidak ada, kita pakai Web Speech API
// (text-to-speech) bawaan browser untuk melafalkan teks Arab-nya langsung.
// Ini BUKAN rekaman qari sungguhan — cukup untuk membantu anak dengar
// pelafalan kasar sambil melihat tulisannya, bukan pengganti guru mengaji.

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function pickArabicVoice(): SpeechSynthesisVoice | null {
  if (!isSpeechSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang?.toLowerCase().startsWith("ar")) ??
    voices.find((v) => v.lang?.toLowerCase().includes("ar-")) ??
    null
  );
}

export function speakArabic(
  text: string,
  opts: { rate?: number; onEnd?: () => void; onStart?: () => void } = {}
): boolean {
  if (!isSpeechSupported()) return false;
  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ar-SA";
  utter.rate = opts.rate ?? 0.75;
  utter.pitch = 1;
  const voice = pickArabicVoice();
  if (voice) utter.voice = voice;

  if (opts.onStart) utter.onstart = opts.onStart;
  if (opts.onEnd) utter.onend = opts.onEnd;
  utter.onerror = () => {
    opts.onEnd?.();
  };

  window.speechSynthesis.speak(utter);
  return true;
}

export function stopSpeaking(): void {
  if (isSpeechSupported()) window.speechSynthesis.cancel();
}

export function speakSequence(texts: string[], opts: { rate?: number; onAllDone?: () => void; onItemStart?: (i: number) => void } = {}): void {
  if (!isSpeechSupported() || texts.length === 0) {
    opts.onAllDone?.();
    return;
  }
  window.speechSynthesis.cancel();

  let i = 0;
  const next = () => {
    if (i >= texts.length) {
      opts.onAllDone?.();
      return;
    }
    opts.onItemStart?.(i);
    const utter = new SpeechSynthesisUtterance(texts[i]);
    utter.lang = "ar-SA";
    utter.rate = opts.rate ?? 0.75;
    const voice = pickArabicVoice();
    if (voice) utter.voice = voice;
    utter.onend = () => {
      i += 1;
      next();
    };
    utter.onerror = () => {
      i += 1;
      next();
    };
    window.speechSynthesis.speak(utter);
  };
  next();
}
