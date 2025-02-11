"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Spotlight({
  className,
  fill = "white",
}: {
  className?: string;
  fill?: string;
}) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute inset-0 z-30 transition duration-300 opacity-0 hover:opacity-100",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 z-[-1] bg-transparent">
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${fill}, transparent 40%)`,
          }}
        />
      </div>
    </motion.div>
  );
}
