"use client";

import { useEffect, useRef } from "react";

const STATE_AQI: Record<string, { aqi: number; color: string; label: string }> = {
  Rajasthan: { aqi: 185, color: "#f97316", label: "Poor" },
  Gujarat: { aqi: 142, color: "#facc15", label: "Moderate" },
  Punjab: { aqi: 220, color: "#ef4444", label: "Very Poor" },
  Haryana: { aqi: 245, color: "#ef4444", label: "Very Poor" },
  "Uttar Pradesh": { aqi: 280, color: "#ef4444", label: "Very Poor" },
  Bihar: { aqi: 190, color: "#f97316", label: "Poor" },
  "West Bengal": { aqi: 165, color: "#facc15", label: "Moderate" },
  Odisha: { aqi: 88, color: "#a3e635", label: "Satisfactory" },
  Jharkhand: { aqi: 145, color: "#facc15", label: "Moderate" },
  "Madhya Pradesh": { aqi: 135, color: "#facc15", label: "Moderate" },
  Maharashtra: { aqi: 118, color: "#facc15", label: "Moderate" },
  Chhattisgarh: { aqi: 78, color: "#4ade80", label: "Good" },
  Telangana: { aqi: 95, color: "#a3e635", label: "Satisfactory" },
  "Andhra Pradesh": { aqi: 72, color: "#4ade80", label: "Good" },
  Karnataka: { aqi: 65, color: "#4ade80", label: "Good" },
  "Tamil Nadu": { aqi: 58, color: "#4ade80", label: "Good" },
  Kerala: { aqi: 42, color: "#4ade80", label: "Good" },
  Assam: { aqi: 98, color: "#a3e635", label: "Satisfactory" },
  Delhi: { aqi: 312, color: "#c084fc", label: "Severe" },
  "Himachal Pradesh": { aqi: 55, color: "#4ade80", label: "Good" },
  Uttarakhand: { aqi: 72, color: "#4ade80", label: "Good" },
  Goa: { aqi: 35, color: "#4ade80", label: "Good" },
  Manipur: { aqi: 62, color: "#4ade80", label: "Good" },
  Meghalaya: { aqi: 48, color: "#4ade80", label: "Good" },
  Nagaland: { aqi: 45, color: "#4ade80", label: "Good" },
  Tripura: { aqi: 88, color: "#a3e635", label: "Satisfactory" },
  Sikkim: { aqi: 32, color: "#4ade80", label: "Good" },
  "Arunachal Pradesh": { aqi: 28, color: "#4ade80", label: "Good" },
  Mizoram: { aqi: 38, color: "#4ade80", label: "Good" },
  "Jammu and Kashmir": { aqi: 68, color: "#4ade80", label: "Good" },
};

const DEFAULT_AQI = { aqi: 75, color: "#4ade80", label: "Good" };
const CRITICAL_AQI_THRESHOLD = 200;

const AQI_LEGEND = [
  { color: "#4ade80", label: "Good" },
  { color: "#a3e635", label: "Sat." },
  { color: "#facc15", label: "Mod." },
  { color: "#f97316", label: "Poor" },
  { color: "#ef4444", label: "V.Poor" },
  { color: "#c084fc", label: "Severe" },
];

