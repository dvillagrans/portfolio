"use client";

export default function GridOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgb(255 255 255 / 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgb(255 255 255 / 0.03) 1px, transparent 1px),
          linear-gradient(to right, rgb(255 255 255 / 0.012) 1px, transparent 1px),
          linear-gradient(to bottom, rgb(255 255 255 / 0.012) 1px, transparent 1px)
        `,
        backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
        backgroundPosition: "0 0, 0 0, 0 0, 0 0",
      }}
      aria-hidden="true"
    />
  );
}
