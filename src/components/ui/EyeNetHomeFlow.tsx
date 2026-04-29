"use client";

import { useMemo } from "react";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import PipelineNode from "./PipelineNode";
import type { Node, Edge } from "@xyflow/react";

const nodeTypes = { pipeline: PipelineNode };

const homeNodes: Node[] = [
  {
    id: "hw",
    type: "pipeline",
    position: { x: 0, y: 20 },
    data: {
      label: "Webhook",
      sublabel: "Ingesta",
      nodeType: "trigger",
      tooltip: "Entry point. Recibe eventos de sistemas externos con payloads sin esquema fijo.",
    },
  },
  {
    id: "hn",
    type: "pipeline",
    position: { x: 170, y: 20 },
    data: {
      label: "Normalize",
      sublabel: "Transform",
      nodeType: "transform",
      tooltip: "Capa de normalización. Resuelve campos faltantes, coerce tipos, valida estructura.",
    },
  },
  {
    id: "ha",
    type: "pipeline",
    position: { x: 340, y: 0 },
    data: {
      label: "AI Agent",
      sublabel: "DeepSeek + Memory",
      nodeType: "ai",
      tooltip: "Agente principal con memoria de chat y Structured Output Parser para JSON consistente.",
    },
  },
  {
    id: "hm",
    type: "pipeline",
    position: { x: 510, y: 20 },
    data: {
      label: "MongoDB",
      sublabel: "Schema-first Storage",
      nodeType: "storage",
      tooltip: "Persistencia diseñada desde el inicio para agregaciones y dashboards de KPIs.",
    },
  },
  {
    id: "hp",
    type: "pipeline",
    position: { x: 680, y: 20 },
    data: {
      label: "PDF",
      sublabel: "puppeteer microservice",
      nodeType: "output",
      tooltip: "Genera PDF del documento procesado vía microservicio headless.",
    },
  },
  {
    id: "ht",
    type: "pipeline",
    position: { x: 850, y: 20 },
    data: {
      label: "Telegram",
      sublabel: "Alert + Confirm",
      nodeType: "output",
      tooltip: "Notificación al operador. Sistema de alertas en tiempo real.",
    },
  },
];

const homeEdges: Edge[] = [
  { id: "he1", source: "hw", target: "hn", animated: true },
  { id: "he2", source: "hn", target: "ha", animated: true },
  { id: "he3", source: "ha", target: "hm", animated: true },
  { id: "he4", source: "hm", target: "hp", animated: true },
  { id: "he5", source: "hp", target: "ht", animated: true },
];

function FlowCanvas() {
  const [nodes, , onNodesChange] = useNodesState(homeNodes);
  const [edges, , onEdgesChange] = useEdgesState(homeEdges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.1 }}
      minZoom={0.5}
      maxZoom={1}
      proOptions={{ hideAttribution: true }}
      className="bg-transparent"
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
    >
      <Background color="#222" gap={24} size={1} />
    </ReactFlow>
  );
}

export default function EyeNetHomeFlow() {
  return (
    <div className="h-[200px] w-full rounded-xl border border-white/[0.05] bg-black/20 overflow-hidden">
      <ReactFlowProvider>
        <FlowCanvas />
      </ReactFlowProvider>
    </div>
  );
}