export function IndiaAQIViz() {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pulseIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    let destroyed = false;

    const loadMap = async () => {
      const [d3, topojson] = await Promise.all([
        import("d3"),
        import("topojson-client"),
      ]);

      if (destroyed) return;

      const TOPO_URL =
        "https://cdn.jsdelivr.net/npm/datamaps@0.5.10/src/js/data/ind.topo.json";

      let topology: unknown;
      try {
        const response = await fetch(TOPO_URL);
        if (!response.ok) throw new Error("Failed to fetch topology");
        topology = await response.json();
      } catch {
        if (svgRef.current && !destroyed) {
          svgRef.current.innerHTML = `
            <text x="50%" y="50%" text-anchor="middle" 
                  font-family="monospace" font-size="11" fill="rgba(128,128,128,0.5)">
              India AQI Map
            </text>`;
        }
        return;
      }

      if (destroyed || !svgRef.current || !containerRef.current) return;

      const svg = d3.select(svgRef.current);
      const container = containerRef.current;
      const width = container.clientWidth || 280;
      const height = container.clientHeight || 180;

      svg
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", "100%")
        .attr("height", "100%");

      const projection = d3
        .geoMercator()
        .center([82.8, 22.5])
        .scale(width * 1.1)
        .translate([width / 2, height / 2]);

      const path = d3.geoPath().projection(projection);

      const topologyData = topology as { objects: Record<string, unknown> };
      const objectKey = Object.keys(topologyData.objects)[0];
      const topoObject = topologyData.objects[objectKey] as Parameters<typeof topojson.feature>[1];
      const geoData = topojson.feature(topologyData as Parameters<typeof topojson.feature>[0], topoObject) as { features: Array<{ properties?: { name?: string } }> };

      svg
        .selectAll<SVGPathElement, (typeof geoData.features)[number]>("path")
        .data(geoData.features)
        .join("path")
        .attr("d", (d) => path(d as Parameters<typeof path>[0]) ?? "")
        .attr("fill", (d) => {
          const name = d.properties?.name ?? "";
          return (STATE_AQI[name] ?? DEFAULT_AQI).color;
        })
        .attr("fill-opacity", 0.75)
        .attr("stroke", "rgba(255,255,255,0.15)")
        .attr("stroke-width", 0.5)
        .style("cursor", "pointer")
        .style("transition", "fill-opacity 0.2s")
        .on("mouseenter", function (event: MouseEvent, d: typeof geoData.features[number]) {
          const name = d.properties?.name ?? "Estado";
          const data = STATE_AQI[name] ?? DEFAULT_AQI;
          d3.select(this).attr("fill-opacity", 1);

          if (tooltipRef.current && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            tooltipRef.current.style.opacity = "1";
            tooltipRef.current.style.left = `${Math.min(x + 8, rect.width - 130)}px`;
            tooltipRef.current.style.top = `${Math.max(y - 30, 4)}px`;
            tooltipRef.current.textContent = `${name}: ${data.aqi} (${data.label})`;
          }
        })
        .on("mouseleave", function () {
          d3.select(this).attr("fill-opacity", 0.75);
          if (tooltipRef.current) tooltipRef.current.style.opacity = "0";
        });

      const criticalPaths = svg
        .selectAll<SVGPathElement, typeof geoData.features[number]>("path")
        .filter((d: typeof geoData.features[number]) => {
          const name = d.properties?.name ?? "";
          return (STATE_AQI[name]?.aqi ?? 0) > CRITICAL_AQI_THRESHOLD;
        });

      const pulse = () => {
        if (destroyed) return;
        criticalPaths
          .transition().duration(400).attr("fill-opacity", 0.35)
          .transition().duration(400).attr("fill-opacity", 0.75);
      };

      pulse();
      pulseIntervalRef.current = setInterval(pulse, 3000);
    };

    loadMap();

    return () => {
      destroyed = true;
      if (pulseIntervalRef.current) clearInterval(pulseIntervalRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <svg
        ref={svgRef}
        role="img"
        aria-label="Mapa de India con niveles de AQI por estado"
      />

      <div
        ref={tooltipRef}
        className="absolute pointer-events-none font-mono text-[10px] px-2 py-1 rounded"
        style={{
          background: "rgba(0,0,0,0.85)",
          color: "rgba(255,255,255,0.9)",
          opacity: 0,
          transition: "opacity 0.15s",
          whiteSpace: "nowrap",
          zIndex: 10,
        }}
      />

      <div className="absolute bottom-2 left-2 flex items-center gap-2 flex-wrap">
        {AQI_LEGEND.map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
            <span
              className="text-[8px] font-mono"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute top-2 right-2">
        <span
          className="text-[8px] font-mono"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          hover → AQI
        </span>
      </div>
    </div>
  );
}
