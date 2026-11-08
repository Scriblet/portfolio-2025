# Issue — Viewports responsivos, alvos de toque e reduced motion

Status: ready-for-agent

## Parent
PRD: `.scratch/07-testes-e2e/cypress-a11y-responsivo/PRD.md`

## What to build
Specs responsivos e de movimento: em 375×812 os links do header somem e o drawer
aparece (e `header-cta` some em ≤520px); em 768×1024 o layout se mantém sem
sobreposição; em 1280×720 tudo está visível; alvos de toque dos controles
principais ≥44px (bounding rect, tolerância registrada); com `prefers-reduced-motion:
reduce`, `[data-reveal]` fica visível sem `data-revealed="true"` e transições do
header são `none` (comportamento do app, não só estabilidade dos testes).

## Acceptance criteria
- [ ] Regra responsiva do header validada nos 3 viewports (links/drawer/CTA)
- [ ] Sem sobreposição/corte de conteúdo nos viewports testados
- [ ] Botões principais com área de toque ≥44px (ou exceção comentada)
- [ ] Reduced motion: reveals visíveis sem `data-revealed` e transições desativadas
- [ ] Com movimento normal, reveals funcionam (`data-revealed="true"` após scroll)

## Blocked by
- 02-ci-2-comandos-servidor.md
