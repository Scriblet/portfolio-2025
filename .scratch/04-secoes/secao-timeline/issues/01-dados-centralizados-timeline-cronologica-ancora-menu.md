# Issue: Dados centralizados + timeline cronológica com âncora e menu

Status: ready-for-agent

## Parent
PRD: `.scratch/04-secoes/secao-timeline/PRD.md`

## What to build
Consumir a camada de dados centralizados existente para marcos (não criar módulo mínimo isolado) e renderizar seção `#jornada` com timeline vertical, marcadores por tipo e ordenação decrescente em memória, mais item de menu no Header.

## Acceptance criteria
- [ ] Camada de dados centralizados exporta marcos com tipo, título, instituição, período, descrição e link opcional
- [ ] Timeline renderiza todos os marcos em ordem decrescente (mais recente primeiro) por campo de ordenação
- [ ] Marcadores distinguíveis por tipo (formação, certificação, profissional, conquista)
- [ ] Item Jornada no menu do Header linka para `#jornada` e âncora posiciona no início da timeline
- [ ] Teste E2E valida seção, ordenação cronológica e conteúdo por marco

## Blocked by
- `.scratch/01-tecnicos/dados-centralizados/issues/01-fundacao`
