import React from "react";
import IconCloud from "@/components/magicui/icon-cloud";
import { DATA } from "@/data/resume";

export function IconCloudDemo() {
  const skillsMutable = DATA.skills.map(skill => skill.toLowerCase()); // Copia mutable del array y convierte a minúsculas
  return (
    <div className="relative flex h-full w-full max-w-[34rem] items-center justify-center overflow-hidden rounded-lg bg-transparent px-20 pb-5 pt-8">
      <IconCloud iconSlugs={skillsMutable} />
    </div>
  );
}
