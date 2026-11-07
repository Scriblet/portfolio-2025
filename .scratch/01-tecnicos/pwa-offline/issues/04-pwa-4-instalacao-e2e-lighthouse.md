# Issue — Adicionar instalação discreta, E2E offline e auditoria PWA

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/pwa-offline/PRD.md`

## What to build
Oferta de instalação não intrusiva usando o prompt nativo do navegador, teste E2E simulando offline pós-primeira visita, e auditoria Lighthouse de instalabilidade/offline aprovada — com degradação silenciosa para a SPA normal onde não houver suporte.

## Acceptance criteria
- [ ] Prompt de instalação aparece de forma discreta sem bloquear o conteúdo; navegadores sem suporte degradam em silêncio
- [ ] E2E de offline prova que o conteúdo principal segue acessível e falha se um visitante offline perder o acesso
- [ ] Online, app e âncoras funcionam sem regressão; formulário falha com feedback claro quando offline
- [ ] Lighthouse aprova instalabilidade e offline

## Blocked by
- 03-pwa-3-fallback-offline.md
