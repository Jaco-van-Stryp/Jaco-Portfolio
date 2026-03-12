# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: Orbital Launchpad

A space-themed interactive portfolio for Jaco van Stryp (Software Engineer II at Rocket Lab).
The aesthetic is a space mission simulator - dark cosmic UI, cyan/orange glow effects, Orbitron font for headings.

**Stack:** Angular 21, TypeScript 5.9, Tailwind CSS v4, Vitest, SSR via `@angular/ssr`

### Commands

- `npm start` - dev server at http://localhost:4200
- `npm run build` - production SSR build (budget: 1MB warn / 2MB error for initial bundle)
- `npm test` - unit tests (vitest via `@angular/build:unit-test`)
- `npx ng test --include='**/mission-control*'` - run tests matching a glob pattern
- `node dist/Jaco-Portfolio/server/server.mjs` - serve production SSR build locally
- `npm run generate:cv` - export CV PDF via Puppeteer (`cv/export-pdf.js`)

### Feature routes (all lazy-loaded)

| Path          | Component                  | Purpose                                              |
| ------------- | -------------------------- | ---------------------------------------------------- |
| `/`           | LaunchPadComponent         | Homepage - CDK drag-drop + Angular animations launch |
| `/about`      | MissionControlComponent    | About - SVG gauges + career timeline                 |
| `/experience` | OrbitalTrajectoryComponent | Experience - SVG career path                         |
| `/projects`   | PayloadBayComponent        | Projects - card grid + detail modal                  |
| `/skills`     | EngineDiagnosticsComponent | Skills - Chart.js radar + skill bars                 |
| `/contact`    | ReentryCapsuleComponent    | Contact - reactive form + CSS confetti               |

### Key files

- `src/app/app.config.ts` - providers: `provideAnimations`, `provideHttpClient`, `withViewTransitions`
- `src/app/shared/services/mission-state.service.ts` - global signal state (launched, visitedSections, badges), persisted to localStorage
- `src/app/shared/components/star-field/` - animated star field, SSR-safe via `isPlatformBrowser`
- `src/app/shared/components/space-dog/` - easter egg shar-pei mascot

### Dependencies

- `@angular/cdk` - drag-drop on Launch Pad (`CdkDrag`, `CdkDropList`, `CdkDragPlaceholder`)
- `chart.js` - dynamically imported in engine-diagnostics via `afterNextRender` (SSR-safe)
- `@angular/animations` - rocket launch sequence in launch-pad
- Tailwind CSS v4 - `@import "tailwindcss"` in `src/styles.css`

### Design system (CSS custom properties in `:root`)

```
--space-bg: #0b0d1a    --cyan: #00d4ff    --orange: #ff6b35
--purple: #8b5cf6      --green: #10b981   --yellow: #fbbf24
--text: #e2e8f0        --text-muted: #64748b
--border: rgba(0,212,255,0.2)
```

Global helper classes: `.panel`, `.panel-strong`, `.font-orbitron`, `.font-mono`,
`.section-label`, `.text-glow-cyan`, `.text-glow-orange`, `.glow-cyan`, `.glow-orange`

### SSR rules

- Never use `window`, `document`, or `localStorage` directly - wrap with `isPlatformBrowser(inject(PLATFORM_ID))`
- Use `afterNextRender()` for anything that needs the DOM after hydration (e.g. Chart.js canvas)
- Star generation and confetti use `isPlatformBrowser` guards
- `MissionStateService` only calls localStorage in the browser

---

## Code style

### Prettier (configured in package.json)

- `printWidth: 100`, `singleQuote: true`
- HTML files use the `angular` parser

### TypeScript

- Strict mode enabled (`strict`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noPropertyAccessFromIndexSignature`)
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

### Angular conventions

- **Angular 21** — must NOT set `standalone: true` in decorators (it's the default in v20+)
- `ChangeDetectionStrategy.OnPush` on all components
- `input()` / `output()` functions, not `@Input` / `@Output` decorators
- `inject()` function, not constructor injection
- `host` object in decorator, not `@HostBinding` / `@HostListener`
- `[class]` / `[style]` bindings, not `ngClass` / `ngStyle`
- Native control flow (`@if`, `@for`, `@switch`, `@defer`), not structural directives
- Signals (`signal()`, `computed()`, `effect()`) for state; `update` or `set`, never `mutate`
- Reactive forms, not template-driven
- `NgOptimizedImage` for all static images (does not work for inline base64)
- Lazy loading for feature routes
- Inline templates for small components; relative paths for external templates/styles
- No arrow functions in templates (not supported)
- Do not assume globals like `new Date()` are available in templates

### Accessibility

- Must pass all AXE checks
- Must meet WCAG AA minimums: focus management, color contrast, ARIA attributes
