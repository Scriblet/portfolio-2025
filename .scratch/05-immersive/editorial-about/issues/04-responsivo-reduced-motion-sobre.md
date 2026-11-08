# Issue — Responsivo e reduced motion do Sobre

Status: done

## Parent

PRD: `.scratch/05-immersive/editorial-about/PRD.md`

## What to build

Garantir que a seção `#about` funcione de 320px a 1920px sem overflow horizontal e que o fallback de movimento reduzido mantenha legibilidade.

## Acceptance criteria

- [x] Layout empilhado em mobile com frase editorial antes do HUD.
- [x] Numeral vazado não corta texto nem gera scroll horizontal.
- [x] HUD em 1 coluna em mobile e 2 colunas em desktop.
- [x] `scrollWidth === innerWidth` em 320/390/768/1440.
- [x] `prefers-reduced-motion` mantém numeral estático e HUD visível.
- [x] `scroll-margin-top` aplicado para a navegação fixa.

## Blocked by

- `.scratch/05-immersive/editorial-about/issues/03-reveal-estados-sobre.md`
