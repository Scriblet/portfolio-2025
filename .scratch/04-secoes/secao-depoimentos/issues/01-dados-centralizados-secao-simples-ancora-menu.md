# Issue — Dados centralizados + seção simples de depoimentos com âncora e menu

Status: ready-for-agent

## Parent
PRD: `.scratch/04-secoes/secao-depoimentos/PRD.md`

## What to build
Consumir a camada de dados centralizados existente para depoimentos (não criar módulo mínimo isolado) e renderizar seção `#depoimentos` com lista estática (foto, nome, cargo, citação) mais item de menu no Header, sem carrossel ainda.

## Acceptance criteria
- [ ] Camada de dados centralizados exporta lista de depoimentos com id, citação, autor, cargo, empresa, foto e link opcional
- [ ] Seção renderiza todos os depoimentos da camada de dados com `<figure>`/`<blockquote>` e foto com alt
- [ ] Item Depoimentos aparece no menu do Header e âncora `#depoimentos` rola até a seção
- [ ] Texto completo presente no HTML inicial (SEO) e sem deslocamento após fotos carregarem
- [ ] Teste E2E valida seção, título, contagem e conteúdo por item

## Blocked by
- `.scratch/01-tecnicos/dados-centralizados/issues/01-fundacao`
