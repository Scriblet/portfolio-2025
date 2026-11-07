# Issue — Configurar code-splitting do vendor e registrar baseline de bundle

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/code-splitting-lazy/PRD.md`

## What to build
Build passa a separar o código de terceiros do bundle inicial (chunks mínimos viáveis), com medição registrada do tamanho inicial antes/depois para comprovar o ganho.

## Acceptance criteria
- [ ] Build gera chunks com vendor separado do código do app
- [ ] Tamanho do bundle inicial (gzip, excluindo vendor) medido e registrado antes/depois
- [ ] App carrega e funciona igual ao baseline (suite verde)
- [ ] Sem mudança de comportamento visível para o visitante

## Blocked by
- 04-dc-4-docs-nova-secao.md
