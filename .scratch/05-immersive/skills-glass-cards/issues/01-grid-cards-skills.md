# Issue: Grid de cards de glass e mapeamento de skills

Status: done

## Parent

PRD: `.scratch/05-immersive/skills-glass-cards/PRD.md`

## What to build

Criar a seção `#skills` com um grid de cards de glass, um para cada skill de `src/data/skills.ts`. Remover completamente a seção `Releases` e o componente `ReleasesDeck` da rota `/immersive`.

## Acceptance criteria

- [x] Seção `#skills` renderiza 10 cards, um para cada item de `src/data/skills.ts`.
- [x] Grid responsivo: 3 colunas desktop, 2 tablet, 1 mobile.
- [x] Cada card usa `GlassPanel` e tokens de vidro do design system.
- [x] Seção `Releases` e `ReleasesDeck` removidos de `immersive.tsx`.
- [x] Arquivo `src/pages/immersive/ReleasesDeck.tsx` removido se não for reutilizado.
- [x] Teste unitário valida que `skillCards` deriva de `skills.length`.

## Blocked by

- `.scratch/05-immersive/design-system-immersive/issues/02-vidro-grao-rotulos.md`
- `.scratch/05-immersive/editorial-about/issues/01-layout-editorial-numeral.md`
