"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Server, Shield, Globe, Cpu, Activity } from "lucide-react";
import { useI18n } from "@/contexts/i18n-context";

export function DevOpsFeature() {
    const { language } = useI18n();
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const possibleLogs = [
            "GET /api/health 200 45ms",
            "POST /api/deploy 201 120ms",
            "Scaling up worker nodes...",
            "Container started: worker-04",
            "Backup completed successfully",
            "Load balancer reconfigured",
            "Security scan: No vulnerabilities found"
        ];

        const interval = setInterval(() => {
            const newLog = possibleLogs[Math.floor(Math.random() * possibleLogs.length)];
            const timestamp = new Date().toLocaleTimeString();
            setLogs(prev => [`[${timestamp}] ${newLog}`, ...prev].slice(0, 5));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white">
                        {language === "en" ? "Infrastructure Status" : "Estado de Infraestructura"}
                    </h3>
                    <p className="text-sm text-white/60">
                        {language === "en"
                            ? "Monitoring system health and deployment pipelines."
                            : "Monitoreando salud del sistema y pipelines de despliegue."}
                    </p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    SYSTEM OPERATIONAL
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Server Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { icon: Server, label: "Cluster A", status: "98% CPU", color: "text-orange-400" },
                        { icon: Globe, label: "CDN Edge", status: "24ms Latency", color: "text-blue-400" },
                        { icon: Shield, label: "Firewall", status: "Active", color: "text-emerald-400" },
                        { icon: Cpu, label: "Workers", status: "12/12 Ready", color: "text-purple-400" },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col gap-2 rounded-xl border border-white/5 bg-black/40 p-4">
                            <div className="flex items-center justify-between">
                                <item.icon className={`h-5 w-5 ${item.color}`} />
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                            <span className="text-xs text-white/40">{item.label}</span>
                            <span className="font-mono text-sm font-medium text-white">{item.status}</span>
                        </div>
                    ))}
                </div>

                {/* Terminal */}
                <div className="flex flex-col overflow-hidden rounded-xl border border-white/5 bg-black/80 font-mono text-xs">
                    <div className="flex items-center gap-2 border-b border-white/5 bg-white/5 px-4 py-2">
                        <Terminal className="h-3 w-3 text-white/40" />
                        <span className="text-white/40">system-logs</span>
                    </div>
                    <div className="flex flex-1 flex-col justify-end gap-1 p-4">
                        {logs.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-white/70"
                            >
                                <span className="text-emerald-500">$</span> {log}
                            </motion.div>
                        ))}
                        <div className="h-4 w-2 animate-pulse bg-white/50" />
                    </div>
                </div>
            </div>
        </div>
    );
}
