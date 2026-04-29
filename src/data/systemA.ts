import { Node, Edge } from "@xyflow/react";

export const systemANodes: Node[] = [
  // INGESTA
  {
    id: "webhook",
    type: "pipeline",
    position: { x: 0, y: 180 },
    data: {
      label: "Webhook",
      sublabel: "POST /hook",
      nodeType: "trigger",
      tooltip:
        "Entry point. Recibe eventos de sistemas externos. El primer reto fue que los payloads llegaban sin esquema fijo.",
    },
  },
  {
    id: "code-normalize",
    type: "pipeline",
    position: { x: 220, y: 180 },
    data: {
      label: "Code",
      sublabel: "Normalize",
      nodeType: "transform",
      tooltip:
        "Capa de normalización. Resuelve campos faltantes, coerce tipos, valida estructura antes de pasar al agente.",
    },
  },
  // PROCESAMIENTO AI
  {
    id: "ai-agent",
    type: "pipeline",
    position: { x: 460, y: 160 },
    data: {
      label: "AI Agent",
      sublabel: "DeepSeek · Memory",
      nodeType: "ai",
      tooltip:
        "Agente principal con DeepSeek. Usa memoria de chat para contexto y Structured Output Parser para garantizar JSON consistente.",
    },
  },
  // Rama superior
  {
    id: "edit-fields",
    type: "pipeline",
    position: { x: 700, y: 100 },
    data: {
      label: "Edit Fields",
      sublabel: "Schema Map",
      nodeType: "transform",
      tooltip:
        "Mapea los campos extraídos al schema de MongoDB diseñado para KPI queries.",
    },
  },
  {
    id: "mongo-insert",
    type: "pipeline",
    position: { x: 920, y: 100 },
    data: {
      label: "MongoDB",
      sublabel: "Insert",
      nodeType: "storage",
      tooltip:
        "Persistencia primaria. Schema diseñado desde el inicio para soportar agregaciones y dashboards de KPIs.",
    },
  },
  // Rama inferior
  {
    id: "code2",
    type: "pipeline",
    position: { x: 700, y: 260 },
    data: {
      label: "Code",
      sublabel: "Enrich",
      nodeType: "transform",
      tooltip: "Deduplicación y enriquecimiento de contexto antes de procesamiento downstream.",
    },
  },
  {
    id: "mongo-find",
    type: "pipeline",
    position: { x: 920, y: 260 },
    data: {
      label: "MongoDB",
      sublabel: "Find",
      nodeType: "storage",
      tooltip: "Lookup para enriquecer contexto antes de pasar al pipeline de salida.",
    },
  },
  // OUTPUT
  {
    id: "http-pdf",
    type: "pipeline",
    position: { x: 1160, y: 180 },
    data: {
      label: "HTTP Request",
      sublabel: "puppeteer-pdf",
      nodeType: "output",
      tooltip: "Genera PDF del documento procesado via puppeteer microservice.",
    },
  },
  {
    id: "google-drive",
    type: "pipeline",
    position: { x: 1380, y: 180 },
    data: {
      label: "Google Drive",
      sublabel: "upload_file",
      nodeType: "output",
      tooltip: "Upload del PDF generado al Drive del cliente.",
    },
  },
  {
    id: "code-msg",
    type: "pipeline",
    position: { x: 1600, y: 180 },
    data: {
      label: "Code",
      sublabel: "Prepare Msg",
      nodeType: "transform",
      tooltip: "Prepara mensaje de notificación con metadata del proceso.",
    },
  },
  {
    id: "http-excel",
    type: "pipeline",
    position: { x: 1820, y: 180 },
    data: {
      label: "HTTP Request",
      sublabel: "excel-proxy",
      nodeType: "output",
      tooltip: "Proxy para actualización de registros en Excel/Sheets.",
    },
  },
  {
    id: "telegram",
    type: "pipeline",
    position: { x: 2040, y: 180 },
    data: {
      label: "Telegram",
      sublabel: "send_message",
      nodeType: "output",
      tooltip:
        "Notificación de confirmación al operador. Sistema de alertas para monitoreo en producción.",
    },
  },
];

export const systemAEdges: Edge[] = [
  { id: "e1", source: "webhook", target: "code-normalize", animated: true },
  { id: "e2", source: "code-normalize", target: "ai-agent", animated: true },
  // Branch upper
  { id: "e3", source: "ai-agent", target: "edit-fields", animated: true },
  { id: "e4", source: "edit-fields", target: "mongo-insert", animated: true },
  // Branch lower
  { id: "e5", source: "ai-agent", target: "code2", animated: true },
  { id: "e6", source: "code2", target: "mongo-find", animated: true },
  // Output chain
  { id: "e7", source: "mongo-insert", target: "http-pdf", animated: true },
  { id: "e8", source: "mongo-find", target: "http-pdf", animated: true },
  { id: "e9", source: "http-pdf", target: "google-drive", animated: true },
  { id: "e10", source: "google-drive", target: "code-msg", animated: true },
  { id: "e11", source: "code-msg", target: "http-excel", animated: true },
  { id: "e12", source: "http-excel", target: "telegram", animated: true },
];
