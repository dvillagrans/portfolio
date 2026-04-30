"use client";

import { useEffect, useRef, useCallback } from "react";
import { CLUSTER_DEFS } from "@/data/covidClusters";

function gaussian(mean: number, std: number): number {
  let u = 0, v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return mean + std * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}

interface ClusterPoint {
  x: number;
  y: number;
}

interface ClusterWithPoints {
  id: string;
  label: string;
  color: string;
  n: number;
  risk: string;
  points: ClusterPoint[];
}

export function CovidClusterViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<InstanceType<typeof import("chart.js")["Chart"]> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const generatePoints = useCallback((): ClusterWithPoints[] => {
    return CLUSTER_DEFS.map((c) => ({
      ...c,
      points: Array.from({ length: c.n }, () => ({
        x: clamp(gaussian(c.cx, 6), 3, 97),
        y: clamp(gaussian(c.cy, 5), 3, 97),
      })),
    }));
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    let destroyed = false;

    const loadChart = async () => {
      const { Chart, registerables } = await import("chart.js");
      Chart.register(...registerables);

      if (destroyed || !canvasRef.current) return;

      const clusters = generatePoints();

      chartRef.current = new Chart(canvasRef.current, {
        type: "scatter",
        data: {
          datasets: clusters.map((c) => ({
            label: c.label,
            data: c.points,
            backgroundColor: c.color + "bb",
            pointRadius: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: c.color,
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 1000, easing: "easeOutQuart" as const },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: (items) => items[0]?.dataset?.label ?? "",
                label: (item) => {
                  const cluster = CLUSTER_DEFS[item.datasetIndex];
                  return `Riesgo: ${cluster.risk}`;
                },
              },
              backgroundColor: "rgba(0,0,0,0.85)",
              titleFont: { family: "monospace", size: 11 },
              bodyFont: { family: "monospace", size: 10 },
              padding: 8,
              cornerRadius: 4,
            },
          },
          scales: {
            x: {
              min: 0,
              max: 100,
              title: {
                display: true,
                text: "Edad normalizada",
                font: { size: 10, family: "monospace" },
                color: "rgba(128,128,128,0.7)",
              },
              ticks: { display: false },
              grid: { color: "rgba(128,128,128,0.06)" },
              border: { color: "rgba(128,128,128,0.12)" },
            },
            y: {
              min: 0,
              max: 100,
              title: {
                display: true,
                text: "Comorbilidades",
                font: { size: 10, family: "monospace" },
                color: "rgba(128,128,128,0.7)",
              },
              ticks: { display: false },
              grid: { color: "rgba(128,128,128,0.06)" },
              border: { color: "rgba(128,128,128,0.12)" },
            },
          },
        },
      });

      intervalRef.current = setInterval(() => {
        if (!chartRef.current) return;
        const newClusters = generatePoints();
        chartRef.current.data.datasets.forEach(
          (ds, i) => {
            (ds as { data: ClusterPoint[] }).data = newClusters[i].points;
          }
        );
        chartRef.current.update("active");
      }, 4000);
    };

    loadChart();

    return () => {
      destroyed = true;
      chartRef.current?.destroy();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [generatePoints]);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Scatter plot de 9 clusters de riesgo COVID-19 por edad y comorbilidades"
      />
      <div className="absolute bottom-2 left-2 flex items-center gap-3">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: "#86efac" }} />
          <span className="text-[9px] font-mono" style={{ color: "rgba(128,128,128,0.7)" }}>
            Bajo
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: "#c084fc" }} />
          <span className="text-[9px] font-mono" style={{ color: "rgba(128,128,128,0.7)" }}>
            Crítico
          </span>
        </div>
        <span className="text-[9px] font-mono" style={{ color: "rgba(128,128,128,0.4)" }}>
          9 clusters · hover para detalle
        </span>
      </div>
    </div>
  );
}
