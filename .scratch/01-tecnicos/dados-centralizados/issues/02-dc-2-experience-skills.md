# Issue: Renderizar Experience e Skills a partir da nova camada de dados

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/dados-centralizados/PRD.md`

## What to build
Seções de Experience e Skills passam a ser consumidoras puras da nova camada (skills agrupadas por categoria), sem alterar texto, ordem ou layout; testes passam a importar a mesma fonte que o componente usa.

## Acceptance criteria
- [ ] Alterar uma experiência/skill em um único arquivo da camada de dados reflete na página sem tocar em componente
- [ ] Render idêntico: contagem de cards, textos e ordem preservados (suite existente verde)
- [ ] Asserts de teste leem a mesma fonte de dados renderizada pelo componente
- [ ] Build e `tsc --noEmit` passam

## Blocked by
- 01-dc-1-fundacao-camada-dados.md
