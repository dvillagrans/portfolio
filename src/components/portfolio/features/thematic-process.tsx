"use client";

import { motion } from "framer-motion";
import { PortfolioProcessStep, resolveText } from "@/data/profiles/types";
import { useI18n } from "@/contexts/i18n-context";
import { useProfile } from "@/contexts/profile-context";
import { resolveIcon } from "../icon-map";
import { cn } from "@/lib/utils";
import { ArrowRight, RefreshCw, GitMerge, Search } from "lucide-react";

interface ThematicProcessProps {
    steps: PortfolioProcessStep[];
}

export function ThematicProcess({ steps }: ThematicProcessProps) {
    const { profile } = useProfile();
    const { language } = useI18n();

    const commonProps = { steps, language };

    switch (profile) {
        case "data-engineer":
            return <DataEngineerDAG {...commonProps} />;
        case "devops-engineer":
            return <DevOpsInfinityLoop {...commonProps} />;
        case "ml-engineer":
            return <MLFeedbackLoop {...commonProps} />;
        case "data-analyst":
            return <AnalystFunnel {...commonProps} />;
        default:
            return <DefaultProcess {...commonProps} />;
    }
}

// --- 1. Data Engineer: DAG Visualization ---
function DataEngineerDAG({ steps, language }: any) {
    return (
        <div className="relative flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            {/* Connecting Line (Desktop) */}
            <div className="absolute left-0 top-8 hidden h-0.5 w-full bg-white/10 md:block">
                <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </div>

            {steps.map((step: PortfolioProcessStep, index: number) => (
                <motion.div
                    key={index}
                    className="relative z-10 flex flex-1 flex-col gap-4 md:items-center md:text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                >
                    {/* Node */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-black shadow-xl transition-transform hover:scale-110">
                        <div className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-lg",
                            index === 0 ? "bg-blue-500/20 text-blue-400" :
                                index === 1 ? "bg-purple-500/20 text-purple-400" :
                                    "bg-emerald-500/20 text-emerald-400"
                        )}>
                            {resolveIcon(step.icon, "h-5 w-5")}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm md:w-full md:max-w-[280px]">
                        <h3 className="mb-2 font-semibold text-white">{resolveText(step.title, language)}</h3>
                        <p className="text-sm text-white/60">{resolveText(step.description, language)}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

// --- 2. DevOps Engineer: Infinity Loop (Simplified) ---
function DevOpsInfinityLoop({ steps, language }: any) {
    return (
        <div className="relative grid gap-8 md:grid-cols-3">
            {/* Loop SVG Background */}
            <svg className="absolute inset-0 -z-10 h-full w-full opacity-20" viewBox="0 0 800 200" preserveAspectRatio="none">
                <path
                    d="M 100 100 C 100 100, 200 0, 400 100 C 600 200, 700 100, 700 100"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    strokeDasharray="10 10"
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                </defs>
            </svg>

            {steps.map((step: PortfolioProcessStep, index: number) => (
                <motion.div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md transition-all hover:border-white/20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                >
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/80">
                            {resolveIcon(step.icon, "h-5 w-5")}
                        </div>
                        <span className="font-mono text-xs text-white/30">0{index + 1}</span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">{resolveText(step.title, language)}</h3>
                    <p className="text-sm text-white/60">{resolveText(step.description, language)}</p>

                    {/* Animated Border on Hover */}
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-emerald-500 opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.div>
            ))}
        </div>
    );
}

// --- 3. ML Engineer: Feedback Loop ---
function MLFeedbackLoop({ steps, language }: any) {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step: PortfolioProcessStep, index: number) => (
                <motion.div
                    key={index}
                    className="relative flex flex-col rounded-2xl border border-purple-500/20 bg-purple-950/10 p-6 backdrop-blur-sm"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                >
                    {/* Connector Arrow */}
                    {index < steps.length - 1 && (
                        <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-500/20 p-1 md:block">
                            <ArrowRight className="h-4 w-4 text-purple-400" />
                        </div>
                    )}

                    {/* Last item loops back visual hint */}
                    {index === steps.length - 1 && (
                        <div className="absolute -bottom-3 left-1/2 z-10 hidden -translate-x-1/2 translate-y-1/2 rounded-full bg-purple-500/20 p-1 md:block">
                            <RefreshCw className="h-4 w-4 text-purple-400" />
                        </div>
                    )}

                    <div className="mb-4 inline-flex w-fit rounded-lg bg-purple-500/20 p-2 text-purple-300">
                        {resolveIcon(step.icon, "h-5 w-5")}
                    </div>

                    <h3 className="mb-2 text-lg font-semibold text-white">{resolveText(step.title, language)}</h3>
                    <p className="text-sm text-white/60">{resolveText(step.description, language)}</p>

                    <div className="mt-4 border-t border-white/5 pt-4">
                        <p className="text-xs font-medium text-purple-300/70">{resolveText(step.detail, language)}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

// --- 4. Data Analyst: Funnel / Insight Generation ---
function AnalystFunnel({ steps, language }: any) {
    return (
        <div className="flex flex-col gap-4">
            {steps.map((step: PortfolioProcessStep, index: number) => (
                <motion.div
                    key={index}
                    className="relative flex items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    // Funnel width effect
                    style={{
                        marginLeft: `${index * 2}rem`,
                        marginRight: `${index * 2}rem`
                    }}
                >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                        {resolveIcon(step.icon, "h-6 w-6")}
                    </div>

                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{resolveText(step.title, language)}</h3>
                        <p className="text-sm text-white/60">{resolveText(step.description, language)}</p>
                    </div>

                    <div className="hidden text-right text-xs text-white/40 md:block">
                        Step 0{index + 1}
                    </div>
                </motion.div>
            ))}

            {/* Result Box */}
            <motion.div
                className="mx-auto mt-4 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 py-2 text-emerald-400"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
            >
                <Search className="h-4 w-4" />
                <span className="text-sm font-medium">Actionable Insight</span>
            </motion.div>
        </div>
    );
}

// --- Default Fallback ---
function DefaultProcess({ steps, language }: any) {
    return (
        <ol className="relative grid gap-6 md:grid-cols-3">
            {steps.map((step: PortfolioProcessStep, index: number) => (
                <motion.li
                    key={resolveText(step.title, language)}
                    className="group relative rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.08]"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <div className="absolute inset-x-0 -top-[1px] h-[3px] rounded-full bg-gradient-to-r from-[hsla(var(--portfolio-primary),0.6)] to-[hsla(var(--portfolio-accent),0.5)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="flex items-center justify-between">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white">
                            {index + 1}
                        </span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsla(var(--portfolio-primary),0.12)] text-white/80">
                            {resolveIcon(step.icon, "h-5 w-5")}
                        </span>
                    </div>
                    <div className="mt-6 space-y-3">
                        <h3 className="text-xl font-semibold text-white">
                            {resolveText(step.title, language)}
                        </h3>
                        <p className="text-sm text-white/70">{resolveText(step.description, language)}</p>
                        <p className="text-sm text-white/55">{resolveText(step.detail, language)}</p>
                    </div>
                </motion.li>
            ))}
        </ol>
    );
}
