# Issue: Tokens de movimento e componente Reveal

Status: done

## Parent

PRD: `.scratch/05-immersive/motion-a11y-performance/PRD.md`

## What to build

Centralizar tokens de movimento (`--duration-enter`, `--duration-hover`, `--ease-out`, `--reveal-y`) e consolidar o hook/componente `Reveal` baseado em `IntersectionObserver`, disparo único.

## Acceptance criteria

- [x] Tokens de movimento exportados em `src/theme/immersive.tokens.ts` e refletidos em CSS.
- [x] `useRevealOnScroll` (ou `Reveal`) usa `IntersectionObserver` com `threshold: 0.12` e `rootMargin: 0 0 -8% 0`.
- [x] Revela uma vez por elemento; `unobserve` após disparar.
- [x] Atributo `data-motion="ready"` só aplicado quando movimento é permitido.
- [x] Sem JS ou com movimento reduzido, `[data-reveal]` permanece visível.
- [x] Teste unitário valida `IntersectionObserver` mockado e flags `data-revealed`.

## Blocked by

- `.scratch/05-immersive/design-system-immersive/issues/01-tokens-tipografia.md`
