---
title: Manifesto Técnico
status: draft
scope: site
owner: agent
---

# PRD: Manifesto Técnico

## Resumo / objetivo

Criar uma seção curta e impactante que exponha os princípios técnicos e profissionais de Lucas. O manifesto posiciona sua identidade como engenheiro: como ele pensa sobre código, produto, colaboração e aprendizado. Serve como filtro de cultura para recrutadores e como ponto de conexão para outros engenheiros.

## Problem Statement

O portfólio mostra o que Lucas fez (experiências, skills) mas não comunica claramente como ele pensa e trabalha. Visitantes deixam o site sem saber se ele valoriza simplicidade, acessibilidade, entrega contínua, curiosidade ou rigor. Isso torna o site uma vitrine de currículo, não uma declaração de identidade técnica.

## Solution

Adicionar uma nova seção de página única, acessível pela âncora `#manifesto`, com uma lista curta de princípios (5 a 7). Cada princípio tem um título assertivo, uma frase de impacto e uma breve explicação. A seção usa o design system escuro, entra no menu do Header e consome dados de um módulo tipado em `src/data/`.

## User Stories

1. Como um(a) recrutador(a), quero entender os valores técnicos do profissional, para avaliar fit cultural com o time.
2. Como um(a) gestor(a) de engenharia, quero ver princípios que equilibrem qualidade e entrega, para decidir se ele se encaixa em um time produto.
3. Como um(a) visitante técnico(a), quero me identificar com a forma de pensar do autor, para considerar colaboração ou mentoria.
4. Como um(a) visitante no mobile, quero ler o manifesto em uma coluna sem perder a força das frases.
5. Como um(a) usuário(a) de leitor de tela, quero que cada princípio seja anunciado como uma unidade clara (título + explicação).
6. Como um(a) visitante com sensibilidade a movimento, quero que a revelação respeite `prefers-reduced-motion`.
7. Como um(a) recrutador(a), quero que o manifesto tenha heading único e texto rico em HTML inicial, para SEO.

## Requisitos funcionais

1. Criar seção `#manifesto` com label "Princípios / 0X" e headline.
2. Renderizar 5 a 7 princípios técnicos, com dados em `src/data/principles.ts`.
3. Cada princípio deve exibir: número, título assertivo, frase de impacto e explicação curta.
4. Visualizar os princípios como lista editorial ou cards minimalistas, com destaque tipográfico.
5. Respeitar `prefers-reduced-motion`.
6. Integrar ao menu do Header com link âncora para `#manifesto`.

## Especificações de design/UX

- **Fundo**: usar `var(--void)` ou `var(--void-2)` para criar pausa narrativa.
- **Layout**: desktop em coluna central ou grid assimétrico; mobile em coluna única.
- **Tipografia**: título do princípio em destaque (Syne ou equivalente), frase de impacto em itálico ou cor de destaque, explicação em cor secundária.
- **Princípios sugeridos**:
  1. **Código é meio, não fim.**: A melhor engenharia resolve problemas reais de pessoas reais.
  2. **Acessibilidade é padrão, não feature.**: Produtos inclusivos são produtos melhores para todos.
  3. **IA amplifica intenção.**: Tecnologia sem direção é ruído; direção sem tecnologia é lenta.
  4. **Simples escala.**: Sistemas claros são mais fáceis de manter, testar e evoluir.
  5. **Aprendizado contínuo é o único estado estável.**, Toda solução válida um dia será legado; a curiosidade permanece.
  6. **Colaboração é arquitetura.**: Grandes produtos nascem de times que comunicam bem.
- **Cores**: usar uma cor de destaque por princípio ou cor única para toda a seção.
- **Numeradores**: números grandes e sutis (01, 02...) ao fundo ou ao lado de cada princípio.

## Interações e estados

- **Reveal**: cada princípio fade-in e sobe levemente ao entrar na viewport.
- **Hover**: leve destaque no princípio (borda, cor ou fundo sutil).
- **Focus**: anel de foco visível se houver elementos interativos.
- **Reduced motion**: sem animação.

## Critérios de aceitação

- [ ] Seção `#manifesto` renderiza 5 a 7 princípios.
- [ ] Cada princípio mostra número, título, frase de impacto e explicação.
- [ ] Layout responde de 320px a 1920px sem overflow horizontal.
- [ ] Menu do Header contém link âncora para `#manifesto`.
- [ ] `prefers-reduced-motion` mantém conteúdo visível.
- [ ] Teste unitário valida `principles` e sua estrutura.
- [ ] Texto rico presente no HTML inicial para SEO.

## Dependências de outros PRDs

- Design system atual (`src/components/design-system`) para `GlassPanel`, `SectionLabel`, tipografia e foco.
- `header-scroll-inteligente` para inclusão do novo item de menu.

## Out of Scope

- Animações complexas de digitação ou scroll scrubbing.
- Versão interativa onde o visitante vota nos princípios.
- Tradução multilíngue.

## Notas de implementação (componentes/arquivos envolvidos)

- `src/data/principles.ts`: fonte única dos princípios.
- `src/data/types.ts`: adicionar tipo `Principle`.
- `src/pages/manifesto/manifesto.tsx`: componente da seção.
- `src/pages/manifesto/manifesto.module.scss`: estilos específicos.
- `src/App.tsx`: registrar a seção no fluxo da página (sugestão: após `ia-maturity` ou antes de `SkillsSection`).
- `src/pages/header.tsx`: adicionar item de menu.
- `tests/manifesto.spec.ts` (modelo): teste de renderização.

## Further Notes

- Os princípios devem soar como Lucas, não genéricos. Ajustar o tom durante a revisão.
- Manter textos em PT-BR.
- A seção pode ser reusada na rota `/immersive` posteriormente.
