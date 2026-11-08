# Issue — Botões, foco e contraste acessível

Status: done

## Parent

PRD: `.scratch/05-immersive/design-system-immersive/PRD.md`

## What to build

Finalizar `PillButton` (variantes solid/ghost), definir o anel de foco visível e garantir contraste AA nos textos pequenos e labels do escopo imersivo. Garantir alvos de toque mínimos de 44px.

## Acceptance criteria

- [x] `PillButton` suporta variantes `solid` e `ghost-light` com ícone circular.
- [x] Altura mínima 44px em todos os botões e alvos interativos.
- [x] Foco visível de 2–3px com offset 3px; esmeralda sobre escuro.
- [x] Contraste AA validado para labels 9–11px e textos secundários `#9EA5A8` sobre `#0A0C0E`.
- [x] Nenhum `outline: none` sem substituto.
- [x] Testes verificam foco e dimensões mínimas via estilos computados.

## Blocked by

- `.scratch/05-immersive/design-system-immersive/issues/01-tokens-tipografia.md`
