# Auditoría de calidad — ProjectChat

**Alcance:** Componente `ProjectChat` (`src/components/ui/ProjectChat.tsx`) y su uso en `RootLayout` (`src/app/layout.tsx`).  
**Referencia:** frontend-design skill (anti-patrones), audit skill (A11y, performance, theming, responsive).

---

## Anti-Patterns Verdict

**Resultado: No pasa del todo.** El componente es funcional y no cae en “hero metrics” ni en card grids genéricos, pero hay varios tells:

| Tell | Dónde |
|------|--------|
| **Texto gris sobre fondo de color** | Empty state "Ask anything about Diego's work." con `text-gray-500` sobre fondo offwhite; mensajes del asistente con `bg-gray-100` (gris neutro). El skill: no usar gris sobre color; usar tono del tema. |
| **Bounce easing** | Indicador de carga con `animate-bounce` (3 puntos). El skill desaconseja bounce/elastic. |
| **Placeholder / copy genérico** | "Ask a question...", "Ask about my work", "Portfolio AI" — copy funcional pero genérico; no refuerza voz de marca. |
| **Uso de `any`** | `useChat() as any`, mensajes y partes tipados como `any` — no es anti-patrón visual pero sí de calidad de código. |

No hay gradient text, glassmorphism excesivo ni paleta cyan/purple; el chat es contenido secundario, no hero. Con ajustes de contraste, easing y tokens se alinea mejor al skill.

---

## Executive Summary

- **Total de hallazgos:** 18 (4 críticos, 5 altos, 6 medios, 3 bajos).
- **Más críticos:** (1) Input sin label accesible, (2) Botón flotante y botones de cabecera sin ARIA/roles, (3) Focus visible anulado en input, (4) Áreas táctiles &lt; 44px en móvil.
- **Calidad global:** Funcional y integrado; accesibilidad y consistencia visual necesitan mejoras para producción.
- **Próximos pasos recomendados:** /harden (A11y), /normalize (tokens), /animate (quitar bounce), /adapt (touch + responsive).

---

## Detailed Findings by Severity

### Critical Issues

| # | Ubicación | Categoría | Descripción | Impacto | Estándar | Recomendación | Comando |
|---|-----------|-----------|-------------|---------|----------|----------------|--------|
| 1 | ProjectChat.tsx, input (≈113–119) | A11y | El `<input>` no tiene `<label>` asociado ni `aria-label`. Solo `placeholder="Ask a question..."`. | Lectores de pantalla no anuncian el propósito del campo; incumple WCAG 1.3.1 y 3.3.2. | WCAG 1.3.1, 3.3.2 | Añadir `<label id="chat-input-label">` visible u oculto y `aria-label="Ask a question about Diego's work"`, o `aria-labelledby` al input. | /harden |
| 2 | ProjectChat.tsx, botón flotante (≈32–38) | A11y | `<button>` con texto "Ask about my work" sin `aria-label` descriptivo ni `aria-expanded`. No comunica que abre un chat. | Usuarios de AT no saben que es un toggle que abre un panel de chat. | WCAG 4.1.2 | Añadir `aria-label="Open portfolio chat"` y cuando esté abierto `aria-expanded="true"` en el botón flotante; el panel debería tener `aria-label="Chat about Diego's work"` o similar. | /harden |
| 3 | ProjectChat.tsx, input (≈114) | A11y | Clase `focus:outline-none focus:ring-1 focus:ring-charcoal` — el anillo puede ser insuficiente si el offset no está definido; en globals hay `ring-2 ring-accent`. | Riesgo de que el foco no sea claramente visible (depende de especificidad). | WCAG 2.4.7 | Asegurar focus visible explícito (p. ej. `focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2`) y no depender solo de `ring-1`. | /harden |
| 4 | ProjectChat.tsx, botones expand/close (≈54–62) | A11y + Responsive | Botones con solo icono (Maximize2, Minimize2, X), sin `aria-label` y área táctil pequeña (padding implícito por icono 16px). | En móvil el target es &lt; 44px; usuarios de AT no conocen la acción. | WCAG 2.5.5, 4.1.2 | Añadir `aria-label="Expand chat"` / "Minimize chat" / "Close chat" y `min-w-[44px] min-h-[44px]` para touch. | /harden, /adapt |

