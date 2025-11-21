"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle2, Terminal, Activity, Search, ArrowRight, FileJson, ShieldAlert } from "lucide-react";
import { PortfolioProblem, resolveText } from "@/data/profiles/types";
import { useI18n } from "@/contexts/i18n-context";
import { cn } from "@/lib/utils";
import { useProfile } from "@/contexts/profile-context";

interface ThematicProblemCardProps {
    problem: PortfolioProblem;
    index: number;
}

export function ThematicProblemCard({ problem, index }: ThematicProblemCardProps) {
    const { profile } = useProfile();
    const { language } = useI18n();

    const commonProps = {
        problem,
        language,
        index
    };

    switch (profile) {
        case "data-engineer":
            return <DataEngineerProblem {...commonProps} />;
        case "devops-engineer":
            return <DevOpsProblem {...commonProps} />;
        case "ml-engineer":
            return <MLEngineerProblem {...commonProps} />;
        case "data-analyst":
            return <DataAnalystProblem {...commonProps} />;
        default:
            return <DefaultProblem {...commonProps} />;
    }
}

// --- 1. Data Engineer: "Incident Report" Style ---
function DataEngineerProblem({ problem, language }: any) {
    return (
        <motion.div
            className="group relative overflow-hidden rounded-xl border border-red-500/20 bg-red-950/10 p-0 transition-all hover:border-emerald-500/30 hover:bg-emerald-950/10"
            whileHover={{ y: -4 }}
        >
            {/* Header: Incident Status */}
            <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-2">
                <div className="flex items-center gap-2">
                    <div className="flex h-2 w-2">
                        <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-red-400 opacity-75 group-hover:hidden"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500 group-hover:bg-emerald-500 transition-colors"></span>
                    </div>
                    <span className="font-mono text-xs font-medium text-red-400 group-hover:text-emerald-400 transition-colors">
                        <span className="group-hover:hidden">INCIDENT_ACTIVE</span>
                        <span className="hidden group-hover:inline">INCIDENT_RESOLVED</span>
                    </span>
                </div>
                <span className="font-mono text-xs text-white/30">ID: #{Math.floor(Math.random() * 1000) + 2000}</span>
            </div>

            <div className="p-5">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white/90 group-hover:text-white transition-colors">
                        {resolveText(problem.title, language)}
                    </h3>
                </div>

                <div className="relative min-h-[80px]">
                    {/* Problem State (Visible initially) */}
                    <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0">
                        <p className="text-sm text-white/60">
                            <span className="text-red-400 font-mono text-xs mr-2">[ERROR]</span>
                            {resolveText(problem.description, language)}
                        </p>
                    </div>

                    {/* Solution State (Visible on hover) */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="text-sm text-white/80">
                            <span className="text-emerald-400 font-mono text-xs mr-2">[FIX]</span>
                            {resolveText(problem.description, language)}
                        </p>
                    </div>
                </div>

                {/* Metric Footer */}
                {problem.metric && (
                    <div className="mt-4 flex items-center gap-2 rounded bg-white/5 px-3 py-2">
                        <Activity className="h-3 w-3 text-emerald-400" />
                        <span className="text-xs font-medium text-emerald-400">
                            {resolveText(problem.metric, language)}
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

// --- 2. DevOps Engineer: "Terminal Log" Style ---
function DevOpsProblem({ problem, language }: any) {
    return (
        <motion.div
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-black font-mono text-sm"
            whileHover={{ y: -4 }}
        >
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-2">
                <Terminal className="h-3 w-3 text-white/40" />
                <span className="text-xs text-white/40">system_diagnostics.sh</span>
            </div>

            <div className="p-5 space-y-3">
                <div className="flex gap-2 text-white/90">
                    <span className="text-blue-500">➜</span>
                    <span className="font-bold">{resolveText(problem.title, language)}</span>
                </div>

                <div className="pl-4 border-l border-white/10 space-y-2">
                    <div className="flex gap-2 text-red-400 group-hover:opacity-40 transition-opacity">
                        <span>✖</span>
                        <span>{resolveText(problem.description, language).split('.')[0]}...</span>
                    </div>

                    <div className="hidden group-hover:flex gap-2 text-emerald-400 animate-in fade-in slide-in-from-left-2 duration-300">
                        <span>✔</span>
                        <span>Applying automated fix...</span>
                    </div>

                    <div className="hidden group-hover:flex gap-2 text-white/70 animate-in fade-in slide-in-from-left-2 duration-500 delay-100">
                        <span>ℹ</span>
                        <span>{resolveText(problem.description, language)}</span>
                    </div>
                </div>

                {problem.metric && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-white/50 group-hover:text-emerald-400 transition-colors">
                        <div className="h-1.5 w-1.5 rounded-full bg-current" />
                        {resolveText(problem.metric, language)}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

// --- 3. ML Engineer: "Experiment Card" Style ---
function MLEngineerProblem({ problem, language }: any) {
    return (
        <motion.div
            className="group relative overflow-hidden rounded-2xl border border-purple-500/20 bg-purple-950/10 backdrop-blur-sm transition-all hover:bg-purple-900/20"
            whileHover={{ scale: 1.02 }}
        >
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <Activity className="h-12 w-12 text-purple-500" />
            </div>

            <div className="p-6">
                <div className="mb-2 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-[10px] font-medium text-purple-300">
                    HYPOTHESIS
                </div>

                <h3 className="mb-3 text-lg font-semibold text-white">
                    {resolveText(problem.title, language)}
                </h3>

                <div className="relative">
                    <p className="text-sm text-white/60 transition-colors group-hover:text-white/90">
                        {resolveText(problem.description, language)}
                    </p>
                </div>

                {problem.metric && (
                    <div className="mt-6 border-t border-white/5 pt-4">
                        <div className="flex items-end justify-between">
                            <span className="text-xs text-white/40">Optimization Result</span>
                            <span className="text-sm font-bold text-purple-400">{resolveText(problem.metric, language)}</span>
                        </div>
                        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                            <motion.div
                                className="h-full bg-purple-500"
                                initial={{ width: "30%" }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

// --- 4. Data Analyst: "Insight Note" Style ---
function DataAnalystProblem({ problem, language }: any) {
    return (
        <motion.div
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10"
            whileHover={{ y: -4 }}
        >
            <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Search className="h-5 w-5" />
                </div>

                <div className="space-y-2">
                    <h3 className="font-semibold text-white">
                        {resolveText(problem.title, language)}
                    </h3>
                    <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                        {resolveText(problem.description, language)}
                    </p>
                </div>
            </div>

            {problem.metric && (
                <div className="mt-4 ml-14 flex items-center gap-2 rounded-lg bg-blue-500/10 px-3 py-2 text-xs text-blue-300">
                    <ArrowRight className="h-3 w-3" />
                    <span className="font-medium">{resolveText(problem.metric, language)}</span>
                </div>
            )}
        </motion.div>
    );
}

// --- Default Fallback ---
function DefaultProblem({ problem, language }: any) {
    return (
        <motion.article
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 via-white/3 to-transparent p-6 backdrop-blur transition-transform duration-300 hover:-translate-y-2"
        >
            <div className="space-y-3">
                {problem.metric && (
                    <span className="inline-flex rounded-full bg-[hsla(var(--portfolio-accent),0.18)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/70">
                        {resolveText(problem.metric, language)}
                    </span>
                )}
                <h3 className="text-xl font-semibold text-white">
                    {resolveText(problem.title, language)}
                </h3>
                <p className="text-sm text-white/70">
                    {resolveText(problem.description, language)}
                </p>
            </div>
        </motion.article>
    );
}
