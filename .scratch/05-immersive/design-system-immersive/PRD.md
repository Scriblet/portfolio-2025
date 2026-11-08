---
title: Design System Imersivo
status: done
wave: 6
scope: /immersive
owner: agent
---

# PRD — Design System Imersivo

## Resumo / objetivo

Estabelecer a fundação visual única da rota `/immersive` como um preview experimental do futuro redesign do portfólio. O sistema deve comunicar sofisticação tecnológica/creative developer através de glassmorphism arquitetônico, paleta escura, tipografia editorial e microacentos disciplinados. Todos os tokens, primitivas e regras de movimento devem ser centralizados para que as seções Hero, Sobre, Skills, Experiência e Contato compartilhem a mesma linguagem sem reimplementar valores.

## Requisitos funcionais

1. Fornecer tokens tipográficos, de cor, espaçamento, raios, hairlines, vidro, sombra e movimento em uma única fonte de verdade.
2. Entregar componentes primitivos reutilizáveis: `GlassPanel`, `PillButton`, `SectionLabel`, `Hairline`, `GrainOverlay` e `IndexNumeral`.
3. Garantir que o design system seja aplicado apenas no escopo da rota `/immersive`, sem poluir o tema MUI global.
4. Definir regras de acessibilidade embutidas: foco visível, alvos mínimos de 44px, contraste AA e respeito a `prefers-reduced-motion`.
5. Fornecer textura fotográfica sutil via grão SVG e receita de vidro consistente.

## Especificações de design/UX

- **Paleta escura**: bg `#0A0C0E`, secondary `#101317`, surface `#18181B`, text `#EDE7DC`, secondary text `#9EA5A8`.
- **Acentos**: emerald `#34D399` para interação/seleção, amber `#E8913C` para destaque editorial, deep teal `#2E6B72` para camadas de fotografia.
- **Tipografia**: Syne 600/700/800 para display/wordmark, Inter 300/400/500 para corpo, Sora 400/500 para metadados/labels.
- **Vidro escuro**: `rgba(255,255,255,0.1)` + `backdrop-filter: blur(44px) saturate(190%)` + borda `rgba(255,255,255,0.18)`, raio 16–24px, sombra com destaque interno.
- **Vidro claro**: `rgba(255,255,255,0.84)` + blur 44px + borda `rgba(255,255,255,0.72)`.
- **Grão**: SVG `feTurbulence` 160×160, opacidade 0.08–0.12, `mix-blend-mode: overlay`, `pointer-events: none`, fixo abaixo da navegação.
- **Movimento**: entrada 800ms `cubic-bezier(0.16, 1, 0.3, 1)`, hover 300ms; nenhum `outline: none` sem substituto.
- **Acentos disciplinados**: esmeralda para estados interativos; âmbar para destaque editorial; proibido como grandes preenchimentos.
- **Contraste**: texto secundário `#9EA5A8` sobre escuro; metadados pequenos devem atingir AA.
- **Foco**: anel de 2–3px com offset 3px; esmeralda sobre escuro.

## Interações e estados

- **Hover em botões**: `scale(1.05)` + mudança de cor/fundo, 300ms; sob `prefers-reduced-motion`, apenas cor.
- **Foco visível**: anel esmeralda em todos os elementos interativos do escopo imersivo.
- **Vidro**: não altera aparência entre estados; apenas seus filhos interativos reagem a hover/focus.
- **Grão**: estático, nunca animado.
- **Reduced motion**: zera transições/animações no escopo imersivo; conteúdo permanece visível.

## Critérios de aceitação

- [x] Tokens centralizados em CSS custom properties em `src/pages/immersive/immersive.module.scss`.
- [x] Cores exatas da paleta e acentos documentadas e aplicadas.
- [x] Fontes `@fontsource/syne`, `@fontsource/inter`, `@fontsource/sora` carregadas apenas no chunk da rota.
- [x] Primitivos `PillButton` (com variantes sólida/ghost), `SectionLabel` e `PillIcon` criados em `src/pages/immersive/ui.tsx`.
- [x] Foco visível consistente e alvos mínimos de 44px em primitivos interativos.
- [x] `prefers-reduced-motion` remove transformações e transições no escopo.
- [x] Nenhum token duplicado em componentes consumidores.
- [x] Teste unitário valida dados de conteúdo e renderização da rota.

## Dependências de outros PRDs

- Nenhuma. Este PRD é base para `portal-hero`, `editorial-about`, `skills-glass-cards`, `experience-timeline`, `contact-closing` e `motion-a11y-performance`.

## Notas de implementação (componentes/arquivos envolvidos)

- `src/pages/immersive/immersive.module.scss` — custom properties e classes de escopo.
- `src/pages/immersive/ui.tsx` — primitivos atuais (`PillButton`, `SectionLabel`, `PillIcon`).
- `src/pages/immersive/immersive.tsx` — aplica o escopo e o grão.
- `src/pages/immersive/content.ts` — consome tokens indiretamente via CSS.
