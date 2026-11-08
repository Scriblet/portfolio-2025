# Issue — Contrato prefers-reduced-motion

Status: done

## Parent

PRD: `.scratch/05-immersive/motion-a11y-performance/PRD.md`

## What to build

Implementar o contrato global de movimento reduzido: media query no escopo imersivo zera transições, portal fica estático, cards não flutuam e timeline não faz stagger.

## Acceptance criteria

- [x] Media query `prefers-reduced-motion: reduce` zera transições/animações no escopo imersivo.
- [x] Portal colapsa para 100svh com `--p` estático.
- [x] Cards de skills não aplicam `translateY` de hover nem stagger.
- [x] Timeline não aplica stagger.
- [x] Seção Sobre e Contato já visíveis sem reveal.
- [x] Teste valida que `prefers-reduced-motion` remove transforms.

## Blocked by

- `.scratch/05-immersive/motion-a11y-performance/issues/01-motion-tokens-reveal.md`
- `.scratch/05-immersive/portal-hero/issues/04-responsivo-reduced-motion-hero.md`
