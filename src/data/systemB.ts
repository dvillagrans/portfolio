import { Node, Edge } from "@xyflow/react";

export const systemBNodes: Node[] = [
  // ENTRADA
  {
    id: "tg-trigger",
    type: "pipeline",
    position: { x: 0, y: 200 },
    data: {
      label: "Telegram Trigger",
      sublabel: "Message Listener",
      nodeType: "trigger",
      tooltip: "Escucha mensajes entrantes de usuarios vía Telegram Bot API.",
    },
  },
  {
    id: "switch-type",
    type: "pipeline",
    position: { x: 200, y: 200 },
    data: {
      label: "Switch",
      sublabel: "Detect Type",
      nodeType: "logic",
      tooltip: "Detecta tipo de mensaje: texto, audio o documento.",
    },
  },
  // Audio branch
  {
    id: "download-audio",
    type: "pipeline",
    position: { x: 400, y: 80 },
    data: {
      label: "Download Audio",
      sublabel: "Media Handler",
      nodeType: "transform",
      tooltip: "Descarga archivo de audio desde Telegram servers.",
    },
  },
  {
    id: "transcribe",
    type: "pipeline",
    position: { x: 600, y: 80 },
    data: {
      label: "Transcribe",
      sublabel: "Speech-to-Text",
      nodeType: "ai",
      tooltip: "Convierte audio a texto con modelo de speech recognition.",
    },
  },
  // Normalize
  {
    id: "edit-fields-b",
    type: "pipeline",
    position: { x: 400, y: 200 },
    data: {
      label: "Edit Fields",
      sublabel: "Normalize",
      nodeType: "transform",
      tooltip: "Normaliza input a formato estándar para el agente.",
    },
  },
  {
    id: "deepseek-memory",
    type: "pipeline",
    position: { x: 600, y: 200 },
    data: {
      label: "DeepSeek Chat",
      sublabel: "Simple Memory",
      nodeType: "ai",
      tooltip: "Contexto rápido con memoria de corto plazo.",
    },
  },
  {
    id: "toast-router",
    type: "pipeline",
    position: { x: 820, y: 200 },
    data: {
      label: "Toast",
      sublabel: "Router",
      nodeType: "logic",
      tooltip: "Routing inicial hacia el agente principal.",
    },
  },
  // AGENTE PRINCIPAL
  {
    id: "agente-principal",
    type: "pipeline",
    position: { x: 1040, y: 200 },
    data: {
      label: "Agente Principal",
      sublabel: "Orquestador",
      nodeType: "ai",
      tooltip: "Orquestador central. Recibe input normalizado y delega a sub-agentes.",
    },
  },
  {
    id: "switch-intent",
    type: "pipeline",
    position: { x: 1260, y: 200 },
    data: {
      label: "Switch2",
      sublabel: "Detect Intent",
      nodeType: "logic",
      tooltip: "Detecta intención y rama a sub-agente especializado.",
    },
  },
  // Rama 1: Calendar
  {
    id: "calendar-code",
    type: "pipeline",
    position: { x: 1260, y: 40 },
    data: {
      label: "Code",
      sublabel: "Parse Date",
      nodeType: "transform",
      tooltip: "Extrae fecha/hora del mensaje del usuario.",
    },
  },
  {
    id: "google-calendar",
    type: "pipeline",
    position: { x: 1480, y: 40 },
    data: {
      label: "Google Calendar",
      sublabel: "API",
      nodeType: "output",
      tooltip: "Consulta disponibilidad en Google Calendar.",
    },
  },
  {
    id: "switch-availability",
    type: "pipeline",
    position: { x: 1700, y: 40 },
    data: {
      label: "Switch3",
      sublabel: "Available?",
      nodeType: "logic",
      tooltip: "Verifica si el slot está disponible.",
    },
  },
  {
    id: "agente-cita",
    type: "pipeline",
    position: { x: 1920, y: 40 },
    data: {
      label: "Agente_Cita",
      sublabel: "Calendar AI",
      nodeType: "ai",
      tooltip: "Sub-agente especializado en gestión de citas.",
    },
  },
  {
    id: "create-event",
    type: "pipeline",
    position: { x: 2140, y: 40 },
    data: {
      label: "Create Event",
      sublabel: "Google Calendar",
      nodeType: "output",
      tooltip: "Crea el evento en el calendario del cliente.",
    },
  },
  {
    id: "insert-row",
    type: "pipeline",
    position: { x: 2360, y: 40 },
    data: {
      label: "Insert Row",
      sublabel: "Database",
      nodeType: "storage",
      tooltip: "Registra la cita en la base de datos.",
    },
  },
  // Rama 2: Documents
  {
    id: "get-file",
    type: "pipeline",
    position: { x: 1260, y: 120 },
    data: {
      label: "Get File",
      sublabel: "Document",
      nodeType: "transform",
      tooltip: "Recupera documento solicitado.",
    },
  },
  {
    id: "http-doc",
    type: "pipeline",
    position: { x: 1480, y: 120 },
    data: {
      label: "HTTP Request",
      sublabel: "Doc Service",
      nodeType: "output",
      tooltip: "Servicio de generación/envío de documentos.",
    },
  },
  {
    id: "send-doc",
    type: "pipeline",
    position: { x: 1700, y: 120 },
    data: {
      label: "Send Document",
      sublabel: "Telegram",
      nodeType: "output",
      tooltip: "Envía documento al usuario por Telegram.",
    },
  },
  // Rama 3: General AI
  {
    id: "ai-agent2",
    type: "pipeline",
    position: { x: 1260, y: 280 },
    data: {
      label: "AI Agent2",
      sublabel: "General",
      nodeType: "ai",
      tooltip: "Sub-agente de respuesta general con RAG.",
    },
  },
  {
    id: "deepseek-model3",
    type: "pipeline",
    position: { x: 1480, y: 280 },
    data: {
      label: "DeepSeek",
      sublabel: "Chat Model 3",
      nodeType: "ai",
      tooltip: "Modelo de conversación general con streaming.",
    },
  },
  {
    id: "stream-parser",
    type: "pipeline",
    position: { x: 1700, y: 280 },
    data: {
      label: "StreamParser",
      sublabel: "Token Stream",
      nodeType: "transform",
      tooltip: "Parsea stream de tokens para respuesta en tiempo real.",
    },
  },
  {
    id: "telegram-ai",
    type: "pipeline",
    position: { x: 1920, y: 280 },
    data: {
      label: "Telegram",
      sublabel: "Response",
      nodeType: "output",
      tooltip: "Envía respuesta generada al usuario.",
    },
  },
  // Rama 4: Data/Analytics
  {
    id: "ai-agent3",
    type: "pipeline",
    position: { x: 1260, y: 360 },
    data: {
      label: "AI Agent3",
      sublabel: "Data",
      nodeType: "ai",
      tooltip: "Sub-agente especializado en queries de datos.",
    },
  },
  {
    id: "deepseek-model2",
    type: "pipeline",
    position: { x: 1480, y: 360 },
    data: {
      label: "DeepSeek",
      sublabel: "Chat Model 2",
      nodeType: "ai",
      tooltip: "Modelo para generación de queries SQL/naturales.",
    },
  },
  {
    id: "postgres",
    type: "pipeline",
    position: { x: 1700, y: 360 },
    data: {
      label: "PostgreSQL",
      sublabel: "Query",
      nodeType: "storage",
      tooltip: "Ejecuta query en PostgreSQL.",
    },
  },
  {
    id: "insert-rows",
    type: "pipeline",
    position: { x: 1920, y: 360 },
    data: {
      label: "Insert Rows",
      sublabel: "Table",
      nodeType: "storage",
      tooltip: "Persiste resultados en tabla de analytics.",
    },
  },
  {
    id: "telegram-data",
    type: "pipeline",
    position: { x: 2140, y: 360 },
    data: {
      label: "Telegram",
      sublabel: "Confirm",
      nodeType: "output",
      tooltip: "Confirma al usuario que los datos fueron procesados.",
    },
  },
];

