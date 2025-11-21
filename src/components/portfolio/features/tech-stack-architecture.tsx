"use client";

import { motion } from "framer-motion";
import { Database, Server, Layers, BarChart3, GitBranch, Terminal, Cloud, Shield, Cpu, Globe } from "lucide-react";
import { PortfolioToolboxGroup } from "@/data/profiles/types";
import { cn } from "@/lib/utils";

interface TechStackArchitectureProps {
    profile: string;
    toolbox: PortfolioToolboxGroup[];
}

export function TechStackArchitecture({ profile, toolbox }: TechStackArchitectureProps) {
    // Helper to find items by group title keyword
    const getItems = (keyword: string) => {
        const group = toolbox.find(g =>
            g.title.en.toLowerCase().includes(keyword.toLowerCase()) ||
            g.title.es.toLowerCase().includes(keyword.toLowerCase())
        );
        return group?.items || [];
    };

    if (profile === "data-engineer") {
        return <DataEngineerStack toolbox={toolbox} />;
    }

    if (profile === "ml-engineer") {
        return <MLEngineerStack toolbox={toolbox} />;
    }

    if (profile === "devops-engineer") {
        return <DevOpsStack toolbox={toolbox} />;
    }

    if (profile === "data-analyst") {
        return <DataAnalystStack toolbox={toolbox} />;
    }

    return null;
}

function StackCard({ title, items, icon: Icon, color, className }: any) {
    return (
        <motion.div
            className={cn(
                "relative flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10",
                className
            )}
            whileHover={{ y: -2 }}
        >
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                <Icon className={cn("h-4 w-4", color)} />
                <span className="text-xs font-semibold uppercase tracking-wider text-white/70">{title}</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {items.map((item: string) => (
                    <span key={item} className="rounded bg-white/5 px-2 py-1 text-[10px] font-medium text-white/80 border border-white/5">
                        {item}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

function DataEngineerStack({ toolbox }: { toolbox: PortfolioToolboxGroup[] }) {
    // Mapping based on Data Engineer groups
    const ingestion = toolbox.find(g => g.title.en.includes("Ingestion"))?.items || [];
    const storage = toolbox.find(g => g.title.en.includes("Storage"))?.items || [];
    const orchestration = toolbox.find(g => g.title.en.includes("Orchestration"))?.items || [];
    const bi = toolbox.find(g => g.title.en.includes("BI"))?.items || [];

    return (
        <div className="relative grid gap-4 md:grid-cols-4 items-start">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 hidden md:block" />

            <StackCard title="Ingest" items={ingestion} icon={Globe} color="text-blue-400" className="z-10" />
            <StackCard title="Store & Model" items={storage} icon={Database} color="text-purple-400" className="z-10" />
            <StackCard title="Orchestrate" items={orchestration} icon={GitBranch} color="text-orange-400" className="z-10" />
            <StackCard title="Serve" items={bi} icon={BarChart3} color="text-emerald-400" className="z-10" />
        </div>
    );
}

function MLEngineerStack({ toolbox }: { toolbox: PortfolioToolboxGroup[] }) {
    // Mapping based on ML Engineer groups (assuming structure)
    // Fallback logic if specific groups aren't found
    const frameworks = toolbox.find(g => g.title.en.includes("Frameworks") || g.title.en.includes("Modeling"))?.items || [];
    const ops = toolbox.find(g => g.title.en.includes("Ops") || g.title.en.includes("Deployment"))?.items || [];
    const data = toolbox.find(g => g.title.en.includes("Data") || g.title.en.includes("Processing"))?.items || [];

    return (
        <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-4">
                <div className="text-center text-xs uppercase tracking-widest text-white/40">Data & Feat. Store</div>
                <StackCard title="Data Processing" items={data} icon={Database} color="text-blue-400" />
            </div>
            <div className="space-y-4">
                <div className="text-center text-xs uppercase tracking-widest text-white/40">Training Loop</div>
                <StackCard title="Model Frameworks" items={frameworks} icon={Cpu} color="text-purple-400" className="border-purple-500/20 bg-purple-500/5" />
            </div>
            <div className="space-y-4">
                <div className="text-center text-xs uppercase tracking-widest text-white/40">Production</div>
                <StackCard title="MLOps & Serving" items={ops} icon={Server} color="text-emerald-400" />
            </div>
        </div>
    );
}

function DevOpsStack({ toolbox }: { toolbox: PortfolioToolboxGroup[] }) {
    const cloud = toolbox.find(g => g.title.en.includes("Cloud") || g.title.en.includes("Infrastructure"))?.items || [];
    const cicd = toolbox.find(g => g.title.en.includes("CI/CD") || g.title.en.includes("Automation"))?.items || [];
    const containers = toolbox.find(g => g.title.en.includes("Container") || g.title.en.includes("Orchestration"))?.items || [];
    const monitoring = toolbox.find(g => g.title.en.includes("Monitoring") || g.title.en.includes("Observability"))?.items || [];

    return (
        <div className="flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-2">
                <StackCard title="Observability" items={monitoring} icon={Activity} color="text-red-400" />
                <StackCard title="CI/CD Pipelines" items={cicd} icon={GitBranch} color="text-orange-400" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <StackCard title="Containerization" items={containers} icon={Layers} color="text-blue-400" />
                <StackCard title="Cloud Infrastructure" items={cloud} icon={Cloud} color="text-cyan-400" />
            </div>
        </div>
    );
}

function DataAnalystStack({ toolbox }: { toolbox: PortfolioToolboxGroup[] }) {
    const viz = toolbox.find(g => g.title.en.includes("Visualization") || g.title.en.includes("BI"))?.items || [];
    const sql = toolbox.find(g => g.title.en.includes("SQL") || g.title.en.includes("Query"))?.items || [];
    const python = toolbox.find(g => g.title.en.includes("Python") || g.title.en.includes("Analysis"))?.items || [];

    return (
        <div className="flex flex-col items-center gap-4">
            <StackCard title="Visualization & Storytelling" items={viz} icon={BarChart3} color="text-pink-400" className="w-full md:w-2/3" />
            <div className="h-8 w-0.5 bg-white/10" />
            <div className="grid w-full gap-4 md:grid-cols-2">
                <StackCard title="Statistical Analysis" items={python} icon={Terminal} color="text-yellow-400" />
                <StackCard title="Data Querying" items={sql} icon={Database} color="text-blue-400" />
            </div>
        </div>
    );
}

import { Activity } from "lucide-react";
