"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

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
  const particlesIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    let destroyed = false;

    const loadMap = async () => {
      if (destroyed) return;

      const TOPO_URL = "/data/india.topo.json";
      
      let topology: any;
      try {
        const response = await fetch(TOPO_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        topology = await response.json();
      } catch (err) {
        console.error("IndiaAQIViz: Error loading map data:", err);
        if (svgRef.current && !destroyed) {
          svgRef.current.innerHTML = `<text x="50%" y="50%" text-anchor="middle" font-family="monospace" font-size="11" fill="rgba(255,255,255,0.5)">India AQI Map (Error Loading)</text>`;
        }
        return;
      }

      if (destroyed || !svgRef.current || !containerRef.current) return;

      const svg = d3.select(svgRef.current);
      const container = containerRef.current;
      const width = container.clientWidth || 280;
      const height = container.clientHeight || 180;

      // Reset and add Filters for Glow and Pollution
      svg.selectAll("*").remove();
      const defs = svg.append("defs");

      // State hover glow
      const stateFilter = defs.append("filter").attr("id", "state-glow").attr("x", "-30%").attr("y", "-30%").attr("width", "160%").attr("height", "160%");
      stateFilter.append("feGaussianBlur").attr("in", "SourceAlpha").attr("stdDeviation", "3").attr("result", "blur");
      stateFilter.append("feOffset").attr("in", "blur").attr("dx", "0").attr("dy", "0").attr("result", "offsetBlur");
      stateFilter.append("feFlood").attr("flood-color", "white").attr("flood-opacity", "0.5").attr("result", "color");
      stateFilter.append("feComposite").attr("in", "color").attr("in2", "offsetBlur").attr("operator", "in").attr("result", "shadow");
      stateFilter.append("feMerge").selectAll("feMergeNode").data(["shadow", "SourceGraphic"]).enter().append("feMergeNode").attr("in", (d: string) => d);

      // Particle blur
      const particleFilter = defs.append("filter").attr("id", "particle-blur");
      particleFilter.append("feGaussianBlur").attr("stdDeviation", "1.5");

      // Pollution particle glow
      const particleGlow = defs.append("filter").attr("id", "particle-glow");
      particleGlow.append("feGaussianBlur").attr("in", "SourceGraphic").attr("stdDeviation", "2").attr("result", "blur");
      particleGlow.append("feMerge").selectAll("feMergeNode").data(["blur", "SourceGraphic"]).enter().append("feMergeNode").attr("in", (d: string) => d);

      svg.attr("viewBox", `0 0 ${width} ${height}`).attr("width", "100%").attr("height", "100%");

      const topologyData = topology;
      const objectKey = Object.keys(topologyData.objects)[0];
      const topoObject = topologyData.objects[objectKey];
      const geoData = topojson.feature(topologyData, topoObject as any) as any;

      // Filter islands for zoom fitting
      const mainland = {
        ...geoData,
        features: geoData.features.filter((f: any) => {
          const name = f.properties?.name || "";
          return !name.includes("Andaman") && !name.includes("Lakshadweep");
        })
      };

      // Zoom calculation: boost scale by focusing on mainland and adding "negative" padding
      const pad = 12;
      const projection = d3.geoMercator().fitExtent([[pad - 15, pad - 15], [width - pad + 15, height - pad + 15]], mainland as any);
      const path = d3.geoPath().projection(projection);

      const states = svg
        .selectAll("path")
        .data(geoData.features)
        .join("path")
        .attr("d", (d: any) => path(d) ?? "")
        .attr("fill", (d: any) => (STATE_AQI[d.properties?.name] ?? DEFAULT_AQI).color)
        .attr("fill-opacity", 0)
        .attr("stroke", "rgba(255,255,255,0.2)")
        .attr("stroke-width", 0.5)
        .attr("class", (d: any) => `state-${(STATE_AQI[d.properties?.name] ?? DEFAULT_AQI).label.toLowerCase().replace(".", "")}`)
        .style("cursor", "pointer")
        .style("transition", "fill-opacity 0.4s, stroke 0.4s, filter 0.3s")
        .on("mouseenter", function (event: MouseEvent, d: any) {
          const name = d.properties?.name ?? "Estado";
          const data = STATE_AQI[name] ?? DEFAULT_AQI;
          
          d3.select(this)
            .attr("fill-opacity", 1)
            .attr("stroke", "rgba(255,255,255,0.8)")
            .style("filter", "url(#state-glow)");

          if (tooltipRef.current && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            tooltipRef.current.style.opacity = "1";
            tooltipRef.current.style.left = `${Math.min(x + 12, rect.width - 140)}px`;
            tooltipRef.current.style.top = `${Math.max(y - 45, 10)}px`;
            tooltipRef.current.innerHTML = `
              <div style="display:flex; flex-direction:column; gap:3px">
                <div style="display:flex; align-items:center; gap:6px; margin-bottom:2px">
                  <div style="width:7px; height:7px; border-radius:50%; background:${data.color}; box-shadow: 0 0 8px ${data.color}"></div>
                  <span style="color:${data.color}; font-weight:700; font-size:12px; text-transform:uppercase; letter-spacing:0.05em">${name}</span>
                </div>
                <div style="display:flex; align-items:baseline; gap:4px">
                  <span style="font-size:18px; font-weight:900; color:white; line-height:1">${data.aqi}</span>
                  <span style="font-size:9px; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:0.05em">AQI</span>
                </div>
                <div style="font-size:8px; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:0.08em; padding:2px 6px; border-radius:3px; background:${data.color}15; border:0.5px solid ${data.color}25; display:inline-block; width:fit-content">
                  ${data.label}
                </div>
              </div>
            `;
          }
        })
        .on("mouseleave", function () {
          d3.select(this)
            .attr("fill-opacity", 0.75)
            .attr("stroke", "rgba(255,255,255,0.2)")
            .style("filter", null);
          if (tooltipRef.current) tooltipRef.current.style.opacity = "0";
        });

      // Drawing animation
      states
        .attr("stroke-dasharray", function() { return (this as any).getTotalLength(); })
        .attr("stroke-dashoffset", function() { return (this as any).getTotalLength(); })
        .transition()
        .duration(1500)
        .delay((d, i) => i * 30)
        .ease(d3.easeCubicOut)
        .attr("stroke-dashoffset", 0)
        .transition()
        .duration(800)
        .attr("fill-opacity", 0.75);

      // Delhi floating label
      const delhiFeature = geoData.features.find((f: any) => f.properties?.name === "Delhi");
      if (delhiFeature) {
        const centroid = path.centroid(delhiFeature);
        const labelGroup = svg.append("g").attr("transform", `translate(${centroid[0] + 6}, ${centroid[1] - 4})`).style("opacity", 0);

        svg.append("circle")
          .attr("cx", centroid[0])
          .attr("cy", centroid[1])
          .attr("r", 0)
          .attr("fill", "#c084fc")
          .attr("stroke", "#ffffff")
          .attr("stroke-width", 0.8)
          .transition()
          .delay(2000)
          .duration(500)
          .attr("r", 3);

        labelGroup.transition().delay(2200).duration(500).style("opacity", 1);
        labelGroup.append("rect").attr("x", -2).attr("y", -11).attr("width", 68).attr("height", 14).attr("rx", 3).attr("fill", "rgba(0,0,0,0.85)");
        labelGroup.append("text").attr("x", 4).attr("y", 0).attr("font-size", "8px").attr("font-family", "monospace").attr("fill", "#c084fc").text("Delhi · 312 AQI");
      }

      // Pulse for critical states
      const pulse = () => {
        if (destroyed) return;
        svg.selectAll("path")
          .filter((d: any) => (STATE_AQI[d.properties?.name]?.aqi ?? 0) > CRITICAL_AQI_THRESHOLD)
          .transition()
          .duration(800)
          .attr("fill-opacity", 0.3)
          .transition()
          .duration(800)
          .attr("fill-opacity", 0.85);
      };

      pulseIntervalRef.current = setInterval(pulse, 3000);

      // Pollution particles over critical states
      const particlesGroup = svg.append("g").attr("filter", "url(#particle-glow)");
      const criticalStates = geoData.features.filter((f: any) => {
        const d = STATE_AQI[f.properties?.name];
        return d && d.aqi > CRITICAL_AQI_THRESHOLD;
      });

      const pollutionParticles: { id: number; cx: number; cy: number; life: number; maxLife: number; size: number; color: string }[] = [];

      const addParticle = (cx: number, cy: number, color: string) => {
        pollutionParticles.push({
          id: Math.random(),
          cx,
          cy,
          life: 0,
          maxLife: 60 + Math.random() * 80,
          size: 1 + Math.random() * 2.5,
          color,
        });
      };

      const updateParticles = () => {
        if (destroyed) return;
        criticalStates.forEach((f: any) => {
          const centroid = path.centroid(f);
          const d = STATE_AQI[f.properties?.name];
          if (d && Math.random() < 0.25) {
            addParticle(centroid[0] + (Math.random() - 0.5) * 30, centroid[1] + (Math.random() - 0.5) * 20, d.color);
          }
        });

        const circles = particlesGroup.selectAll("circle").data(pollutionParticles, (d: any) => d.id);

        circles.join(
          (enter) =>
            enter
              .append("circle")
              .attr("cx", (d: any) => d.cx)
              .attr("cy", (d: any) => d.cy)
              .attr("r", 0)
              .attr("fill", (d: any) => d.color)
              .attr("opacity", 0.6)
              .call((sel) =>
                sel
                  .transition()
                  .duration(300)
                  .attr("r", (d: any) => d.size)
              ),
          (update) =>
            update
              .attr("cx", (d: any) => d.cx)
              .attr("cy", (d: any) => d.cy),
          (exit) =>
            exit
              .transition()
              .duration(600)
              .attr("r", 0)
              .attr("opacity", 0)
              .remove()
        );

        pollutionParticles.forEach((p) => {
          p.life++;
          p.cy -= 0.3;
          p.cx += (Math.random() - 0.5) * 0.5;
        });

        for (let i = pollutionParticles.length - 1; i >= 0; i--) {
          if (pollutionParticles[i].life > pollutionParticles[i].maxLife) {
            pollutionParticles.splice(i, 1);
          }
        }
      };

      particlesIntervalRef.current = setInterval(updateParticles, 50);
    };

    loadMap();

    return () => {
      destroyed = true;
      if (pulseIntervalRef.current) clearInterval(pulseIntervalRef.current);
      if (particlesIntervalRef.current) clearInterval(particlesIntervalRef.current);
    };
  }, []);

  // Effect to handle legend hover
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    if (hoveredCategory) {
      const targetLabel = hoveredCategory.toLowerCase().replace(".", "");
      svg.selectAll("path")
        .transition().duration(300)
        .attr("fill-opacity", function() {
          return d3.select(this).classed(`state-${targetLabel}`) ? 1 : 0.15;
        })
        .attr("stroke", function() {
          return d3.select(this).classed(`state-${targetLabel}`) ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.05)";
        });
    } else {
      svg.selectAll("path")
        .transition().duration(300)
        .attr("fill-opacity", 0.75)
        .attr("stroke", "rgba(255,255,255,0.2)");
    }
  }, [hoveredCategory]);

  return (
    <div ref={containerRef} className="relative w-full h-full group/map overflow-hidden">
      <svg
        ref={svgRef}
        role="img"
        aria-label="Mapa de India con niveles de AQI por estado"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full transition-transform duration-700 group-hover/map:scale-[1.02]"
      />

      <div
        ref={tooltipRef}
        className="absolute pointer-events-none font-mono text-[10px] px-3 py-2 rounded-lg border border-white/10 shadow-2xl"
        style={{
          background: "rgba(10,10,10,0.95)",
          backdropFilter: "blur(8px)",
          color: "rgba(255,255,255,0.9)",
          opacity: 0,
          transition: "opacity 0.2s, transform 0.2s",
          whiteSpace: "nowrap",
          zIndex: 50,
        }}
      />

      <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 max-w-[80%]">
        {AQI_LEGEND.map(({ color, label }) => (
          <div 
            key={label} 
            className={`flex items-center gap-1.5 px-2 py-1 rounded-full border transition-all duration-300 cursor-help ${
              hoveredCategory === label ? "bg-white/10 border-white/20 scale-110" : "bg-black/20 border-transparent hover:bg-white/5"
            }`}
            onMouseEnter={() => setHoveredCategory(label)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
            <span className="text-[9px] font-mono font-bold tracking-tight" style={{ color: hoveredCategory === label ? "white" : "rgba(255,255,255,0.4)" }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
        <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-white/20 uppercase">
          Live Air Quality Data
        </span>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
          <span className="text-[8px] font-mono text-white/40">
            Real-time IOT Cluster
          </span>
        </div>
      </div>
    </div>
  );
}
