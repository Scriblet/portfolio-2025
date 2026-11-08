---
title: Portal Hero
status: done
wave: 6
scope: /immersive
owner: agent
---

# PRD — Portal Hero

## Resumo / objetivo

Criar o momento assinatura da rota `/immersive`: um hero scroll-driven onde dois painéis arquitetônicos se abrem para revelar uma foto pessoal, enquanto o wordmark "LUCAS NONATO" se divide em duas metades. Quatro meta-cantos de glass exibem dados reais do currículo (nome, cargo, localização, anos de experiência, stack principal). O gesto deve ser 100% scroll-driven e reversível — subir a página fecha o portal.

## Requisitos funcionais

1. Hero de 260vh (desktop) / 230vh (mobile) com palco sticky de 100svh.
2. Progresso de scroll (`--p`, 0 → 1) dirige a abertura dos painéis, o scale da foto, o tracking/spacing do wordmark e o posicionamento dos meta-cantos.
3. Wordmark dividido em "LUCAS" e "NONATO", com as metades se afastando conforme o scroll.
4. Quatro meta-cantos de glass: Portfolio/Edição 2026, Base/São Paulo, Stack principal/TypeScript · React · Node.js, Experiência/7+ anos.
5. Foto pessoal full-bleed com tratamento duotônico teal→âmbar e vinheta para contraste.
6. Respeito total a `prefers-reduced-motion`: hero colapsa para 100svh com composição estática aberta.
7. Nenhum timer (`setTimeout`/`setInterval`) participa da abertura do portal.

## Especificações de design/UX

- **Altura do hero**: 260vh desktop, 230vh mobile; palco `100svh` com `min-height: 560px`.
- **Painéis**: 50.25% de largura cada, gradiente escuro `#11151A → #07090B`, hairline interno, rótulos verticais "Lado A/B", `aria-hidden`.
- **Movimento dos painéis**: `translate3d(±101% * --p)`.
- **Fotografia**: `object-fit: cover`, `scale(1.12 → 1)`, filtro de dessaturação, camada duotônica com `mix-blend-mode: color`, vinheta radial + gradiente inferior.
- **Wordmark**: Syne 700, `clamp(3rem, 10.6vw, 11rem)`, `letter-spacing` de `-0.02em` fechado até `-0.05em` aberto, metades deslocam `∓16vw`.
- **Meta-cantos**: glass `rgba(255,255,255,0.05)` + `blur(20px)`, borda `rgba(255,255,255,0.1)`, raio 14px, alinhados aos quatro cantos do palco.
- **Scroll cue**: linha + label "Scroll para abrir" no canto inferior direito, opacidade diminui com `--p`.
- **Pontos de acento**: 7px âmbar/esmeralda que partem do centro para cantos opostos com `--p`.

## Interações e estados

- **Scroll para baixo**: painéis abrem, wordmark separa, foto zoom-out, meta-cantos aparecem/fixam.
- **Scroll para cima**: todas as camadas retornam à posição inicial na ordem inversa.
- **Reduced motion**: `--p` estático em ~0.64, palco não é sticky, conteúdo já visível.
- **Teclado/leitor de tela**: `h1` acessível com `aria-label="LUCAS NONATO"`, spans do wordmark `aria-hidden`; metadados legíveis.
- **Resize**: progresso é recalculado sem vazamento de memória.

## Critérios de aceitação

- [x] `useStickyProgress(heroRef, stageRef)` calcula `--p` com listener scroll passivo + rAF, sem estado React por frame.
- [x] Painéis e wordmark deslocam mais de 100px entre `scrollY=0` e `scrollY=700`.
- [x] Ao voltar ao topo, painéis e wordmark retornam à posição inicial.
- [x] Meta-cantos exibem dados reais de `src/pages/immersive/content.ts` (nome, cargo, localização, experiência, stack).
- [x] Fotografia é asset real `src/img/presetation.jpg` com `alt` descritivo.
- [x] Com `prefers-reduced-motion`, hero tem 100svh, `--p` estático e conteúdo visível.
- [x] Sem `setTimeout`/`setInterval` no fluxo do portal.
- [x] `scrollWidth === innerWidth` em 390px; wordmark e meta-cantos não causam overflow.

## Dependências de outros PRDs

- Depende de `design-system-immersive` para tokens, tipografia, vidro e foco.
- `motion-a11y-performance` validará reduced motion e orçamento de performance.

## Notas de implementação (componentes/arquivos envolvidos)

- `src/pages/immersive/PortalHero.tsx` — componente principal a ser refatorado para dados reais e meta-cantos.
- `src/pages/immersive/hooks.ts` — `useStickyProgress` e `usePrefersReducedMotion`.
- `src/pages/immersive/immersive.module.scss` — estilos do portal, painéis, wordmark, meta-cantos.
- `src/pages/immersive/content.ts` — `PERSON`, `heroMeta`, `wordmark`.
- `src/img/presetation.jpg` — asset de retrato.
