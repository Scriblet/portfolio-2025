---
title: Skills Glass Cards
status: done
wave: 6
scope: site
owner: agent
---

# PRD — Skills Glass Cards

## Resumo / objetivo

Substituir a seção "Roster" de linhas por uma grade de cards de glass flutuantes, um para cada skill de `src/data/skills.ts`. Cada card deve exibir título, descrição e tags, mantendo a identidade tecnológica e o vocabulário de portfólio. A seção fica no fluxo escuro da página (não mais na faixa clara), já que a faixa clara e o deck de releases foram removidos.

## Requisitos funcionais

1. Criar seção `#skills` com label "Skills / 02" e headline introdutória.
2. Renderizar um card de glass para cada item de `src/data/skills.ts` (7 skills atuais).
3. Cada card contém: ícone/índice, título, descrição e tags.
4. Grid responsivo: 3 colunas desktop, 2 colunas tablet, 1 coluna mobile.
5. Remover completamente a seção "Releases" e o deck arrastável.
6. Respeitar `prefers-reduced-motion`: cards aparecem sem flutuação ou parallax.

## Especificações de design/UX

- **Fundo**: `#0A0C0E` sólido ou leve gradiente sutil; sem faixa clara.
- **Grid de cards**: `display: grid`, gap `clamp(16px, 2vw, 28px)`, padding-block `clamp(64px, 9vw, 132px)`.
- **Card de glass**:
  - Fundo `rgba(255,255,255,0.1)`
  - `backdrop-filter: blur(44px) saturate(190%)`
  - Borda `1px solid rgba(255,255,255,0.18)`
  - Sombra `0 12px 40px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12)`
  - Raio 24px
  - Padding `clamp(22px, 2.6vw, 32px)`
- **Índice do card**: numeral em Sora 10px, cor `#6C7378`.
- **Título**: Syne 600, `clamp(1.2rem, 2vw, 1.6rem)`, cor `#EDE7DC`.
- **Descrição**: Inter 400, 14–15px, cor `#9EA5A8`, line-height 1.6.
- **Tags**: pill monoespaçada, borda fina, 10px uppercase, cor `#9EA5A8`.
- **Headline**: "Competências técnicas" (ou frase derivada de `skills.length`).

## Interações e estados

- **Reveal**: cards entram com stagger de 80ms, deslocamento 20px, 800ms.
- **Hover**: card sobe levemente (`translateY(-6px)`) e borda ganha brilho; sombra sutil.
- **Focus**: anel esmeralda ao navegar por teclado.
- **Reduced motion**: cards visíveis sem animação; hover apenas troca de cor da borda.

## Critérios de aceitação

- [x] Seção `#skills` renderiza 7 cards, um para cada `skill` em `src/data/skills.ts`.
- [x] Cada card exibe título, descrição e tags conforme `skills.ts`.
- [x] Grid responde em 3/2/1 colunas sem overflow horizontal.
- [x] Nenhuma referência à seção "Releases" ou ao `ReleasesDeck` permanece em `/immersive`.
- [x] `prefers-reduced-motion` desativa flutuação e stagger.
- [x] Teste unitário valida que `skillCards` deriva de `skills.length` e conteúdo.

## Dependências de outros PRDs

- Depende de `design-system-immersive` para tokens, vidro, tipografia e foco.
- `motion-a11y-performance` define stagger reveal e reduced motion.
- `editorial-about` precede esta seção no fluxo da página.

## Notas de implementação (componentes/arquivos envolvidos)

- `src/pages/immersive/sections.tsx` — novo componente `Skills` em substituição a `Roster`; remover `Releases`.
- `src/pages/immersive/content.ts` — `skillsContent`, `skillCards`.
- `src/data/skills.ts` — fonte única das habilidades.
- `src/pages/immersive/immersive.tsx` — remover `ReleasesDeck` e `<Releases />`.
- `src/pages/immersive/ReleasesDeck.tsx` — remover arquivo se não for mais usado.
- `src/pages/immersive/immersive.module.scss` — estilos dos cards de glass.
