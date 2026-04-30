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

      const datasets = CLUSTER_DEFS.map((c) => ({
        label: c.label,
        data: generateClusterPoints(c),
        backgroundColor: c.color + "cc",
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: c.color,
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 1,
      }));

      chartRef.current = new Chart(canvasRef.current, {
        type: "scatter",
        data: { datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 1200, easing: "easeOutQuart" as const },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: (items) => items[0]?.dataset?.label ?? "",
                label: (item) => {
                  const cluster = CLUSTER_DEFS[item.datasetIndex];
                  return `Riesgo: ${riskColors[cluster.id]}`;
                },
              },
              backgroundColor: "rgba(0,0,0,0.9)",
              titleColor: "#ffffff",
              bodyColor: "rgba(255,255,255,0.7)",
              titleFont: { family: "monospace", size: 11, weight: "bold" as const },
              bodyFont: { family: "monospace", size: 10 },
              padding: 10,
              cornerRadius: 4,
              displayColors: true,
              boxWidth: 8,
              boxHeight: 8,
            },
          },
          scales: {
            x: {
              min: 0,
              max: 100,
              title: {
                display: true,
                text: "Edad normalizada →",
                font: { size: 10, family: "monospace" },
                color: "rgba(255,255,255,0.25)",
                padding: { top: 4 },
              },
              ticks: { display: false },
              grid: { color: "rgba(255,255,255,0.04)", lineWidth: 1 },
              border: { color: "rgba(255,255,255,0.08)", dash: [2, 4] },
            },
            y: {
              min: 0,
              max: 100,
              title: {
                display: true,
                text: "Comorbilidades →",
                font: { size: 10, family: "monospace" },
                color: "rgba(255,255,255,0.25)",
                padding: { bottom: 4 },
              },
              ticks: { display: false },
              grid: { color: "rgba(255,255,255,0.04)", lineWidth: 1 },
              border: { color: "rgba(255,255,255,0.08)", dash: [2, 4] },
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
            }}
          />
          <span
            style={{
              fontSize: "9px",
              fontFamily: "monospace",
              color: "rgba(255,255,255,0.4)",
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
            }}
          />
          <span
            style={{
              fontSize: "9px",
              fontFamily: "monospace",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Crítico UCI
          </span>
        </div>
        <span
          style={{
            fontSize: "9px",
            fontFamily: "monospace",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          9 clusters · K-Means
        </span>
      </div>
    </div>
  );
}
