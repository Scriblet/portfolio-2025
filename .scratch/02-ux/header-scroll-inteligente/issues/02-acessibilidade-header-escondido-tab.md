# Issue: Acessibilidade: Header escondido sai da tabulação e foco traz de volta

Status: ready-for-agent

## Parent
PRD: `.scratch/02-ux/header-scroll-inteligente/PRD.md`

## What to build
Quando escondido, o Header é removido da ordem de tabulação e ignorado por leitores de tela; ao receber foco interno, volta a ficar visível sem gesto de scroll.

## Acceptance criteria
- [ ] Com o Header escondido, nenhum elemento interno é alcançável por Tab e não é anunciado por leitor de tela
- [ ] Ao navegar por teclado até um elemento do Header, ele volta a aparecer imediatamente
- [ ] Nenhum controle invisível recebe foco em nenhum estado
- [ ] Leitor de tela não anuncia controles invisíveis durante o scroll

## Blocked by
- `.scratch/02-ux/header-scroll-inteligente/issues/01-hook-direcao-scroll-header.md`
