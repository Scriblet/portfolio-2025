# Testing: Vitest by default, Cypress E2E opt-in

## Rule

The default test loop for this repo is **Vitest**:

```bash
npm run test:unit        # one-shot, jsdom, ~2s
npm run test:unit:watch  # watch mode while developing
```

**Do not run the Cypress suite during normal development.** A full browser suite
spawns Chromium, keeps animated pages running and has frozen the user's machine
before (the old Playwright suite). E2E is opt-in only.

## When Cypress is allowed

Only when one of these is true:

- the user explicitly asks for an E2E/visual check;
- a behavior truly cannot be verified with Vitest or the chrome-devtools MCP.

When it is allowed, run **one spec at a time**:

```bash
# terminal 1: dedicated E2E dev server on :5174
npm run dev:test

# terminal 2: a single spec, headless
npm run test:e2e:spec -- cypress/e2e/smoke-home.cy.ts
```

Never run the whole suite locally. The full suite belongs to CI.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev:test` | Vite dev server on `:5174` (strict port) for E2E: does not collide with `npm run dev` |
| `npm run preview:test` | Vite preview on `:4173` (needs `npm run build`) |
| `npm run test:e2e` | Starts the dev server and runs all specs headless |
| `npm run test:e2e:open` | Starts the dev server and opens the Cypress runner |
| `npm run test:e2e:preview` | Builds, starts preview and runs the suite against the built app |
| `npm run test:e2e:spec` | Runs one spec (`-- <path>`) against an already-running server |
| `npm run typecheck` | App and Vite config type-check without bundling |
| `npm run lint` | ESLint (including the em dash rule) and text check |

`test:e2e:preview` is required for PWA/service-worker specs: the worker is only
generated in a production build (`devOptions.enabled: false`).

## Custom commands

Defined in `cypress/support/commands.ts` (types in `cypress/support/index.d.ts`):

- `cy.visitApp(path?)`: visits through the configured base path, clears
  `localStorage` and installs the `prefers-reduced-motion` stub.
- `cy.enableReducedMotion()` / `cy.disableReducedMotion()`: control that stub.
  Reduced motion is **on by default** so reveals/transitions do not cause flakes.
- `cy.resetTheme(mode?)`: resets/writes `localStorage["portfolio-color-mode"]`
  (reload to apply).
- `cy.interceptContact({ statusCode, body, delay })`: stubs `POST /api/contact`
  and exposes `@postContact`. Never let the real POST escape: `vite` does not
  serve the Netlify function, and CI must not call Discord.
- `cy.waitForSection(testId)`: waits for the lazy section fallback to disappear
  and the final element to be visible.
- `cy.requireServiceWorker()`: waits for the service worker to control the page.
  Only works against build/preview; PWA specs skip on the dev server.

## Conventions

- Selectors: `data-testid` first, then stable IDs, then `aria-label`/roles.
  **Never** CSS-module classes (hashed), MUI `sx`/generated classes or `ds-*`.
- No fixed waits (`cy.wait(1000)`). Use assertions with retries,
  `waitForSection`, or `data-revealed`.
- The header hides on scroll (`inert` + `aria-hidden`); scroll up or use the
  drawer before interacting with it.
- `/roadmap` and the header's dev-only links exist only in `npm run dev`; run
  those assertions against a build/preview.
- `CYPRESS_BASE_URL` points the suite at another origin/base path (e.g. GitHub
  Pages `https://scriblet.github.io/portfolio-2025/`). `CYPRESS_SPEC` narrows
  `specPattern` without editing the config.

## CI

`.github/workflows/ci.yml` has two jobs:

- `quality`: `images:check` + `lint` + `test:unit` + `build` and a type-check of
  the Cypress specs (`npx tsc -p cypress/tsconfig.json --noEmit`).
- `e2e`: `npm run test:e2e:preview` (build + preview on `:4173` + full suite),
  so the service worker is active. Screenshots and videos are uploaded as
  artifacts when the job fails.

The jobs stay independent, so a flaky E2E run is visible without hiding unit results.

## Why

- Vitest covers the logic that changes most often (hooks, reducers, preference
  resolution, validation) in seconds.
- Cypress covers real navigation, theming, forms and PWA behavior, but it is
  heavy, so it stays out of every edit cycle.
- The old Playwright suite (100+ browser tests with fixed waits and infinite
  Framer Motion loops) saturated CPU/RAM locally; this split exists to avoid
  repeating that.

## Current state

- `npm run test` and `npm run test:unit` run Vitest.
- Cypress specs live in `cypress/e2e/*.cy.ts`:

| Spec | Cobre |
| --- | --- |
| `smoke-home.cy.ts` | home responde e o hero aparece |
| `navigation.cy.ts` | rotas, âncoras, drawer, tema persistido, progresso |
| `theme.cy.ts` | alternância, meta theme-color, persistência e herança no /immersive |
| `header-scroll.cy.ts` | auto-hide, retorno ao topo, foco no header e progresso |
| `sections.cy.ts` | conteúdo real das seções e links do footer |
| `contact-form.cy.ts` | validação, honeypot, sucesso, 429/500/offline e `req.body` |
| `pwa-offline.cy.ts` | OfflineNotice, recarga e volta online |
| `pwa-cache.cy.ts` | shell e CV no precache, catch-all e denylist de `/api` |
| `pwa-installacao.cy.ts` | beforeinstallprompt, prompt nativo e modo standalone |
| `a11y-axe.cy.ts` | axe-core na home, /immersive, erros, drawer e tema claro |
| `a11y-teclado.cy.ts` | ordem de Tab, foco visível, Escape no drawer e snackbar |
| `responsivo-viewports.cy.ts` | 375/768/1280, alvos de toque e reduced motion |

`a11y-axe.cy.ts` usa `cypress/support/a11y.ts` para injetar `axe-core`; exceções
justificadas vivem em `cypress/support/a11y-exceptions.ts`.

- The full suite runs in CI only.
