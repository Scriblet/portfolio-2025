# Testing: Vitest by default, Playwright opt-in

## Rule

The default test loop for this repo is **Vitest**:

```bash
npm run test:unit        # one-shot, jsdom, ~2s
npm run test:unit:watch  # watch mode while developing
```

**Do not run Playwright/E2E during normal development.** The full browser suite
spawns Chromium workers, keeps animated pages running and has frozen the user's
machine. Playwright is opt-in only.

## When Playwright is allowed

Only when one of these is true:

- the user explicitly asks for an E2E/visual check;
- a visual regression cannot be inspected with the chrome-devtools MCP.

When it is allowed, run **one spec at a time with a single worker**:

```bash
npx playwright test tests/<spec>.spec.ts --workers=1
```

Never run `npx playwright test` without a filter in the normal loop.

## Preferred visual check

Use the chrome-devtools MCP (`list_pages`, `navigate_page`, `take_screenshot`,
`evaluate_script`) against the dev server at `http://localhost:5173`. It opens
one page, takes the screenshot you need and exits; it does not run a suite.

## Why

- The suite has 100+ browser tests with fixed waits and infinite Framer Motion
  loops; running it locally saturates CPU/RAM.
- Vitest covers the logic that changes most often (hooks, reducers, preference
  resolution, validation) in seconds.
- E2E is still valuable before a release, but it belongs in CI or an explicit
  visual check, not in every edit cycle.

## Current state

- `npm run test` and `npm run test:unit` run Vitest.
- Playwright specs and config were removed from the default workflow. If they
  are restored later, keep them behind an explicit `test:e2e` script and never
  wire them into the normal dev loop.
