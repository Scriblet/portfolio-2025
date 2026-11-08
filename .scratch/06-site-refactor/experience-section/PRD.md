---
title: SeÃ§Ã£o de ExperiÃªncia imersiva
status: done
wave: 7
scope: site
owner: agent
---

# PRD â€” SeÃ§Ã£o de ExperiÃªncia imersiva

## Resumo / objetivo

Transformar o grid atual de empresas em uma seÃ§Ã£o editorial de experiÃªncia,
com cards de vidro, numeraÃ§Ã£o grande e tipografia Syne, preservando os dados
reais de `src/data/experiences.ts`.

## Estado atual

- `src/pages/experience/experience.tsx` usa `Box`/`Typography` MUI, animaÃ§Ã£o
  lateral com `framer-motion` e cores de tÃ­tulo hardcoded por Ã­ndice.
- O grid Ã© 1/2/4 colunas e os cards nÃ£o tÃªm superfÃ­cie de vidro.

## DireÃ§Ã£o visual (referÃªncia `/immersive`)

- Fundo `var(--void-2)`.
- CabeÃ§alho de seÃ§Ã£o: label "ExperiÃªncia / 03", tÃ­tulo Syne e lead Inter.
- Grid de cards `GlassPanel` com Ã­ndice mono, empresa em Syne, cargo e
  descriÃ§Ã£o.
- Hover: `translateY(-6px)` + borda mais clara, 300ms.
- Acentos: perÃ­odo/Ã­ndice em esmeralda; destaque editorial em Ã¢mbar.

## Requisitos funcionais

1. Refatorar a seÃ§Ã£o para o layout de referÃªncia, mantendo `experiences.ts`.
2. Substituir as cores de tÃ­tulo hardcoded por tokens do design system.
3. Usar `GlassPanel` para os cards.
4. Manter a ordem de `experiences.ts` (mais recente primeiro).
5. Garantir responsividade 1/2/3 colunas sem overflow.
6. Reduzir movimento sob `prefers-reduced-motion`.

## CritÃ©rios de aceitaÃ§Ã£o

- [x] A seÃ§Ã£o renderiza todos os itens de `experiences.ts`.
- [x] Cards usam vidro e tokens, sem hex hardcoded.
- [x] Contraste AA em empresa, cargo e descriÃ§Ã£o.
- [x] Hover/elevaÃ§Ã£o sÃ³ com movimento permitido.
- [x] Layout sem overflow em 320â€“1920px.
- [x] Testes de experiÃªncia continuam passando.

## DependÃªncias

- `design-system-immersive` (onda 6).
- `motion-a11y-performance` (onda 6).

## Arquivos envolvidos

- `src/pages/experience/experience.tsx`
- `src/pages/experience/experience.module.scss`
- `src/data/experiences.ts`
