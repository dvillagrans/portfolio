"use client";

import { useEffect, useRef, useCallback } from "react";
import { CLUSTER_DEFS } from "@/data/covidClusters";

function gaussian(mean: number, std: number, min = 2, max = 98): number {
  const u1 = Math.max(1e-10, Math.random());
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  const clamped = Math.max(-2, Math.min(2, z));
  return Math.max(min, Math.min(max, mean + std * clamped));
}

interface ClusterPoint {
  x: number;
  y: number;
}

const riskColors: Record<string, string> = {
  K1: "ALTO", K2: "MODERADO", K3: "CRÍTICO",
  K4: "ALTO", K5: "ALTO", K6: "MODERADO",
  K7: "CRÍTICO", K8: "BAJO", K9: "BAJO",
};

const radarGridPlugin = {
  id: "radarGrid",
  beforeDraw(chart: any) {
    const ctx = chart.ctx;
    const { width, height } = chart;
    const cx = width / 2;
    const cy = height / 2;
    const maxR = Math.max(width, height) * 0.6;

    ctx.save();
    ctx.globalAlpha = 0.03;
    ctx.strokeStyle = "#ffffff";

    // Concentric circles
    for (let r = maxR * 0.2; r < maxR; r += maxR * 0.2) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Radial lines
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
      ctx.stroke();
    }

    ctx.restore();
  },
};

const criticalPulsePlugin = {
  id: "criticalPulse",
  afterDatasetsDraw(chart: any) {
    const ctx = chart.ctx;
    const criticalClusterIds = CLUSTER_DEFS.filter(c => ["K3", "K7"].includes(c.id)).map(c => CLUSTER_DEFS.indexOf(c));
    const meta = chart.getDatasetMeta(0);
    if (!meta?.data?.length) return;

    const xScale = chart.scales.x;
    const yScale = chart.scales.y;

    criticalClusterIds.forEach(datasetIdx => {
      const dsMeta = chart.getDatasetMeta(datasetIdx);
      if (!dsMeta?.data?.length) return;
      const pt = dsMeta.data[0];
      if (!pt) return;

      const pulse = Math.sin(Date.now() / 500) * 0.3 + 0.5;
      const x = xScale.getPixelForValue(CLUSTER_DEFS[datasetIdx].cx);
      const y = yScale.getPixelForValue(CLUSTER_DEFS[datasetIdx].cy);

      ctx.save();
      const grad = ctx.createRadialGradient(x, y, 0, x, y, 30);
      grad.addColorStop(0, `rgba(239,68,68,${pulse * 0.3})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  },
};

export function CovidClusterViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<InstanceType<typeof import("chart.js")["Chart"]> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const generateClusterPoints = useCallback(
    (cluster: (typeof CLUSTER_DEFS)[number]): ClusterPoint[] => {
      return Array.from({ length: cluster.n }, () => ({
        x: gaussian(cluster.cx, cluster.std),
        y: gaussian(cluster.cy, cluster.std),
      }));
    },
    []
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    let destroyed = false;

    const loadChart = async () => {
      const { Chart, registerables } = await import("chart.js");
      Chart.register(...registerables);

      if (destroyed || !canvasRef.current) return;

      const datasets = CLUSTER_DEFS.map((c, idx) => ({
        label: c.label,
        data: generateClusterPoints(c),
        backgroundColor: c.color + "88",
        borderColor: c.color,
        borderWidth: 0.5,
        pointRadius: (ctx: any) => {
          const isCrit = ["K3", "K7"].includes(c.id);
          return isCrit ? 4.5 : 3.5;
        },
        pointHoverRadius: 7,
        pointHoverBackgroundColor: "#ffffff",
        pointHoverBorderColor: c.color,
        pointHoverBorderWidth: 2,
        _clusterDef: c,
      }));

      chartRef.current = new Chart(canvasRef.current, {
        type: "scatter",
        plugins: [radarGridPlugin, criticalPulsePlugin],
        data: { datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 1400, easing: "easeOutQuart" as const },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: (items) => {
                  const ds = items[0]?.dataset as any;
                  const c = ds?._clusterDef;
                  return c?.label ?? "";
                },
                label: (item) => {
                  const ds = (item.dataset as any);
                  const c = ds?._clusterDef;
                  if (!c) return "";
                  const risk = riskColors[c.id];
                  const riskColor = risk === "CRÍTICO" ? "#ef4444" : risk === "ALTO" ? "#f97316" : risk === "MODERADO" ? "#facc15" : "#4ade80";
                  return [`Riesgo: ${risk}`, `  Puntos: ${c.n} pacientes`];
                },
              },
              backgroundColor: "rgba(10,10,8,0.95)",
              titleColor: "#ffffff",
              bodyColor: "rgba(255,255,255,0.7)",
              titleFont: { family: "monospace", size: 11, weight: "bold" },
              bodyFont: { family: "monospace", size: 10 },
              padding: 12,
              cornerRadius: 8,
              displayColors: true,
              boxWidth: 10,
              boxHeight: 10,
              boxPadding: 4,
            },
          },
          scales: {
            x: {
              min: 0,
              max: 100,
              title: {
                display: true,
                text: "Edad normalizada →",
                font: { size: 9, family: "monospace", weight: "bold" },
                color: "rgba(255,255,255,0.18)",
                padding: { top: 4 },
              },
              ticks: { display: false },
              grid: { display: false },
              border: { color: "rgba(255,255,255,0.06)", dash: [4, 8], width: 1 },
            },
            y: {
              min: 0,
              max: 100,
              title: {
                display: true,
                text: "Comorbilidades →",
                font: { size: 9, family: "monospace", weight: "bold" },
                color: "rgba(255,255,255,0.18)",
                padding: { bottom: 4 },
              },
              ticks: { display: false },
              grid: { display: false },
              border: { color: "rgba(255,255,255,0.06)", dash: [4, 8], width: 1 },
            },
          },
          layout: { padding: { top: 8, right: 8, bottom: 8, left: 8 } },
        },
      });

      intervalRef.current = setInterval(() => {
        if (!chartRef.current) return;
        chartRef.current.data.datasets.forEach((ds, i) => {
          (ds as { data: ClusterPoint[] }).data = generateClusterPoints(CLUSTER_DEFS[i]);
        });
        chartRef.current.update();
      }, 5000);
    };

    loadChart();

    return () => {
      destroyed = true;
      chartRef.current?.destroy();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [generateClusterPoints]);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Scatter plot de 9 clusters de riesgo COVID-19 por edad y comorbilidades"
      />
      <div
        style={{
          position: "absolute",
          bottom: "8px",
          left: "8px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#86efac",
              boxShadow: "0 0 6px #86efac80",
            }}
          />
          <span
            style={{
              fontSize: "8px",
              fontFamily: "monospace",
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Bajo riesgo
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#c084fc",
              boxShadow: "0 0 6px #c084fc80",
            }}
          />
          <span
            style={{
              fontSize: "8px",
              fontFamily: "monospace",
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Crítico UCI
          </span>
        </div>
        <span
          style={{
            fontSize: "8px",
            fontFamily: "monospace",
            color: "rgba(255,255,255,0.15)",
          }}
        >
          9 clusters · K-Means
        </span>
      </div>
    </div>
  );
}
