# Issue — Comandos de suporte, servidor de teste e regras de estabilidade

Status: done

## Parent
PRD: `.scratch/07-testes-e2e/cypress-infraestrutura/PRD.md`

## What to build
Comandos customizados em `cypress/support/commands.ts`: `visitApp` (visita
respeitando base path, limpa localStorage e força reduced motion), `resetTheme`,
`enableReducedMotion`/`disableReducedMotion` (stub de `matchMedia`), `interceptContact`
(stub de `POST /api/contact` com alias `@postContact`) e `waitForSection` (espera
`section-fallback` sumir e o elemento final). Integrar `start-server-and-test`
subindo `vite` (dev) para os specs e `vite preview` para specs de PWA/produção.

## Acceptance criteria
- [ ] Todos os comandos acima existem, tipados (`.d.ts` ou declaração em `cypress/support`) e documentados por comentário
- [ ] `visitApp` limpa `localStorage` (inclusive `portfolio-color-mode`) a cada visita
- [ ] `interceptContact` nunca deixa o POST real passar para a rede
- [ ] Scripts de servidor cobrem dev (`test:e2e`) e preview (`test:e2e:preview` ou variante documentada)
- [ ] Specs de exemplo usam os comandos em vez de setup duplicado

## Blocked by
- 01-ci-1-setup-cypress.md
