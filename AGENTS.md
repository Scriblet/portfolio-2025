## Agent skills

### Issue tracker

Local markdown: issues live as files under `.scratch/<feature>/` in this repo (good for solo projects or repos without a remote). See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical roles (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`) with default strings. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` + `docs/adr/` at repo root. See `docs/agents/domain.md`.

### Commits

[Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/): `<type>(<scope>): <description>`, with `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`; use `!` + `BREAKING CHANGE:` for breaking changes. Enforced by `.githooks/commit-msg` (enabled with `git config core.hooksPath .githooks`, also run by the `prepare` npm script). See `docs/agents/commits.md`.

### Copy

**Nunca use travessão (em dash, U+2014)**, nem entidade HTML nem escape, em
texto algum: copy do site, dados, comentários, PRDs e README. No lugar dele use
vírgula, dois-pontos, parênteses, ponto final ou o separador `·`. A meia-risca
(en dash, U+2013) fica restrita a intervalos (`mar/2026 – atual`, `0–100%`).

Enforcement: regra do ESLint `local/no-em-dash` para código e `npm run
lint:text` para markdown/CSS/HTML/YML. Os dois rodam em `npm run lint`, que roda
no CI. Detalhes e tabela de substituições em `docs/agents/copy.md`.

### Build

**Never run `npm run build` locally.** It is slow and spends time and tokens for
no new signal. Local gates are `npm run lint`, `npm run typecheck` and
`npm run test:unit`; the CI quality job runs the real build after them. Run the
build only when the user explicitly asks for it.

### Lint

**No `// eslint-disable` comments.** The `local/no-eslint-disable` rule in
`npm run lint` rejects every `eslint-disable` or `eslint-enable` directive. Fix
the code or change the rule configuration with a documented reason.

### Testing

Default loop is **Vitest**: `npm run test:unit` (jsdom, ~2s). **Do not run the Cypress/E2E suite during normal development**, it is CPU-heavy and has frozen the user's machine before. E2E is opt-in only: run it when the user explicitly asks, or when a visual check truly cannot be done another way, and then run a single spec (`npm run dev:test` + `npm run test:e2e:spec -- cypress/e2e/<spec>.cy.ts`). Prefer the chrome-devtools MCP for screenshots and visual inspection. See `docs/agents/testing.md`.
