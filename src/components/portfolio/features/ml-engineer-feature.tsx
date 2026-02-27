"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Activity, GitBranch, Database, Server, Zap, CheckCircle2, Settings2, Terminal, Play, Square, Cpu, Network } from "lucide-react";
import { useI18n } from "@/contexts/i18n-context";
import { cn } from "@/lib/utils";

// --- Types & Constants ---
type Stage = "idle" | "data" | "training" | "eval" | "deploy" | "done";

interface MetricPoint {
    epoch: number;
    loss: number;
    acc: number;
}

const MAX_EPOCHS = 100;

// --- Neural Network SVG Generator ---
const NN_LAYERS = [4, 6, 6, 2];
const NN_WIDTH = 400;
const NN_HEIGHT = 300;

const generateNetwork = () => {
    const nodes: { id: string; x: number; y: number; layer: number }[] = [];
    const links: { id: string; source: any; target: any }[] = [];

    NN_LAYERS.forEach((count, i) => {
        const x = (NN_WIDTH / (NN_LAYERS.length + 1)) * (i + 1);
        for (let j = 0; j < count; j++) {
            const y = (NN_HEIGHT / (count + 1)) * (j + 1);
            nodes.push({ id: `n-${i}-${j}`, x, y, layer: i });
        }
    });

    for (let i = 0; i < NN_LAYERS.length - 1; i++) {
        const currentLayer = nodes.filter(n => n.layer === i);
        const nextLayer = nodes.filter(n => n.layer === i + 1);
        currentLayer.forEach(source => {
            nextLayer.forEach(target => {
                links.push({ id: `l-${source.id}-${target.id}`, source, target });
            });
        });
    }
    return { nodes, links };
};

