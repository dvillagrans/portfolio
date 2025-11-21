"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Activity, GitBranch, RefreshCw } from "lucide-react";
import { useI18n } from "@/contexts/i18n-context";

export function MLEngineerFeature() {
    const { language } = useI18n();
    const [epoch, setEpoch] = useState(0);
    const [loss, setLoss] = useState(0.8);
    const [accuracy, setAccuracy] = useState(0.45);
    const [isTraining, setIsTraining] = useState(true);

    useEffect(() => {
        if (!isTraining) return;

        const interval = setInterval(() => {
            setEpoch(prev => {
                if (prev >= 100) {
                    setIsTraining(false);
                    return 100;
                }
                return prev + 1;
            });

            setLoss(prev => Math.max(0.05, prev * 0.95 + (Math.random() * 0.02 - 0.01)));
            setAccuracy(prev => Math.min(0.99, prev * 1.02 + (Math.random() * 0.01 - 0.005)));
        }, 100);

        return () => clearInterval(interval);
    }, [isTraining]);

    const restartTraining = () => {
        setEpoch(0);
        setLoss(0.8);
        setAccuracy(0.45);
        setIsTraining(true);
    };

    return (
        <div className="w-full rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white">
                        {language === "en" ? "Model Training Simulation" : "Simulación de Entrenamiento"}
                    </h3>
                    <p className="text-sm text-white/60">
                        {language === "en"
                            ? "Optimizing neural network parameters in real-time."
                            : "Optimizando parámetros de red neuronal en tiempo real."}
                    </p>
                </div>
                <button
                    onClick={restartTraining}
                    className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/80 hover:bg-white/10"
                >
                    <RefreshCw className={`h-3 w-3 ${isTraining ? "animate-spin" : ""}`} />
                    {language === "en" ? "Retrain" : "Re-entrenar"}
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Metrics Cards */}
                <div className="space-y-4">
                    <div className="rounded-xl border border-white/5 bg-black/40 p-4">
                        <div className="flex items-center gap-2 text-purple-400">
                            <Activity className="h-4 w-4" />
                            <span className="text-xs font-medium uppercase">Epoch</span>
                        </div>
                        <div className="mt-2 text-2xl font-bold text-white">
                            {epoch} <span className="text-sm text-white/40">/ 100</span>
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                            <motion.div
                                className="h-full bg-purple-500"
                                animate={{ width: `${epoch}%` }}
                            />
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-black/40 p-4">
                        <div className="flex items-center gap-2 text-red-400">
                            <Brain className="h-4 w-4" />
                            <span className="text-xs font-medium uppercase">Loss</span>
                        </div>
                        <div className="mt-2 text-2xl font-bold text-white">
                            {loss.toFixed(4)}
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-black/40 p-4">
                        <div className="flex items-center gap-2 text-emerald-400">
                            <GitBranch className="h-4 w-4" />
                            <span className="text-xs font-medium uppercase">Accuracy</span>
                        </div>
                        <div className="mt-2 text-2xl font-bold text-white">
                            {(accuracy * 100).toFixed(1)}%
                        </div>
                    </div>
                </div>

                {/* Visualization Area */}
                <div className="col-span-2 flex items-end justify-between gap-1 rounded-xl border border-white/5 bg-black/40 p-4 pt-12">
                    {Array.from({ length: 20 }).map((_, i) => {
                        // Simular una curva de aprendizaje visual
                        const progress = i / 20;
                        const value = isTraining
                            ? Math.max(5, 100 * (1 - Math.exp(-3 * progress)) * (epoch / 100))
                            : Math.max(5, 100 * (1 - Math.exp(-3 * progress)));

                        return (
                            <motion.div
                                key={i}
                                className="w-full rounded-t-sm bg-gradient-to-t from-purple-500/20 to-purple-500"
                                animate={{ height: `${value}%` }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
