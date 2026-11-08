---
title: SeÃ§Ã£o de Stack e Ferramentas imersiva
status: removed
wave: 7
scope: site
owner: agent
---

# PRD â€” SeÃ§Ã£o de Stack e Ferramentas imersiva

## Resumo / objetivo

Reformular a Toolbox como um catÃ¡logo de vidro filtrÃ¡vel, com chips do design
system, cards de tecnologia e hierarquia clara entre itens core e
complementares.

## Estado atual

- `src/pages/toolbox/toolbox.tsx` usa `Chip` MUI para filtros, `Box` para cards
  e cores de `theme.palette`.
- Cada item tem Ã­cone Simple Icons, nome, nÃ­vel e link para documentaÃ§Ã£o.
- O grid Ã© 2/3/4/5 colunas.

## DireÃ§Ã£o visual (referÃªncia `/immersive`)

- Fundo `var(--void-2)`.
- Label "Toolbox / 06", tÃ­tulo Syne e lead.
- Filtros em pills mono; estado ativo em esmeralda, inativo em ghost.
- Cards `GlassPanel` com Ã­cone, nome, nÃ­vel (Core/Complementar) e link.
- Hover: borda esmeralda e elevaÃ§Ã£o suave.

## Requisitos funcionais

1. Refatorar filtros e cards para o design system.
2. Manter `technologies`, `toolboxCategories` e o filtro por categoria.
3. Manter `aria-pressed` nos filtros e o grupo acessÃ­vel.
4. Manter links externos com `rel="noopener noreferrer"`.
5. Garantir que itens sem Ã­cone usem as iniciais.
6. Respeitar reduced motion.

## CritÃ©rios de aceitaÃ§Ã£o

- [x] Filtros funcionam e expÃµem `aria-pressed`.
- [x] Cards usam vidro e tokens, sem hex hardcoded.
- [x] Itens core e complementares sÃ£o distinguÃ­veis sem depender sÃ³ de cor.
- [x] Links externos abrem em nova aba com seguranÃ§a.
- [x] Sem overflow em 320â€“1920px.
- [x] Testes de toolbox continuam passando.

## DependÃªncias

- `design-system-immersive` (onda 6).
- `motion-a11y-performance` (onda 6).

## Arquivos envolvidos

- `src/pages/toolbox/toolbox.tsx`
- `src/data/toolbox.ts`
