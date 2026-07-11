import { type ReactNode } from "react";

/**
 * Reusable dark hero background with stacked blue-wave gradient.
 * Wraps children on top of the layered SVG waves.
 */
export function HeroWave({
  children,
  className = "",
  height = "auto",
}: {
  children: ReactNode;
  className?: string;
  /** "screen" for full viewport (used with pin), "auto" for content-sized page headers */
  height?: "screen" | "auto";
}) {
  return (
    <section
      className={`relative w-full overflow-hidden text-white ${height === "screen" ? "h-screen" : ""} ${className}`}
      style={{
        background:
          "radial-gradient(ellipse at 50% 120%, oklch(0.35 0.22 265) 0%, oklch(0.09 0.05 265) 55%, oklch(0.06 0.03 265) 100%)",
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="hw-wave1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.25 260)" stopOpacity="0" />
            <stop offset="60%" stopColor="oklch(0.7 0.26 258)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.9 0.18 240)" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="hw-wave2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.4 0.22 265)" stopOpacity="0" />
            <stop offset="70%" stopColor="oklch(0.55 0.28 258)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="oklch(0.75 0.22 245)" stopOpacity="1" />
          </linearGradient>
          <filter id="hw-blur">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <path
          d="M -100 700 Q 400 200 900 500 T 1600 350 L 1600 900 L -100 900 Z"
          fill="url(#hw-wave2)"
          opacity="0.55"
          filter="url(#hw-blur)"
        />
        <path
          d="M -100 780 Q 500 300 1000 600 T 1600 480 L 1600 900 L -100 900 Z"
          fill="url(#hw-wave1)"
          opacity="0.85"
        />
        <path
          d="M -100 850 Q 600 420 1100 700 T 1600 620 L 1600 900 L -100 900 Z"
          fill="oklch(0.85 0.2 240)"
          opacity="0.95"
        />
      </svg>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.08 0.04 265 / 0.45) 0%, transparent 45%)",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </section>
  );
}
