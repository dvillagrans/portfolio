'use client';

import {
  Activity,
  AlarmCheck,
  BarChart4,
  ChartSpline,
  CircuitBoard,
  CloudCog,
  DatabaseZap,
  Gauge,
  LineChart,
  Network,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { PortfolioIconToken } from "@/data/profiles/types";

export function resolveIcon(token: PortfolioIconToken, className = "h-5 w-5") {
  const iconMap: Record<PortfolioIconToken, JSX.Element> = {
    pipeline: <Workflow className={className} />,
    delivery: <Gauge className={className} />,
    monitoring: <Activity className={className} />,
    quality: <ShieldCheck className={className} />,
    automation: <CircuitBoard className={className} />,
    dashboard: <BarChart4 className={className} />,
    insights: <LineChart className={className} />,
    recovery: <AlarmCheck className={className} />,
    ai: <ChartSpline className={className} />,
    cloud: <CloudCog className={className} />,
    data: <DatabaseZap className={className} />,
  };

  return iconMap[token] ?? <Network className={className} />;
}

