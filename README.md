# Orbital Launchpad — Jaco van Stryp

> A portfolio site built as an interactive space mission simulator. You don't just read about my work — you launch a rocket, assemble a payload, and navigate mission control.

Built with **Angular 21**, signals, SSR, CDK drag-drop, Chart.js, and a space dog easter egg.

---

## Mission Sections

| Route | Section | Description |
|-------|---------|-------------|
| `/` | Launch Pad | Rocket assembly mini-game with CDK drag-drop. Drag components to load the Electron rocket, then initiate launch sequence with countdown. |
| `/mission-control` | Mission Control | Career bio, SVG skill gauges, Captain's Log accordion with key achievements, honours, and tech tags. |
| `/orbital-trajectory` | Orbital Trajectory | Interactive SVG career map. Click nodes to explore each role — from Belgium Campus to Rocket Lab. |
| `/payload-bay` | Payload Bay | Project showcase with type filters, detail modals, and tech stack chips. |
| `/engine-diagnostics` | Engine Diagnostics | Chart.js radar chart of skill categories + tabbed skill bars with proficiency levels. |
| `/reentry-capsule` | Re-Entry Capsule | Contact form with reactive validation, confetti on submission, social links, and location card. |

---

## About Jaco van Stryp

**Software Engineer II at Rocket Lab** — building the Manufacturing Execution System (MES) for Electron and Neutron rockets.

### Career Highlights

- **Rocket Lab** (2023–present, Auckland NZ) — Full-stack engineer on MES for orbital rocket production. Angular frontend, .NET backend, SQL Server.
- **Clickatell** (2021–2023, Cape Town SA) — Frontend lead on Vitals platform serving 30+ banks across Africa. Near-100% uptime, real-time transaction dashboards.
- **JaxOni / Jaxify** (2019–2021, South Africa) — Led rewrite of enterprise SaaS from AngularJS to Angular. Built PDF generation pipeline, role-based access, reporting dashboards.

### Education

**BSc Computer Science** — Belgium Campus, South Africa
Graduated **Summa Cum Laude** with a **4.0 GPA** (2019)

### Technical Focus

- **Frontend**: Angular (signals, SSR, CDK), TypeScript, RxJS, Tailwind CSS
- **Backend**: .NET / C#, Node.js, REST APIs
- **Data**: SQL Server, PostgreSQL, real-time dashboards
- **Tooling**: Git, CI/CD, accessibility (WCAG AA), performance

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Angular 21 (standalone, signals, SSR) |
| State | Angular Signals (`signal`, `computed`, `effect`) |
| Styling | Tailwind CSS v4 + custom CSS design system |
| Animations | Angular Animations + CSS keyframes + View Transitions API |
| Drag & Drop | Angular CDK (`CdkDrag`, `CdkDropList`) |
| Charts | Chart.js (dynamic import, radar + bar) |
| Rendering | Angular SSR with prerendering (6 routes) |
| Fonts | Orbitron, Inter, Space Mono (Google Fonts) |
| Change Detection | `OnPush` throughout |

---

## Getting Started

```bash
# Install dependencies
npm install

# Development server
ng serve
# Navigate to http://localhost:4200

# Production build
ng build

# SSR build + serve
ng build && node dist/jaco-portfolio/server/server.mjs

# Run tests
ng test
```

---

## Project Structure

```
src/
  app/
    features/
      launch-pad/           # Rocket assembly mini-game + launch sequence
      mission-control/      # Bio, gauges, Captain's Log
      orbital-trajectory/   # SVG career map
      payload-bay/          # Project showcase
      engine-diagnostics/   # Chart.js radar + skill bars
      reentry-capsule/      # Contact form
    shared/
      components/
        star-field/         # Animated star background (220 stars)
        space-dog/          # Easter egg mascot with tips
      services/
        mission-state/      # Global signal state + badge system + localStorage
  styles.css                # Design system: CSS vars, keyframes, utility classes
  index.html
```

---

## Design System

The space aesthetic is built on CSS custom properties:

```css
--space-bg: #0b0d1a;          /* Deep space background */
--cyan: #00d4ff;              /* Primary accent */
--orange: #ff6b35;            /* Secondary accent */
--purple: #8b5cf6;            /* Tertiary */
--border: rgba(0,212,255,0.2) /* Subtle panel borders */
```

Global utility classes: `.panel`, `.panel-strong`, `.font-orbitron`, `.font-mono`, `.text-glow-cyan`, `.glow-orange`, `.section-label`

---

## Gamification

The site tracks mission progress via `MissionStateService` (signals + localStorage):

- **Space Explorer** badge — visit 3+ sections
- **Astronaut** badge — complete the rocket launch sequence
- **Mission Complete** badge — visit all 6 sections

Badge count displays in the nav. State persists across sessions.

**Easter egg**: Space Dog appears after 18 seconds with rotating fun facts. Click the avatar for more tips.

---

## Accessibility

- WCAG AA color contrast throughout
- All interactive elements keyboard-navigable
- `aria-label`, `aria-live`, `role` attributes on dynamic content
- `@angular/cdk` drag-drop with keyboard support
- Skill bars use `role="progressbar"` with `aria-valuenow`/`aria-valuemax`
- Screen-reader-only text for decorative icons (`aria-hidden="true"`)

---

## License

MIT — feel free to draw inspiration, but please don't copy the content verbatim.

---

*Built in Auckland, New Zealand. Deployed to orbit.*
