# Diego Villagran — Portfolio

**AI & Data Engineer · ML Systems Builder**

Production-grade personal portfolio built with Next.js 16, featuring bilingual i18n, AI chat, interactive D3 visualizations, and a cinematic dark/light design system.

**[→ dvillagrans.dev](https://www.dvillagrans.dev)**

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS 4, OKLCH color system, CSS custom properties |
| **Animation** | GSAP + ScrollTrigger, next-view-transitions |
| **Data Viz** | D3.js, Chart.js, @xyflow/react (React Flow) |
| **AI** | Vercel AI SDK + DeepSeek (chat assistant grounded in resume data) |
| **Email** | Resend (contact form with custom HTML template) |
| **Analytics** | Vercel Analytics |
| **Testing** | Vitest + React Testing Library |
| **Fonts** | Space Grotesk, EB Garamond, JetBrains Mono |
| **Deployment** | Vercel |

---

## Features

- **Bilingual (EN/ES)** — full i18n dictionary system with type-safe translations across all pages and case studies
- **Dark/Light theme** — custom CSS property system with OKLCH-calibrated palette, persisted to localStorage
- **AI Chat Assistant** — conversational agent grounded in resume data via DeepSeek, with rate limiting
- **Interactive D3 Visualizations** — COVID clusters, NYC fare heatmaps, India AQI charts embedded in project cards
- **Case Study Pages** — deep-dive architecture breakdowns for EyeNet, TimeUp, and India AQI
- **Contact Form** — rate-limited API route, Resend email delivery, inline field validation, i18n error messages
- **Cinematic Motion** — GSAP ScrollTrigger animations with `prefers-reduced-motion` respect
- **Security** — CSP headers, rate limiting, XSS protection, strict CORS policy
- **SEO** — per-page metadata, JSON-LD structured data, sitemap, robots.txt, Open Graph
- **Console Easter Egg** — hidden terminal for the curious

---

## Getting Started

```bash
# Clone
git clone https://github.com/dvillagrans/portfolio.git
cd portfolio-v2

# Install
pnpm install

# Configure environment
cp .env.example .env
# Edit .env with your Resend and DeepSeek API keys

# Run dev server
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── about/              # About page + loading state + metadata
│   ├── api/
│   │   ├── chat/           # AI chat endpoint (DeepSeek + rate limiting)
│   │   └── contact/        # Contact form endpoint (Resend + rate limiting)
│   ├── projects/           # Case study pages (EyeNet, TimeUp) + archive
│   └── layout.tsx          # Root layout (fonts, theme, SEO metadata, providers)
├── components/
│   ├── layout/             # Navbar (responsive, mobile menu, i18n)
│   ├── sections/           # Landing sections (Hero, FeaturedWork, Systems, Philosophy, Stack, Contact, Certifications)
│   ├── portfolio/          # D3 visualization components
│   └── ui/                 # Reusable UI (ProjectChat, Marquee, SystemDiagram, CertLightbox, EasterEgg...)
├── data/                   # Resume JSON, certifications, viz datasets
├── hooks/                  # ThemeContext, useReducedMotion, useVizReveal
├── i18n/                   # Type-safe dictionary system (EN/ES)
└── lib/                    # Rate limiter
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start development server (Turbopack) |
| `pnpm run build` | Production build |
| `pnpm run start` | Start production server |
| `pnpm run lint` | Run ESLint |
| `pnpm run typecheck` | TypeScript type checking |
| `pnpm test` | Run Vitest test suite |
| `pnpm run test:watch` | Vitest in watch mode |

---

## Architecture Highlights

- **Rate limiting** — in-memory sliding window on both `/api/chat` and `/api/contact`
- **Email template** — custom HTML email with system dashboard aesthetic for contact form submissions
- **i18n** — centralized dictionary types, zero runtime overhead, compile-time safety
- **Animations** — GSAP context scoped to components, ScrollTrigger cleanup on unmount, `prefers-reduced-motion` respected globally
- **Theme** — CSS custom properties with OKLCH perceptual uniformity, instant flash-free switching via inline script
- **View Transitions** — cross-page transitions via `next-view-transitions` with custom director component

---

## Deploy

Deployed on [Vercel](https://vercel.com). Push to `main` for automatic deployment.

> **Production checklist:**
> 1. Set the Vercel Node.js runtime to `24.x` and enable `ENABLE_EXPERIMENTAL_COREPACK=1` so the pinned pnpm version is used.
> 2. Verify your domain in [Resend](https://resend.com/domains) and set `RESEND_API`, `RESEND_FROM`, and `CONTACT_EMAIL` in Vercel Environment Variables.
> 3. Set `DEEPSEEK_API_KEY` in Vercel Environment Variables.
> 4. The OG image is generated dynamically at `/og` — no static asset needed

```bash
pnpm run build
```

---

*Built with intention. No AI slop.*
