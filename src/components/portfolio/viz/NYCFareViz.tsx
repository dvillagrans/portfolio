"use client";

import { useEffect, useRef } from "react";
import { HOURS, UBER_FARES, LYFT_FARES, PEAK_INDICES } from "@/data/nycFares";

function getBarColors(fares: number[], baseColor: string) {
  return fares.map((_, i) =>
    PEAK_INDICES.has(i) ? baseColor : baseColor + "30"
  );
}

const peakAnnotationPlugin = {
  id: "peakAnnotation",
  afterDraw(chart: any) {
    const ctx = chart.ctx;
    const xScale = chart.scales.x;
    const yScale = chart.scales.y;

    const peakX = xScale.getPixelForValue(9);
    const topY = yScale.getPixelForValue(18);

    ctx.save();

    ctx.beginPath();
    ctx.strokeStyle = "rgba(217, 119, 6, 0.4)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.moveTo(peakX, topY);
    ctx.lineTo(peakX, yScale.getPixelForValue(0));
    ctx.stroke();

    ctx.fillStyle = "rgba(217, 119, 6, 0.8)";
    ctx.font = "9px monospace";
    ctx.textAlign = "center";
    ctx.fillText("↑ peak 6pm", peakX, topY - 6);

    ctx.restore();
  },
};

export function NYCFareViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<InstanceType<typeof import("chart.js")["Chart"]> | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let destroyed = false;

    const loadChart = async () => {
      const { Chart, registerables } = await import("chart.js");
      Chart.register(...registerables);

      if (destroyed || !canvasRef.current) return;

      chartRef.current = new Chart(canvasRef.current, {
        type: "bar",
        plugins: [peakAnnotationPlugin],
        data: {
          labels: HOURS,
          datasets: [
            {
              label: "Uber",
              data: UBER_FARES,
              backgroundColor: getBarColors(UBER_FARES, "#64748b"),
              borderRadius: 3,
              borderSkipped: false,
              borderWidth: 0,
            },
            {
              label: "Lyft",
              data: LYFT_FARES,
              backgroundColor: getBarColors(LYFT_FARES, "#d97706"),
              borderRadius: 3,
              borderSkipped: false,
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 700, easing: "easeOutCubic" as const },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: (items) => `${items[0].label} hrs NYC`,
                label: (item) =>
                  `${item.dataset.label}: $${(item.parsed as { y: number }).y.toFixed(2)}`,
                afterBody: (items) => {
                  const idx = items[0].dataIndex;
                  return PEAK_INDICES.has(idx) ? ["⚡ Hora pico"] : [];
                },
              },
              backgroundColor: "rgba(0,0,0,0.9)",
              titleFont: { family: "monospace", size: 11 },
              bodyFont: { family: "monospace", size: 10 },
              padding: 10,
              cornerRadius: 4,
            },
          },
          scales: {
            x: {
              ticks: {
                font: { size: 9, family: "monospace" },
                color: (ctx: any) =>
                  PEAK_INDICES.has(ctx.index)
                    ? "rgba(217,119,6,0.8)"
                    : "rgba(255,255,255,0.25)",
                maxRotation: 0,
                autoSkip: false,
              },
              grid: { display: false },
              border: { color: "rgba(255,255,255,0.08)" },
            },
            y: {
              min: 0,
              max: 20,
              ticks: {
                font: { size: 9, family: "monospace" },
                color: "rgba(255,255,255,0.25)",
                callback: (v) => "$" + (v as number),
                stepSize: 5,
                count: 5,
              },
              grid: { color: "rgba(255,255,255,0.04)" },
              border: { display: false },
            },
          },
          layout: { padding: { top: 20, right: 12, bottom: 4, left: 4 } },
        },
      });
    };

    loadChart();

    return () => {
      destroyed = true;
      chartRef.current?.destroy();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Bar chart de precios Uber y Lyft por hora del día en NYC"
      />
      <div
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        {[
          { color: "#64748b", label: "Uber" },
          { color: "#d97706", label: "Lyft" },
        ].map(({ color, label }) => (
          <div
            key={label}
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "2px",
                background: color,
              }}
            />
            <span
              style={{
                fontSize: "9px",
                fontFamily: "monospace",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
