---
title: SeÃ§Ã£o de Habilidades imersiva
status: done
wave: 7
scope: site
owner: agent
---

# PRD â€” SeÃ§Ã£o de Habilidades imersiva

## Resumo / objetivo

Substituir o grid atual de habilidades por cards de vidro com Ã­cone, tÃ­tulo,
descriÃ§Ã£o e tags, espelhando a seÃ§Ã£o Skills da rota `/immersive` e mantendo
`src/data/skills.ts` como fonte Ãºnica.

## Estado atual

- `src/pages/skills/skills.tsx` usa `Box` MUI com borda e paper do tema.
- Cada card tem Ã­cone MUI, tÃ­tulo, descriÃ§Ã£o e tags em pills.
- O grid Ã© 1/2/3/4 colunas.

## DireÃ§Ã£o visual (referÃªncia `/immersive`)

- Fundo `var(--void)`.
- Label "Skills / 02", tÃ­tulo Syne e lead.
- Grid `auto-fit minmax(280px, 1fr)`.
- Card `GlassPanel` com Ã­ndice mono, Ã­cone em esmeralda, tÃ­tulo Syne,
  descriÃ§Ã£o Inter e tags em pill mono.
- Hover: elevaÃ§Ã£o suave e borda mais clara.

## Requisitos funcionais

1. Refatorar para cards de vidro.
2. Manter `skills.ts` e os `SkillIconKey`.
3. Manter hierarquia `h2` da seÃ§Ã£o e `h3` dos cards.
4. Garantir 3/2/1 colunas responsivas.
5. Respeitar reduced motion.

## CritÃ©rios de aceitaÃ§Ã£o

- [x] Um card por item de `skills.ts`.
- [x] Cards usam vidro e tokens, sem hex hardcoded.
- [x] Ãcones permanecem acessÃ­veis (`aria-hidden` quando decorativos).
- [x] Contraste AA em descriÃ§Ã£o e tags.
- [x] Sem overflow em 320â€“1920px.
- [x] Testes de skills continuam passando.

## DependÃªncias

- `design-system-immersive` (onda 6).
- `motion-a11y-performance` (onda 6).

## Arquivos envolvidos

- `src/pages/skills/skills.tsx`
- `src/data/skills.ts`
