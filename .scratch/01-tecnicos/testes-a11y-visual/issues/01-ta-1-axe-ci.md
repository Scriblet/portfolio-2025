# Issue — Adicionar axe E2E com gate de zero violações críticas no CI

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/testes-a11y-visual/PRD.md`

## What to build
Suíte de acessibilidade automatizada nas páginas críticas (home, contato, mobile) com falha no CI em violações críticas/sérias, relatório anexado à auditoria e comando único para rodar localmente.

## Acceptance criteria
- [ ] `npm run test:a11y` roda localmente e reporta violações com detalhe
- [ ] CI falha em nova violação crítica/séria (threshold zero) e anexa relatório
- [ ] Foco e ordem de headings checados automaticamente nas páginas críticas
- [ ] Violações moderadas rastreadas sem bloquear (registradas no backlog)

## Blocked by
- 04-dc-4-docs-nova-secao.md
- 04-cs-4-fallback-e2e.md
- 04-pwa-4-instalacao-e2e-lighthouse.md
