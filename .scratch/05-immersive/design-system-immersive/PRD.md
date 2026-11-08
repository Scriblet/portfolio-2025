---
title: Design System Imersivo
status: done
wave: 6
scope: site
owner: agent
---

# PRD — Design System Imersivo

## Resumo / objetivo

Estabelecer a fundação visual única do portfólio inteiro, usando a rota
`/immersive` como referência aprovada. O sistema comunica sofisticação
tecnológica/creative developer através de glassmorphism arquitetônico, paleta
escura, tipografia editorial e microacentos disciplinados. Tokens, primitivas
e regras de movimento são centralizados para que todas as seções do site
compartilhem a mesma linguagem sem reimplementar valores.

## Requisitos funcionais

1. Fornecer tokens tipográficos, de cor, espaçamento, raios, hairlines, vidro,
   sombra e movimento em uma única fonte de verdade.
2. Entregar componentes primitivos reutilizáveis: `GlassPanel`, `PillButton`,
   `SectionLabel`, `Hairline`, `GrainOverlay` e `IndexNumeral`.
3. Aplicar o design system ao site inteiro, incluindo o tema MUI, sem manter
   uma segunda identidade visual paralela.
4. Definir regras de acessibilidade embutidas: foco visível, alvos mínimos de
   44px, contraste AA e respeito a `prefers-reduced-motion`.
5. Fornecer textura fotográfica sutil via grão SVG e receita de vidro
   consistente.

## Especificações de design/UX

- **Paleta escura**: bg `#090B0D`, secondary `#101317`, surface `#18181B`,
  text `#F1EEE8`, secondary text `#A8AFB2`.
- **Acentos**: emerald `#34D399` para interação/seleção, amber `#E8913C` para
  destaque editorial, deep teal `#2E6B72` para camadas de fotografia.
- **Tipografia**: Syne 600/700/800 para display/wordmark, Inter 300/400/500
  para corpo, Sora 400/500/600 para metadados/labels.
- **Vidro escuro**: `rgba(255,255,255,0.12)` + `backdrop-filter: blur(48px)
  saturate(190%)` + borda `rgba(255,255,255,0.2)`, raio 16–24px, sombra com
  destaque interno.
- **Vidro claro**: `rgba(255,255,255,0.84)` + blur 48px + borda
  `rgba(255,255,255,0.72)`.
- **Grão**: SVG `feTurbulence`, opacidade 0.075,
  `mix-blend-mode: overlay`, `pointer-events: none`, fixo.
- **Movimento**: entrada 800ms `cubic-bezier(0.16, 1, 0.3, 1)`, hover 300ms;
  nenhum `outline: none` sem substituto.
- **Acentos disciplinados**: esmeralda para estados interativos; âmbar para
  destaque editorial; proibido como grandes preenchimentos.
- **Contraste**: texto secundário `#A8AFB2` sobre escuro; metadados pequenos
  devem atingir AA.
- **Foco**: anel de 2–3px com offset 3px; esmeralda sobre escuro, deep teal
  sobre claro.

## Interações e estados

- **Hover em botões**: `scale(1.05)` + mudança de cor/fundo, 300ms; sob
  `prefers-reduced-motion`, apenas cor.
- **Foco visível**: anel esmeralda em todos os elementos interativos.
- **Vidro**: não altera aparência entre estados; apenas seus filhos interativos
  reagem a hover/focus.
- **Grão**: estático, nunca animado.
- **Reduced motion**: zera transições/animações; conteúdo permanece visível.

## Critérios de aceitação

- [x] Tokens centralizados em `src/styles/design-system.css` e
      `src/theme/designTokens.ts`.
- [x] Cores exatas da paleta e acentos documentadas e aplicadas.
- [x] Fontes `@fontsource/syne`, `@fontsource/inter` e `@fontsource/sora`
      carregadas no bundle principal.
- [x] Primitivos `GlassPanel`, `PillButton`, `SectionLabel`, `Hairline`,
      `GrainOverlay`, `IndexNumeral` e `PillIcon` em
      `src/components/design-system/index.tsx`.
- [x] Tema MUI migrado para Syne/Inter/Sora, paleta void/emerald/amber e
      superfícies de vidro.
- [x] Foco visível consistente e alvos mínimos de 44px.
- [x] `prefers-reduced-motion` remove transformações e transições.
- [x] Nenhum token duplicado em componentes consumidores.
- [x] Teste unitário valida dados de conteúdo da referência imersiva.

## Dependências de outros PRDs

- Nenhuma. Este PRD é base para `portal-hero`, `editorial-about`,
  `skills-glass-cards`, `experience-timeline`, `contact-closing` e
  `motion-a11y-performance`.
- A onda 7 (`06-site-refactor`) aplica esta fundação às seções reais do site.

## Notas de implementação (componentes/arquivos envolvidos)

- `src/styles/design-system.css` — custom properties e classes globais `ds-*`.
- `src/theme/designTokens.ts` — tokens em TypeScript.
- `src/components/design-system/index.tsx` — primitivas compartilhadas.
- `src/theme.ts` e `src/theme/palettes.ts` — tema MUI alinhado ao DS.
- `src/main.tsx` — importa fontes e CSS global.
- `src/pages/immersive/*` — referência visual e laboratório.
