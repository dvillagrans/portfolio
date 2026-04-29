"use client";

import { memo, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";
import {
  Play,
  Code,
  Brain,
  Database,
  Send,
  GitBranch,
} from "lucide-react";

export type PipelineNodeType =
  | "trigger"
  | "transform"
  | "ai"
  | "storage"
  | "output"
  | "logic";

interface PipelineNodeData {
  label: string;
  sublabel: string;
  nodeType: PipelineNodeType;
  tooltip: string;
}

const typeConfig: Record<
  PipelineNodeType,
  {
    icon: React.ReactNode;
    border: string;
    bg: string;
    accent: string;
    glow: string;
  }
> = {
  trigger: {
    icon: <Play size={12} />,
    border: "border-emerald-500/20",
    bg: "bg-emerald-950/30",
    accent: "text-emerald-400",
    glow: "shadow-[0_0_12px_rgba(16,185,129,0.08)]",
  },
  transform: {
    icon: <Code size={12} />,
    border: "border-white/10",
    bg: "bg-white/[0.03]",
    accent: "text-white/50",
    glow: "",
  },
  ai: {
    icon: <Brain size={12} />,
    border: "border-sky-500/20",
    bg: "bg-sky-950/30",
    accent: "text-sky-400",
    glow: "shadow-[0_0_12px_rgba(14,165,233,0.08)]",
  },
  storage: {
    icon: <Database size={12} />,
    border: "border-rose-500/20",
    bg: "bg-rose-950/30",
    accent: "text-rose-400",
    glow: "shadow-[0_0_12px_rgba(244,63,94,0.08)]",
  },
  output: {
    icon: <Send size={12} />,
    border: "border-amber-500/20",
    bg: "bg-amber-950/30",
    accent: "text-amber-400",
    glow: "shadow-[0_0_12px_rgba(245,158,11,0.08)]",
  },
  logic: {
    icon: <GitBranch size={12} />,
    border: "border-fuchsia-500/20",
    bg: "bg-fuchsia-950/30",
    accent: "text-fuchsia-400",
    glow: "shadow-[0_0_12px_rgba(192,38,211,0.08)]",
  },
};

function PipelineNodeComponent(props: NodeProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const data = props.data as unknown as PipelineNodeData;
  const config = typeConfig[data.nodeType];

  return (
    <div
      className={`relative rounded-xl border ${config.border} ${config.bg} ${config.glow} backdrop-blur-sm px-4 py-3 min-w-[140px] transition-all duration-300 hover:scale-105 hover:border-opacity-40 cursor-pointer`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3 rounded-lg bg-graphite border border-white/10 shadow-xl z-50 pointer-events-none">
          <p className="text-[11px] text-white/70 leading-relaxed font-sans">{data.tooltip}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-graphite" />
        </div>
      )}

      {/* Handles */}
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-white/20 !border-none" />
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-white/20 !border-none" />

      <div className="flex items-center gap-2.5">
        <span className={`${config.accent}`}>{config.icon}</span>
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold text-white/90 leading-tight">{data.label}</span>
          <span className="text-[9px] text-white/30 font-mono uppercase tracking-wider">{data.sublabel}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(PipelineNodeComponent);
