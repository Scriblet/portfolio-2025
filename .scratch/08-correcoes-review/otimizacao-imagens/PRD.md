# PRD: Otimização de imagens

Status: ready-for-agent
Feature slug: `otimizacao-imagens`

## Problem Statement

O portfólio carrega JPEGs pesados nas duas superfícies mais visíveis:
`retrato-hero.jpg` (294 KB, é o LCP da home) e
`multiracial-hands-coming-together.jpg` (821 KB, seção de filosofia). Não há
`<picture>`/`srcset`, então o mesmo arquivo é servido em qualquer viewport; a
imagem da filosofia não tem `loading="lazy"` nem dimensões declaradas (risco de
CLS ao entrar na viewport). Em mobile 3G, típico de quem abre link de portfólio,
isso derruba o LCP e o score de performance, exatamente onde o site quer
parecer premium.

## Solution

Exportar variantes modernas (AVIF/WebP + fallback JPEG) com `srcset`/`sizes`
por viewport, declarar `width`/`height`, aplicar lazy-load nas imagens abaixo
da dobra, servir o LCP com prioridade, e fixar um orçamento de peso por imagem
verificado automaticamente para impedir regressão futura.

## User Stories

1. Como visitante em conexão lenta, quero que a primeira tela apareça rápido,
   para não desistir antes do portfólio carregar.
2. Como visitante, quero que as imagens não pulem o layout durante o scroll,
   para ler o conteúdo sem deslocamentos.
3. Como visitante em tela grande ou pequena, quero receber a resolução
   adequada ao meu dispositivo, para não baixar pixels desperdiçados.
4. Como mantenedor, quero um orçamento de peso por imagem que falhe no build/
   teste, para que ninguém "acidentalmente" commite um asset de 800 KB.

## Implementation Decisions

- Seam principal: ativos estáticos + renderização de imagem. Pipeline leve de
  exportação (script determinístico no repo ou ferramenta local documentada)
  gera AVIF/WebP/JPEG a partir dos originais em `src/img/`.
- Hero (`retrato-hero.jpg`): `<picture>` com AVIF/WebP/JPEG, `srcset`/`sizes`
  coerentes com o layout do hero, `width`/`height` para zerar CLS,
  `fetchPriority="high"`/preload coerentes com o LCP. Orçamento: ≤ 120 KB no
  formato servido à viewport principal.
- Filosofia (`multiracial-hands-coming-together.jpg`): mesmos formatos,
  `loading="lazy"` + `decoding="async"` + dimensões. Orçamento: ≤ 250 KB.
- Anti-regressão: verificação automatizada (script ou teste de unidade) que
  falha se qualquer asset de `src/img`/`public` passar do peso orçado, com a
  tabela de orçamentos versionada junto do PRD.
- Orçamento também revisa `public/og-preview.jpg` (95 KB, aceitável, apenas
  confirmar formato/dimensões 1200×630).

## Fora do escopo

- CDN de terceiros ou otimização em runtime.
- Redesign visual do hero ou da seção de filosofia.
- Conversão de todos os ícones/ícones PWA (já são pequenos).

## Dependências de outros PRDs

- Nenhuma. Este PRD pode começar imediatamente.
