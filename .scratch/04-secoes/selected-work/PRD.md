---
title: Selected Work
status: draft
scope: site
owner: agent
---

# PRD — Selected Work

## Resumo / objetivo

Substituir as seções redundantes `Experience` e `Jornada` por uma única seção narrativa de "Selected Work" — uma lista de cases reais que Lucas entregou, contada com foco em impacto, decisão técnica e evolução de carreira. A nova seção mantém a função da timeline (mostrar trajetória) mas eleva a qualidade da narrativa para um portfólio de engenharia de IA.

## Problem Statement

As seções `Experience` (cards de empresas) e `Jornada` (timeline de marcos) comunicam basicamente a mesma informação: onde Lucas trabalhou e quando. Isso ocupa espaço valioso na página sem contar o que ele realmente construiu, quais problemas resolveu ou que decisões difíceis tomou. Recrutadores e gestores técnicos precisam de prova social: cases com contexto, ação e resultado.

## Solution

Remover as seções `Experience` e `Jornada` atuais e criar uma seção única `#selected-work` com narrativa contínua de cases. Cada case é apresentado como um capítulo: contexto, desafio, papel de Lucas, decisões técnicas, resultados e aprendizados. A seção consolida dados de `experiences.ts`, `timeline.ts` e `projects.ts`, além de permitir conteúdo enriquecido específico para cada case.

## User Stories

1. Como um(a) recrutador(a), quero ver cases reais com resultados, para avaliar o impacto prático do profissional.
2. Como um(a) gestor(a) técnico(a), quero entender o papel de Lucas em cada case, para saber se ele atua como executor, líder ou arquiteto.
3. Como um(a) visitante técnico(a), quero ler sobre decisões técnicas e trade-offs, para julgar profundidade de conhecimento.
4. Como um(a) visitante no mobile, quero que a narrativa seja legível em uma coluna sem elementos quebrados ou sobrepostos.
5. Como um(a) usuário(a) de leitor de tela, quero que cada case tença heading, período, empresa e descrição anunciados em sequência.
6. Como um(a) visitante com sensibilidade a movimento, quero que animações de revelação respeitem `prefers-reduced-motion`.
7. Como um(a) visitante, quero que a seção tenha link direto `#selected-work` e esteja no menu do Header.
8. Como um(a) visitante, quero que a seção carregue sem depender de imagens pesadas, para performance.

## Requisitos funcionais

1. Remover as seções `Experience` e `Timeline` do fluxo principal (`App.tsx`).
2. Criar seção `#selected-work` com label "Trabalho / 0X" e headline.
3. Renderizar 5 a 6 cases a partir de `src/data/selectedWorks.ts`.
4. Cada case deve exibir: cliente/empresa, período, papel, headline do case, contexto, desafio, ação/decisões técnicas, resultado/aprendizado e stack utilizada.
5. Ordem: mais recente primeiro.
6. Respeitar `prefers-reduced-motion`.
7. Integrar ao menu do Header com link âncora para `#selected-work`.
8. Garantir redirect/compatibilidade das âncoras antigas `#experience` e `#jornada` (scroll suave para `#selected-work` ou fallback).

## Especificações de design/UX

- **Fundo**: variação de `var(--void)` com alternância sutil entre cases para criar ritmo.
- **Layout**: narrativa contínua vertical. Cada case ocupa uma "dobra" visual com:
  - Cabeçalho do case (período + empresa + papel).
  - Headline em destaque.
  - Corpo dividido em 2-3 parágrafos curtos (contexto, ação, resultado).
  - Tags de stack.
- **Tipografia**: headline do case em destaque, corpo em largura confortável (`max-width: 65ch`), período em fonte monoespaçada ou uppercase.
- **Cases sugeridos**:
  1. **Aura (Vivo/Telefônica)** — integração de LLMs e agentes na plataforma Aura.
  2. **Porto Seguro** — aplicações web e serviços com foco em performance e integração.
  3. **Thoughtworks** — consultoria, acessibilidade e TDD em times diversos.
  4. **ArcoTech / Escola em Movimento** — produto educacional full stack.
  5. **Finger Consultoria** — fundação, UX research e design de carreira.
  6. **Hackathons e iniciativas** — prova de velocidade e criatividade (opcional).
- **Conexão entre cases**: divisor sutil, numerador de case ou linha vertical indicando continuidade.
- **Imagens/capas**: primeira entrega pode ser sem imagens ou com capas leves e provisórias; priorizar texto.

## Interações e estados

- **Reveal**: cada case sobe e fade-in ao entrar na viewport.
- **Hover em tags**: leve destaque.
- **Links**: se houver links externos (repos, artigos), abrir em nova aba com indicação textual.
- **Reduced motion**: conteúdo visível, sem animação.

## Critérios de aceitação

- [ ] Seções `Experience` e `Timeline` removidas do fluxo principal.
- [ ] Seção `#selected-work` renderiza todos os cases de `selectedWorks.ts`.
- [ ] Cada case mostra período, empresa, papel, headline, contexto, ação e resultado.
- [ ] Ordem cronológica decrescente (mais recente primeiro).
- [ ] Layout responde de 320px a 1920px sem overflow horizontal.
- [ ] Menu do Header atualizado com link para `#selected-work`.
- [ ] Âncoras antigas `#experience` e `#jornada` não quebram (fallback para `#selected-work` ou redirecionamento suave).
- [ ] `prefers-reduced-motion` mantém conteúdo visível.
- [ ] Testes unitários validam `selectedWorks` e renderização.
- [ ] Nenhum dado inventado; períodos e empresas conferidos com currículo.

## Dependências de outros PRDs

- `mapa-maturidade-ia` e `manifesto-tecnico` (recomendado entregar antes para posicionar identidade antes dos cases).
- Design system atual para `GlassPanel`, `SectionLabel`, tipografia e foco.
- `header-scroll-inteligente` para atualização do menu.

## Out of Scope

- Página dedicada para cada case na primeira entrega.
- Galeria de imagens ou vídeos dos projetos.
- Filtros por empresa, stack ou ano.
- Integração com GitHub para pull métricas.
- Tradução multilíngue.

## Notas de implementação (componentes/arquivos envolvidos)

- `src/data/selectedWorks.ts` — nova fonte única dos cases.
- `src/data/types.ts` — adicionar tipo `SelectedWork`.
- `src/pages/selected-work/selectedWork.tsx` — componente da seção.
- `src/pages/selected-work/selectedWork.module.scss` — estilos específicos.
- `src/App.tsx` — substituir `Experience` e `Timeline` por `SelectedWork`.
- `src/pages/header.tsx` — atualizar item de menu.
- `src/pages/experience/experience.tsx` e `src/pages/timeline/timeline.tsx` — podem ser removidos ou mantidos como não usados.
- `tests/selectedWork.spec.ts` (modelo) — teste de renderização e ordenação.

## Further Notes

- A seção deve soar como líder técnico em construção + criador de produto (tom escolhido no quiz).
- Cada case deve ter pelo menos um resultado ou aprendizado concreto, mesmo que qualitativo.
- Manter textos em PT-BR; nomes de empresas e tecnologias no idioma original.
- Considerar reutilizar conteúdo em `/immersive` no futuro.
