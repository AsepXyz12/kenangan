type RoundelProps = {
  number: number | string;
  size?: number;
  variant?: "gold" | "teal" | "maroon";
  className?: string;
};

const VARIANT_COLORS: Record<string, { ring: string; fill: string; text: string }> = {
  gold: { ring: "var(--gold)", fill: "var(--parchment)", text: "var(--ink)" },
  teal: { ring: "var(--teal)", fill: "var(--parchment)", text: "var(--teal-deep)" },
  maroon: { ring: "var(--maroon)", fill: "var(--parchment)", text: "var(--maroon)" },
};

export default function Roundel({ number, size = 40, variant = "gold", className = "" }: RoundelProps) {
  const colors = VARIANT_COLORS[variant];
  const points = 8;
  const outerR = 19;
  const innerR = 14.5;
  const path = Array.from({ length: points * 2 })
    .map((_, i) => {
      const angle = (Math.PI / points) * i - Math.PI / 2;
      const r = i % 2 === 0 ? outerR : innerR;
      const x = 20 + r * Math.cos(angle);
      const y = 20 + r * Math.sin(angle);
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden="true">
        <path d={`${path} Z`} fill={colors.fill} stroke={colors.ring} strokeWidth="1.1" />
        <circle cx="20" cy="20" r="11" fill="none" stroke={colors.ring} strokeWidth="0.6" opacity="0.6" />
        <text
          x="20"
          y="21"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={String(number).length > 2 ? "11" : "13"}
          fontFamily="var(--font-display)"
          fontWeight="600"
          fill={colors.text}
        >
          {number}
        </text>
      </svg>
    </span>
  );
}
