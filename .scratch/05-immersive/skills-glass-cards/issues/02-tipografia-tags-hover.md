# Issue — Tipografia, tags e estados de hover dos cards

Status: done

## Parent

PRD: `.scratch/05-immersive/skills-glass-cards/PRD.md`

## What to build

Definir a tipografia interna dos cards (título, descrição, tags) e implementar estados de hover/focus acessíveis.

## Acceptance criteria

- [x] Título do card em Syne 600, descrição em Inter 400, tags em monoespaçado.
- [x] Tags renderizam até 4 itens de `skill.tags`.
- [x] Hover do card: `translateY(-6px)` + brilho sutil na borda, 300ms.
- [x] Focus visível esmeralda ao navegar por teclado.
- [x] Cores respeitam tokens de texto escuro (`#EDE7DC`, `#9EA5A8`).
- [x] Teste valida presença de título, descrição e tags em cada card.

## Blocked by

- `.scratch/05-immersive/skills-glass-cards/issues/01-grid-cards-skills.md`