### High-Severity Issues

| # | Ubicación | Categoría | Descripción | Impacto | Recomendación | Comando |
|---|-----------|-----------|-------------|---------|----------------|--------|
| 5 | ProjectChat.tsx, empty state (≈69–72) | Theming | `text-gray-500` sobre fondo offwhite. | Contraste insuficiente; gris sobre color. | Sustituir por `text-charcoal/60` o token del tema. | /normalize, /colorize |
| 6 | ProjectChat.tsx, burbujas asistente (≈77, 102) | Theming | `bg-gray-100 text-charcoal` para mensajes del bot. | Uso de gris neutro en lugar de token; inconsistente con `charcoal`/`offwhite`. | Usar `bg-charcoal/5` o `bg-offwhite` con borde, y texto `text-charcoal`. | /normalize |
| 7 | ProjectChat.tsx, formulario (≈112) | A11y | Input sin `id` y sin referencia desde label. Si se añade label, hace falta `htmlFor` e `id`. | Formulario no cumple 1.3.1 cuando se corrija con label. | Asignar `id="project-chat-input"` al input y asociar label. | /harden |
| 8 | ProjectChat.tsx, panel (≈42–47) | A11y | El contenedor del chat no tiene `role="dialog"` ni `aria-modal="true"` cuando está abierto. | AT no lo trata como diálogo modal; navegación por teclado puede salir del panel. | Añadir `role="dialog"` y `aria-modal="true"` al panel abierto, y `aria-labelledby` apuntando al título "Portfolio AI". | /harden |
| 9 | ProjectChat.tsx, scroll (≈67) | A11y | Área de mensajes con `overflow-y-auto` sin `aria-label` ni `role="log"`/`region`. | Región de chat no identificada para AT. | Añadir `role="log"` y `aria-label="Chat messages"` al contenedor de mensajes. | /harden |

### Medium-Severity Issues

| # | Ubicación | Categoría | Descripción | Impacto | Recomendación | Comando |
|---|-----------|-----------|-------------|---------|----------------|--------|
| 10 | ProjectChat.tsx, loading (≈99–106) | Motion | Tres puntos con `animate-bounce`. | Easing tipo bounce desaconsejado por frontend-design. | Sustituir por animación con ease-out (opacity + scale o similar) sin bounce. | /animate |
| 11 | ProjectChat.tsx, useChat (≈13) | Código | `useChat() as any` y uso de `m.parts`, `m.content` con `any`. | Riesgo de errores en tiempo de ejecución y mala DX. | Tipar correctamente con los tipos de `@ai-sdk/react` o interfaces propias. | — |
| 12 | ProjectChat.tsx, botón enviar (≈121–124) | A11y | Botón con solo icono Send sin `aria-label`. | Usuarios de AT no saben que es "Enviar". | Añadir `aria-label="Send message"`. | /harden |
| 13 | ProjectChat.tsx, dimensiones (≈46) | Responsive | Ancho fijo `w-[350px]` y alto fijo `h-[500px]` en modo no expandido. | En viewports &lt; 360px el panel puede desbordar o quedar cortado. | Usar `max-w-[calc(100vw-2rem)]` y `max-h-[85vh]` o similar para adaptar a móvil. | /adapt |
| 14 | ProjectChat.tsx, botón flotante (≈34) | Responsive | Posición `bottom-6 right-6` sin tener en cuenta `env(safe-area-inset-bottom/right)`. | En dispositivos con notch/gestos el botón puede quedar bajo el área segura. | Usar `right-[max(1.5rem,env(safe-area-inset-right))]` y `bottom-[max(1.5rem,env(safe-area-inset-bottom))]`. | /adapt |
| 15 | Layout (layout.tsx, 62) | A11y | `<ProjectChat />` se monta en todas las páginas sin posibilidad de desactivarlo por página. | Usuarios que no quieren chat no pueden ocultarlo de forma persistente. | Opcional: preferencia de usuario o slot para no renderizar en ciertas rutas. | /harden |

