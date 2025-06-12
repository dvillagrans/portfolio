import React from "react";
import IconCloud from "@/components/magicui/icon-cloud";
import { DATA } from "@/data/resume";

export function IconCloudDemo() {
  const skillsMutable = DATA.skills.map(skill => skill.toLowerCase()); // Copia mutable del array y convierte a minúsculas
  return (
    <div className="relative flex h-full w-full max-w-[28rem] items-center justify-center overflow-hidden rounded-lg bg-transparent px-12 pb-4 pt-6">
      <IconCloud iconSlugs={skillsMutable} />
    </div>
  );
}
