# Issue: Hook de progresso e barra fina no topo (0–100%)

Status: ready-for-agent

## Parent
PRD: `.scratch/02-ux/progresso-leitura/PRD.md`

## What to build
Hook reutilizável que expõe progresso normalizado 0–1 a partir da posição de scroll, com barra fina fixa no topo usando a cor primária da paleta atual e suavização pelo Framer Motion.

## Acceptance criteria
- [ ] No topo, a barra começa em 0% (ou próxima de 0)
- [ ] Ao alcançar o rodapé, a barra completa em 100%
- [ ] Ao rolar para cima, a barra recua proporcionalmente à posição real
- [ ] A barra usa a cor primária da paleta atual, sem novos tokens de cor
- [ ] Qualquer componente futuro pode consumir o mesmo hook sem recalcular

## Blocked by
- None - can start immediately
