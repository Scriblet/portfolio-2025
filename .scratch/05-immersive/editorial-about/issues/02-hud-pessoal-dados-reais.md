# Issue — HUD pessoal com dados reais

Status: done

## Parent

PRD: `.scratch/05-immersive/editorial-about/PRD.md`

## What to build

Montar o HUD pessoal com 4–6 cards de glass contendo dados reais de `src/pages/immersive/content.ts`: experiência, cargo atual, localização, stack principal, disponibilidade e idiomas.

## Acceptance criteria

- [x] HUD exibe pelo menos 4 itens reais de `PERSON`.
- [x] Cada card de glass usa tokens de vidro do design system.
- [x] Label de cada card em Sora 9–10px uppercase; value em 12–14px.
- [x] Dados vêm de `content.ts`/`PERSON`; nenhum dado inventado.
- [x] Grid de cards responsivo (2 colunas desktop, 1 mobile).
- [x] Teste unitário valida mapeamento do HUD a partir de `PERSON`.

## Blocked by

- `.scratch/05-immersive/editorial-about/issues/01-layout-editorial-numeral.md`
- `.scratch/05-immersive/design-system-immersive/issues/02-vidro-grao-rotulos.md`
