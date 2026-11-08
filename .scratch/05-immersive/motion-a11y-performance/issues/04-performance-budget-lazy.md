# Issue — Orçamento de performance e lazy loading

Status: done

## Parent

PRD: `.scratch/05-immersive/motion-a11y-performance/PRD.md`

## What to build

Garantir o orçamento de performance da rota: apenas `transform`/`opacity` animados, listeners passivos, leitura de layout só dentro de rAF, lazy chunk da rota e imagens otimizadas.

## Acceptance criteria

- [x] Portal, reveals e cards animam apenas `transform`/`opacity`.
- [x] Listeners de scroll são passivos.
- [x] `getBoundingClientRect`/`offsetHeight` só lidos dentro de `requestAnimationFrame`.
- [x] `will-change` aplicado apenas aos elementos animados.
- [x] Rota `/immersive` continua em chunk separado no build.
- [x] Imagem do hero tem dimensões explícitas e `loading` adequado.
- [x] Teste de build confirma chunk separado e ausência de long tasks >50ms no scroll.

## Blocked by

- `.scratch/05-immersive/motion-a11y-performance/issues/01-motion-tokens-reveal.md`
- `.scratch/05-immersive/portal-hero/issues/01-hook-progresso-portal.md`
