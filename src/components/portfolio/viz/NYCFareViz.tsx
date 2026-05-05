"use client";

import { useEffect, useRef } from "react";
import { HOURS, UBER_FARES, LYFT_FARES, PEAK_INDICES } from "@/data/nycFares";

function createBarGradient(ctx: CanvasRenderingContext2D, color: string, isPeak: boolean): CanvasGradient {
  const grad = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  const alpha = isPeak ? "FF" : "35";
  grad.addColorStop(0, color + alpha);
  grad.addColorStop(0.6, color + "22");
  grad.addColorStop(1, "transparent");
  return grad;
}

let cachedGradients: { uber: CanvasGradient[]; lyft: CanvasGradient[] } | null = null;

const sparkleParticles: { x: number; y: number; life: number; maxLife: number; radius: number; color: string }[] = [];
const PEAK_HOUR_INDEX = 9;

function spawnSparkle(x: number, y: number, color: string) {
  for (let i = 0; i < 3; i++) {
    sparkleParticles.push({
      x: x + (Math.random() - 0.5) * 20,
      y: y - Math.random() * 8,
      life: 0,
      maxLife: 30 + Math.random() * 25,
      radius: 1 + Math.random() * 2,
      color,
    });
  }
}

let sparkleTimer = 0;

const peakGlowPlugin = {
  id: "peakGlow",
  beforeDraw(chart: any) {
    const ctx = chart.ctx;
    if (!chart.data.datasets[0]?._gradients) return;

    const xScale = chart.scales.x;
    const yScale = chart.scales.y;

    const peakX = xScale.getPixelForValue(PEAK_HOUR_INDEX);
    const barTopUber = yScale.getPixelForValue(UBER_FARES[PEAK_HOUR_INDEX]);
    const barTopLyft = yScale.getPixelForValue(LYFT_FARES[PEAK_HOUR_INDEX]);

    // Vertical pulse line
    const pulse = Math.sin(Date.now() / 600) * 0.4 + 0.6;
    ctx.save();
    ctx.globalAlpha = pulse * 0.25;

    const pulseGrad = ctx.createLinearGradient(peakX, barTopLyft - 8, peakX, yScale.getPixelForValue(0));
    pulseGrad.addColorStop(0, "transparent");
    pulseGrad.addColorStop(0.1, "#d97706");
    pulseGrad.addColorStop(0.5, "#fbbf24");
    pulseGrad.addColorStop(1, "transparent");

    ctx.strokeStyle = pulseGrad;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([2, 6]);
    ctx.beginPath();
    ctx.moveTo(peakX, barTopLyft - 4);
    ctx.lineTo(peakX, yScale.getPixelForValue(0));
    ctx.stroke();
    ctx.restore();

    // Peak marker dot on Uber bar
    ctx.save();
    ctx.fillStyle = "#fbbf24";
    ctx.shadowColor = "#fbbf24";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(peakX, barTopUber, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Sparkles
    sparkleTimer++;
    if (sparkleTimer % 12 === 0) {
      spawnSparkle(peakX, barTopUber, "#fbbf24");
    }

    ctx.save();
    sparkleParticles.forEach((p, idx) => {
      p.life++;
      const progress = p.life / p.maxLife;
      if (progress > 1) {
        sparkleParticles.splice(idx, 1);
        return;
      }
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 1 - progress;
      const driftX = Math.sin(p.life * 0.2) * 3;
      ctx.beginPath();
      ctx.arc(p.x + driftX, p.y - p.life * 0.8, p.radius * (1 - progress * 0.6), 0, Math.PI * 2);
      ctx.fill();
    });
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
        plugins: [peakGlowPlugin],
        data: {
          labels: HOURS,
          datasets: [
            {
              label: "Uber",
              data: UBER_FARES,
              backgroundColor: (ctx: any) => {
                const chart = ctx.chart;
                if (!cachedGradients) {
                  const temp = chart.ctx.createLinearGradient(0, 0, 0, chart.canvas?.height ?? 300);
                  cachedGradients = {
                    uber: ctx.dataIndex !== undefined
                      ? HOURS.map((_, i) => createBarGradient(chart.ctx, "#64748b", PEAK_INDICES.has(i)))
                      : [],
                    lyft: HOURS.map((_, i) => createBarGradient(chart.ctx, "#d97706", PEAK_INDICES.has(i)))
                  };
                }
                if (!chart.data.datasets[0]._gradients) {
                  chart.data.datasets[0]._gradients = HOURS.map((_, i) => createBarGradient(chart.ctx, "#64748b", PEAK_INDICES.has(i)));
                  chart.data.datasets[1]._gradients = HOURS.map((_, i) => createBarGradient(chart.ctx, "#d97706", PEAK_INDICES.has(i)));
                }
                return chart.data.datasets[0]._gradients[ctx.dataIndex];
              },
              borderRadius: { topLeft: 4, topRight: 4 },
              borderSkipped: false,
              borderWidth: 0,
              barPercentage: 0.55,
              categoryPercentage: 0.7,
            },
            {
              label: "Lyft",
              data: LYFT_FARES,
              backgroundColor: (ctx: any) => {
                const chart = ctx.chart;
                if (!chart.data.datasets[1]?._gradients) return "#d97706";
                return chart.data.datasets[1]._gradients[ctx.dataIndex];
              },
              borderRadius: { topLeft: 4, topRight: 4 },
              borderSkipped: false,
              borderWidth: 0,
              barPercentage: 0.55,
              categoryPercentage: 0.7,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 800,
            easing: "easeOutQuart" as const,
            onProgress: () => {
              cachedGradients = null;
            },
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: (items) => {
                  const hour = parseInt(items[0].label);
                  const ampm = hour >= 12 ? "PM" : "AM";
                  const display = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
                  return `${display}${ampm} · NYC`;
                },
                label: (item) =>
                  `${item.dataset.label}: $${(item.parsed as { y: number }).y.toFixed(2)}`,
                afterBody: (items) => {
                  const idx = items[0].dataIndex;
                  return PEAK_INDICES.has(idx) ? ["⚡ Rush Hour"] : [];
                },
              },
              backgroundColor: "rgba(10,10,8,0.95)",
              titleFont: { family: "monospace", size: 11, weight: "bold" },
              bodyFont: { family: "monospace", size: 10 },
              padding: 12,
              cornerRadius: 8,
              displayColors: true,
              boxPadding: 4,
            },
          },
          scales: {
            x: {
              ticks: {
                font: { size: 8, family: "monospace" },
                color: (ctx: any) =>
                  PEAK_INDICES.has(ctx.index)
                    ? "rgba(251,191,36,0.9)"
                    : "rgba(255,255,255,0.2)",
                maxRotation: 0,
                autoSkip: false,
              },
              grid: { display: false },
              border: { color: "rgba(255,255,255,0.06)" },
            },
            y: {
              min: 0,
              max: 22,
              ticks: {
                font: { size: 8, family: "monospace" },
                color: "rgba(255,255,255,0.18)",
                callback: (v) => "$" + (v as number),
                stepSize: 5,
                count: 5,
              },
              grid: { color: "rgba(255,255,255,0.03)", lineWidth: 1 },
              border: { display: false },
            },
          },
          layout: { padding: { top: 24, right: 16, bottom: 6, left: 8 } },
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
          { color: "#64748b", glowColor: "#94a3b8", label: "Uber" },
          { color: "#d97706", glowColor: "#fbbf24", label: "Lyft" },
        ].map(({ color, glowColor, label }) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "2px 8px",
              borderRadius: "20px",
              background: `${color}15`,
              border: `0.5px solid ${color}25`,
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: color,
                boxShadow: `0 0 6px ${glowColor}80`,
              }}
            />
            <span
              style={{
                fontSize: "8px",
                fontFamily: "monospace",
                color: "rgba(255,255,255,0.6)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 600,
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
