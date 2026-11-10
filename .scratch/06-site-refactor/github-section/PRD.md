---
title: Banner GitHub imersivo
status: done
wave: 7
scope: site
owner: agent
---

# PRD â€” Banner GitHub imersivo

## Resumo / objetivo

Reformular o banner do GitHub como um painel editorial de vidro, com convite
claro, CTA pill e o logo como elemento grÃ¡fico, mantendo o link real do
`SOCIAL_LINKS.GITHUB`.

## Estado atual

- `src/pages/github/github.tsx` usa `Box` MUI, `CardMedia` para o logo e
  `Button` outlined.
- O fundo vem de `theme.palette.background.paper`.

## DireÃ§Ã£o visual (referÃªncia `/immersive`)

- Fundo `var(--void)` ou `var(--void-2)`.
- Painel `GlassPanel` com texto Ã  esquerda e logo Ã  direita.
- Label "Open source / 07", tÃ­tulo Syne e corpo Inter.
- CTA `PillButton` ghost/solid com Ã­cone â†-.
- Logo do GitHub sem fundo, com tratamento monocromÃ¡tico.

## Requisitos funcionais

1. Refatorar para o layout de vidro.
2. Manter o link para `SOCIAL_LINKS.GITHUB`.
3. Manter o logo existente e o alt.
4. Garantir responsividade e reduced motion.
5. NÃ£o inventar mÃ©tricas ou repositÃ³rios.

## CritÃ©rios de aceitaÃ§Ã£o

- [x] Banner usa vidro e tokens, sem hex hardcoded.
- [x] CTA aponta para o GitHub real e abre em nova aba.
- [x] Logo preservado com alt.
- [x] Contraste AA em tÃ­tulo e corpo.
- [x] Sem overflow em 320â€“1920px.
- [x] Reduced motion respeitado.

## DependÃªncias

- `design-system-immersive` (onda 6).
- `motion-a11y-performance` (onda 6).

## Arquivos envolvidos

- `src/pages/github/github.tsx`
- `src/img/github-logo.svg`
- `src/data/social.ts`
