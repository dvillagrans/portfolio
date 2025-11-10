'use client';

import { IconCloud } from "@/components/ui/icon-cloud";
import { motion } from "framer-motion";

interface TechSphereProps {
  coreTools: string[];
  ecosystemTools: string[];
}

// Create SVG icons for each tool
function createToolIcon(name: string, isCore: boolean) {
  const size = isCore ? 80 : 60;
  const fontSize = isCore ? 14 : 11;
  const padding = isCore ? 12 : 8;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      key={name}
    >
      {/* Background */}
      <rect
        x="0"
        y="0"
        width={size}
        height={size}
        rx={isCore ? 16 : 12}
        fill={isCore ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.06)'}
        stroke={isCore ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)'}
        strokeWidth={isCore ? 2 : 1}
      />

      {/* Glow effect for core tools */}
      {isCore && (
        <rect
          x="0"
          y="0"
          width={size}
          height={size}
          rx={16}
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="4"
          filter="blur(8px)"
        />
      )}

      {/* Text */}
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill="white"
        fontSize={fontSize}
        fontWeight={isCore ? 700 : 600}
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {name}
      </text>
    </svg>
  );
}

export function TechSphere({ coreTools, ecosystemTools }: TechSphereProps) {
  // Create icon nodes for IconCloud
  const toolIcons = [
    ...coreTools.map(tool => createToolIcon(tool, true)),
    ...ecosystemTools.map(tool => createToolIcon(tool, false))
  ];

  return (
    <motion.div
      className="relative flex items-center justify-center py-8"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[350px] w-[350px] rounded-full bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent blur-3xl" />
      </div>

      {/* Main container */}
      <div className="relative">
        {/* Icon Cloud */}
        <div className="relative z-10">
          <IconCloud icons={toolIcons} />
        </div>

        {/* Interaction hint */}
        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/40"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          Arrastra para rotar • Click para centrar
        </motion.div>
      </div>
    </motion.div>
  );
}
