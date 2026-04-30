"use client";

import { useEffect, useRef } from "react";
import { HOURS, UBER_FARES, LYFT_FARES, PEAK_HOUR_INDEX } from "@/data/nycFares";

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

      const uberColors = UBER_FARES.map((_, i) =>
        i === PEAK_HOUR_INDEX ? "#6b7280" : "rgba(107,114,128,0.45)"
      );
      const lyftColors = LYFT_FARES.map((_, i) =>
        i === PEAK_HOUR_INDEX ? "#c4832a" : "rgba(196,131,42,0.4)"
      );

      chartRef.current = new Chart(canvasRef.current, {
        type: "bar",
        data: {
          labels: HOURS,
          datasets: [
            {
              label: "Uber",
              data: UBER_FARES,
              backgroundColor: uberColors,
              borderRadius: 2,
              borderSkipped: false,
            },
            {
              label: "Lyft",
              data: LYFT_FARES,
              backgroundColor: lyftColors,
              borderRadius: 2,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 800, easing: "easeOutCubic" as const },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: (items) => `${items[0].label} hrs`,
                label: (item) =>
                  `${item.dataset.label}: $${(item.parsed as { y: number }).y.toFixed(2)}`,
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
              ticks: {
                font: { size: 9, family: "monospace" },
                color: "rgba(128,128,128,0.6)",
                maxRotation: 0,
                autoSkip: false,
              },
              grid: { display: false },
              border: { color: "rgba(128,128,128,0.12)" },
            },
            y: {
              min: 0,
              max: 20,
              ticks: {
                font: { size: 9, family: "monospace" },
                color: "rgba(128,128,128,0.6)",
                callback: (v) => "$" + (v as number),
                stepSize: 5,
              },
              grid: { color: "rgba(128,128,128,0.06)" },
              border: { display: false },
            },
          },
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
      <div className="absolute top-2 right-2 flex items-center gap-3">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm" style={{ background: "#6b7280" }} />
          <span className="text-[9px] font-mono" style={{ color: "rgba(128,128,128,0.7)" }}>
            Uber
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm" style={{ background: "#c4832a" }} />
          <span className="text-[9px] font-mono" style={{ color: "rgba(128,128,128,0.7)" }}>
            Lyft
          </span>
        </div>
      </div>
      <div className="absolute top-2 left-2">
        <span
          className="text-[9px] font-mono"
          style={{ color: "rgba(196,131,42,0.7)" }}
        >
          ↑ peak 6pm
        </span>
      </div>
    </div>
  );
}
