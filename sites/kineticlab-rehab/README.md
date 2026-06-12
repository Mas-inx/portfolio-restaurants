# KineticLab Rehab — Sports Physical Therapy

High-performance physical therapy SPA with progress dashboard, assessment panels, and recovery timeline.

## Design

- **Aesthetic**: Black/white base with electric blue (#0088ff) accent
- **Typography**: Space Grotesk (display) + Inter (body) + JetBrains Mono (code)
- **Motion**: Framer Motion animations with reduced motion fallback
- **Layout**: Performance-focused with data visualization and kinetic typography

## Sections

1. **Hero** — Performance assessment card with live metrics
2. **Conditions** — 6 treatable conditions (ACL, shoulder, back, running, post-op, mobility)
3. **Assessment** — 5 clinical evaluation panels (range, strength, movement, pain, goals)
4. **Programs** — 4 rehabilitation pathways with movement overlays
5. **Progress Dashboard** — 4 animated charts (pain, mobility, strength, compliance)
6. **Therapists** — 4 specialists with certifications
7. **Recovery Timeline** — 4-phase progression with sticky scroll
8. **Evaluation CTA** — Booking form with success state

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Framer Motion 12
- Tailwind CSS 4

## Development

```bash
npm install
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Build Output

- Base path: `/kineticlab-rehab/`
- Total size: ~375KB (110KB gzipped)
- Assets: CSS + JS bundles with content hashing

## Features

- Responsive design (mobile-first)
- Animated progress charts (SVG + framer-motion)
- Scroll-triggered animations
- Interactive program cards with hover overlays
- Real-time assessment metrics
- Form validation and success states
- Custom scrollbar styling
- Reduced motion support

## Browser Support

Modern browsers with ES2023 support. Reduced motion fallback for accessibility.
