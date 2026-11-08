---
title: Shell global e movimento
status: done
wave: 7
scope: site
owner: agent
---

# PRD â€” Shell global e movimento

## Resumo / objetivo

Fechar a camada que envolve todas as seÃ§Ãµes: fundo, grÃ£o, container, ritmo
vertical, transiÃ§Ãµes de rota e o gate de movimento/acessibilidade do site.

## Estado atual

- `src/App.tsx` compÃµe as seÃ§Ãµes com `LazySection` e `Suspense`.
- `src/App.css` define `.app-container` e `.main-content` com gaps fixos.
- O design system global jÃ¡ define tokens, vidro, foco e reduced motion.

## DireÃ§Ã£o visual (referÃªncia `/immersive`)

- Fundo contÃ­nuo `var(--void)`.
- GrÃ£o global sutil (`GrainOverlay`) fixo e `pointer-events: none`.
- Container `min(1600px, calc(100% - clamp(28px, 6vw, 112px)))`.
- Ritmo vertical consistente entre seÃ§Ãµes.
- TransiÃ§Ãµes de entrada discretas, uma vez por elemento.

## Requisitos funcionais

1. Aplicar `GrainOverlay` global no shell.
2. Ajustar `.app-container`/`.main-content` para o container e ritmo do DS.
3. Garantir que o skip link e os landmarks continuem funcionando.
4. Centralizar o contrato de reveal/reduced motion.
5. Garantir `scrollWidth === innerWidth` em 320/390/768/1440.

## CritÃ©rios de aceitaÃ§Ã£o

- [x] GrÃ£o global presente e nÃ£o intercepta cliques.
- [x] Container e ritmo consistentes em todas as seÃ§Ãµes.
- [x] Skip link visÃ­vel ao focar.
- [x] `prefers-reduced-motion` remove animaÃ§Ãµes de entrada.
- [x] Nenhum `setTimeout`/`setInterval` no fluxo de scroll.
- [x] Sem overflow horizontal em 320â€“1920px.

## DependÃªncias

- `design-system-immersive` (onda 6).
- `motion-a11y-performance` (onda 6).

## Arquivos envolvidos

- `src/App.tsx`
- `src/App.css`
- `src/main.tsx`
- `src/components/design-system/`
