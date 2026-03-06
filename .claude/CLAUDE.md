You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Project: Orbital Launchpad

A space-themed interactive portfolio for Jaco van Stryp (Software Engineer II at Rocket Lab).
The aesthetic is a space mission simulator - dark cosmic UI, cyan/orange glow effects, Orbitron font for headings.

### Running the project

- `npm start` - dev server at http://localhost:4200
- `npm run build` - production SSR build
- `npm test` - unit tests (vitest)

### Feature routes (all lazy-loaded)

| Path                  | Component                  | Purpose                                              |
| --------------------- | -------------------------- | ---------------------------------------------------- |
| `/`                   | LaunchPadComponent         | Homepage - CDK drag-drop + Angular animations launch |
| `/mission-control`    | MissionControlComponent    | About - SVG gauges + career timeline                 |
| `/orbital-trajectory` | OrbitalTrajectoryComponent | Experience - SVG career path                         |
| `/payload-bay`        | PayloadBayComponent        | Projects - card grid + detail modal                  |
| `/engine-diagnostics` | EngineDiagnosticsComponent | Skills - Chart.js radar + skill bars                 |
| `/reentry`            | ReentryCapsuleComponent    | Contact - reactive form + CSS confetti               |

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

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- Do not write arrow functions in templates (they are not supported).

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
