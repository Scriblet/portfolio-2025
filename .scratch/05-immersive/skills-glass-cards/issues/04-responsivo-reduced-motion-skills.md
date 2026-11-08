# Issue — Responsivo e reduced motion dos cards de skills

Status: done

## Parent

PRD: `.scratch/05-immersive/skills-glass-cards/PRD.md`

## What to build

Garantir que o grid de cards funcione sem overflow em todas as larguras e que `prefers-reduced-motion` desative flutuação e stagger.

## Acceptance criteria

- [x] Grid responde corretamente em 320/390/768/1440 sem overflow.
- [x] Cards não transbordam horizontalmente em mobile.
- [x] Com `prefers-reduced-motion`, cards visíveis sem animação de entrada.
- [x] Hover em reduced motion vira apenas mudança de cor da borda.
- [x] `scroll-margin-top` aplicado para a navegação fixa.

## Blocked by

- `.scratch/05-immersive/skills-glass-cards/issues/03-reveal-stagger-remocao-deck.md`
