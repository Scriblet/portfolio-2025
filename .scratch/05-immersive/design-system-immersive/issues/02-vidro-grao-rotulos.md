# Issue: Primitivas de vidro, grão e rótulos

Status: done

## Parent

PRD: `.scratch/05-immersive/design-system-immersive/PRD.md`

## What to build

Criar os componentes primitivos `GlassPanel`, `GrainOverlay`, `SectionLabel`, `Hairline` e `IndexNumeral` em `src/pages/immersive/ui.tsx` (ou pasta `src/components/immersive/`). Garantir que a receita de vidro, o grão SVG e os rótulos monoespaçados sejam reutilizáveis pelas seções.

## Acceptance criteria

- [x] `GlassPanel` aplica fundo `rgba(255,255,255,0.05)`, `backdrop-filter: blur(20px)`, borda `rgba(255,255,255,0.1)` e raio 14–20px.
- [x] `GrainOverlay` é fixo, `pointer-events: none`, `mix-blend-mode: overlay`, opacidade 0.08–0.12.
- [x] `SectionLabel` tem variantes dark/light e dot decorativo.
- [x] `Hairline` é uma linha 1px reutilizável usando token de hairline.
- [x] `IndexNumeral` é decorativo (`aria-hidden`) e usa Syne.
- [x] Todos os primitivos têm `data-testid`.

## Blocked by

- `.scratch/05-immersive/design-system-immersive/issues/01-tokens-tipografia.md`
