# Issue: Criar camada de dados tipada e expor site/social como fonte única

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/dados-centralizados/PRD.md`

## What to build
Nova camada de dados tipada no app (site, social, projects, testimonials) com barrel de imports; a configuração central existente passa a ler da nova fonte única em vez de constantes espalhadas.

## Acceptance criteria
- [ ] Nova camada de dados existe com tipos para cada entidade e barrel de import existente para testes e componentes
- [ ] Site/social já são consumidos a partir da nova fonte pelas áreas que hoje usam a config central
- [ ] Nenhuma mudança visual percebida (mesmo DOM antes/depois)
- [ ] `tsc --noEmit` passa; testes existentes passam sem mudança de seletor
- [ ] Campo obrigatório removido do tipo quebra o build (erro de compilação imediato)

## Blocked by
- None - can start immediately
