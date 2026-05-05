# Auditoría de calidad — Landing Portfolio

**Alcance:** Página principal (landing) — `src/app/page.tsx` y secciones: Hero, FeaturedWork, Marquee, Systems, Philosophy, Stack, Contact; Navbar; layout y estilos globales.  
**Referencia de diseño:** frontend-design skill (anti-patrones, tipografía, color, movimiento, accesibilidad).

---

## Anti-Patterns Verdict

**Resultado: No pasa del todo.** La landing no es “AI slop” puro — hay dirección clara (oscuro, tipografía serif+sans, acento teal contenido) y contenido real (proyectos, i18n). Pero aparecen varios tells del skill:

| Tell | Dónde |
|------|--------|
| **Easing tipo bounce/elastic** | Philosophy usa `back.out(1.7)`, Stack usa `back.out(1.5)` — el skill desaconseja bounce/elastic. |
| **Animación de altura** | Navbar menú móvil: transición `max-h-0` → `max-h-64` (animar height/max-height es anti-patrón). |
| **Glassmorphism genérico** | Navbar con `backdrop-blur-xl`; `.glass-panel` en globals; uso decorativo de blur. |
| **Texto gris sobre fondo de color** | Systems: `text-gray-500`, `text-gray-400` sobre fondo oscuro; Philosophy: `text-charcoal/70` sobre fondos claros — el skill advierte que el gris sobre color se ve lavado. |
| **Dark mode por defecto + un acento** | Fondo charcoal + acento teal sin variación — “looks cool without requiring actual design decisions”. |
| **Cards redondeadas + sombra repetidas** | FeaturedWork, Philosophy, Systems: mismo patrón rounded-2xl/3xl + shadow — “safe, forgettable”. |
| **Space Grotesk** | Aunque no está en la lista explícita “Inter, Roboto, Arial”, es muy usada en portfolios; la combinación con EB Garamond ayuda a dar personalidad. |

**Conclusión:** Con ajustes en movimiento (quitar back.out, no animar max-height), reducir glassmorphism y revisar grises sobre color, la base se alinea mejor con el skill y se aleja del “AI slop”.

---

## Executive Summary

- **Total de hallazgos:** 40+ (agrupados por severidad abajo).
- **Críticos:** 3 (skip link, focus visible, touch targets en controles clave).
- **Altos:** 8 (jerarquía de encabezados, ARIA, contraste, teclado, theming).
- **Medios:** 12 (performance, animaciones, tokens, responsive).
- **Bajos:** varios (optimizaciones, consistencia).

**Top 3–5 críticos/altos:**

1. Sin “skip to content” y sin respeto explícito a `prefers-reduced-motion`.
2. Focus no visible en muchos controles (inputs Contact con `outline-none`, enlaces/botones sin anillo de foco consistente).
3. Áreas táctiles &lt; 44px en móvil (idioma, hamburger, dots del carrusel).
4. Sección Philosophy sin `<h2>` — salto de jerarquía (h1 → h3).
5. Colores en código (hex en GSAP y en Contact) en lugar de tokens.

**Calidad global:** Buena base (semántica, i18n, tokens en gran parte de la UI). Para “production-grade” y alineado al skill: corregir accesibilidad (focus, touch, skip, reduced motion), jerarquía y theming, y suavizar anti-patrones de movimiento y glassmorphism.

**Próximos pasos sugeridos:** Arreglar críticos de A11y → luego /normalize para tokens y theming → /animate (o revisión manual) para easing y animaciones de altura → /adapt para touch targets y responsive.

---

## Detailed Findings by Severity

### Critical

