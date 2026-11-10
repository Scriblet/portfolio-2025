---
title: Mapa de Maturidade em IA
status: draft
scope: site
owner: agent
---

# PRD: Mapa de Maturidade em IA

## Resumo / objetivo

Criar uma seção dedicada que posicione Lucas como engenheiro de IA, não apenas como desenvolvedor que usa IA. A seção mostra, em forma de mapa de maturidade, as camadas de competência com inteligência artificial, desde o uso produtivo até a engenharia de agentes, RAG, MLOps e governança. O objetivo é comunicar clareza sobre o que ele sabe fazer com IA e em que nível de profundidade.

## Problem Statement

Hoje o portfólio lista skills técnicas genéricas (React, Node, testes, cloud) mas não reflete a transição de carreira para engenharia de IA. Recrutadores e líderes técnicos que acessam o site não conseguem avaliar rapidamente o nível de maturidade em IA (uso, integração, engenharia, operação). Faltam sinais de autoridade na área que agora é o foco principal do trabalho dele.

## Solution

Adicionar uma nova seção de página única, acessível pela âncora `#ia-maturity`, com um mapa visual de maturidade em camadas. Cada camada representa um estágio de profundidade em IA, com título, descrição, habilidades concretas e exemplos de aplicação. A seção usa o design system escuro existente, entra no menu do Header e consome dados de um módulo tipado em `src/data/`.

## User Stories

1. Como um(a) recrutador(a) de engenharia de IA, quero ver rapidamente o nível de maturidade do profissional em IA, para filtrar se ele atende à vaga.
2. Como um(a) gestor(a) técnico(a), quero entender quais capacidades de IA ele domina (RAG, agentes, prompts, MLOps), para decidir se convido para uma conversa.
3. Como um(a) visitante técnico(a), quero ver exemplos reais de aplicação de cada camada, para validar que não é apenas buzzword.
4. Como um(a) visitante no mobile, quero que o mapa de maturidade se adapte a uma coluna sem perder a hierarquia visual, para ler no celular.
5. Como um(a) usuário(a) de leitor de tela, quero que cada camada seja anunciada como um item de lista com título e descrição, para entender a progressão sem depender da posição visual.
6. Como um(a) visitante com sensibilidade a movimento, quero que animações de revelação respeitem `prefers-reduced-motion`.
7. Como um(a) recrutador(a), quero que a seção tenha heading único e texto rico em HTML inicial, para SEO e indexação.
8. Como um(a) visitante que navega por teclado, quero alcançar cada camada e ver o foco destacado.

## Requisitos funcionais

1. Criar seção `#ia-maturity` com label "IA / 0X" e headline.
2. Renderizar 5 camadas de maturidade em IA, com dados em `src/data/aiMaturity.ts`.
3. Cada camada deve exibir: nível/ordem, título, descrição curta, lista de capacidades e exemplo de aplicação.
4. Visualizar as camadas como mapa progressivo (pirâmide ou escada horizontal/vertical) que comunica evolução.
5. Respeitar `prefers-reduced-motion`: conteúdo visível sem animação de entrada quando ativado.
6. Integrar ao menu do Header com link âncora para `#ia-maturity`.
7. Garantir que o texto e os termos técnicos estejam no HTML inicial para SEO.

## Especificações de design/UX

- **Fundo**: usar `var(--void)` ou `var(--void-2)` para separação da seção anterior.
- **Layout**: desktop em formato de escada/pirâmide ou coluna central com camadas empilhadas; mobile em coluna única com camadas em ordem crescente de maturidade.
- **Camadas sugeridas**:
  1. **Uso produtivo**: usar IA para acelerar tarefas diárias, revisar código, gerar documentação.
  2. **Integração de modelos**: consumir APIs de LLM, embeddings, guardrails, validação de respostas.
  3. **Engenharia de prompts & RAG**: sistemas de retrieval, chunking, vetor stores, prompt engineering estruturado.
  4. **Agentes & orquestração**: agentes autônomos, ferramentas, memória, fluxos multi-step.
  5. **MLOps & governança**: observabilidade, custos, segurança, privacidade, versionamento de prompts.
- **Tipografia**: heading da seção no padrão das demais; título da camada em destaque; descrição e tags em cor secundária.
- **Cores**: gradiente ou cor progressiva para indicar maturidade (ex.: violeta → âmbar → esmeralda).
- **Ícones**: um ícone por camada (ex.: `Psychology`, `Hub`, `Storage`, `SmartToy`, `Policy`) usando MUI Icons.
- **Conexão visual**: linha, seta ou numerador conectando as camadas para reforçar progressão.

## Interações e estados

- **Reveal**: cada camada sobe 20px e fade-in ao entrar na viewport, com stagger opcional.
- **Hover na camada**: leve destaque no card/borda e ícone.
- **Focus**: anel de foco visível nos elementos interativos (links, cards clicáveis).
- **Reduced motion**: conteúdo já visível, sem stagger.

## Critérios de aceitação

- [ ] Seção `#ia-maturity` renderiza as 5 camadas na ordem de `src/data/aiMaturity.ts`.
- [ ] Cada camada mostra nível, título, descrição, capacidades e exemplo.
- [ ] Layout responde de 320px a 1920px sem overflow horizontal.
- [ ] Menu do Header contém link âncora para `#ia-maturity`.
- [ ] `prefers-reduced-motion` mantém conteúdo visível.
- [ ] Teste unitário valida `aiMaturity` e sua ordenação.
- [ ] Nenhuma animação contínua ou autoplay.
- [ ] Texto rico presente no HTML inicial para SEO.

## Dependências de outros PRDs

- `design-system-immersive` (quando implementado no site principal) para tokens, tipografia e foco. Até lá, usa o design system atual em `src/components/design-system`.
- `header-scroll-inteligente` para inclusão do novo item de menu.

## Out of Scope

- Playground interativo de IA na primeira entrega.
- Integração com APIs de LLM no frontend.
- Sistema de quiz ou avaliação de maturidade do visitante.
- Tradução multilíngue da seção.

## Notas de implementação (componentes/arquivos envolvidos)

- `src/data/aiMaturity.ts`: fonte única das camadas de maturidade.
- `src/data/types.ts`: adicionar tipo `AiMaturityLevel`.
- `src/pages/ia-maturity/iaMaturity.tsx`: componente da seção.
- `src/pages/ia-maturity/iaMaturity.module.scss`: estilos específicos.
- `src/App.tsx`: registrar a seção no fluxo da página (sugestão: após `SkillsSection`).
- `src/pages/header.tsx`: adicionar item de menu.
- `tests/iaMaturity.spec.ts` (modelo): teste de renderização e ordenação.

## Further Notes

- Os textos devem refletir experiências reais de Lucas (Aura, integração de LLMs, agentes, etc.) sem inventar projetos ou resultados.
- Manter textos em PT-BR; termos técnicos em inglês quando não houver equivalente consagrado.
- Considerar reutilizar o componente `GlassPanel` do design system atual.
