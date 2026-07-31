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

const PECI = "var(--teal-deep)";
const KOKO = "var(--gold)";
const KOKO_DK = "color-mix(in srgb, var(--gold) 70%, black)";
const SARUNG = "var(--teal-deep)";
const SKIN = "#f0c39a";
const CHEEK = "#f2a48a";
const OUTLINE = "#20303d";

/**
 * Ilustrasi kartun (chibi) orisinal — bukan foto, bukan diambil dari sumber
 * lain — bergaya panduan sholat anak: peci, baju koko, sarung, wajah
 * sederhana tanpa identitas spesifik. Karakter didesain sendiri (bukan
 * hasil tiru-persis karya pihak lain), hanya terinspirasi genre ilustrasi
 * panduan ibadah yang umum dipakai di buku/poster cetak.
 */
export default function GerakanIllustration({ pose, size = 96 }: { pose: Pose; size?: number }) {
  const face = (cx: number, cy: number, r = 20) => (
    <>
      <circle cx={cx} cy={cy} r={r} fill={SKIN} stroke={OUTLINE} strokeWidth={2} />
      <circle cx={cx - r * 0.35} cy={cy - r * 0.05} r={r * 0.11} fill={OUTLINE} />
      <circle cx={cx + r * 0.35} cy={cy - r * 0.05} r={r * 0.11} fill={OUTLINE} />
      <path
        d={`M${cx - r * 0.25},${cy + r * 0.4} Q${cx},${cy + r * 0.55} ${cx + r * 0.25},${cy + r * 0.4}`}
        fill="none"
        stroke={OUTLINE}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <circle cx={cx - r * 0.65} cy={cy + r * 0.3} r={r * 0.16} fill={CHEEK} opacity={0.75} />
      <circle cx={cx + r * 0.65} cy={cy + r * 0.3} r={r * 0.16} fill={CHEEK} opacity={0.75} />
    </>
  );

  const peci = (cx: number, cy: number, r = 20) => (
    <path
      d={`M${cx - r - 1},${cy - 2} Q${cx},${cy - r - 10} ${cx + r + 1},${cy - 2} L${cx + r + 1},${cy - 8} Q${cx},${cy - r - 16} ${cx - r - 1},${cy - 8} Z`}
      fill={PECI}
      stroke={OUTLINE}
      strokeWidth={2}
      strokeLinejoin="round"
    />
  );

  const Ground = () => (
    <line x1="6" y1="140" x2="134" y2="140" stroke="var(--gold)" strokeWidth="2.5" opacity={0.5} />
  );

  let body: React.ReactNode = null;

  switch (pose) {
    case "berdiri":
      body = (
        <>
          <path d="M50,58 Q70,50 90,58 L96,140 Q70,148 44,140 Z" fill={SARUNG} stroke={OUTLINE} strokeWidth={2} />
          <path d="M52,58 Q70,44 88,58 L84,98 Q70,104 56,98 Z" fill={KOKO} stroke={OUTLINE} strokeWidth={2} />
          <line x1="70" y1="60" x2="70" y2="98" stroke={KOKO_DK} strokeWidth={1.5} />
          <line x1="52" y1="66" x2="46" y2="98" stroke={KOKO} strokeWidth={11} strokeLinecap="round" />
          <line x1="88" y1="66" x2="94" y2="98" stroke={KOKO} strokeWidth={11} strokeLinecap="round" />
          <line x1="46" y1="98" x2="42" y2="112" stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
          <line x1="94" y1="98" x2="98" y2="112" stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
          {peci(70, 30)}
          {face(70, 30)}
        </>
      );
      break;
    case "takbir":
      body = (
        <>
          <path d="M50,58 Q70,50 90,58 L96,140 Q70,148 44,140 Z" fill={SARUNG} stroke={OUTLINE} strokeWidth={2} />
          <path d="M52,58 Q70,44 88,58 L84,98 Q70,104 56,98 Z" fill={KOKO} stroke={OUTLINE} strokeWidth={2} />
          <line x1="54" y1="62" x2="36" y2="34" stroke={KOKO} strokeWidth={11} strokeLinecap="round" />
          <line x1="86" y1="62" x2="104" y2="34" stroke={KOKO} strokeWidth={11} strokeLinecap="round" />
          <line x1="36" y1="34" x2="32" y2="20" stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
          <line x1="104" y1="34" x2="108" y2="20" stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
          {peci(70, 30)}
          {face(70, 30)}
        </>
      );
      break;
    case "bersedekap":
      body = (
        <>
          <path d="M50,58 Q70,50 90,58 L96,140 Q70,148 44,140 Z" fill={SARUNG} stroke={OUTLINE} strokeWidth={2} />
          <path d="M52,58 Q70,44 88,58 L84,98 Q70,104 56,98 Z" fill={KOKO} stroke={OUTLINE} strokeWidth={2} />
          <line x1="54" y1="62" x2="52" y2="76" stroke={KOKO} strokeWidth={12} strokeLinecap="round" />
          <line x1="86" y1="62" x2="88" y2="76" stroke={KOKO} strokeWidth={12} strokeLinecap="round" />
          <path d="M48,78 Q70,90 92,78" fill="none" stroke={SKIN} strokeWidth={9} strokeLinecap="round" />
          {peci(70, 30)}
          {face(70, 30)}
        </>
      );
      break;
    case "ruku":
      body = (
        <>
          <line x1="96" y1="96" x2="96" y2="140" stroke={SARUNG} strokeWidth={14} strokeLinecap="round" />
          <line x1="112" y1="96" x2="110" y2="140" stroke={SARUNG} strokeWidth={14} strokeLinecap="round" />
          <path
            d="M98,92 L48,84 Q40,83 40,90 L44,98 Q68,106 100,106 Q110,106 110,96 Z"
            fill={KOKO}
            stroke={OUTLINE}
            strokeWidth={2}
          />
          <line x1="58" y1="92" x2="76" y2="108" stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
          {peci(30, 84, 16)}
          {face(30, 84, 16)}
        </>
      );
      break;
    case "itidal":
      body = (
        <>
          <path d="M50,58 Q70,50 90,58 L96,140 Q70,148 44,140 Z" fill={SARUNG} stroke={OUTLINE} strokeWidth={2} />
          <path d="M52,58 Q70,44 88,58 L84,98 Q70,104 56,98 Z" fill={KOKO} stroke={OUTLINE} strokeWidth={2} />
          <line x1="52" y1="66" x2="47" y2="92" stroke={KOKO} strokeWidth={11} strokeLinecap="round" />
          <line x1="88" y1="66" x2="93" y2="92" stroke={KOKO} strokeWidth={11} strokeLinecap="round" />
          {peci(70, 30)}
          {face(70, 30)}
        </>
      );
      break;
    case "sujud":
      body = (
        <>
          <line x1="96" y1="118" x2="96" y2="140" stroke={SARUNG} strokeWidth={13} strokeLinecap="round" />
          <path d="M96,120 Q114,126 122,140" fill="none" stroke={SARUNG} strokeWidth={11} strokeLinecap="round" />
          <path
            d="M40,136 Q34,118 46,110 Q68,90 98,100 Q108,104 102,120 Q92,128 60,124 Q44,122 40,136 Z"
            fill={KOKO}
            stroke={OUTLINE}
            strokeWidth={2}
          />
          <line x1="54" y1="110" x2="44" y2="132" stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
          <line x1="72" y1="100" x2="68" y2="128" stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
          {peci(26, 132, 15)}
          {face(26, 132, 15)}
        </>
      );
      break;
    case "duduk-iftirasy":
      body = (
        <>
          <path
            d="M50,58 Q70,50 90,58 L94,94 Q112,100 112,120 L36,120 Q32,98 46,94 Z"
            fill={SARUNG}
            stroke={OUTLINE}
            strokeWidth={2}
          />
          <path d="M52,58 Q70,44 88,58 L84,98 Q70,104 56,98 Z" fill={KOKO} stroke={OUTLINE} strokeWidth={2} />
          <line x1="52" y1="66" x2="48" y2="90" stroke={KOKO} strokeWidth={11} strokeLinecap="round" />
          <line x1="88" y1="66" x2="92" y2="90" stroke={KOKO} strokeWidth={11} strokeLinecap="round" />
          <path d="M38,120 Q70,130 110,120" fill="none" stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
          {peci(70, 30)}
          {face(70, 30)}
        </>
      );
      break;
    case "duduk-tawarruk":
      body = (
        <>
          <path
            d="M52,58 Q70,50 88,58 L96,92 Q116,98 116,118 L32,118 Q26,96 44,92 Z"
            fill={SARUNG}
            stroke={OUTLINE}
            strokeWidth={2}
          />
          <path d="M54,58 Q70,44 86,58 L82,98 Q70,104 58,98 Z" fill={KOKO} stroke={OUTLINE} strokeWidth={2} />
          <line x1="55" y1="66" x2="51" y2="88" stroke={KOKO} strokeWidth={11} strokeLinecap="round" />
          <line x1="85" y1="66" x2="89" y2="88" stroke={KOKO} strokeWidth={11} strokeLinecap="round" />
          <path d="M34,118 Q70,128 114,118" fill="none" stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
          {peci(70, 30)}
          {face(70, 30)}
        </>
      );
      break;
    case "salam":
      body = (
        <>
          <path
            d="M50,58 Q70,50 90,58 L94,94 Q112,100 112,120 L36,120 Q32,98 46,94 Z"
            fill={SARUNG}
            stroke={OUTLINE}
            strokeWidth={2}
          />
          <path d="M52,58 Q70,44 88,58 L84,98 Q70,104 56,98 Z" fill={KOKO} stroke={OUTLINE} strokeWidth={2} />
          <line x1="52" y1="66" x2="48" y2="90" stroke={KOKO} strokeWidth={11} strokeLinecap="round" />
          <line x1="88" y1="66" x2="92" y2="90" stroke={KOKO} strokeWidth={11} strokeLinecap="round" />
          <path d="M38,120 Q70,130 110,120" fill="none" stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
          {peci(96, 30)}
          {face(96, 30)}
        </>
      );
      break;
  }

  return (
    <svg viewBox="0 0 140 150" width={size} height={(size * 150) / 140} aria-hidden="true">
      <Ground />
      {body}
    </svg>
  );
}
