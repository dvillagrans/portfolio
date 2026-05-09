import { ImageResponse } from "next/og";

export const runtime = "edge";

export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#090a0a",
          padding: "80px 100px",
          fontFamily: "Space Grotesk, system-ui, sans-serif",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #2b5a5c, #d48806)",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 600,
            color: "#f7f6f2",
            lineHeight: 1.1,
            marginBottom: "16px",
            letterSpacing: "-0.02em",
          }}
        >
          Diego Villagran
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: 400,
            color: "#2b5a5c",
            marginBottom: "32px",
            letterSpacing: "-0.01em",
          }}
        >
          AI &amp; Data Engineer · ML Systems Builder
        </div>

        {/* Divider */}
        <div
          style={{
            width: "80px",
            height: "3px",
            backgroundColor: "#d48806",
            borderRadius: "2px",
            marginBottom: "40px",
          }}
        />

        {/* Tags */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {[
            "Machine Learning",
            "Data Engineering",
            "LLM Automation",
            "Scalable Infrastructure",
          ].map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: "18px",
                color: "#a0a0a0",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px",
                padding: "8px 20px",
                fontFamily: "JetBrains Mono, monospace",
                letterSpacing: "0.05em",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            right: "100px",
            fontSize: "22px",
            color: "rgba(247,246,242,0.3)",
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          dvillagrans.dev
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, transparent, #2b5a5c, #d48806, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
