# Issue — Specs de smoke, navegação e tema

Status: done

## Parent
PRD: `.scratch/08-correcoes-review/e2e-cobertura-critica/PRD.md`
Implementa (issues equivalentes): `.scratch/07-testes-e2e/cypress-smoke-navegacao/`

## What to build
Expandir o smoke além do carregamento da home: rotas (`/`, `/roadmap` dev,
`/immersive`), âncoras do header e do footer, drawer mobile (abrir, navegar,
fechar por Escape) e toggle de tema claro/escuro persistente. Usa `visitApp`,
`resetTheme` e `waitForSection`; sempre intercepta `POST /api/contact` quando o
formulário aparecer. Critérios detalhados nos issues
`01-sm-1-smoke-rotas` a `04-sm-4-scroll-progresso` da onda 7.

## Acceptance criteria
- [ ] Smoke cobre home, `/immersive` e navegação por âncoras
- [ ] Drawer mobile coberto (abrir, navegar, Escape) 
- [ ] Tema claro/escuro coberto e resetado entre testes
- [ ] Specs verdes em `npm run test:e2e:preview`

## Blocked by
- Nenhum — pode começar imediatamente
