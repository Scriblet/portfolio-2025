# Issue — Header auto-hide no scroll e barra de progresso de leitura

Status: ready-for-agent

## Parent
PRD: `.scratch/07-testes-e2e/cypress-smoke-navegacao/PRD.md`

## What to build
Spec do comportamento de scroll: o header some ao rolar para baixo além de 80px
(`aria-hidden`/`inert`/fora do viewport) e reaparece ao rolar para cima; não some
no topo da página nem quando recebe foco de teclado; a barra `reading-progress-bar`
avança conforme o scroll (`aria-valuenow` coerente).

## Acceptance criteria
- [ ] Scroll para baixo esconde o `site-header`; scroll para cima o mostra novamente
- [ ] Com foco dentro do header, o auto-hide não ocorre
- [ ] No topo (≤80px) o header permanece visível
- [ ] `reading-progress-bar` aumenta de largura/`aria-valuenow` ao rolar e zera no topo
- [ ] Teste usa retries/asserções naturais, sem `cy.wait` fixo

## Blocked by
- 02-ci-2-comandos-servidor.md
