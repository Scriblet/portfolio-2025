# PRD — README consistente com o repositório

Status: ready-for-agent
Feature slug: `readme-consistencia`

## Problem Statement

O README contradiz o estado real do projeto em pontos que geram atrito real:
pré-requisito "Node.js 18+" quando o projeto exige Node ≥ 22.19 (jsdom 31);
um script `npm run type-check` que não existe no `package.json`; seção de
deploy que recomenda Netlify/Vercel e mostra um workflow com Node 18 enquanto o
deploy real é GitHub Pages via `deploy.yml` com fallback SPA em `404.html`;
árvore de diretórios desatualizada (sem `src/data`, `src/theme`,
`src/components/design-system`, `src/hooks`, `netlify/functions`, `cypress/`);
e menção ao webhook do Discord como integração direta do formulário, quando hoje
o segredo vive server-side na função `/api/contact`. Documentação errada derruba
a nota de qualquer avaliação técnica e atrapalha o próximo agente/humano.

## Solution

Reescrever as seções de pré-requisitos, scripts, estrutura e deploy para
refletir exatamente o repositório: Node 22 como base, scripts que existem no
`package.json`, GitHub Pages como hospedagem de produção (com `VITE_BASE_PATH`
e fallback `404.html`), Netlify Functions como backend do contato, e o design
system documentado conforme `src/styles/design-system.css`. Toda instrução
citada no README precisa ser executável como está.

## User Stories

1. Como visitante técnico (recrutador/dev), quero que o README descreva o
   projeto como ele realmente é, para avaliar a qualidade sem pegadinhas.
2. Como contribuidor, quero seguir o README do zero sem esbarrar em comando
   inexistente ou versão errada de Node, para começar rápido.
3. Como mantenedor, quero uma única fonte de verdade sobre deploy e
   variáveis de ambiente, para não divergir do que o CI faz.

## Implementation Decisions

- Seam principal: documentação — `README.md` é o artefato; `.env.example` e
  `docs/CONTACT-ENDPOINT.md` são conferidos e alinhados se divergirem.
- Pré-requisitos: Node ≥ 22.19 (alinhado a `engines`/`.nvmrc` do PRD
  `ci-node-22`), npm atual; scripts listados são exatamente os do
  `package.json` (`dev`, `build`, `lint`, `test:unit`, `dev:test`,
  `test:e2e*`, `preview`).
- Deploy: GitHub Pages (workflow `deploy.yml`, `VITE_BASE_PATH=/portfolio-2025/`,
  fallback SPA em `dist/404.html`); a Netlify é documentada apenas como
  ambiente das functions (`netlify dev`), não como hospedagem do site.
- Estrutura: árvore de diretórios atualizada (dados tipados, theme, design
  system, hooks, pages, netlify/functions, cypress, .scratch).
- Critério de aceite transversal: cada comando e caminho citado foi verificado
  no repositório no momento da escrita.

## Fora do escopo

- Alteração de código, de design ou de conteúdo do portfólio.
- Novas seções de documentação (guia de contribuição, ADRs).
- Correção dos problemas que os outros PRDs deste lote tratam (eles são
  citados no README apenas quando já implementados).

## Dependências de outros PRDs

- `ci-node-22` (para citar `engines`/`.nvmrc` coerentes — se ainda não
  existirem, documentar a versão mínima exigida hoje).
