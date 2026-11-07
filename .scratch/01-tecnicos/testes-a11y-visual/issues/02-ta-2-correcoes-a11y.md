# Issue — Corrigir contraste, labels, foco e ordem de headings

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/testes-a11y-visual/PRD.md`

## What to build
Correções mínimas de acessibilidade no conteúdo e tema — heading vazio corrigido, SVGs decorativos silenciados, alts descritivos, foco visível, contraste mínimo e alvos de toque adequados, com screenshots estabilizados sob movimento reduzido.

## Acceptance criteria
- [ ] Gate axe passa com zero violações críticas/sérias
- [ ] Foco visível em todos os interativos; heading order lógica sem elementos vazios
- [ ] Contraste ≥ 4.5:1 nos textos; alvos de toque ≥ 44×44 no mobile
- [ ] SVGs decorativos com `aria-hidden`; alts descritivos em imagens de conteúdo
- [ ] Nenhuma mudança visual além das correções de acessibilidade

## Blocked by
- 01-ta-1-axe-ci.md
