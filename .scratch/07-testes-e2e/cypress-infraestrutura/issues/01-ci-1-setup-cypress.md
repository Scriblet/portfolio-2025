# Issue — Setup do Cypress: config, estrutura e scripts

Status: ready-for-agent

## Parent
PRD: `.scratch/07-testes-e2e/cypress-infraestrutura/PRD.md`

## What to build
Instalar o Cypress como dependência de dev e criar a estrutura base: `cypress.config.ts`
(TypeScript, e2e), `cypress/e2e/`, `cypress/support/e2e.ts`, `cypress/support/commands.ts`
e `cypress/fixtures/`. Scripts npm explícitos (`test:e2e`, `test:e2e:open`,
`test:e2e:spec`) que não tocam no `test`/`test:unit` do Vitest. Configurar retries,
viewport 1280x720, screenshots em falha e vídeo desligado localmente.

## Acceptance criteria
- [ ] `cypress.config.ts` criado com `specPattern: cypress/e2e/**/*.cy.ts`, baseUrl via `CYPRESS_BASE_URL` (default `http://localhost:5173`), retries `runMode: 1`
- [ ] `npm run test:e2e:open` abre o runner e `npm run test:e2e` roda headless contra o servidor de teste
- [ ] `npm run test`/`test:unit` continuam sendo apenas Vitest (inalterados)
- [ ] Um spec de exemplo trivial (`cypress/e2e/smoke-home.cy.ts` mínimo) passa headless
- [ ] `cypress/` versionado; `cypress/videos` e `cypress/screenshots` no `.gitignore`

## Blocked by
(nenhuma)
