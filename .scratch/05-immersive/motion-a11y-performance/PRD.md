---
title: Motion A11y Performance
status: done
wave: 6
scope: site
owner: agent
---

# PRD — Motion, Acessibilidade e Performance

## Resumo / objetivo

Unificar a linguagem de movimento da rota `/immersive` e fechar o contrato de acessibilidade e performance da onda 6. Garantir que o portal, as seções e os cards de glass compartilhem a mesma curva, duração e orçamento; que `prefers-reduced-motion` seja respeitado em todos os pontos; e que a página permaneça fluida em dispositivos modestos.

## Requisitos funcionais

1. Definir tokens únicos de movimento: entrada 800ms, hover 300ms, easing `cubic-bezier(0.16, 1, 0.3, 1)`, deslocamento 20px.
2. Criar componente/hook `Reveal` de disparo único baseado em `IntersectionObserver`.
3. Garantir contrato `prefers-reduced-motion`: nenhum transform/parallax/rotação forçado; conteúdo sempre visível.
4. Manter orçamento de performance: apenas `transform`/`opacity`, listeners passivos, leitura de layout apenas dentro de `requestAnimationFrame`.
5. Realizar auditoria de foco e contraste em todas as superfícies (escuro, vidro, formulário).
6. Lazy loading da rota `/immersive` preservada; imagens com dimensões e `loading` adequados.

## Especificações de design/UX

- **Tokens de movimento**:
  - `--duration-enter: 800ms`
  - `--duration-hover: 300ms`
  - `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`
  - `--reveal-y: 20px`
- **Reveal**:
  - `IntersectionObserver` com `threshold: 0.12`, `rootMargin: 0 0 -8% 0`
  - Dispara uma vez; `unobserve` após revelar
  - Atributo `data-motion="ready"` só aplicado quando movimento é permitido
- **Reduced motion**:
  - Media query global no escopo imersivo zera transições/animações
  - Portal colapsa para `100svh` com `--p` estático
  - Cards de skills não flutuam
  - Timeline não faz stagger
- **Performance**:
  - Um listener passivo + rAF por efeito de scroll
  - `will-change` apenas nos elementos animados
  - Nada de `top/left/width/height` animado por frame
  - LCP < 2.5s, CLS < 0.1, INP < 200ms em 4G simulada (budget aspiracional)
- **Acessibilidade**:
  - `h1` único na página
  - Landmarks `nav`/`main`/`footer`
  - Skip link
  - Foco 2–3px com offset
  - Alvos ≥44px
  - Contraste AA em textos pequenos e labels
  - Formulário com labels associados, `aria-live` para feedback

## Interações e estados

- **Scroll no portal**: progresso `--p` atualizado via rAF, sem re-render React.
- **Reveal de seções**: elementos `[data-reveal]` começam invisíveis apenas quando `data-motion="ready"`; ao revelar, recebem `data-revealed="true"`.
- **Hover em cards**: `translateY(-6px)` + brilho de borda, 300ms.
- **Reduced motion**: hover vira apenas mudança de cor da borda; reveals são instantâneos.
- **Foco**: anel esmeralda consistente em todos os elementos interativos.

## Critérios de aceitação

- [x] Tokens de movimento centralizados e consumidos por todos os componentes imersivos.
- [x] `Reveal` funciona com `IntersectionObserver`, dispara uma vez e respeita `prefers-reduced-motion`.
- [x] Com `prefers-reduced-motion`, portal é estático, seções são visíveis e cards não flutuam.
- [x] Portal mede deslocamento >100px nos primeiros 700px de scroll e retorna ao topo.
- [x] `scrollWidth === innerWidth` em 320/390/768/1440.
- [x] Foco visível em todos os elementos interativos (navegação, links, botões, inputs, deck removido).
- [x] Nenhum `setTimeout`/`setInterval` no fluxo de scroll/portal.
- [x] Testes unitários cobrem lógica de preferência de movimento e progresso de scroll.

## Dependências de outros PRDs

- Aplica-se a todos os PRDs da onda 6: `design-system-immersive`, `portal-hero`, `editorial-about`, `skills-glass-cards`, `experience-timeline`, `contact-closing`.
- Deve ser usado como gate final da onda 6.

## Notas de implementação (componentes/arquivos envolvidos)

- `src/pages/immersive/hooks.ts` — `usePrefersReducedMotion`, `useStickyProgress`, `useRevealOnScroll`, `useViewportProgress`.
- `src/pages/immersive/immersive.module.scss` — media query `prefers-reduced-motion` e classes `[data-reveal]`.
- `src/pages/immersive/immersive.tsx` — aplica `data-motion="ready"` e landmarks.
- `src/pages/immersive/hooks.ts` — hooks reais (`usePrefersReducedMotion`, `useScrollProgress`, `useRevealOnScroll`).
- `src/pages/immersive/PortalHero.tsx`, `sections.tsx` — consumidores dos contratos.
