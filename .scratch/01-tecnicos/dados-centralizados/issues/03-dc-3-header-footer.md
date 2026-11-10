# Issue: Renderizar Header/GitHub/Footer a partir da fonte única com fallback seguro

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/dados-centralizados/PRD.md`

## What to build
Header, banner GitHub e Footer passam a consumir os dados sociais/site da camada única, com fallback seguro (early return + log) se um arquivo de dados ficar vazio, sem quebrar a página.

## Acceptance criteria
- [ ] Links sociais e textos exibidos continuam idênticos ao comportamento atual
- [ ] Arquivo de dados vazio não quebra a página (fallback seguro com log)
- [ ] Nenhuma regressão visual/estrutural detectada pelos testes existentes
- [ ] `tsc --noEmit` e suite existente verdes

## Blocked by
- 01-dc-1-fundacao-camada-dados.md
