"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface ParticlesDemoProps {
  title: string;
  skills: (string | undefined)[];
}

const ParticlesDemo: React.FC<ParticlesDemoProps> = ({ title, skills }) => {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setColor(theme === "dark" ? "#ffffff" : "#000000");
    }
  }, [theme, mounted]);

  return (
    <div className="relative flex h-[280px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-3xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 mb-2">
        {title}
      </span>
      <span className="text-base text-center text-muted-foreground">
        {skills.join(", ")}
      </span>
    </div>
  );
};

export default ParticlesDemo;
