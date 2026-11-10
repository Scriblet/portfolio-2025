---
title: Experience Timeline
status: done
wave: 6
scope: site
owner: agent
---

# PRD: Experience Timeline

## Resumo / objetivo

Transformar a seção "Trajectory" em uma **timeline vertical de Experiência** com datas reais. A seção deve exibir as 5 experiências de `src/data/experiences.ts` (Vivo, Porto Seguro, Thoughtworks, ArcoTech, Finger Consultoria) em uma linha do tempo clara, com período, empresa, cargo e descrição. A seção fica no fluxo escuro, após Skills.

## Requisitos funcionais

1. Criar seção `#experience` com label "Experiência / 03" e headline.
2. Renderizar timeline vertical com as 5 experiências de `src/data/experiences.ts`.
3. Cada item deve exibir: número de ordem, período real, empresa, cargo e descrição.
4. Timeline visual: linha vertical conectando os itens ou marcadores laterais.
5. Ordem: mais recente primeiro (já garantida por `experiences.ts`).
6. Respeitar `prefers-reduced-motion`: itens visíveis sem animação de entrada.

## Especificações de design/UX

- **Fundo**: `#101317` sólido para dar leve separação de Skills e Contato.
- **Layout**: grid `120px 1fr` desktop; a timeline é envolvida por uma borda fina `var(--hairline)` e `border-radius: 32px`, com padding consistente (`--timeline-pad-x` / `--timeline-pad-y`). Empilhado em mobile (`period` acima do conteúdo).
- **Linha da timeline**: 1px vertical degradê (esmeralda → âmbar), alinhada ao padding interno; marcadores em esmeralda.
- **Período**: Sora 11px, uppercase, `font-variant-numeric: tabular-nums`, cor `#34D399`.
- **Empresa**: Syne 600, `clamp(1.35rem, 2.4vw, 2.2rem)`, cor `#EDE7DC`.
- **Cargo**: Inter 500, 13px, uppercase tracking 0.12em, cor `#9EA5A8`.
- **Descrição**: Inter 400, 14–15px, cor `#9EA5A8`, `max-width: 62ch`, line-height 1.68.
- **Headline**: "Cinco passagens, nenhuma linha reta." ou similar derivado de `experiences.length`.
- **Experiências reais**:
  1. Vivo (Telefônica Brasil): Consultor de IA / AI Software Engineer, mar/2026 – atual
  2. Porto Seguro: Desenvolvedor de Software Pleno, jan/2024 – mar/2026
  3. Thoughtworks: Consultant Developer, abr/2022 – ago/2023
  4. ArcoTech (Escola em Movimento): Full Stack Developer, jun/2021 – mar/2022
  5. Finger Consultoria: Founder & UX Designer, ago/2019 – jun/2021

## Interações e estados

- **Reveal**: cada item sobe 20px e fade-in uma vez ao entrar na viewport, com stagger opcional.
- **Hover no item**: marcador ganha cor âmbar; linha do item ganha leve destaque.
- **Focus**: anel esmeralda em qualquer link interno.
- **Reduced motion**: itens já visíveis, sem stagger.

## Critérios de aceitação

- [x] Seção `#experience` exibe 5 itens na ordem de `src/data/experiences.ts`.
- [x] Cada item mostra período, empresa, cargo e descrição reais.
- [x] Timeline visual presente (linha vertical ou marcadores) sem quebrar em mobile.
- [x] Nenhuma data ou empresa inventada.
- [x] Layout responde de 320px a 1920px sem overflow horizontal.
- [x] `prefers-reduced-motion` mantém conteúdo visível.
- [x] Teste unitário valida `experienceTimeline` derivado de `experiences.ts`.

## Dependências de outros PRDs

- Depende de `design-system-immersive` para tokens, tipografia, cores e foco.
- `skills-glass-cards` precede esta seção no fluxo.
- `motion-a11y-performance` define reveal e reduced motion.

## Notas de implementação (componentes/arquivos envolvidos)

- `src/pages/immersive/sections.tsx`: novo componente `Experience` em substituição a `Trajectory`.
- `src/pages/immersive/content.ts`: `experienceContent`, `experienceTimeline`.
- `src/data/experiences.ts`: fonte única das experiências e datas.
- `src/pages/immersive/immersive.tsx`: atualizar ordem (`Experience` após `Skills`).
- `src/pages/immersive/immersive.module.scss`: estilos da timeline.
