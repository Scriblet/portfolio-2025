# Issue — Card de projeto único end-to-end com dados centralizados

Status: ready-for-agent

## Parent
PRD: `.scratch/04-secoes/secao-projetos/PRD.md`

## What to build
Consumir a camada de dados centralizados existente para projetos (não criar módulo mínimo isolado) e renderizar grid com 1 card exibindo thumb, título, descrição, chips de stack e links demo/repo, sem hardcoded no componente.

## Acceptance criteria
- [ ] Grid renderiza exatamente os projetos da camada de dados centralizados (fixture com 3 itens)
- [ ] Card exibe thumb com alt significativo, título, descrição e chips de stack
- [ ] Links de demo/repositório aparecem condicionalmente e abrem em nova guia
- [ ] Adicionar entrada na camada de dados centralizados exibe novo card sem tocar no layout
- [ ] Teste E2E valida renderização do card e navegação por teclado

## Blocked by
- `.scratch/01-tecnicos/dados-centralizados/issues/01-fundacao`
