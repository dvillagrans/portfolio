"use client";

import { useState, useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  type NodeTypes,
  type EdgeTypes,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import PipelineNode from "./PipelineNode";
import { systemANodes, systemAEdges } from "@/data/systemA";
import { systemBNodes, systemBEdges } from "@/data/systemB";

const nodeTypes: NodeTypes = {
  pipeline: PipelineNode,
};

function FlowCanvas({
  initialNodes,
  initialEdges,
}: {
  initialNodes: Parameters<typeof useNodesState>[0];
  initialEdges: Parameters<typeof useEdgesState>[0];
}) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <ReactFlow
      id="eyenet-flow"
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.15 }}
      minZoom={0.2}
      maxZoom={1.5}
      proOptions={{ hideAttribution: true }}
      className="bg-transparent"
    >
      <Background color="rgba(255,255,255,0.08)" gap={20} size={1} />
      <MiniMap
        className="!bg-graphite/80 !border-white/10 !rounded-xl"
        nodeColor={(node) => {
          const type = (node.data?.nodeType as string) || "transform";
          const map: Record<string, string> = {
            trigger: "#10b981",
            ai: "#0ea5e9",
            storage: "#f43f5e",
            output: "#f59e0b",
            logic: "#c026d3",
            transform: "#888888",
          };
          return map[type] || "#888";
        }}
        maskColor="rgba(0,0,0,0.7)"
      />
    </ReactFlow>
  );
}

export default function PipelineFlow({ lang }: { lang: "en" | "es" }) {
  const [activeSystem, setActiveSystem] = useState<"A" | "B">("A");

  const aNodes = useMemo(() => systemANodes, []);
  const aEdges = useMemo(() => systemAEdges, []);
  const bNodes = useMemo(() => systemBNodes, []);
  const bEdges = useMemo(() => systemBEdges, []);

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveSystem("A")}
          className={`px-5 py-2.5 rounded-xl font-mono text-[11px] uppercase tracking-widest font-bold transition-all duration-300 border ${
            activeSystem === "A"
              ? "bg-white/[0.06] border-white/15 text-white"
              : "bg-transparent border-transparent text-white/30 hover:text-white/60"
          }`}
        >
          {lang === "en" ? "System A" : "Sistema A"}
          <span className="block text-[9px] text-white/20 font-normal mt-0.5 normal-case tracking-normal">
            {lang === "en" ? "Document Processing" : "Procesamiento de Documentos"}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSystem("B")}
          className={`px-5 py-2.5 rounded-xl font-mono text-[11px] uppercase tracking-widest font-bold transition-all duration-300 border ${
            activeSystem === "B"
              ? "bg-white/[0.06] border-white/15 text-white"
              : "bg-transparent border-transparent text-white/30 hover:text-white/60"
          }`}
        >
          {lang === "en" ? "System B" : "Sistema B"}
          <span className="block text-[9px] text-white/20 font-normal mt-0.5 normal-case tracking-normal">
            {lang === "en" ? "AI Assistant" : "Asistente de IA"}
          </span>
        </button>
      </div>

      {/* Flow container */}
      <div className="h-[500px] md:h-[600px] rounded-2xl border border-white/[0.06] bg-black/20 overflow-hidden relative">
        <ReactFlowProvider key={activeSystem}>
          <FlowCanvas
            initialNodes={activeSystem === "A" ? aNodes : bNodes}
            initialEdges={activeSystem === "A" ? aEdges : bEdges}
          />
        </ReactFlowProvider>

        {/* Scroll hint for mobile */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 md:hidden">
          <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {lang === "en" ? "Pinch to zoom · Drag to pan" : "Pellizca para zoom · Arrastra para mover"}
          </span>
        </div>
      </div>
    </div>
  );
}
