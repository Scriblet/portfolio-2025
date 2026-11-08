# Issue — Responsivo e reduced motion do hero

Status: done

## Parent

PRD: `.scratch/05-immersive/portal-hero/PRD.md`

## What to build

Ajustar o hero para mobile (230vh), garantir ausência de overflow horizontal e implementar o fallback estático para `prefers-reduced-motion` (hero de 100svh, `--p` estático, conteúdo visível).

## Acceptance criteria

- [x] Hero tem 260vh desktop e 230vh mobile; palco `100svh`/`min-height: 560px`.
- [x] Wordmark e meta-cantos não causam overflow em 390px.
- [x] Com `prefers-reduced-motion`, hero colapsa para 100svh e `--p` estático.
- [x] Scroll cue oculto em reduced motion.
- [x] `scrollWidth === innerWidth` em 320/390/768/1440.
- [x] Teste valida posições inicial/final do wordmark e painéis.

## Blocked by

- `.scratch/05-immersive/portal-hero/issues/02-paineis-wordmark-metacantos.md`
- `.scratch/05-immersive/portal-hero/issues/03-fotografia-duotonia-vinheta.md`