export function MLEngineerFeature() {
    const { language } = useI18n();
    const [stage, setStage] = useState<Stage>("idle");
    const [epoch, setEpoch] = useState(0);
    const [history, setHistory] = useState<MetricPoint[]>([{ epoch: 0, loss: 0.9, acc: 0.1 }]);
    const [logs, setLogs] = useState<string[]>([]);
    const logsEndRef = useRef<HTMLDivElement>(null);

    // Hyperparameters (Interactive)
    const [learningRate, setLearningRate] = useState(0.001);
    const [batchSize, setBatchSize] = useState(32);

    const { nodes, links } = useMemo(() => generateNetwork(), []);

    const addLog = (msg: string) => {
        setLogs(prev => [...prev.slice(-20), `${new Date().toISOString().split('T')[1].slice(0, -1)} ${msg}`]);
    };

    useEffect(() => {
        if (logsEndRef.current) {
            logsEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [logs]);

    // --- Simulation Logic ---
    useEffect(() => {
        if (stage === "idle" || stage === "done") return;

        let timeout: NodeJS.Timeout;
        let interval: NodeJS.Timeout;

        if (stage === "data") {
            addLog("[INFO] Initializing data pipeline...");
            addLog(`[INFO] Loading dataset with batch_size=${batchSize}`);
            timeout = setTimeout(() => {
                addLog("[SUCCESS] Data tensors ready. Moving to GPU.");
                setStage("training");
            }, 2000);
        } else if (stage === "training") {
            addLog(`[INFO] Starting training loop (lr=${learningRate})...`);
            interval = setInterval(() => {
                setEpoch(prev => {
                    const next = prev + 1;
                    setHistory(curr => {
                        const last = curr[curr.length - 1];
                        // Math magic to simulate learning curve affected by LR
                        const lrFactor = learningRate * 1000; // normalize around 1
                        const lossDrop = (Math.random() * 0.03 + 0.01) * lrFactor;
                        const accGain = (Math.random() * 0.02 + 0.005) * lrFactor;
                        
                        const newLoss = Math.max(0.01, last.loss - lossDrop + (Math.random() * 0.01));
                        const newAcc = Math.min(0.99, last.acc + accGain - (Math.random() * 0.005));
                        
                        return [...curr, { epoch: next, loss: newLoss, acc: newAcc }];
                    });

                    if (next % 10 === 0) {
                        setHistory(curr => {
                            const last = curr[curr.length - 1];
                            addLog(`[TRAIN] Epoch ${next}/${MAX_EPOCHS} - Loss: ${last.loss.toFixed(4)} - Acc: ${(last.acc * 100).toFixed(1)}%`);
                            return curr;
                        });
                    }

                    if (next >= MAX_EPOCHS) {
                        setStage("eval");
                        return MAX_EPOCHS;
                    }
                    return next;
                });
            }, 60); // Fast training for visual effect
        } else if (stage === "eval") {
            addLog("[INFO] Running evaluation on holdout test set...");
            timeout = setTimeout(() => {
                const finalAcc = history[history.length - 1]?.acc || 0.95;
                addLog(`[SUCCESS] Evaluation complete. Final Accuracy: ${(finalAcc * 100).toFixed(2)}%`);
                setStage("deploy");
            }, 2000);
        } else if (stage === "deploy") {
            addLog("[INFO] Quantizing model to ONNX format...");
            timeout = setTimeout(() => {
                addLog("[INFO] Building Docker container...");
                setTimeout(() => {
                    addLog("[SUCCESS] Model deployed to production endpoint 🚀");
                    setStage("done");
                }, 1500);
            }, 1500);
        }

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [stage, batchSize, learningRate]); // Removed history from deps to avoid infinite loops

    const handleStart = () => {
        setEpoch(0);
        setHistory([{ epoch: 0, loss: 0.9, acc: 0.1 }]);
        setLogs([]);
        setStage("data");
    };

    const handleStop = () => {
        setStage("idle");
        addLog("[WARN] Training interrupted by user.");
    };

    // --- SVG Path Generators for Charts ---
    const lossPath = history.map((p, i) => `${(p.epoch / MAX_EPOCHS) * 100},${(p.loss / 1) * 100}`).join(" L ");
    const accPath = history.map((p, i) => `${(p.epoch / MAX_EPOCHS) * 100},${(1 - p.acc) * 100}`).join(" L ");

    const currentMetrics = history[history.length - 1];

    return (
        <div className="w-full rounded-[2rem] border border-purple-500/30 bg-[#05010a]/90 shadow-[0_0_80px_-20px_rgba(147,51,234,0.25)] backdrop-blur-2xl overflow-hidden relative font-sans">
            {/* Ambient Background Glows */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
                        <Cpu className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white leading-none">ML Control Center</h3>
                        <p className="text-xs text-white/50 mt-1">Interactive Training Dashboard</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-white/10">
                        <div className={cn(
                            "w-2 h-2 rounded-full",
                            stage === "idle" ? "bg-white/20" :
                            stage === "done" ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" :
                            "bg-purple-500 animate-pulse shadow-[0_0_10px_rgba(147,51,234,0.5)]"
                        )} />
                        <span className="text-xs font-mono text-white/70 uppercase tracking-wider">
                            {stage === "idle" ? "Ready" : stage === "done" ? "Deployed" : stage}
                        </span>
                    </div>
                    {stage === "idle" || stage === "done" ? (
                        <button onClick={handleStart} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)]">
                            <Play className="w-4 h-4 fill-current" /> Start
                        </button>
                    ) : (
                        <button onClick={handleStop} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 text-sm font-bold transition-all">
                            <Square className="w-4 h-4 fill-current" /> Stop
                        </button>
                    )}
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10">
                
                {/* Left Col: Config & Pipeline */}
                <div className="lg:col-span-3 bg-[#05010a] p-6 flex flex-col gap-8">
                    {/* Hyperparameters */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-2 text-white/80 mb-4">
                            <Settings2 className="w-4 h-4" />
                            <h4 className="text-sm font-bold uppercase tracking-wider">Hyperparameters</h4>
                        </div>
                        
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-white/50">Learning Rate</span>
                                <span className="text-purple-400 font-mono">{learningRate}</span>
                            </div>
                            <input 
                                type="range" min="0.0001" max="0.01" step="0.0001" 
                                value={learningRate} 
                                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                                disabled={stage !== "idle" && stage !== "done"}
                                className="w-full accent-purple-500 cursor-pointer disabled:opacity-50"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-white/50">Batch Size</span>
                                <span className="text-purple-400 font-mono">{batchSize}</span>
                            </div>
                            <input 
                                type="range" min="16" max="128" step="16" 
                                value={batchSize} 
                                onChange={(e) => setBatchSize(parseInt(e.target.value))}
                                disabled={stage !== "idle" && stage !== "done"}
                                className="w-full accent-purple-500 cursor-pointer disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* Pipeline Steps */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 text-white/80 mb-4">
                            <Network className="w-4 h-4" />
                            <h4 className="text-sm font-bold uppercase tracking-wider">Pipeline</h4>
                        </div>
                        <div className="space-y-4 relative before:absolute before:inset-y-2 before:left-[11px] before:w-px before:bg-white/10">
                            {[
                                { id: "data", label: "Data Ingestion", icon: Database },
                                { id: "training", label: "Model Training", icon: Brain },
                                { id: "eval", label: "Evaluation", icon: Activity },
                                { id: "deploy", label: "Deployment", icon: Server }
                            ].map((step, i) => {
                                const stages = ["idle", "data", "training", "eval", "deploy", "done"];
                                const currentIndex = stages.indexOf(stage);
                                const stepIndex = stages.indexOf(step.id);
                                
                                const isPast = currentIndex > stepIndex;
                                const isCurrent = currentIndex === stepIndex;
                                const Icon = step.icon;

                                return (
                                    <div key={step.id} className="relative flex items-center gap-4">
                                        <div className={cn(
                                            "w-6 h-6 rounded-full flex items-center justify-center border z-10 bg-[#05010a] transition-colors duration-300",
                                            isPast ? "border-emerald-500 text-emerald-400" :
                                            isCurrent ? "border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.5)]" :
                                            "border-white/20 text-white/20"
                                        )}>
                                            {isPast ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Icon className={cn("w-3 h-3", isCurrent && "animate-pulse")} />}
                                        </div>
                                        <span className={cn(
                                            "text-xs font-medium transition-colors duration-300",
                                            isPast || isCurrent ? "text-white" : "text-white/30"
                                        )}>
                                            {step.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Center Col: Neural Network Vis */}
                <div className="lg:col-span-5 bg-[#05010a] p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[300px]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.05)_0%,transparent_70%)]" />
                    
                    <svg viewBox={`0 0 ${NN_WIDTH} ${NN_HEIGHT}`} className="w-full h-full max-h-[400px] overflow-visible">
                        <defs>
                            <linearGradient id="linkGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(147,51,234,0.1)" />
                                <stop offset="50%" stopColor="rgba(147,51,234,0.8)" />
                                <stop offset="100%" stopColor="rgba(56,189,248,0.8)" />
                            </linearGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Links */}
                        {links.map(link => {
                            const isActive = stage === "training" || stage === "eval";
                            return (
                                <g key={link.id}>
                                    <line 
                                        x1={link.source.x} y1={link.source.y} 
                                        x2={link.target.x} y2={link.target.y} 
                                        stroke="rgba(255,255,255,0.05)" 
                                        strokeWidth="1"
                                    />
                                    {isActive && (
                                        <motion.line 
                                            x1={link.source.x} y1={link.source.y} 
                                            x2={link.target.x} y2={link.target.y} 
                                            stroke="url(#linkGlow)" 
                                            strokeWidth="1.5"
                                            initial={{ strokeDasharray: "0 100", opacity: 0 }}
                                            animate={{ 
                                                strokeDasharray: ["0 100", "50 50", "0 100"],
                                                strokeDashoffset: [100, 0],
                                                opacity: [0, 1, 0]
                                            }}
                                            transition={{ 
                                                duration: 1.5 + Math.random(), 
                                                repeat: Infinity, 
                                                ease: "linear",
                                                delay: Math.random() * 2
                                            }}
                                        />
                                    )}
                                </g>
                            );
                        })}

                        {/* Nodes */}
                        {nodes.map(node => {
                            const isActive = stage === "training" || stage === "eval";
                            return (
                                <g key={node.id}>
                                    <circle 
                                        cx={node.x} cy={node.y} r="4" 
                                        fill="#05010a" 
                                        stroke={isActive ? "#a855f7" : "rgba(255,255,255,0.2)"} 
                                        strokeWidth="2"
                                    />
                                    {isActive && (
                                        <motion.circle 
                                            cx={node.x} cy={node.y} r="6" 
                                            fill="none"
                                            stroke="#38bdf8" 
                                            strokeWidth="1"
                                            filter="url(#glow)"
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 1 + Math.random(), repeat: Infinity }}
                                        />
                                    )}
                                </g>
                            );
                        })}
                    </svg>

                    {/* Overlay Status */}
                    <AnimatePresence>
                        {stage === "deploy" && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center bg-[#05010a]/80 backdrop-blur-sm"
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-[0_0_40px_rgba(147,51,234,0.5)] animate-bounce">
                                        <Server className="w-8 h-8 text-white" />
                                    </div>
                                    <span className="text-lg font-bold text-white tracking-widest uppercase">Packaging Model...</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Col: Metrics & Terminal */}
                <div className="lg:col-span-4 bg-[#05010a] flex flex-col">
                    {/* Live Charts */}
                    <div className="p-6 border-b border-white/10 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white/80">
                                <Activity className="w-4 h-4" />
                                <h4 className="text-sm font-bold uppercase tracking-wider">Live Metrics</h4>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] text-white/40 uppercase">Epoch</span>
                                <div className="text-2xl font-black text-white font-mono leading-none">{epoch}<span className="text-sm text-white/30">/100</span></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Loss Chart */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs text-red-400 font-medium">Loss</span>
                                    <span className="text-sm text-white font-mono">{currentMetrics.loss.toFixed(4)}</span>
                                </div>
                                <div className="h-16 w-full bg-white/[0.02] rounded-lg border border-white/5 relative overflow-hidden">
                                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                                        <motion.path 
                                            d={`M 0,100 L ${lossPath}`} 
                                            fill="none" 
                                            stroke="#f87171" 
                                            strokeWidth="2" 
                                            vectorEffect="non-scaling-stroke"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Accuracy Chart */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs text-emerald-400 font-medium">Accuracy</span>
                                    <span className="text-sm text-white font-mono">{(currentMetrics.acc * 100).toFixed(1)}%</span>
                                </div>
                                <div className="h-16 w-full bg-white/[0.02] rounded-lg border border-white/5 relative overflow-hidden">
                                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                                        <motion.path 
                                            d={`M 0,100 L ${accPath}`} 
                                            fill="none" 
                                            stroke="#34d399" 
                                            strokeWidth="2" 
                                            vectorEffect="non-scaling-stroke"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Terminal */}
                    <div className="flex-1 p-4 bg-black/50 relative overflow-hidden min-h-[150px]">
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <div className="flex items-center gap-2 mb-3 opacity-50">
                            <Terminal className="w-4 h-4" />
                            <span className="text-[10px] font-mono uppercase tracking-widest">System Logs</span>
                        </div>
                        <div className="font-mono text-[10px] sm:text-xs h-[120px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2">
                            <AnimatePresence>
                                {logs.map((log, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={cn(
                                            "mb-1.5 leading-relaxed",
                                            log.includes("[SUCCESS]") ? "text-emerald-400" :
                                            log.includes("[TRAIN]") ? "text-purple-300" :
                                            log.includes("[WARN]") ? "text-amber-400" :
                                            log.includes("[INFO]") ? "text-blue-300" : "text-white/60"
                                        )}
                                    >
                                        {log}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div ref={logsEndRef} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
