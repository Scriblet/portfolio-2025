# Issue — Hook de progresso do portal

Status: done

## Parent

PRD: `.scratch/05-immersive/portal-hero/PRD.md`

## What to build

Extrair/consolidar `useStickyProgress` em `src/pages/immersive/hooks.ts` para calcular o progresso do hero sticky e escrever `--p` no palco. Usar um listener `scroll` passivo, `requestAnimationFrame` e nenhum estado React por frame. Tratar redimensionamento, montagem e `prefers-reduced-motion`.

## Acceptance criteria

- [x] `p = clamp(-heroTop / (heroHeight - viewportHeight), 0, 1)` e `--p` escrito no palco.
- [x] Nenhum re-render React por evento de scroll.
- [x] Listener removido no unmount; frame cancelado.
- [x] Com movimento reduzido, `--p` recebe valor estático (0.64) e não há listener de scroll.
- [x] Teste unitário mocka `getBoundingClientRect`/`offsetHeight` e valida 0, 0.5 e 1 com clamp.
- [x] Sem `setTimeout`/`intervalo` no fluxo do portal.

## Blocked by

- `.scratch/05-immersive/design-system-immersive/issues/01-tokens-tipografia.md`
