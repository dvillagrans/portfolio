"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/i18n-context";
import { cn } from "@/lib/utils";

interface ActivityGraphProps {
    className?: string;
}

export function ActivityGraph({ className }: ActivityGraphProps) {
    const { language } = useI18n();
    const [data, setData] = useState<{ date: string; count: number; intensity: number }[]>([]);

    useEffect(() => {
        // Generate fake contribution data for the last 365 days
        const today = new Date();
        const newData = [];
        for (let i = 364; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);

            // Randomize contribution count with some "clusters" to look realistic
            const baseRandom = Math.random();
            let count = 0;

            // Simulate weekends being less active
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;

            if (baseRandom > 0.7) {
                count = Math.floor(Math.random() * 5) + 1;
            } else if (baseRandom > 0.9) {
                count = Math.floor(Math.random() * 10) + 5;
            }

            if (isWeekend && Math.random() > 0.3) {
                count = 0;
            }

            // Calculate intensity (0-4)
            let intensity = 0;
            if (count > 0) intensity = 1;
            if (count > 3) intensity = 2;
            if (count > 6) intensity = 3;
            if (count > 9) intensity = 4;

            newData.push({
                date: date.toISOString().split('T')[0],
                count,
                intensity
            });
        }
        setData(newData);
    }, []);

    return (
        <div className={cn("w-full overflow-hidden rounded-xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm", className)}>
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">
                    {language === "en" ? "Coding Activity" : "Actividad de Código"}
                </h3>
                <div className="flex items-center gap-2 text-xs text-white/40">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="h-2.5 w-2.5 rounded-sm bg-white/5" />
                        <div className="h-2.5 w-2.5 rounded-sm bg-emerald-900/40" />
                        <div className="h-2.5 w-2.5 rounded-sm bg-emerald-700/60" />
                        <div className="h-2.5 w-2.5 rounded-sm bg-emerald-500/80" />
                        <div className="h-2.5 w-2.5 rounded-sm bg-emerald-400" />
                    </div>
                    <span>More</span>
                </div>
            </div>

            <div className="flex w-full gap-1 overflow-x-auto pb-2 scrollbar-hide">
                {/* We group by weeks for the grid layout */}
                {Array.from({ length: 52 }).map((_, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                        {Array.from({ length: 7 }).map((_, dayIndex) => {
                            const dataIndex = weekIndex * 7 + dayIndex;
                            const dayData = data[dataIndex];

                            if (!dayData) return <div key={dayIndex} className="h-2.5 w-2.5" />;

                            return (
                                <motion.div
                                    key={dayData.date}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: dataIndex * 0.002 }}
                                    className={cn(
                                        "h-2.5 w-2.5 rounded-sm transition-colors hover:ring-1 hover:ring-white/50",
                                        dayData.intensity === 0 && "bg-white/5",
                                        dayData.intensity === 1 && "bg-emerald-900/40",
                                        dayData.intensity === 2 && "bg-emerald-700/60",
                                        dayData.intensity === 3 && "bg-emerald-500/80",
                                        dayData.intensity === 4 && "bg-emerald-400"
                                    )}
                                    title={`${dayData.date}: ${dayData.count} contributions`}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
