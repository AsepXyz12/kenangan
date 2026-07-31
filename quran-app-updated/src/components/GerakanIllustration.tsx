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

const OUTLINE = "var(--teal-deep)";
const ROBE = "var(--teal-deep)";
const SKIN = "#dcb98f";
const TRIM = "var(--gold)";

/**
 * Ilustrasi sosok berbadan (bukan foto, bukan diambil dari sumber lain, bukan
 * stik-garis) yang menggambarkan postur tubuh pada tiap gerakan sholat,
 * dilihat dari samping agar sudut punggung/lutut akurat. Digambar sebagai
 * figur bergamis netral (tanpa wajah spesifik/identitas), sopan menutup
 * aurat, dengan proporsi mengikuti postur baku pada panduan sholat cetak.
 */
export default function GerakanIllustration({ pose, size = 96 }: { pose: Pose; size?: number }) {
  const limb = {
    fill: "none",
    stroke: SKIN,
    strokeWidth: 10,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const robeFill = { fill: ROBE, stroke: OUTLINE, strokeWidth: 2, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  const headFill = { fill: SKIN, stroke: OUTLINE, strokeWidth: 2 };

  const Ground = () => (
    <line x1="8" y1="130" x2="132" y2="130" stroke={TRIM} strokeWidth="2.5" opacity={0.55} />
  );

  const Head = ({ cx = 70, cy = 20, r = 12 }: { cx?: number; cy?: number; r?: number }) => (
    <circle cx={cx} cy={cy} r={r} {...headFill} />
  );

  let body: ReactNode = null;

  switch (pose) {
    case "berdiri":
      body = (
        <>
          <path d="M52,36 Q70,30 88,36 L96,126 Q70,134 44,126 Z" {...robeFill} />
          <line x1="54" y1="46" x2="48" y2="88" {...limb} />
          <line x1="86" y1="46" x2="92" y2="88" {...limb} />
          <Head />
        </>
      );
      break;
    case "takbir":
      body = (
        <>
          <path d="M52,36 Q70,30 88,36 L96,126 Q70,134 44,126 Z" {...robeFill} />
          <line x1="56" y1="42" x2="40" y2="14" {...limb} />
          <line x1="84" y1="42" x2="100" y2="14" {...limb} />
          <Head />
        </>
      );
      break;
    case "bersedekap":
      body = (
        <>
          <path d="M52,36 Q70,30 88,36 L96,126 Q70,134 44,126 Z" {...robeFill} />
          <line x1="55" y1="44" x2="52" y2="58" stroke={ROBE} strokeWidth={12} strokeLinecap="round" />
          <line x1="85" y1="44" x2="88" y2="58" stroke={ROBE} strokeWidth={12} strokeLinecap="round" />
          <path d="M50,58 Q70,70 90,58" {...limb} />
          <Head />
        </>
      );
      break;
    case "ruku":
      body = (
        <>
          <line x1="98" y1="88" x2="98" y2="126" {...limb} strokeWidth={12} />
          <line x1="112" y1="88" x2="110" y2="126" {...limb} strokeWidth={12} />
          <path
            d="M98,86 L38,80 Q30,79 30,86 L34,92 Q60,98 100,98 Q108,98 108,90 Z"
            {...robeFill}
          />
          <line x1="55" y1="86" x2="72" y2="100" {...limb} strokeWidth={9} />
          <Head cx={24} cy={80} r={11} />
        </>
      );
      break;
    case "itidal":
      body = (
        <>
          <path d="M52,36 Q70,30 88,36 L96,126 Q70,134 44,126 Z" {...robeFill} />
          <line x1="54" y1="46" x2="49" y2="80" {...limb} />
          <line x1="86" y1="46" x2="91" y2="80" {...limb} />
          <Head />
        </>
      );
      break;
    case "sujud":
      body = (
        <>
          <line x1="96" y1="108" x2="96" y2="128" {...limb} strokeWidth={11} />
          <path d="M96,110 Q114,116 122,128" {...limb} strokeWidth={9} />
          <path
            d="M40,124 Q34,108 44,100 Q66,80 96,90 Q104,94 100,108 Q90,116 60,112 Q44,110 40,124 Z"
            {...robeFill}
          />
          <line x1="52" y1="100" x2="42" y2="120" {...limb} strokeWidth={9} />
          <line x1="70" y1="90" x2="66" y2="118" {...limb} strokeWidth={9} />
          <Head cx={26} cy={122} r={10} />
        </>
      );
      break;
    case "duduk-iftirasy":
      body = (
        <>
          <path
            d="M52,36 Q70,30 88,36 L92,74 Q108,80 108,104 L38,104 Q34,82 48,74 Z"
            {...robeFill}
          />
          <line x1="55" y1="44" x2="52" y2="70" {...limb} />
          <line x1="85" y1="44" x2="88" y2="70" {...limb} />
          <path d="M40,104 Q60,112 100,104" {...limb} strokeWidth={8} />
          <Head />
        </>
      );
      break;
    case "duduk-tawarruk":
      body = (
        <>
          <path
            d="M54,36 Q70,30 86,36 L94,72 Q112,78 112,100 L34,100 Q28,80 46,72 Z"
            {...robeFill}
          />
          <line x1="57" y1="44" x2="53" y2="68" {...limb} />
          <line x1="83" y1="44" x2="86" y2="68" {...limb} />
          <path d="M36,100 Q65,110 110,100" {...limb} strokeWidth={8} />
          <Head />
        </>
      );
      break;
    case "salam":
      body = (
        <>
          <path
            d="M52,36 Q70,30 88,36 L92,74 Q108,80 108,104 L38,104 Q34,82 48,74 Z"
            {...robeFill}
          />
          <line x1="55" y1="44" x2="52" y2="70" {...limb} />
          <line x1="85" y1="44" x2="88" y2="70" {...limb} />
          <path d="M40,104 Q60,112 100,104" {...limb} strokeWidth={8} />
          <Head cx={92} cy={22} r={12} />
        </>
      );
      break;
  }

  return (
    <svg viewBox="0 0 140 140" width={size} height={size} aria-hidden="true">
      <Ground />
      {body}
    </svg>
  );
}
