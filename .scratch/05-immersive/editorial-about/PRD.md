---
title: Editorial About
status: done
wave: 6
scope: site
owner: agent
---

# PRD: Editorial About

## Resumo / objetivo

Reformular a seção Statement existente em uma seção **Sobre** com ritmo editorial de portfólio tecnológico. Layout split: de um lado, uma frase editorial grande com uma palavra destacada em âmbar e um numeral gigante vazado; do outro, painéis de glass formando um HUD pessoal com dados reais do currículo (experiência, cargo atual, localização, stack, disponibilidade, idiomas).

## Requisitos funcionais

1. Substituir a seção "Statement" atual por uma seção `#about` chamada "Sobre".
2. Exibir frase editorial em Syne com destaque âmbar e numeral "01" vazado como background decorativo.
3. Montar HUD pessoal com 4–6 painéis de glass contendo dados reais de `src/pages/immersive/content.ts`.
4. Garantir que o retrato circular da implementação atual seja removido ou substituído por um segundo retrato menor no HUD (opcional, sem inventar novo asset).
5. Respeitar `prefers-reduced-motion`: numeral estático, HUD visível sem animações de entrada excessivas.

## Especificações de design/UX

- **Fundo**: `#F4F4F5` claro, criando transição intencional após o hero escuro.
- **Grid**: `1.1fr 1fr` desktop, empilhado em mobile.
- **Frase editorial**: Syne 700, `clamp(2rem, 4.8vw, 4.2rem)`, `max-width: 24ch`, destaque `<em class="highlight">` em âmbar.
- **Numeral**: "01" em `-webkit-text-stroke` `rgba(24,24,27,0.12)`, `aria-hidden`, posicionado atrás do texto.
- **Label**: "Sobre / 01" usando `SectionLabel` do design system.
- **HUD pessoal**: grid de 2 colunas de cards de glass claro, cada card com label em Sora 9px uppercase e value em Inter/Sora 12–14px.
- **Itens do HUD** (mínimo 4, máximo 6):
  - Experiência: 7+ anos
  - Cargo atual: Consultor de IA · Software Engineer · Full Stack
  - Localização: São Paulo, SP
  - Stack principal: TypeScript · React · Node.js
  - Disponibilidade: A combinar
  - Idiomas: Português · Inglês avançado
- **Footnote**: monoespaçado em Sora, resumo curto do posicionamento.
- **Scroll-margin**: `clamp(76px, 10vh, 96px)` para a navegação fixa.

## Interações e estados

- **Reveal de entrada**: frase e HUD sobem 20px e fade-in uma única vez (800ms) quando entram na viewport.
- **Hover nos cards de glass**: leve elevação/destaque de borda (sombra ou borda mais clara), sem scale agressivo.
- **Reduced motion**: revela imediatamente, sem deslocamento.
- **Foco**: anel esmeralda nos links/botões da seção.

## Critérios de aceitação

- [x] Seção `#about` renderiza com label "Sobre / 01".
- [x] Frase editorial contém palavra destacada em âmbar e numeral "01" vazado.
- [x] HUD exibe pelo menos 4 dados reais de `PERSON` em `src/pages/immersive/content.ts`.
- [x] Nenhum dado pessoal inventado; valores vêm de `site.ts`, `experiences.ts`, `skills.ts` ou `content.ts`.
- [x] Layout responde de 320px a 1920px sem overflow horizontal.
- [x] `prefers-reduced-motion` mantém conteúdo visível sem transform.
- [x] Teste unitário valida mapeamento do HUD a partir de `PERSON`.

## Dependências de outros PRDs

- Depende de `design-system-immersive` para tokens, tipografia, labels, glass e foco.
- `motion-a11y-performance` define o contrato de reveal e reduced motion.

## Notas de implementação (componentes/arquivos envolvidos)

- `src/pages/immersive/sections.tsx`: substituir/adaptar `Statement` para `About`.
- `src/pages/immersive/content.ts`: `aboutContent`, `PERSON`.
- `src/pages/immersive/immersive.tsx`: atualizar ordem das seções (`About` após `PortalHero`).
- `src/pages/immersive/immersive.module.scss`: estilos da seção Sobre e HUD.
- `src/pages/immersive/ImmersiveNav.tsx`: link "Sobre" aponta para `#about`.