export const systemBEdges: Edge[] = [
  // Input chain
  { id: "b1", source: "tg-trigger", target: "switch-type", animated: true },
  // Audio branch
  { id: "b2", source: "switch-type", target: "download-audio", animated: true },
  { id: "b3", source: "download-audio", target: "transcribe", animated: true },
  // Text branch + merge
  { id: "b4", source: "switch-type", target: "edit-fields-b", animated: true },
  { id: "b5", source: "transcribe", target: "edit-fields-b", animated: true },
  { id: "b6", source: "edit-fields-b", target: "deepseek-memory", animated: true },
  { id: "b7", source: "deepseek-memory", target: "toast-router", animated: true },
  { id: "b8", source: "toast-router", target: "agente-principal", animated: true },
  // Main agent routing
  { id: "b9", source: "agente-principal", target: "switch-intent", animated: true },
  // Branch 1: Calendar
  { id: "b10", source: "switch-intent", target: "calendar-code", animated: true },
  { id: "b11", source: "calendar-code", target: "google-calendar", animated: true },
  { id: "b12", source: "google-calendar", target: "switch-availability", animated: true },
  { id: "b13", source: "switch-availability", target: "agente-cita", animated: true },
  { id: "b14", source: "agente-cita", target: "create-event", animated: true },
  { id: "b15", source: "create-event", target: "insert-row", animated: true },
  // Branch 2: Documents
  { id: "b16", source: "switch-intent", target: "get-file", animated: true },
  { id: "b17", source: "get-file", target: "http-doc", animated: true },
  { id: "b18", source: "http-doc", target: "send-doc", animated: true },
  // Branch 3: General AI
  { id: "b19", source: "switch-intent", target: "ai-agent2", animated: true },
  { id: "b20", source: "ai-agent2", target: "deepseek-model3", animated: true },
  { id: "b21", source: "deepseek-model3", target: "stream-parser", animated: true },
  { id: "b22", source: "stream-parser", target: "telegram-ai", animated: true },
  // Branch 4: Data
  { id: "b23", source: "switch-intent", target: "ai-agent3", animated: true },
  { id: "b24", source: "ai-agent3", target: "deepseek-model2", animated: true },
  { id: "b25", source: "deepseek-model2", target: "postgres", animated: true },
  { id: "b26", source: "postgres", target: "insert-rows", animated: true },
  { id: "b27", source: "insert-rows", target: "telegram-data", animated: true },
];
