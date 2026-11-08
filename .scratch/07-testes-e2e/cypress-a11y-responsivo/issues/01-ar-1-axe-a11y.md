# Issue — Varredura axe-core na home, /immersive e estados de erro

Status: ready-for-agent

## Parent
PRD: `.scratch/07-testes-e2e/cypress-a11y-responsivo/PRD.md`

## What to build
Spec de acessibilidade automatizada com `@axe-core/cypress`: injetar axe e
verificar a home (após reveals), `/immersive`, o form com erros de validação
visíveis, o drawer aberto e o tema claro, sem violações `serious`/`critical`.
Violações `minor`/`moderate` logadas sem falhar; exceções vivem em lista
justificada (`cypress/support/a11y-exceptions.ts` ou comentário documentado).

## Acceptance criteria
- [ ] `cy.injectAxe`/`cy.checkA11y` rodando nos 5 cenários acima com filtro de impacto
- [ ] Falha aponta `violation.id`, impacto e nós afetados no log
- [ ] Allowlist de exceções existe, é explícita e comentada por item
- [ ] Uma varredura por cenário (sem loops), custo baixo no CI
- [ ] Estado de erro do form coberto (mensagens de validação visíveis)

## Blocked by
- 02-ci-2-comandos-servidor.md
