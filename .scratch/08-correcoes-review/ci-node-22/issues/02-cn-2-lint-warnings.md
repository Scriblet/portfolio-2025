# Issue: ESLint zero warnings no código do app

Status: done

## Parent
PRD: `.scratch/08-correcoes-review/ci-node-22/PRD.md`

## What to build
Resolver os 8 warnings atuais do ESLint sem `eslint-disable` global: os 7 de
`react-refresh/only-export-components` (`ColorModeProvider`, `SnackbarProvider`,
`useRevealOnScroll`, `main.tsx`) separando exports de componente e de
utilidade, e o `react-hooks/exhaustive-deps` do `header.tsx` corrigindo a
dependência real do efeito. Comportamento do app não muda.

## Acceptance criteria
- [ ] `npm run lint` termina com 0 errors e 0 warnings
- [ ] Nenhum `eslint-disable` genérico adicionado para silenciar as regras
- [ ] Testes unitários continuam passando sem alteração de comportamento

## Blocked by
- Nenhum: pode começar imediatamente
