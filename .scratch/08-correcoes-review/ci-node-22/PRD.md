# PRD — CI consistente em Node 22 e lint limpo

Status: ready-for-agent
Feature slug: `ci-node-22`

## Problem Statement

O repositório tem superfícies de build com versões de Node divergentes: o
`ci.yml` (testes) já usa Node 22, mas o `deploy.yml` (produção, GitHub Pages)
ainda usa Node 20 e o `netlify.toml` fixa `NODE_VERSION = "20.10"`. O jsdom 31
(→ undici 8.12) exige Node ≥ 22.19: em Node 20 os workers do Vitest falham com
`Cannot read properties of undefined (reading 'bind')`. Hoje isso não explode
porque o deploy não roda testes, mas qualquer dependência futura ou mudança de
runner quebra o build de produção sem explicação aparente. Além disso, o
`npm run lint` reporta 8 warnings (7× `react-refresh/only-export-components`,
1× `react-hooks/exhaustive-deps`) que poluem o sinal e mascaram warnings reais.

## Solution

Alinhar todas as superfícies de build (`deploy.yml`, `netlify.toml`, `engines`
do `package.json`, `.nvmrc`) para Node 22 e zerar os warnings do ESLint sem
desativar regras — mantendo o contrato de que `npm run lint`,
`npm run test:unit` e `npm run build` rodam limpos na mesma versão de Node,
local e em CI.

## User Stories

1. Como mantenedor, quero que o deploy na GitHub Pages rode a mesma versão de
   Node dos testes, para que o build de produção não quebre quando o runner mudar.
2. Como mantenedor, quero a versão de Node declarada em um único lugar
   (`engines` + `.nvmrc`), para não precisar caçá-la nos workflows.
3. Como mantenedor, quero `npm run lint` sem warnings, para que qualquer
   warning novo apareça como sinal real.
4. Como contribuidor, quero que o `netlify dev` use a mesma versão do CI, para
   não debugar problemas que só existem em uma das superfícies.

## Implementation Decisions

- Seam principal: módulo de Build/CI. `deploy.yml` passa a `node-version: 22`;
  `netlify.toml` passa a `NODE_VERSION = "22"`; `package.json` ganha
  `"engines": { "node": ">=22.19" }` e um `.nvmrc` com `22`.
- Os warnings de `react-refresh/only-export-components` são resolvidos
  separando exports (hooks/states em arquivo próprio ou re-export consciente),
  nunca com `eslint-disable` global; o `exhaustive-deps` do `header.tsx` é
  corrigido no efeito/hook correspondente.
- Verificação: os três comandos (`lint`, `test:unit`, `build`) rodam limpos em
  Node 22 local e no `ci.yml`, que já usa a mesma versão.

## Fora do escopo

- Rodar testes dentro do job de deploy (o `ci.yml` já cobre push/PR).
- Upgrade de outras dependências ou do Vite/React.
- Reescrever o texto do README sobre requisitos (PRD `readme-consistencia`).

## Dependências de outros PRDs

- Nenhuma. Este PRD pode começar imediatamente.
