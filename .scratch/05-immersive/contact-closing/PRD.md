---
title: Contact Closing
status: done
wave: 6
scope: site
owner: agent
---

# PRD: Contact Closing

## Resumo / objetivo

Criar o fechamento da rota `/immersive`: uma seção `#contact` escura com headline oversized, card de glass contendo o formulário de contato e links sociais (LinkedIn, GitHub). Deve funcionar como o quadro final da experiência, convidando o visitante a agir sem poluir a identidade tecnológica.

## Requisitos funcionais

1. Criar seção/footer `#contact` com fundo `#0A0C0E`.
2. Headline oversized convidativa, derivada de `src/pages/immersive/content.ts`.
3. Card de glass contendo formulário de contato com campos: nome, e-mail, mensagem e botão de enviar.
4. Exibir links sociais reais: LinkedIn (`SOCIAL_LINKS.LINKEDIN`) e GitHub (`SOCIAL_LINKS.GITHUB`).
5. Integrar ao endpoint `/api/contact` (já existente no portfólio principal) ou reaproveitar lógica do formulário atual.
6. Incluir fine print com e-mail e localização reais.
7. Respeitar `prefers-reduced-motion`: conteúdo visível, sem animações.

## Especificações de design/UX

- **Fundo**: `#0A0C0E` com wordmark "Lucas Nonato" gigante cortado pela borda inferior (decoração).
- **Headline**: Syne 600/700, `clamp(2.2rem, 5.4vw, 5rem)`, cor `#EDE7DC`.
- **Card de glass**:
  - Fundo `rgba(255,255,255,0.1)`
  - `backdrop-filter: blur(44px) saturate(190%)`
  - Borda `1px solid rgba(255,255,255,0.18)`
  - Raio 24px
  - Padding `clamp(24px, 3vw, 40px)`
  - `box-shadow: 0 12px 40px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12)`
- **Formulário**:
  - Labels em Sora 10px uppercase, cor `#9EA5A8`
  - Inputs: fundo `rgba(255,255,255,0.05)`, borda `rgba(255,255,255,0.1)`, raio 12px, altura mínima 48px
  - Focus: borda âmbar
  - Botão submit: `PillButton` sólido, altura ≥44px
- **Links sociais**: texto "LinkedIn" / "GitHub" com `target="_blank" rel="noopener noreferrer"`.
- **Fine print**: e-mail `lucas.nonato1@hotmail.com`, localização `São Paulo, SP`.
- **Wordmark final**: Syne 800, `clamp(2.2rem, 8vw, 6rem)`, centralizado e levemente cortado por `overflow: hidden`.

## Interações e estados

- **Reveal**: headline, card e fine print sobem 20px e fade-in ao entrar na viewport.
- **Hover em inputs**: borda levemente mais clara.
- **Focus**: anel esmeralda nos inputs e botões.
- **Submit**: estado de loading no botão, mensagem de sucesso/erro em `role="status" aria-live="polite"`.
- **Reduced motion**: formulário e texto visíveis sem animação.

## Critérios de aceitação

- [x] Seção `#contact` renderiza headline, card de glass com formulário e links sociais.
- [x] Formulário tem campos nome, e-mail, mensagem e botão enviar.
- [x] Links sociais apontam para `SOCIAL_LINKS.LINKEDIN` e `SOCIAL_LINKS.GITHUB`.
- [x] E-mail e localização no fine print vêm de `PERSON` em `content.ts`.
- [x] Formulário integra com endpoint `/api/contact` ou reaproveita lógica existente.
- [x] Estados de loading, sucesso e erro acessíveis via `aria-live`.
- [x] Layout responde de 320px a 1920px; card não transborda em mobile.
- [x] `prefers-reduced-motion` mantém formulário visível.

## Dependências de outros PRDs

- Depende de `design-system-immersive` para tokens, vidro, tipografia, botões e foco.
- `experience-timeline` precede esta seção no fluxo.
- `motion-a11y-performance` define reveal e reduced motion.

## Notas de implementação (componentes/arquivos envolvidos)

- `src/pages/immersive/sections.tsx`: novo componente `Contact` em substituição a `Closing`.
- `src/pages/immersive/content.ts`: `contactContent`, `PERSON`, `SOCIAL_LINKS`.
- `src/data/social.ts`: fonte dos links sociais.
- `src/pages/immersive/immersive.tsx`: renderizar `Contact` como última seção.
- `src/pages/immersive/immersive.module.scss`: estilos do fechamento e card de formulário.
- Formulário de contato existente no portfólio principal pode servir de referência para validação e endpoint.
