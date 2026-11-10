# Issue: Âncoras sem bloqueio e cobertura E2E do scroll inteligente

Status: ready-for-agent

## Parent
PRD: `.scratch/02-ux/header-scroll-inteligente/PRD.md`

## What to build
Garantir que cliques em âncoras não são ocultados nem bloqueados pelo Header e cobrir o comportamento com testes E2E automatizados de scroll simulado.

## Acceptance criteria
- [ ] Clicar em #contact (e demais âncoras) chega ao destino sem conteúdo ocultado por baixo do Header
- [ ] Em E2E automatizado: rolar para baixo esconde, rolar para cima mostra, no topo está visível
- [ ] E2E cobre o caso de foco por teclado trazendo o Header de volta
- [ ] Ao rolar para cima no mobile, o botão de contato reaparece visível junto com o Header

## Blocked by
- `.scratch/02-ux/header-scroll-inteligente/issues/01-hook-direcao-scroll-header.md`
- `.scratch/02-ux/header-scroll-inteligente/issues/02-acessibilidade-header-escondido-tab.md`
