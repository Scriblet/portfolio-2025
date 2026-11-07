# Issue — Polimento de scroll: limiar anti-piscada, reduced motion e contraste

Status: ready-for-agent

## Parent
PRD: `.scratch/02-ux/header-scroll-inteligente/PRD.md`

## What to build
Limiar mínimo de scroll para trocar estado, transição curta e responsiva, sem animação de deslocamento com prefers-reduced-motion, e contraste mantido sobre conteúdo rolado.

## Acceptance criteria
- [ ] Pequenos ajustes de scroll não trocam o estado (sem piscada em scrolls rápidos)
- [ ] Com prefers-reduced-motion, o Header mostra/esconde sem animação de deslocamento
- [ ] No mobile, a transição é rápida o suficiente para não parecer lenta ou travada
- [ ] Com o Header visível, links mantêm contraste suficiente sobre o conteúdo por baixo

## Blocked by
- `.scratch/02-ux/header-scroll-inteligente/issues/01-hook-direcao-scroll-header.md`