| # | Ubicación | Categoría | Descripción | Impacto | Estándar | Recomendación | Comando sugerido |
|---|-----------|------------|-------------|---------|----------|----------------|-------------------|
| 1 | Toda la app | A11y | No hay “skip to main content” (enlace de salto al contenido). | Usuarios de teclado y lectores de pantalla deben atravesar nav en cada carga. | WCAG 2.4.1 (Bypass Blocks) | Añadir un `<a href="#main-content">Skip to content</a>` visible al recibir foco, y `id="main-content"` en el `<main>`. | /harden |
| 2 | `Contact.tsx` inputs (≈143, 155, 167) | A11y | `outline-none` sin reemplazo visible de foco. | Usuarios de teclado no ven dónde está el foco en nombre, email, mensaje. | WCAG 2.4.7 (Focus Visible) | Mantener `focus:border-accent` y añadir `focus-visible:ring-2 focus-visible:ring-accent` (o similar) en lugar de quitar outline sin alternativa. | /harden |
| 3 | `Navbar.tsx` (≈54–72), `FeaturedWork.tsx` (≈166–178) | A11y / Responsive | Botón de idioma y hamburger muy pequeños; dots del carrusel ~6px. | En móvil, controles por debajo de 44×44px dificultan uso táctil y aumentan errores. | WCAG 2.5.5 (Target Size) | Aumentar área táctil a mínimo 44×44px (padding/min-height/min-width), manteniendo diseño visual con hit area ampliada. Dots: controles más grandes o agrupados. | /adapt |

### High

| # | Ubicación | Categoría | Descripción | Impacto | Estándar | Recomendación | Comando sugerido |
|---|-----------|------------|-------------|---------|----------|----------------|-------------------|
| 4 | `Philosophy.tsx` | A11y | La sección no tiene `<h2>`. Solo etiqueta “04.” en `<span>` y luego `<h3>` en cada tarjeta. | Jerarquía h1 → h3 sin h2; lectores de pantalla y SEO pierden estructura. | WCAG 1.3.1 (Info and Relationships) | Añadir un `<h2>` para la sección (ej. “Working Principles” o el texto de `t.philosophy.tag`) y mantener h3 en las tarjetas. | /harden |
| 5 | `layout.tsx` | A11y | `<html lang="en">` fijo aunque existe i18n (EN/ES). | Si el usuario elige español, el documento sigue declarado como inglés. | WCAG 3.1.2 (Language of Parts) | Establecer `lang` dinámicamente según idioma activo (ej. `lang={language}` desde LanguageContext). | /harden |
| 6 | Systems, Philosophy, Hero | Theming | Texto gris sobre fondos de color: `text-gray-500`, `text-gray-400`, `text-charcoal/70`. | Contraste y legibilidad reducidos; “washed out” según el skill. | WCAG 1.4.3 (Contrast) | Usar tonos derivados del fondo (ej. offwhite/charcoal con opacidad) en lugar de grises neutros sobre color. | /normalize, /colorize |
| 7 | Enlaces y botones (Navbar, Hero CTA, FeaturedWork, Contact) | A11y | No hay anillo de foco visible (focus ring) consistente. | Navegación por teclado sin indicación clara de foco. | WCAG 2.4.7 | Añadir estilos `focus-visible:ring-2 focus-visible:ring-accent` (o similar) en base/componentes para enlaces y botones. | /harden |
| 8 | `Contact.tsx` (≈26–35, 126) | Theming | Colores en código: `#0f0f11`, `#000000`, `#111111` en GSAP y en clase. | Rompe theming único y mantenibilidad; no siguen tokens. | Consistencia | Usar variables CSS (charcoal, graphite) en lugar de hex. | /normalize |
| 9 | `Navbar.tsx` menú móvil | A11y | Menú desplegable sin `aria-expanded`, `aria-controls` o `aria-label` descriptivo en el botón. | Estado del menú no expuesto a lectores de pantalla. | WCAG 4.1.2 (Name, Role, Value) | Añadir `aria-expanded={mobileMenuOpen}`, `aria-controls="mobile-menu"` y `id="mobile-menu"` en el panel. | /harden |
| 10 | `FeaturedWork.tsx` carrusel móvil | A11y | Carrusel horizontal sin `role="region"`, `aria-label` o roles de tablist/tab para los dots. | Usuarios de AT no perciben la región ni la relación dots ↔ slides. | WCAG 1.3.1, 2.1.1 | Region con aria-label; dots como tablist con tab y aria-selected. | /harden |

### Medium

