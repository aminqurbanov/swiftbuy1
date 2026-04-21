import type { MockDistributor } from "@/lib/mockMagazaData";

/** Inline gradient — Tailwind JIT dinamik sinifləri düşürə bilər */
const PALETTE: Record<
  MockDistributor["accent"],
  { css: string; shadow: string }
> = {
  blue: {
    css: "linear-gradient(135deg, #2563eb 0%, #3730a3 100%)",
    shadow: "0 10px 24px rgba(37, 99, 235, 0.35)",
  },
  orange: {
    css: "linear-gradient(135deg, #f59e0b 0%, #c2410c 100%)",
    shadow: "0 10px 24px rgba(245, 158, 11, 0.3)",
  },
  emerald: {
    css: "linear-gradient(135deg, #10b981 0%, #0f766e 100%)",
    shadow: "0 10px 24px rgba(16, 185, 129, 0.3)",
  },
};

type Props = {
  distributor: MockDistributor;
  size?: "sm" | "md" | "lg";
  active?: boolean;
};

const PX: Record<NonNullable<Props["size"]>, number> = {
  sm: 40,
  md: 48,
  lg: 56,
};

const TEXT: Record<NonNullable<Props["size"]>, string> = {
  sm: "13px",
  md: "16px",
  lg: "18px",
};

/** Rəsmi ticarət nişanı deyil — prototip üçün monogram + rəng bloku. */
export default function DistributorLogoMark({
  distributor,
  size = "md",
  active = false,
}: Props) {
  const px = PX[size];
  const p = PALETTE[distributor.accent];

  return (
    <span
      className={`relative flex shrink-0 items-center justify-center rounded-2xl font-extrabold tracking-tight text-white ring-2 ring-white/30 ${
        active ? "ring-4 ring-offset-2 ring-offset-white" : ""
      }`}
      style={{
        width: px,
        height: px,
        minWidth: px,
        minHeight: px,
        fontSize: TEXT[size],
        lineHeight: 1,
        backgroundImage: p.css,
        boxShadow: p.shadow,
        color: "#ffffff",
      }}
      aria-hidden
    >
      {distributor.logoMark}
    </span>
  );
}
