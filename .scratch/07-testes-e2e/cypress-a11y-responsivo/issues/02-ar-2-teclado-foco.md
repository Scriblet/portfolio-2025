# Issue: Navegação por teclado, foco visível e armadilhas de foco

Status: done

## Parent
PRD: `.scratch/07-testes-e2e/cypress-a11y-responsivo/PRD.md`

## What to build
Spec de teclado e foco: tabulação alcança tema, menu, CTAs e campos em ordem
previsível; Escape fecha drawer e snackbar; `:focus-visible` aplica outline visível
(estilo computado); o drawer não é armadilha de foco (abre com foco, fecha e devolve
o foco ao hambúrguer); foco dentro do header impede o auto-hide.

## Acceptance criteria
- [ ] Sequência de Tab alcança `theme-toggle`, `mobile-menu-button`/links e CTAs
- [ ] Escape fecha `mobile-menu` e `snackbar-*`
- [ ] Outline de foco visível verificado em elemento focado
- [ ] Drawer: foco entra ao abrir e volta ao controle de origem ao fechar
- [ ] Com foco no header, o auto-hide não ocorre (integração com `header-scroll`)

## Blocked by
- 02-ci-2-comandos-servidor.md
