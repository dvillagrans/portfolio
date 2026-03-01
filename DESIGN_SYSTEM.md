# Portfolio V2 - Design System & Operative Logic

## Core Aesthetic: "Minimal Systems / Editorial Tech"
A high-fidelity, cinematic, pixel-perfect personal portfolio designed for a World-Class Senior Creative Technologist. The visual language blends rigid architectural systems with high-end editorial typography, avoiding generic "developer portfolio" tropes. It feels like an operating system merged with a high-end magazine.

---

## 1. Typography Architecture

The layout relies heavily on typographic contrast, strict nesting, and negative space rather than decorative UI elements.

- **Primary Display (Headers, Massive Text):**
  - Font: `Space Grotesk`
  - Usage: H1, Hero statements, massive structural numbers (`01`, `02`).
  - Treatment: Tight tracking (letter-spacing), often uppercase, extreme sizes mixed with subtle opacities relative to the background.

- **Editorial Narrative (Manifestos, Long-form reading):**
  - Font: `EB Garamond` (Serif)
  - Usage: Subtitles, blockquotes, philosophical case study sections.
  - Treatment: Often italicized to contrast sharply against the rigid sans-serif, giving it a "published book" feel.

- **System / Meta / Operative Text:**
  - Font: `JetBrains Mono`
  - Usage: Small caps headers (`01 // PROBLEM SPACE`), navigation links, technical constraints, metadata tags, coordinate readouts.
  - Treatment: `uppercase text-[10px] tracking-widest text-white/40`.

---

## 2. Color Space & Lighting

- **Palette:** Strictly monochromatic.
  - Background: Deep black (`bg-black`).
  - Typography: Pure white, but entirely controlled via alpha channels (`text-white/30`, `text-white/60`, `text-white/90`).
  
- **Atmosphere (The "Dark Water"):**
  - An underlying abstract, organic image (`/images/bg-water-dark.jpg`) is placed behind the entire application.
  - Setup: Absolute positioning, `-z-10`, forced `object-cover`.
  - Effect: Handled using a `mix-blend-screen` with `opacity-80`. This ensures the organic texture is visible as a subtle physical presence without breaking the stark contrast of the typography.

- **Overlays & Textures:**
  - **Grid Overlay:** A fixed CAD-style coordinate grid (`.bg-grid-pattern`) layered over the viewport, adding structural depth to the organic water.
  - **Noise Texture:** A global SVG fractal noise base (`.noise-overlay`) to add film-grain realism and "physicality" to the digital interface, avoiding flat mathematical gradients.

---

## 3. UI Patterns & Micro-Interactions

- **Glass & Borders (The Interface):**
  - Elements do not use solid colors. They use ultra-fine borders (`border-white/10`) and slight background washes (`bg-white/[0.02]`) that react on hover (`hover:bg-white/[0.04]`). 
  - This "ghost UI" pattern makes the structure visible only when interacted with or strictly needed.

- **Kinesthetic Interactions:**
  - **Custom Hardware-Accelerated Cursor:** A custom circular cursor built with GSAP `quickTo`. It replaces the standard DOM pointer, snapping to interactive elements with physics-based interpolation.
  - **Reveal Animations (`.reveal-fade`):** All major sections stagger in on scroll using GSAP `ScrollTrigger`.
    - Initial state: `y: 30, opacity: 0`
    - Final state: `y: 0, opacity: 1, ease: "power3.out"`. 
    - This ensures content "settles" into place as the user digests the layout.

- **Data Density (System Tables):**
  - Project lists (like the `/projects` archive route) bypass generic "card" designs. Instead, they use brutalist, dense table layouts inspired by server logs or flight manifests. Strict columns, monospace headers, and horizontal rules (`border-b border-white/10`).

---

## 4. Route Anatomy

### 4.1 Root (`/`) - The Core Setup
Composed of distinct semantic blocks:
- **Nav:** Floating, sticky, blurred backdrop (`backdrop-blur-md`).
- **Hero:** Massive typography statement, marquee text ticker for visceral movement, and ambient coordinate readouts mimicking HUD data.
- **Work (Proof of Execution):** A curated selection of 3 highest-impact systems.
- **Philosophy / Operative Logic:** A brutalist breakdown of how systems are approached (Structure First, Intentional Friction).

### 4.2 System Archive (`/projects`)
- A complete index. Foregoes images in favor of high-density typography. A strict list of deployed architectures, categorized by Year, Domain, and Link.

### 4.3 Operative Logic (`/about`)
- Explicitly avoiding the "standard CV biography".
- Structured as "Criteria". Sections like "What I Optimize For" and "Architectural Decisions", mapping exact trade-offs like "Resilience over cleverness" and "Push compute to the edge".

### 4.4 Case Study (`/projects/timeup`)
- Editorial flow mixed with technical post-mortem.
- Follows a strict structure:
  1. Meta Grid (Role, Timeline, Architecture).
  2. The Real Problem (Storytelling via Serif fonts).
  3. Context & Constraints.
  4. System Architecture (Rendered in raw ASCII `.txt`).
  5. Key Decisions (Dense UI grid explaining *Why* and *Trade-offs*).
  6. Post-Mortem (What Broke & What Hurt - highlighting engineering maturity).

---

## 5. Engineering Architecture

- **Framework:** Next.js 16.1.6 (App Router) prioritizing static rendering where possible.
- **Styling Engine:** Tailwind CSS v4.2 using inline opacity values and arbitrary variants for rapid, highly-specific layout control.
- **Animation Engine:** GSAP (GreenSock) for performant, layout-safe animations outside the standard React render cycle, avoiding unnecessary re-renders.
- **i18n (Internationalization):**
  - Custom React Context (`LanguageContext.tsx`) built strictly to handle hydration safety.
  - Bridges `localStorage` state with native `navigator.language` to switch seamlessly between localized string dictionaries (`dictionaries.ts`) mapped directly via object notation (e.g. `t.hero.title1`). 
