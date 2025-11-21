"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, PieChart, TrendingUp, Filter } from "lucide-react";
import { useI18n } from "@/contexts/i18n-context";
import { cn } from "@/lib/utils";

export function DataAnalystFeature() {
    const { language } = useI18n();
    const [activeFilter, setActiveFilter] = useState("All");

    const data = {
        All: [65, 40, 75, 55, 80, 95],
        Sales: [45, 30, 60, 45, 70, 85],
        Users: [20, 10, 15, 10, 10, 10],
    };

    return (
        <div className="w-full rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white">
                        {language === "en" ? "Interactive Dashboard" : "Dashboard Interactivo"}
                    </h3>
                    <p className="text-sm text-white/60">
                        {language === "en"
                            ? "Transforming raw data into actionable insights."
                            : "Transformando datos crudos en insights accionables."}
                    </p>
                </div>
                <div className="flex gap-2">
                    {["All", "Sales", "Users"].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={cn(
                                "rounded-lg px-3 py-1 text-xs font-medium transition-colors",
                                activeFilter === filter
                                    ? "bg-blue-500 text-white"
                                    : "bg-white/5 text-white/60 hover:bg-white/10"
                            )}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* KPI Cards */}
                <div className="space-y-4">
                    <div className="rounded-xl border border-white/5 bg-black/40 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-white/40">Total Revenue</span>
                            <TrendingUp className="h-4 w-4 text-emerald-400" />
                        </div>
                        <div className="mt-2 text-2xl font-bold text-white">
                            ${activeFilter === "All" ? "1.2M" : activeFilter === "Sales" ? "980K" : "220K"}
                        </div>
                        <span className="text-xs text-emerald-400">+12.5% vs last month</span>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-black/40 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-white/40">Active Users</span>
                            <PieChart className="h-4 w-4 text-blue-400" />
                        </div>
                        <div className="mt-2 text-2xl font-bold text-white">
                            {activeFilter === "All" ? "45.2K" : activeFilter === "Sales" ? "12.1K" : "33.1K"}
                        </div>
                        <span className="text-xs text-blue-400">+5.2% new signups</span>
                    </div>
                </div>

                {/* Chart Area */}
                <div className="col-span-2 flex flex-col justify-between rounded-xl border border-white/5 bg-black/40 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="h-4 w-4 text-white/40" />
                        <span className="text-xs font-medium text-white/60">Monthly Performance</span>
                    </div>

                    <div className="flex h-32 items-end justify-between gap-2">
                        {data[activeFilter as keyof typeof data].map((value, i) => (
                            <div key={i} className="group relative flex h-full w-full flex-col justify-end">
                                <motion.div
                                    className="w-full rounded-t-sm bg-blue-500/80 group-hover:bg-blue-400"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${value}%` }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                />
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                                    <span className="rounded bg-white px-2 py-1 text-xs font-bold text-black">
                                        {value}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-2 flex justify-between px-1">
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
                            <span key={m} className="text-xs text-white/30">{m}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
