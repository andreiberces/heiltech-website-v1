---
name: project-heiltech
description: Heiltech Defense cybersecurity website — Next.js 16, Tailwind v4, Framer Motion, secretive military aesthetic
metadata:
  type: project
---

Rebuilt heiltech.ph as a full Next.js 16 app with a secretive elite military aesthetic (black/red theme).

**Why:** Client wanted a premium redesign referencing Dribbble, Awwwards, and godly.website aesthetics.

**Stack:** Next.js 16, Tailwind CSS v4, Framer Motion v12, @phosphor-icons/react. No `tailwind.config.js` — colors defined via `@theme inline` in `globals.css`.

**Sections built:** Navbar, Hero (asymmetric with tactical HUD panel), Ticker (pure CSS marquee), About (split layout + testimonial), Services (asymmetric 3/5-2/5 grid), Certifications, Footer/Contact.

**Key design decisions:**
- DESIGN_VARIANCE 8 → all section headings left-aligned, asymmetric service grid (`col-span-3 / col-span-2`)
- Crimson accent: `#b91c1c` (Tailwind `red-700` range), used sparingly
- Monospace Geist for all tactical codes, status indicators, and labels
- `pulse-ring`, `scan-line`, `ticker` keyframes defined in `globals.css`
- Tactical HUD panel (right hero) uses CSS grid overlay + SVG reticle + red corner brackets

**How to apply:** Use this as reference for the user's taste — they like high-contrast dark UIs with military/tactical aesthetics, monospace typography, and meaningful motion.
