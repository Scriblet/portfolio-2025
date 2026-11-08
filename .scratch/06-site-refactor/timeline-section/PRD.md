---
title: SeÃ§Ã£o de Jornada imersiva
status: done
wave: 7
scope: site
owner: agent
---

# PRD â€” SeÃ§Ã£o de Jornada imersiva

## Resumo / objetivo

Reformular a timeline de marcos (Jornada) como uma linha do tempo vertical
com trilho em degradÃª esmeraldaâ†’Ã¢mbar, marcadores e cards de vidro, mantendo
`sortedMilestones` e os filtros por tipo.

## Estado atual

- `src/pages/timeline/timeline.tsx` usa `Card` MUI, `Chip`, grid alternado
  esquerda/direita e cores de tipo vindas de `theme.palette`.
- O trilho Ã© uma linha de 2px com `theme.palette.divider`.

## DireÃ§Ã£o visual (referÃªncia `/immersive`)

- Fundo `var(--void)`.
- Label "Jornada / 04", tÃ­tulo Syne e lead.
- Trilho vertical de 1px com gradiente esmeralda â†’ Ã¢mbar.
- Marcadores circulares com borda esmeralda.
- Cards `GlassPanel` com perÃ­odo mono, tÃ­tulo Syne, instituiÃ§Ã£o e descriÃ§Ã£o.
- Chips de tipo como pills mono com cores semÃ¢nticas dos tokens.

## Requisitos funcionais

1. Refatorar a timeline para o visual de referÃªncia.
2. Manter `sortedMilestones` e a ordem cronolÃ³gica.
3. Manter os chips de legenda e os links de certificado.
4. Usar `GlassPanel`, `Hairline` e `SectionLabel`.
5. Garantir leitura linear no mobile (sem alternÃ¢ncia esquerda/direita).
6. Respeitar `prefers-reduced-motion`.

## CritÃ©rios de aceitaÃ§Ã£o

- [x] Timeline renderiza todos os marcos de `sortedMilestones`.
- [x] Trilho e marcadores usam tokens, sem cores hardcoded.
- [x] Links externos abrem com `rel="noopener noreferrer"`.
- [x] Mobile empilha sem overflow.
- [x] Contraste AA em perÃ­odo, tÃ­tulo e descriÃ§Ã£o.
- [x] Testes de timeline continuam passando.

## DependÃªncias

- `design-system-immersive` (onda 6).
- `motion-a11y-performance` (onda 6).

## Arquivos envolvidos

- `src/pages/timeline/timeline.tsx`
- `src/data/timeline.ts`
