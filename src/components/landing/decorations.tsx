"use client";

import { forwardRef, useRef } from "react";
import {
    Rocket,
    Database,
    Cloud,
    Container,
    Server,
    Boxes,
    TrendingUp,
    Code2,
    BarChart3,
    FileText,
    GitBranch,
    Activity
} from "lucide-react";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";

// Circle component for beam nodes (like Magic UI examples)
export const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-background p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
                className
            )}
        >
            {children}
        </div>
    );
});

Circle.displayName = "Circle";

export const InfrastructureDecoration = () => {
    return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {/* Deep green gradient base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b2415] via-[#123e25] to-[#07180e]" />

            {/* Server/Cloud icons background */}
            <div className="absolute top-4 left-4 opacity-5">
                <Rocket className="w-24 h-24 text-emerald-300" />
            </div>

            <div className="absolute bottom-6 right-6 opacity-5">
                <Database className="w-26 h-26 text-emerald-400" />
            </div>

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(143,240,178,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(143,240,178,0.05) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                }}
            />

            {/* Orbiting microservices con iconos */}
            <div className="relative flex h-full w-full items-center justify-center scale-75 sm:scale-90 lg:scale-100">
                {/* Center glow con icono */}
                <div className="size-12 rounded-full border-2 border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm flex items-center justify-center sm:size-14 lg:size-16">
                    <Cloud className="w-5 h-5 text-emerald-400 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                </div>

                {/* Inner orbit con iconos */}
                <OrbitingCircles
                    className="size-6 border-none bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center sm:size-7 lg:size-8"
                    duration={20}
                    delay={0}
                    radius={50}
                >
                    <Container className="w-2.5 h-2.5 text-emerald-300 sm:w-3 sm:h-3" />
                </OrbitingCircles>
                <OrbitingCircles
                    className="size-6 border-none bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center sm:size-7 lg:size-8"
                    duration={20}
                    delay={10}
                    radius={50}
                >
                    <Database className="w-2.5 h-2.5 text-emerald-300 sm:w-3 sm:h-3" />
                </OrbitingCircles>

                {/* Outer orbit con iconos */}
                <OrbitingCircles
                    className="size-8 border-none bg-emerald-400/15 backdrop-blur-sm flex items-center justify-center sm:size-9 lg:size-10"
                    duration={30}
                    delay={0}
                    radius={80}
                    reverse
                >
                    <Server className="w-3 h-3 text-emerald-300 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                </OrbitingCircles>
                <OrbitingCircles
                    className="size-8 border-none bg-emerald-400/15 backdrop-blur-sm flex items-center justify-center sm:size-9 lg:size-10"
                    duration={30}
                    delay={15}
                    radius={80}
                    reverse
                >
                    <Boxes className="w-3 h-3 text-emerald-300 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                </OrbitingCircles>
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#123e25]/30 to-[#07180e]/70" />
        </div>
    );
};

