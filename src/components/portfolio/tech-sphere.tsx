'use client';

import { IconCloud } from "@/components/ui/icon-cloud";
import { motion } from "framer-motion";

import { createToolIconNode } from "./tool-icon-utils";

interface TechSphereProps {
  coreTools: string[];
  ecosystemTools: string[];
}

export function TechSphere({ coreTools, ecosystemTools }: TechSphereProps) {
  // Create icon nodes for IconCloud
  const toolIcons = [
    ...coreTools.map((tool, index) =>
      createToolIconNode(tool, { variant: "core", accentIndex: index }),
    ),
    ...ecosystemTools.map((tool, index) =>
      createToolIconNode(tool, { variant: "default", accentIndex: index }),
    ),
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
