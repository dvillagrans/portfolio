export const CLUSTER_DEFS = [
  // Esquina sup-derecha: adultos mayores con comorbilidades — los más críticos
  { id: 'K7', label: 'Alta carga comorbilidades',   color: '#8b5cf6', cx: 78, cy: 82, std: 2.5, n: 22, risk: 'CRÍTICO' },
  { id: 'K3', label: 'UCI críticos 100% intubados', color: '#c084fc', cx: 68, cy: 72, std: 2.5, n: 25, risk: 'CRÍTICO' },
  { id: 'K1', label: 'Adultos mayores frágiles',    color: '#ef4444', cx: 82, cy: 35, std: 3.0, n: 40, risk: 'ALTO' },

  // Zona media: riesgo alto-moderado
  { id: 'K5', label: 'Multi-comorbilidad',          color: '#f97316', cx: 55, cy: 60, std: 3.0, n: 28, risk: 'ALTO' },
  { id: 'K2', label: 'Moderado hospitalizado',      color: '#fb923c', cx: 48, cy: 42, std: 3.0, n: 30, risk: 'MODERADO' },
  { id: 'K4', label: 'Jóvenes intubados',           color: '#f59e0b', cx: 28, cy: 75, std: 2.8, n: 20, risk: 'ALTO' },

  // Esquina inf-izquierda: jóvenes sin comorbilidades — los más sanos
  { id: 'K6', label: 'Jóvenes hospitalizados',      color: '#22c55e', cx: 32, cy: 28, std: 3.5, n: 35, risk: 'MODERADO' },
  { id: 'K8', label: 'Bajo riesgo ambulatorio',     color: '#4ade80', cx: 18, cy: 15, std: 3.0, n: 45, risk: 'BAJO' },
  { id: 'K9', label: 'Sin comorbilidades',          color: '#86efac', cx: 12, cy: 42, std: 3.0, n: 30, risk: 'BAJO' },
] as const;