export const DataAnalystDecoration = () => {
    return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8">
            {/* Orange gradient base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2d1a10] via-[#3c200c] to-[#211209]" />

            {/* Chart/Analytics icons background */}
            <div className="absolute top-2 right-2 opacity-5 sm:top-3 sm:right-3 md:top-4 md:right-4">
                <TrendingUp className="w-20 h-20 text-amber-300 sm:w-24 sm:h-24 md:w-32 md:h-32" />
            </div>

            <div className="absolute bottom-3 left-3 opacity-5 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6">
                <Database className="w-16 h-16 text-amber-400 sm:w-20 sm:h-20 md:w-24 md:h-24" />
            </div>

            {/* Dot pattern */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: "radial-gradient(rgba(244,184,96,0.4) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                }}
            />

            {/* Dashboard visualization - sin íconos */}
            <div className="relative grid h-full w-full grid-cols-3 grid-rows-3 gap-1 p-3 sm:gap-1.5 sm:p-4 md:gap-2 md:p-6">
                {/* Main chart */}
                <div className="col-span-2 row-span-2 rounded-md border border-amber-500/20 bg-amber-950/30 backdrop-blur-sm p-1.5 sm:p-2 md:p-3 md:rounded-lg">
                    <div className="mb-1 sm:mb-1.5 md:mb-2">
                        <div className="h-0.5 w-10 bg-amber-500/30 rounded sm:h-0.5 sm:w-12 md:h-1 md:w-16" />
                    </div>
                    <div className="space-y-0.5 sm:space-y-0.5 md:space-y-1">
                        {[60, 80, 45, 90].map((height, i) => (
                            <div key={i} className="flex items-end gap-0.5 h-2 sm:h-2.5 md:h-3">
                                <div
                                    className="bg-amber-500/40 rounded-sm transition-all"
                                    style={{ width: '20%', height: `${height}%` }}
                                />
                                <div
                                    className="bg-amber-500/30 rounded-sm transition-all"
                                    style={{ width: '20%', height: `${height * 0.7}%` }}
                                />
                                <div
                                    className="bg-amber-500/20 rounded-sm transition-all"
                                    style={{ width: '20%', height: `${height * 0.5}%` }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Small metric cards */}
                <div className="row-span-1 rounded-md border border-amber-500/20 bg-amber-950/30 backdrop-blur-sm p-1 sm:p-1.5 md:p-2 md:rounded-lg">
                    <div className="space-y-0.5">
                        <div className="h-0.5 w-full bg-amber-500/30 rounded" />
                        <div className="h-0.5 w-3/4 bg-amber-500/20 rounded" />
                    </div>
                </div>

                <div className="row-span-1 rounded-md border border-amber-500/20 bg-amber-950/30 backdrop-blur-sm p-1 sm:p-1.5 md:p-2 md:rounded-lg">
                    <div className="space-y-0.5">
                        <div className="h-0.5 w-full bg-amber-500/30 rounded" />
                        <div className="h-0.5 w-2/3 bg-amber-500/20 rounded" />
                    </div>
                </div>

                {/* Data table */}
                <div className="col-span-3 row-span-1 rounded-md border border-amber-500/20 bg-amber-950/30 backdrop-blur-sm p-1 sm:p-1.5 md:p-2 md:rounded-lg">
                    <div className="space-y-0.5 sm:space-y-0.5 md:space-y-1">
                        {[100, 85, 70].map((width, i) => (
                            <div key={i} className="h-0.5 rounded" style={{ width: `${width}%`, background: 'rgba(244,184,96,0.25)' }} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3c200c]/30 to-[#211209]/70" />
        </div>
    );
};

export const DataPipelinesDecoration = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const dbRef = useRef<HTMLDivElement | null>(null);
    const pythonRef = useRef<HTMLDivElement | null>(null);
    const apiRef = useRef<HTMLDivElement | null>(null);
    const dashboardRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={containerRef} className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Deep cyan/blue gradient base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0e223a] via-[#08243d] to-[#031726]" />

            {/* Database icon background */}
            <div className="absolute top-2 left-2 opacity-5 sm:top-3 sm:left-3 md:top-4 md:left-4">
                <Database className="w-16 h-16 text-cyan-400 sm:w-20 sm:h-20 md:w-24 md:h-24" />
            </div>

            {/* Code icon background */}
            <div className="absolute bottom-4 right-4 opacity-5 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6">
                <Code2 className="w-20 h-20 text-cyan-300 sm:w-24 sm:h-24 md:w-28 md:h-28" />
            </div>

            {/* Grain texture */}
            <div
                className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)",
                    backgroundSize: "12px 12px, 16px 16px",
                    backgroundPosition: "0 0, 6px 6px",
                }}
            />

            {/* Data pipeline nodes con iconos */}
            <div className="relative flex w-full max-w-xs sm:max-w-md md:max-w-lg flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-10 scale-90 sm:scale-95 md:scale-100">
                <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                    <div ref={dbRef} className="size-8 rounded-full border-2 border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm flex items-center justify-center sm:size-10 md:size-12">
                        <Database className="w-3.5 h-3.5 text-cyan-400 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </div>
                    <div ref={pythonRef} className="size-8 rounded-full border-2 border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm flex items-center justify-center sm:size-10 md:size-12">
                        <Code2 className="w-3.5 h-3.5 text-cyan-400 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </div>
                </div>

                <div ref={apiRef} className="size-12 rounded-full border-2 border-cyan-500/40 bg-cyan-500/20 backdrop-blur-sm flex items-center justify-center sm:size-14 md:size-16">
                    <Server className="w-5 h-5 text-cyan-300 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>

                <div ref={dashboardRef} className="size-8 rounded-full border-2 border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm flex items-center justify-center sm:size-10 md:size-12">
                    <BarChart3 className="w-3.5 h-3.5 text-cyan-400 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </div>
            </div>

            {/* Animated Beams */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={dbRef}
                toRef={apiRef}
                curvature={-40}
                endYOffset={-10}
            />

            <AnimatedBeam
                containerRef={containerRef}
                fromRef={pythonRef}
                toRef={apiRef}
                curvature={40}
                endYOffset={10}
            />

            <AnimatedBeam
                containerRef={containerRef}
                fromRef={apiRef}
                toRef={dashboardRef}
                reverse
            />

            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#031726]/35 to-[#010c14]/70" />
        </div>
    );
};

export const MLOpsDecoration = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const notebookRef = useRef<HTMLDivElement | null>(null);
    const gitRef = useRef<HTMLDivElement | null>(null);
    const pipelineRef = useRef<HTMLDivElement | null>(null);
    const prodRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={containerRef} className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Deep purple gradient base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2f1c5e] via-[#1a0f38] to-[#0c071a]" />

            {/* Rocket icon background */}
            <div className="absolute top-3 right-3 opacity-5 sm:top-4 sm:right-4 md:top-6 md:right-6">
                <Rocket className="w-20 h-20 text-purple-300 sm:w-24 sm:h-24 md:w-32 md:h-32" />
            </div>

            {/* Code icon background */}
            <div className="absolute bottom-2 left-2 opacity-5 sm:bottom-3 sm:left-3 md:bottom-4 md:left-4">
                <Code2 className="w-20 h-20 text-purple-400 sm:w-24 sm:h-24 md:w-28 md:h-28" />
            </div>

            {/* Grain texture */}
            <div
                className="absolute inset-0 opacity-[0.1] mix-blend-overlay"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(165,132,255,0.06) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)",
                    backgroundSize: "14px 14px, 18px 18px",
                    backgroundPosition: "0 0, 7px 7px",
                }}
            />

            {/* MLOps pipeline nodes con iconos */}
            <div className="relative flex w-full max-w-xs sm:max-w-md md:max-w-lg flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-10 scale-90 sm:scale-95 md:scale-100">
                <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                    <div ref={notebookRef} className="size-8 rounded-full border-2 border-purple-500/30 bg-purple-500/10 backdrop-blur-sm flex items-center justify-center sm:size-10 md:size-12">
                        <FileText className="w-3.5 h-3.5 text-purple-400 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </div>
                    <div ref={gitRef} className="size-8 rounded-full border-2 border-purple-500/30 bg-purple-500/10 backdrop-blur-sm flex items-center justify-center sm:size-10 md:size-12">
                        <GitBranch className="w-3.5 h-3.5 text-purple-400 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </div>
                </div>

                <div ref={pipelineRef} className="size-12 rounded-full border-2 border-purple-500/40 bg-purple-500/20 backdrop-blur-sm flex items-center justify-center sm:size-14 md:size-16">
                    <Activity className="w-5 h-5 text-purple-300 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>

                <div ref={prodRef} className="size-8 rounded-full border-2 border-purple-500/30 bg-purple-500/10 backdrop-blur-sm flex items-center justify-center sm:size-10 md:size-12">
                    <Rocket className="w-3.5 h-3.5 text-purple-400 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </div>
            </div>

            {/* Animated Beams */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={notebookRef}
                toRef={pipelineRef}
                curvature={-40}
                endYOffset={-10}
            />

            <AnimatedBeam
                containerRef={containerRef}
                fromRef={gitRef}
                toRef={pipelineRef}
                curvature={40}
                endYOffset={10}
            />

            <AnimatedBeam
                containerRef={containerRef}
                fromRef={pipelineRef}
                toRef={prodRef}
                reverse
            />

            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a0f38]/30 to-[#0c071a]/65" />
        </div>
    );
};
