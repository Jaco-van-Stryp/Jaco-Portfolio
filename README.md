# Jaco Portfolio

An interactive space mission simulator and professional portfolio for Jaco van Stryp. Built with Angular 21, it combines career highlights with a gamified orbital launch sequence.

## Features

- **Launch Pad** — Interactive rocket assembly mini-game using CDK drag-drop.
- **Mission Control** — Career history, SVG skill gauges, and Captain's Log bio.
- **Orbital Trajectory** — SVG career map with interactive nodes tracking roles from South Africa to New Zealand.
- **Payload Bay** — Filterable project showcase with detail modals and tech chips.
- **Engine Diagnostics** — Chart.js radar charts and proficiency bars.
- **Gamification** — Badge system using signals and localStorage to track mission progress.
- **Accessibility** — WCAG AA compliance, keyboard navigation, and ARIA-optimized interactive elements.

## Tech Stack

| Layer       | Technology                                       |
| ----------- | ------------------------------------------------ |
| Framework   | Angular 21 (Signals, Standalone, SSR)            |
| Styling     | Tailwind CSS 4 + CSS Design System               |
| State       | Angular Signals (`signal`, `computed`, `effect`) |
| Charts      | Chart.js (Dynamic imports)                       |
| Drag & Drop | Angular CDK                                      |
| CI/CD       | GitHub Actions + AWS ECR + Self-hosted Runner    |
| Hosting     | Dockerized SSR on Linux                          |

## Getting Started

### Prerequisites

- Node.js 22+
- npm 11+

### Development

```bash
# Install dependencies
npm install

# Start development server
ng serve
```

### Production & Docker

```bash
# Build for SSR
ng build

# Run SSR server locally
node dist/Jaco-Portfolio/server/server.mjs

# Build Docker image
docker build -t jaco-portfolio .

# Run container
docker run -p 4000:4000 jaco-portfolio
```

## Structure

- `src/app/features/` — Mission sections (Launch Pad, Mission Control, etc.)
- `src/app/shared/` — Global state (`MissionStateService`), star-field backgrounds, and easter eggs.
- `styles.css` — Core design system using CSS variables for the space aesthetic.

## Deployment

Pushes to `main` trigger a GitHub Action that builds the Docker image, pushes to AWS ECR, and deploys to a self-hosted runner.

---

_Built in Auckland, New Zealand._
