# Issue — Adiar Philosophy/GitHub/Contact/Footer e aplicar loading preguiçoso em imagens

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/code-splitting-lazy/PRD.md`

## What to build
Demais seções abaixo da dobra passam a carregar sob demanda com animação de entrada apenas quando entram na viewport; imagens fora da dobra carregam sob demanda e a imagem principal recebe prioridade de carregamento.

## Acceptance criteria
- [ ] Todas as seções abaixo da dobra carregam apenas sob demanda, mantendo ordem visual e ids de âncora
- [ ] Scroll suave sem jank perceptível; animações disparam somente ao entrar na viewport
- [ ] Imagem principal com prioridade alta; demais imagens preguiçosas
- [ ] Suite existente verde, incluido navegação por âncoras
- [ ] Consumo inicial de dados reduzido em relação ao baseline

## Blocked by
- 02-cs-2-lazy-experience-skills.md
