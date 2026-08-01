"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "mushaf:install-dismissed";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadyDismissed = (() => {
      try {
        return localStorage.getItem(DISMISS_KEY) === "1";
      } catch {
        return false;
      }
    })();

    const alreadyInstalled =
      typeof window !== "undefined" &&
      window.matchMedia?.("(display-mode: standalone)").matches;

    if (alreadyDismissed || alreadyInstalled) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setVisible(false);
  };

  const handleDismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // abaikan
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-80 z-50">
      <div className="flex items-start gap-3 rounded-lg border border-[var(--parchment-line)] bg-[var(--parchment)] shadow-lg p-4">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--teal)] text-[var(--text-on-dark)] shrink-0">
          <Download size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[var(--ink)]">Pasang Mushaf di HP</p>
          <p className="text-xs text-[var(--ink-soft)] mt-0.5">
            Biar bisa dibuka langsung dari layar utama, tanpa buka browser — dan tetap bisa
            dibaca walau tanpa internet.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={handleInstall}
              className="text-xs px-3 py-1.5 rounded-full bg-[var(--teal)] text-[var(--text-on-dark)] hover:bg-[var(--teal-deep)] transition-colors"
            >
              Pasang
            </button>
            <button
              onClick={handleDismiss}
              className="text-xs px-3 py-1.5 rounded-full text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
            >
              Nanti saja
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          aria-label="Tutup"
          className="text-[var(--ink-soft)] hover:text-[var(--ink)] shrink-0"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
