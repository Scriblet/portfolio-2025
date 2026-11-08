---
title: RodapÃ© imersivo
status: done
wave: 7
scope: site
owner: agent
---

# PRD â€” RodapÃ© imersivo

## Resumo / objetivo

Reformular o rodapÃ© como o fecho do sistema visual: wordmark, links de
navegaÃ§Ã£o, Ã­cones sociais e fine print, sobre vidro/hairline e com a
tipografia do design system.

## Estado atual

- `src/pages/footer.tsx` usa `Box` MUI, `IconButton`, `MuiLink` e scroll suave
  via `react-scroll`.
- JÃ¡ hÃ¡ Ã¡rea de toque 44Ã—44 e analytics nos cliques.

## DireÃ§Ã£o visual (referÃªncia `/immersive`)

- Fundo `var(--void)` com `Hairline` no topo.
- Wordmark Syne 800 grande, levemente cortado se fizer sentido.
- Links em Sora mono uppercase.
- Ãcones sociais em ghost circular.
- Fine print em `var(--muted)`.

## Requisitos funcionais

1. Refatorar o rodapÃ© para a linguagem imersiva.
2. Manter scroll suave, analytics e links reais.
3. Manter alvos de 44Ã—44.
4. Usar `Hairline` e tokens.
5. Garantir responsividade e reduced motion.

## CritÃ©rios de aceitaÃ§Ã£o

- [x] RodapÃ© usa tokens, sem hex hardcoded.
- [x] Links e Ã­cones mantÃªm 44Ã—44 e foco visÃ­vel.
- [x] Scroll suave e analytics preservados.
- [x] Contraste AA em links e fine print.
- [x] Sem overflow em 320â€“1920px.
- [x] Reduced motion respeitado.

## DependÃªncias

- `design-system-immersive` (onda 6).
- `motion-a11y-performance` (onda 6).

## Arquivos envolvidos

- `src/pages/footer.tsx`
- `src/data/social.ts`
- `src/services/analytics.ts`
