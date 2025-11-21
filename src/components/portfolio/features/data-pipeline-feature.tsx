"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Server, FileJson, Layers, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/i18n-context";

// Tipos de nodos en el pipeline
type NodeType = "source" | "ingestion" | "processing" | "storage" | "serving";

interface PipelineNode {
    id: NodeType;
    label: { en: string; es: string };
    icon: React.ElementType;
    status: "idle" | "processing" | "success" | "error";
    description: { en: string; es: string };
}

const PIPELINE_NODES: PipelineNode[] = [
    {
        id: "source",
        label: { en: "Sources", es: "Fuentes" },
        icon: FileJson,
        status: "idle",
        description: { en: "APIs, Logs, DBs", es: "APIs, Logs, BDs" }
    },
    {
        id: "ingestion",
        label: { en: "Ingestion", es: "Ingesta" },
        icon: ArrowRight, // Representing flow/stream
        status: "idle",
        description: { en: "Kafka / Airbyte", es: "Kafka / Airbyte" }
    },
    {
        id: "processing",
        label: { en: "Processing", es: "Procesamiento" },
        icon: Layers,
        status: "idle",
        description: { en: "Spark / dbt", es: "Spark / dbt" }
    },
    {
        id: "storage",
        label: { en: "Warehouse", es: "Almacén" },
        icon: Database,
        status: "idle",
        description: { en: "Snowflake / BigQuery", es: "Snowflake / BigQuery" }
    },
    {
        id: "serving",
        label: { en: "Serving", es: "Consumo" },
        icon: Server,
        status: "idle",
        description: { en: "BI / ML Models", es: "BI / Modelos ML" }
    }
];

export function DataPipelineFeature() {
    const { language } = useI18n();
    const [activeNode, setActiveNode] = useState<number>(-1);
    const [packets, setPackets] = useState<{ id: number; step: number }[]>([]);
    const [processedCount, setProcessedCount] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Simulación del flujo de datos
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            // Crear nuevo paquete
            const newPacketId = Date.now();
            setPackets(prev => [...prev, { id: newPacketId, step: 0 }]);
            setActiveNode(0);

            // Mover paquetes existentes
            setTimeout(() => {
                setPackets(prev => {
                    const next = prev.map(p => ({ ...p, step: p.step + 1 }));
                    // Remover paquetes que terminaron
                    const finished = next.filter(p => p.step >= PIPELINE_NODES.length);
                    if (finished.length > 0) {
                        setProcessedCount(c => c + finished.length);
                    }
                    return next.filter(p => p.step < PIPELINE_NODES.length);
                });

                // Actualizar nodo activo visualmente basado en el paquete más avanzado
                setActiveNode(prev => (prev + 1) % PIPELINE_NODES.length);
            }, 1000);

        }, 3000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    return (
        <div className="w-full rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white">
                        {language === "en" ? "Live Data Pipeline" : "Pipeline de Datos en Vivo"}
                    </h3>
                    <p className="text-sm text-white/60">
                        {language === "en"
                            ? "Visualizing the flow of data from source to value."
                            : "Visualizando el flujo de datos desde la fuente hasta el valor."}
                    </p>
                </div>
                <div className="flex items-center gap-3 rounded-full bg-white/5 px-3 py-1">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    <span className="text-xs font-medium text-emerald-400">
                        {processedCount} {language === "en" ? "records processed" : "registros procesados"}
                    </span>
                </div>
            </div>

            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                {/* Línea de conexión de fondo */}
                <div className="absolute left-8 top-0 h-full w-0.5 bg-white/5 md:left-0 md:top-1/2 md:h-0.5 md:w-full" />

                {PIPELINE_NODES.map((node, index) => {
                    const isActive = activeNode === index;
                    const hasPacket = packets.some(p => p.step === index);

                    return (
                        <div key={node.id} className="relative z-10 flex flex-1 flex-row items-center gap-4 md:flex-col md:gap-3 md:text-center">
                            {/* Nodo Circular */}
                            <div
                                className={cn(
                                    "relative flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-500",
                                    isActive || hasPacket
                                        ? "border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                                        : "border-white/10 bg-black/40"
                                )}
                            >
                                <node.icon
                                    className={cn(
                                        "h-6 w-6 transition-colors duration-500",
                                        isActive || hasPacket ? "text-cyan-400" : "text-white/40"
                                    )}
                                />

                                {/* Indicador de estado */}
                                <div className="absolute -right-1 -top-1">
                                    {hasPacket && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Textos */}
                            <div className="flex flex-col">
                                <span className={cn(
                                    "text-sm font-medium transition-colors duration-300",
                                    isActive ? "text-white" : "text-white/70"
                                )}>
                                    {language === "en" ? node.label.en : node.label.es}
                                </span>
                                <span className="text-xs text-white/40">
                                    {language === "en" ? node.description.en : node.description.es}
                                </span>
                            </div>

                            {/* Paquete de datos animado viajando al siguiente nodo */}
                            <AnimatePresence>
                                {packets.map(packet => packet.step === index && index < PIPELINE_NODES.length - 1 && (
                                    <motion.div
                                        key={packet.id}
                                        className="absolute left-8 top-16 h-2 w-2 rounded-full bg-cyan-400 md:left-1/2 md:top-8"
                                        initial={{ opacity: 1, offsetDistance: "0%" }}
                                        animate={{
                                            // Animación simple de movimiento hacia el siguiente nodo
                                            // En móvil va hacia abajo, en desktop hacia la derecha
                                            y: [0, 40], // Móvil
                                            x: [0, 0]
                                        }}
                                        // Media query para cambiar animación en desktop sería ideal, 
                                        // pero por simplicidad en Framer Motion usaremos variantes o lógica condicional si fuera necesario.
                                        // Aquí simplificamos asumiendo desktop first visualmente o ajustando con CSS classes.
                                        style={{ display: 'none' }} // Ocultamos este simple div y usamos el efecto visual del borde iluminado por ahora para no complicar la geometría responsiva
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* Terminal de logs simulado */}
            <div className="mt-8 overflow-hidden rounded-lg border border-white/5 bg-black/60 font-mono text-xs">
                <div className="flex items-center gap-2 border-b border-white/5 bg-white/5 px-4 py-2">
                    <div className="h-2 w-2 rounded-full bg-red-500/50" />
                    <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                    <div className="h-2 w-2 rounded-full bg-green-500/50" />
                    <span className="ml-2 text-white/30">pipeline-logs</span>
                </div>
                <div className="flex flex-col gap-1 p-4 text-white/60">
                    <div className="flex gap-2">
                        <span className="text-emerald-500">[INFO]</span>
                        <span>Ingesting batch #{processedCount + 1024}...</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-blue-500">[DEBUG]</span>
                        <span>Transforming raw events to parquet...</span>
                    </div>
                    {activeNode === 3 && (
                        <div className="flex gap-2">
                            <span className="text-purple-500">[WAREHOUSE]</span>
                            <span>Merge into target table completed (240ms)</span>
                        </div>
                    )}
                    <div className="flex gap-2 animate-pulse">
                        <span className="text-cyan-500">[STREAM]</span>
                        <span>Processing events...</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
