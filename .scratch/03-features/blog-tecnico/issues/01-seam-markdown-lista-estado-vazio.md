# Issue — Seam de conteúdo Markdown + lista ordenada com estado vazio

Status: ready-for-agent

## Parent
PRD: `.scratch/03-features/blog-tecnico/PRD.md`

## What to build
Módulo de conteúdo carregando posts estáticos em build time com frontmatter (título, data, descrição, tags, tempo de leitura) e seção de lista ordenada por data com estado vazio amigável.

## Acceptance criteria
- [ ] Lista integrada ao fluxo da página exibe cards com título, data, descrição, tags e tempo de leitura
- [ ] Ordem decrescente por data e novos posts aparecem automaticamente após o build
- [ ] Sem posts, a lista exibe estado vazio amigável sem quebrar a página
- [ ] Lista de demonstração funciona com pelo menos dois posts mockados

## Blocked by
- `.scratch/01-tecnicos/dados-centralizados/issues/01-fundacao-dados-centralizados.md` — consuma o contrato centralizado e não duplique src/data com módulo de conteúdo local.
