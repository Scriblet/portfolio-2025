# Issue: Hook de direção de scroll e Header esconde/mostra

Status: ready-for-agent

## Parent
PRD: `.scratch/02-ux/header-scroll-inteligente/PRD.md`

## What to build
Hook reutilizável que expõe visível/escondido a partir da direção e posição do scroll, com Header consumindo o estado e animando via Framer Motion, mantendo visual atual com backdrop blur e links por âncoras.

## Acceptance criteria
- [ ] Ao rolar para baixo, o Header se esconde suavemente; ao rolar para cima, reaparece de imediato
- [ ] No topo da página (scroll na posição zero), o Header está sempre visível
- [ ] O visual do Header visível permanece o atual (fixo, backdrop blur, âncoras #experience/#skills/#contact)
- [ ] Sem dependência nova; a lógica de scroll vive no hook, não espalhada no componente
- [ ] Comportamento é previsível: desce esconde, sobe mostra

## Blocked by
- None - can start immediately
