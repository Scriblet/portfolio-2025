# Issue: Reveal e estados da seção Sobre

Status: done

## Parent

PRD: `.scratch/05-immersive/editorial-about/PRD.md`

## What to build

Aplicar animação de reveal à frase editorial e aos cards do HUD, definir estados de hover/focus e garantir que a seção respeite `prefers-reduced-motion`.

## Acceptance criteria

- [x] Frase editorial e HUD revelam uma vez ao entrar na viewport (800ms, 20px).
- [x] Hover nos cards de glass: leve elevação ou brilho de borda, sem scale agressivo.
- [x] Foco visível esmeralda em links/botões da seção.
- [x] Com `prefers-reduced-motion`, conteúdo já visível sem deslocamento.
- [x] Teste valida reveal via `IntersectionObserver` mockado.

## Blocked by

- `.scratch/05-immersive/editorial-about/issues/02-hud-pessoal-dados-reais.md`
- `.scratch/05-immersive/motion-a11y-performance/issues/01-motion-tokens-reveal.md`