| # | Ubicación | Categoría | Descripción | Impacto | Recomendación | Comando sugerido |
|---|-----------|------------|-------------|---------|----------------|-------------------|
| 11 | `Philosophy.tsx` (≈43), `Stack.tsx` (≈74) | Performance / Motion | Easing `back.out(1.7)` y `back.out(1.5)` (tipo bounce). | Sensación “tacky” y alejada del skill (exponential easing). | Cambiar a `expo.out` o `power3.out`. | /animate |
| 12 | `Navbar.tsx` (≈78) | Performance | Transición en `max-h-0` / `max-h-64`. | Animación de layout; puede causar repaints. | Usar `grid-template-rows: 0fr` / `1fr` y transicionar, o opacity + visibility sin animar altura. | /animate, /optimize |
| 13 | `Contact.tsx` (≈25–35) | Performance | GSAP animando `backgroundColor` con scrub. | Cambios de color en scroll pueden ser costosos. | Valorar reducir scrub o sustituir por opacity/capas si es posible. | /optimize |
| 14 | `globals.css` @theme | Theming | Colores con hex (#090a0a, #2b5a5c, etc.). | Menos mantenible que oklch/color-mix. | Migrar a oklch/color-mix cuando sea viable. | /normalize |
| 15 | `Hero.tsx` | Performance | Imagen de fondo en `backgroundImage` sin `loading="lazy"` ni `sizes` (es above-the-fold; lazy no obligatorio). | — | Considerar `<Image>` con sizes si se usa Next/Image en hero, o prioridad de carga. | /optimize |
| 16 | `CustomCursor.tsx` | Código | Importado en `layout.tsx` pero no renderizado en el árbol. | Código muerto; confusión. | Eliminar import y componente del layout o volver a montarlo si se desea cursor custom. | — |
| 17 | `GridOverlay.tsx` | Código | Importado en `layout.tsx` pero no renderizado. | Igual que arriba. | Eliminar import o renderizar overlay si es intencional. | — |
| 18 | `CustomCursor.tsx` (≈86–91) | A11y | Si se activara: `cursor: none !important` en body/buttons/links. | Oculta el cursor del sistema; problema para usuarios que dependen del puntero. | Si se usa, respetar `prefers-reduced-motion` o no forzar cursor:none. | /harden |
| 19 | Toda la app | A11y | No hay respeto a `prefers-reduced-motion`. | Animaciones y transiciones pueden afectar a usuarios sensibles al movimiento. | Reducir o desactivar animaciones cuando `prefers-reduced-motion: reduce`. | /harden, /animate |
| 20 | Secciones (Systems, Stack, Philosophy) | Responsive | Solo breakpoints `md`/`lg`; no `@container`. | Menos adaptación a contexto del contenedor. | Valorar container queries para componentes reutilizables. | /adapt |
| 21 | Systems (SVG) | A11y | SVGs decorativos sin `aria-hidden="true"` o `role="img"` + `aria-label`. | Pueden ser anunciados como “image” sin contexto. | Marcar como decorativos con `aria-hidden="true"`. | /harden |
| 22 | `Contact.tsx` (≈131) | UX writing | Botón de envío muestra “Procesando...” fijo en español aunque el sitio sea EN. | Inconsistencia i18n. | Usar clave de diccionario según idioma activo. | /clarify, /harden |

### Low

| # | Ubicación | Categoría | Descripción | Recomendación | Comando sugerido |
|---|-----------|------------|-------------|----------------|-------------------|
| 23 | Navbar, Hero, FeaturedWork | Theming | Glassmorphism (backdrop-blur) y cards muy homogéneas. | Reducir blur a casos concretos; variar ritmo visual. | /distill, /quieter |
| 24 | Philosophy, FeaturedWork | Design | Patrón “card con icono/número + título + texto” repetido. | Romper ritmo (tamaños, disposición) para evitar “identical card grid”. | /bolder, /critique |
| 25 | `Marquee.tsx` | A11y | Texto en movimiento sin control de pausa. | Considerar pausa con `prefers-reduced-motion` o botón pause. | /harden |
| 26 | Forms Contact | A11y | Sin mensajes de error inline asociados a campos (solo estado global success/error). | Mejorar feedback por campo. | /harden, /clarify |
| 27 | Varios | Performance | Varios `ScrollTrigger` y contextos GSAP; correctos pero numerosos. | Revisar que no se registren duplicados en re-renders. | /optimize |

---

## Patterns & Systemic Issues

1. **Focus visible:** Casi ningún control (enlaces, botones, inputs) tiene anillo de foco explícito; en Contact se anula con `outline-none`. Solución: estilo global o de utilidad `focus-visible:ring-2 focus-visible:ring-accent` y no quitar outline sin reemplazo.
2. **Touch targets:** Botones pequeños (idioma, hamburger, dots) se repiten en la misma barra; conviene una regla mínima de 44×44px para controles táctiles.
3. **Theming:** Tokens usados bien en la mayoría de la landing; excepciones en Contact (hex en GSAP y en `bg-[#111111]`) y en la página TimeUp (muchos hex y paleta cyan/blue tipo “AI”). Unificar en tokens.
4. **Motion:** Uso de `back.out` y animación de `max-height` se sale de las recomendaciones del skill; el resto (transform/opacity, power3/expo) está alineado.
5. **Jerarquía de encabezados:** Solo Philosophy omite h2; el resto mantiene h1 → h2 → h3/h4. Corregir Philosophy evita el patrón “section sin título semántico”.

---

## Positive Findings

- **Estructura semántica:** `<main>`, `<section>`, `id="projects"`, `id="systems"`, `id="contact"` para anclas y landmarks.
- **Formulario Contact:** Labels con `htmlFor` correcto; inputs con `id`; estructura accesible salvo focus visible y errores por campo.
- **Tokens:** Uso consistente de `charcoal`, `offwhite`, `accent`, `graphite`, `gray-*` en la mayoría de componentes.
- **Tipografía:** Pareja EB Garamond (serif) + Space Grotesk (sans) con roles claros (titulares vs cuerpo).
- **i18n:** EN/ES implementado; diccionarios centralizados.
- **View Transitions:** Transiciones de página con next-view-transitions.
- **Animaciones:** Mayoría con transform/opacity y easing tipo power3/expo; solo Philosophy y Stack usan back.out.
- **Sin gradient text en hero:** Acento teal sólido en la landing; evita el cliché de “gradient text for impact”.
- **Imágenes FeaturedWork:** Uso de `alt={project.title}` en imágenes de proyectos.

---

## Recommendations by Priority

1. **Inmediato**
   - Añadir skip link y `id="main-content"` en `<main>`.
   - Restaurar focus visible en inputs de Contact y añadir focus ring en enlaces/botones principales.
   - Subir tamaño táctil de idioma, hamburger y dots del carrusel a ≥44px (área de toque).

2. **Corto plazo**
   - Añadir `<h2>` en Philosophy y corregir `lang` en `<html>` según idioma.
   - Sustituir hex en Contact por tokens; ARIA en menú móvil y en carrusel (region, tablist).
   - Respetar `prefers-reduced-motion` en animaciones y, si se usa CustomCursor, en cursor.

3. **Medio plazo**
   - Cambiar `back.out` por `expo.out`/`power3.out`; sustituir animación de `max-h` en Navbar por grid/opacity.
   - Revisar contraste de textos grises (Systems, Philosophy) y migrar a tonos del tema.
   - Eliminar o activar CustomCursor/GridOverlay en layout; i18n para “Procesando…”.

4. **Largo plazo**
   - Migrar colores del theme a oklch/color-mix; container queries donde aporten valor.
   - Reducir glassmorphism y variar patrones de cards para mayor diferenciación visual.

---

## Suggested Commands for Fixes

| Comando | Uso |
|--------|-----|
| **/harden** | Skip link, focus visible, touch targets, ARIA (menú, carrusel), `lang` dinámico, reduced motion, SVGs decorativos, errores de formulario, mensaje “Procesando…” i18n. |
| **/normalize** | Tokens en Contact (sustituir hex); opcional migración de @theme a oklch. |
| **/animate** | Sustituir `back.out` por exponential; animación del menú móvil sin max-height. |
| **/adapt** | Áreas táctiles ≥44px; container queries si se adoptan. |
| **/optimize** | ScrollTrigger/GSAP sin duplicados; animación de backgroundColor en Contact; prioridad/carga de imagen Hero si aplica. |
| **/clarify** | Texto “Procesando…” y mensajes de error del formulario. |
| **/colorize** o **/quieter** | Ajuste de grises sobre color y reducción de glassmorphism según intención (más impacto vs más sobrio). |

---

*Auditoría generada según el skill **audit** y criterios del skill **frontend-design**. No se han aplicado correcciones en código; este documento sirve para priorizar y asignar comandos/skills en siguientes pasos.*
