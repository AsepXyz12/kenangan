import type { ReactNode } from "react";

type Pose =
  | "berdiri"
  | "takbir"
  | "bersedekap"
  | "ruku"
  | "itidal"
  | "sujud"
  | "duduk-iftirasy"
  | "duduk-tawarruk"
  | "salam";

const STROKE = "var(--teal-deep)";
const ACCENT = "var(--gold)";

/**
 * Ilustrasi garis sederhana (bukan foto, bukan diambil dari sumber lain) yang
 * menggambarkan siluet posisi tubuh pada tiap gerakan sholat. Dibuat sebagai
 * diagram skematis netral, mengikuti konvensi buku panduan sholat cetak.
 */
export default function GerakanIllustration({ pose, size = 96 }: { pose: Pose; size?: number }) {
  const common = {
    fill: "none",
    stroke: STROKE,
    strokeWidth: 4.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const Ground = () => (
    <line x1="14" y1="104" x2="106" y2="104" stroke={ACCENT} strokeWidth="2.5" opacity={0.55} />
  );

  const Head = ({ cx = 60, cy = 22 }: { cx?: number; cy?: number }) => (
    <circle cx={cx} cy={cy} r="9" {...common} />
  );

  let body: ReactNode = null;

  switch (pose) {
    case "berdiri":
      body = (
        <>
          <Head />
          <line x1="60" y1="31" x2="60" y2="72" {...common} />
          <line x1="60" y1="42" x2="46" y2="70" {...common} />
          <line x1="60" y1="42" x2="74" y2="70" {...common} />
          <line x1="60" y1="72" x2="49" y2="103" {...common} />
          <line x1="60" y1="72" x2="71" y2="103" {...common} />
        </>
      );
      break;
    case "takbir":
      body = (
        <>
          <Head />
          <line x1="60" y1="31" x2="60" y2="72" {...common} />
          <line x1="60" y1="40" x2="40" y2="20" {...common} />
          <line x1="60" y1="40" x2="80" y2="20" {...common} />
          <line x1="60" y1="72" x2="49" y2="103" {...common} />
          <line x1="60" y1="72" x2="71" y2="103" {...common} />
        </>
      );
      break;
    case "bersedekap":
      body = (
        <>
          <Head />
          <line x1="60" y1="31" x2="60" y2="72" {...common} />
          <path d="M46,50 Q60,62 74,50" {...common} />
          <line x1="60" y1="72" x2="49" y2="103" {...common} />
          <line x1="60" y1="72" x2="71" y2="103" {...common} />
        </>
      );
      break;
    case "ruku":
      body = (
        <>
          <Head cx={30} cy={54} />
          <line x1="38" y1="58" x2="88" y2="58" {...common} />
          <line x1="88" y1="58" x2="88" y2="103" {...common} />
          <line x1="60" y1="58" x2="60" y2="103" {...common} />
          <line x1="55" y1="58" x2="42" y2="80" {...common} />
        </>
      );
      break;
    case "itidal":
      body = (
        <>
          <Head />
          <line x1="60" y1="31" x2="60" y2="72" {...common} />
          <line x1="60" y1="45" x2="44" y2="58" {...common} />
          <line x1="60" y1="45" x2="76" y2="58" {...common} />
          <line x1="60" y1="72" x2="49" y2="103" {...common} />
          <line x1="60" y1="72" x2="71" y2="103" {...common} />
        </>
      );
      break;
    case "sujud":
      body = (
        <>
          <Head cx={28} cy={96} />
          <path d="M37,90 Q60,50 88,90" {...common} />
          <line x1="88" y1="90" x2="100" y2="104" {...common} />
          <line x1="60" y1="70" x2="46" y2="90" {...common} />
        </>
      );
      break;
    case "duduk-iftirasy":
      body = (
        <>
          <Head />
          <line x1="60" y1="31" x2="60" y2="66" {...common} />
          <line x1="60" y1="40" x2="46" y2="62" {...common} />
          <line x1="60" y1="40" x2="74" y2="62" {...common} />
          <path d="M60,66 Q78,66 82,90 L48,90 Q42,74 60,66 Z" {...common} />
        </>
      );
      break;
    case "duduk-tawarruk":
      body = (
        <>
          <Head />
          <line x1="60" y1="31" x2="60" y2="66" {...common} />
          <line x1="60" y1="40" x2="46" y2="62" {...common} />
          <line x1="60" y1="40" x2="76" y2="58" {...common} />
          <path d="M60,66 Q84,68 88,92 L42,92 Q40,72 60,66 Z" {...common} />
        </>
      );
      break;
    case "salam":
      body = (
        <>
          <Head cx={72} cy={31} />
          <line x1="60" y1="40" x2="60" y2="66" {...common} />
          <line x1="60" y1="40" x2="46" y2="62" {...common} />
          <line x1="60" y1="40" x2="72" y2="58" {...common} />
          <path d="M60,66 Q78,66 82,90 L48,90 Q42,74 60,66 Z" {...common} />
        </>
      );
      break;
  }

  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true">
      <Ground />
      {body}
    </svg>
  );
}
