---
title: Header e Hero imersivos
status: done
wave: 7
scope: site
owner: agent
---

# PRD â€” Header e Hero imersivos

## Resumo / objetivo

Substituir o AppBar MUI atual e a dobra de apresentaÃ§Ã£o por uma composiÃ§Ã£o
editorial alinhada Ã  rota `/immersive`: header flutuante de vidro em formato
pill, wordmark Syne, links mono uppercase e um hero com foto em destaque,
painÃ©is de vidro e tipografia expansiva.

## Estado atual

- `Header` usa `AppBar` + `Toolbar` MUI, links em `Button` e menu `Drawer`.
- `Presentation` usa foto circular com anÃ©is/partÃ­culas animadas, tipografia
  Poppins e um card escuro com gradiente ciano/roxo.
- AÃ§Ãµes existentes que devem ser preservadas: toggle de tema, instalaÃ§Ã£o PWA,
  menu mobile, links de scroll, analytics e navegaÃ§Ã£o para `/roadmap` e
  `/immersive` em dev.

## DireÃ§Ã£o visual (referÃªncia `/immersive`)

- Header fixo, flutuante, `top: 18px`, laterais `clamp(14px, 3.5vw, 56px)`,
  vidro escuro, borda `var(--glass-border)`, raio `999px`.
- Wordmark em Syne 700 com ponto Ã¢mbar.
- Links em Sora 11px uppercase, tracking `0.14em`, hover Ã¢mbar.
- CTA pill "PortfÃ³lio" com Ã­cone circular.
- Hero: portal full-bleed com cortinas que abrem no scroll, foto de fundo,
  wordmark de abertura, painéis de vidro com metadados e headline Syne 800
  com uma palavra em âmbar.

## Requisitos funcionais

1. Refatorar `Header` para o visual glass pill, mantendo todas as aÃ§Ãµes.
2. Refatorar `Presentation` para o hero portal full-bleed (cortinas
   scroll-driven, wordmark, foto e conteúdo editorial).
3. Usar `GlassPanel`, `PillButton`, `SectionLabel` e `Hairline` de
   `src/components/design-system/` quando fizer sentido.
4. Carregar os metadados reais de `src/data` (nome, cargo, localizaÃ§Ã£o,
   experiÃªncia) sem inventar dados.
5. Manter `fetchPriority="high"` na imagem LCP do hero.
6. Garantir `h1` Ãºnico na pÃ¡gina.
7. Preservar `useScrollDirection`, `ThemeToggle`, `InstallButton` e o drawer.

## CritÃ©rios de aceitaÃ§Ã£o

- [x] Header usa vidro escuro, raio pill e tipografia do design system.
- [x] Nenhuma cor hardcoded fora dos tokens (`var(--*)` ou `theme.palette`).
- [x] Hero tem `h1` único e imagem com `fetchPriority="high"`.
- [x] Hero abre em portal scroll-driven com cortinas, wordmark e metadados.
- [x] Com movimento reduzido o portal abre direto no conteúdo.
- [x] Metadados do hero vÃªm de `src/data`, sem dados inventados.
- [x] Menu mobile, toggle de tema e instalaÃ§Ã£o continuam funcionando.
- [x] `scrollWidth === innerWidth` em 320/390/768/1440.
- [x] `prefers-reduced-motion` remove parallax/rotaÃ§Ãµes decorativas.
- [x] Testes existentes de Header/Presentation continuam passando.

## DependÃªncias

- `design-system-immersive` (onda 6) para tokens e primitivas.
- `motion-a11y-performance` (onda 6) para o contrato de movimento.

## Arquivos envolvidos

- `src/pages/header.tsx`
- `src/pages/presentation.tsx`
- `src/pages/presentation.module.scss`
- `src/hooks/useStickyProgress.ts`
- `src/components/design-system/`
- `src/styles/design-system.css`
