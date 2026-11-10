# Issue: Dados centralizados + grade agrupada por categoria com logos oficiais

Status: removed

## Parent
PRD: `.scratch/04-secoes/secao-toolbox/PRD.md`

## What to build
Consumir a camada de dados centralizados existente para categorias e tecnologias (não criar módulo mínimo isolado) e renderizar seção `#toolbox` com grade agrupada exibindo logo oficial e nome, mais item de menu no Header.

## Acceptance criteria
- [ ] Camada de dados centralizados exporta categorias e tecnologias sem hardcoded no componente
- [ ] Grade renderiza todas as categorias, cada tecnologia na categoria correta com nome e ícone com alt
- [ ] Item Toolbox no menu do Header linka para `#toolbox` e âncora posiciona no título
- [ ] Nomes de tecnologias presentes como texto no HTML inicial
- [ ] Teste E2E valida seção, agrupamento, contagem total e conteúdo por item

## Blocked by
- `.scratch/01-tecnicos/dados-centralizados/issues/01-fundacao`
