# Issue — Adicionar screenshots de regressão visual por viewport

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/testes-a11y-visual/PRD.md`

## What to build
Baseline de screenshots nas viewports mobile/tablet/desktop com animações desabilitadas e máscara sobre elementos em movimento, gerando diff visual rápido a cada run.

## Acceptance criteria
- [ ] Screenshots capturados em 3 viewports (mobile, tablet, desktop) em estado de movimento reduzido
- [ ] Elementos animados mascarados — sem flake por movimento
- [ ] Diff visual < threshold em runs limpos
- [ ] Uma mudança proposital de layout é detectada pelo diff

## Blocked by
- 02-ta-2-correcoes-a11y.md
