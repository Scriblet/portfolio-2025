# Issue: Documentar a camada de dados e publicar exemplos de nova seção

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/dados-centralizados/PRD.md`

## What to build
Guia curto de onboarding explicando onde editar cada tipo de conteúdo, mais exemplo fechando o ciclo de uma nova seção consumindo a camada; validação de shape via typecheck documentada.

## Acceptance criteria
- [ ] README da camada explica onde editar cada entidade e como adicionar uma nova seção
- [ ] Exemplo de nova seção consumindo a camada está presente e funcional
- [ ] `tsc --noEmit` falha ao remover campo obrigatório (evidência registrada)
- [ ] Suite completa verde, zero mudança visual

## Blocked by
- 02-dc-2-experience-skills.md
- 03-dc-3-header-footer.md