### Low-Severity Issues

| # | Ubicación | Categoría | Descripción | Recomendación | Comando |
|---|-----------|-----------|-------------|----------------|--------|
| 16 | ProjectChat.tsx, placeholder (≈115) | UX writing | "Ask a question..." genérico. | Alinear con voz de portfolio (p. ej. "Ask about a project or my stack"). | /clarify |
| 17 | ProjectChat.tsx, título (≈50) | UX writing | "Portfolio AI" — puede sonar genérico. | Considerar algo más personalizado si encaja con la marca. | /clarify |
| 18 | ProjectChat.tsx, scrollIntoView (≈18–21) | Performance | `scrollIntoView({ behavior: 'smooth' })` en cada cambio de `messages`. | En listas muy largas podría ser costoso; generalmente aceptable. | Valorar throttling o scroll solo cuando el usuario no ha hecho scroll manual. | /optimize |

---

## Patterns & Systemic Issues

1. **Formulario sin label:** Un único input sin asociación accesible con label; debe corregirse para cumplir WCAG.
2. **Botones con solo icono:** Expand, Minimize, Close y Send no tienen texto visible ni siempre `aria-label`; touch targets de cabecera &lt; 44px.
3. **Grises en lugar de tokens:** Uso de `gray-500`, `gray-100`, `gray-400` en un proyecto que usa `charcoal`/`offwhite`/`graphite`; conviene unificar.
4. **Panel no declarado como diálogo:** El chat abierto se comporta como overlay pero no tiene `role="dialog"` ni `aria-modal`, lo que afecta a navegación por teclado y AT.

---

## Positive Findings

- **Bot flotante:** Área de click razonable (px-4 py-3) y texto descriptivo "Ask about my work".
- **Estructura del chat:** Mensajes user/assistant diferenciados visualmente; uso de ReactMarkdown para respuestas.
- **Estados:** Loading con indicador visual; botones deshabilitados cuando `isLoading` o input vacío.
- **Expand:** Modo expandido a pantalla completa con `max-w-3xl` centrado mejora lectura en desktop.
- **Integración con API:** Uso de `@ai-sdk/react` y ruta `/api/chat` con system prompt claro y datos del portfolio.

---

## Recommendations by Priority

1. **Inmediato:** Añadir label o `aria-label` al input; `aria-label` y `aria-expanded` al botón flotante; `aria-label` a botones de icono (expand, close, send); touch targets ≥ 44px en cabecera y botón enviar.
2. **Corto plazo:** Sustituir `text-gray-500` y `bg-gray-100` por tokens; `role="dialog"` y `aria-modal` en el panel; `role="log"` y `aria-label` en la zona de mensajes; quitar `animate-bounce` y usar animación sin bounce.
3. **Medio plazo:** Dimensiones responsivas (max-width/max-height) y posicionamiento con safe-area; tipado de `useChat` y mensajes sin `any`.
4. **Largo plazo:** Revisar copy (placeholder, título) y preferencia de usuario para mostrar/ocultar chat.

---

## Suggested Commands for Fixes

| Comando | Aplicación |
|---------|------------|
| **/harden** | Label/aria-label input, aria-label y aria-expanded botón flotante, aria-label botones icono, role="dialog" y aria-modal panel, role="log" mensajes, focus visible input. |
| **/normalize** | Sustituir gray-500, gray-100, gray-400 por tokens (charcoal/offwhite/graphite). |
| **/adapt** | Touch targets 44px (expand, close, send), safe-area en posición del botón y del panel, max-width/max-height en móvil. |
| **/animate** | Sustituir `animate-bounce` del indicador de carga por animación con ease-out. |
| **/clarify** | Placeholder y título del chat para alinearlos con la voz del portfolio. |

---

*Auditoría generada según el skill **audit** sobre el componente **ProjectChat**. No se han aplicado correcciones en código; este documento sirve para priorizar y asignar comandos en siguientes pasos.*
