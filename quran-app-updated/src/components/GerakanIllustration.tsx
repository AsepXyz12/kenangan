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
const ROBE_LIGHT = "color-mix(in srgb, var(--teal-deep) 55%, white)";
const SKIN = "#dcb98f";
const TRIM = "var(--gold)";

/**
 * Ilustrasi sosok berbadan (bukan foto, bukan diambil dari sumber lain, bukan
 * stik-garis) yang menggambarkan postur tubuh pada tiap gerakan sholat.
 * Digambar sebagai figur bergamis netral (tanpa wajah spesifik, tanpa
 * identitas), mengikuti gaya diagram panduan ibadah cetak — proporsional
 * dan berisi, tetap sopan menutup aurat.
 */
export default function GerakanIllustration({ pose, size = 96 }: { pose: Pose; size?: number }) {
  const limb = {
    fill: "none",
    stroke: ROBE,
    strokeWidth: 15,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const limbSkin = { ...limb, stroke: SKIN, strokeWidth: 11 };
  const robeFill = { fill: ROBE, stroke: OUTLINE, strokeWidth: 2, strokeLinejoin: "round" as const };
  const headFill = { fill: SKIN, stroke: OUTLINE, strokeWidth: 2 };

  const Ground = () => (
    <line x1="10" y1="120" x2="110" y2="120" stroke={TRIM} strokeWidth="2.5" opacity={0.55} />
  );

  const Head = ({ cx = 60, cy = 20, r = 11 }: { cx?: number; cy?: number; r?: number }) => (
    <circle cx={cx} cy={cy} r={r} {...headFill} />
  );

  let body: ReactNode = null;

  switch (pose) {
    case "berdiri":
      body = (
        <>
          <path d="M46,34 Q60,28 74,34 L82,116 Q60,124 38,116 Z" {...robeFill} />
          <line x1="47" y1="45" x2="42" y2="82" {...limbSkin} />
          <line x1="73" y1="45" x2="78" y2="82" {...limbSkin} />
          <Head />
        </>
      );
      break;
    case "takbir":
      body = (
        <>
          <path d="M46,34 Q60,28 74,34 L82,116 Q60,124 38,116 Z" {...robeFill} />
          <line x1="49" y1="40" x2="34" y2="14" {...limbSkin} />
          <line x1="71" y1="40" x2="86" y2="14" {...limbSkin} />
          <Head />
        </>
      );
      break;
    case "bersedekap":
      body = (
        <>
          <path d="M46,34 Q60,28 74,34 L82,116 Q60,124 38,116 Z" {...robeFill} />
          <path d="M44,52 Q60,64 76,52" {...limbSkin} />
          <line x1="47" y1="42" x2="45" y2="54" {...limb} strokeWidth={13} />
          <line x1="73" y1="42" x2="75" y2="54" {...limb} strokeWidth={13} />
          <Head />
        </>
      );
      break;
    case "ruku":
      body = (
        <>
          <path
            d="M40,62 Q64,50 92,64 L100,108 Q92,116 84,108 L84,72 Q64,64 44,74 Z"
            {...robeFill}
          />
          <line x1="46" y1="70" x2="34" y2="98" {...limbSkin} />
          <line x1="84" y1="90" x2="84" y2="112" {...limbSkin} />
          <line x1="60" y1="70" x2="60" y2="112" {...limbSkin} />
          <Head cx={30} cy={62} r={10} />
        </>
      );
      break;
    case "itidal":
      body = (
        <>
          <path d="M46,34 Q60,28 74,34 L82,116 Q60,124 38,116 Z" {...robeFill} />
          <line x1="47" y1="44" x2="40" y2="70" {...limbSkin} />
          <line x1="73" y1="44" x2="80" y2="70" {...limbSkin} />
          <Head />
        </>
      );
      break;
    case "sujud":
      body = (
        <>
          <path
            d="M32,104 Q30,90 42,86 Q68,68 96,90 L96,104 Q96,112 88,112 Q80,112 78,104 Q64,86 44,98 Q40,106 32,104 Z"
            {...robeFill}
          />
          <line x1="50" y1="86" x2="46" y2="102" {...limbSkin} />
          <line x1="70" y1="80" x2="68" y2="102" {...limbSkin} />
          <line x1="90" y1="98" x2="104" y2="112" {...limbSkin} />
          <Head cx={26} cy={100} r={9} />
        </>
      );
      break;
    case "duduk-iftirasy":
      body = (
        <>
          <path d="M46,34 Q60,28 74,34 L78,66 Q92,72 92,96 L34,96 Q28,74 42,66 Z" {...robeFill} />
          <line x1="47" y1="42" x2="42" y2="62" {...limbSkin} />
          <line x1="73" y1="42" x2="76" y2="62" {...limbSkin} />
          <Head />
        </>
      );
      break;
    case "duduk-tawarruk":
      body = (
        <>
          <path
            d="M46,34 Q60,28 74,34 L80,64 Q98,70 98,90 L28,90 Q26,72 40,64 Z"
            {...robeFill}
          />
          <line x1="47" y1="42" x2="42" y2="60" {...limbSkin} />
          <line x1="73" y1="42" x2="78" y2="58" {...limbSkin} />
          <Head />
        </>
      );
      break;
    case "salam":
      body = (
        <>
          <path d="M46,34 Q60,28 74,34 L78,66 Q92,72 92,96 L34,96 Q28,74 42,66 Z" {...robeFill} />
          <line x1="47" y1="42" x2="42" y2="62" {...limbSkin} />
          <line x1="73" y1="42" x2="76" y2="62" {...limbSkin} />
          <Head cx={70} cy={20} r={11} />
        </>
      );
      break;
  }

  return (
    <svg viewBox="0 0 120 130" width={size} height={(size * 130) / 120} aria-hidden="true">
      <Ground />
      {body}
    </svg>
  );
}
