import React from "react";

interface CreateToolIconOptions {
  variant?: "core" | "default";
  accentIndex?: number;
}

const ACCENT_STYLES = [
  {
    fill: "rgba(99, 102, 241, 0.12)",
    stroke: "rgba(129, 140, 248, 0.45)",
  },
  {
    fill: "rgba(56, 189, 248, 0.12)",
    stroke: "rgba(125, 211, 252, 0.45)",
  },
  {
    fill: "rgba(244, 114, 182, 0.12)",
    stroke: "rgba(249, 168, 212, 0.45)",
  },
  {
    fill: "rgba(16, 185, 129, 0.12)",
    stroke: "rgba(45, 212, 191, 0.45)",
  },
  {
    fill: "rgba(250, 204, 21, 0.12)",
    stroke: "rgba(253, 224, 71, 0.45)",
  },
  {
    fill: "rgba(236, 72, 153, 0.12)",
    stroke: "rgba(244, 114, 182, 0.45)",
  },
];

export function createToolIconNode(
  name: string,
  { variant = "default", accentIndex = 0 }: CreateToolIconOptions = {},
) {
  const size = variant === "core" ? 84 : 64;
  const fontSize = variant === "core" ? 15 : 12;
  const accent =
    ACCENT_STYLES[accentIndex % ACCENT_STYLES.length] ?? ACCENT_STYLES[0];

  return (
    <svg
      key={`${variant}-${name}`}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0"
        y="0"
        width={size}
        height={size}
        rx={variant === "core" ? 18 : 14}
        fill={variant === "core" ? "rgba(255, 255, 255, 0.12)" : accent.fill}
        stroke={
          variant === "core"
            ? "rgba(255, 255, 255, 0.35)"
            : accent.stroke
        }
        strokeWidth={variant === "core" ? 2 : 1.2}
      />

      {variant === "core" && (
        <rect
          x="1.5"
          y="1.5"
          width={size - 3}
          height={size - 3}
          rx={16}
          fill="none"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="3"
        />
      )}

      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill="white"
        fontSize={fontSize}
        fontWeight={variant === "core" ? 700 : 600}
        fontFamily="var(--font-sans, system-ui), -apple-system, sans-serif"
      >
        {name}
      </text>
    </svg>
  );
}




