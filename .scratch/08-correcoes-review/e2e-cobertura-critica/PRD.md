# PRD — Cobertura E2E crítica

Status: ready-for-agent
Feature slug: `e2e-cobertura-critica`

## Problem Statement

A suíte E2E tem hoje um único spec (`smoke-home.cy.ts`, 2 testes) enquanto a
infraestrutura Cypress já está completa (comandos `visitApp`,
`interceptContact`, `waitForSection`, job `e2e` no CI rodando
`test:e2e:preview`). Quedas em navegação, conteúdo das seções e no formulário
de contato passam verdes e só são descobertas pelo visitante. Existe um plano
completo em `.scratch/07-testes-e2e/` (5 PRDs com issues `ready-for-agent`),
mas nada dele foi implementado — o gargalo não é planejamento, é execução do
núcleo crítico.

## Solution

Definir e implementar a barra mínima de cobertura do caminho crítico — smoke
expandido, navegação (header, drawer, âncoras, tema), conteúdo das seções e o
fluxo do formulário de contato (validação, honeypot, envio stubado, feedback) —
tudo rodando verde no job `e2e` do CI. Os PRDs da onda 7 continuam como plano
completo (PWA/offline e a11y profunda ficam lá); este PRD garante que o núcleo
que sustenta o portfólio esteja coberto antes de qualquer release.

## User Stories

1. Como mantenedor, quero que uma quebra de navegação, de conteúdo ou de
   contato falhe o CI, para não publicar portfólio com conversão morta.
2. Como mantenedor, quero os specs rodando contra o build de produção
   (`test:e2e:preview`), para cobrir o que o visitante realmente recebe.
3. Como contribuidor, quero specs legíveis e independentes, para entender uma
   falha pelo nome do teste sem abrir o código.

## Implementation Decisions

- Seam principal: camada de testes E2E. Os specs usam os comandos já existentes
  (`visitApp`, `interceptContact`, `waitForSection`, `resetTheme`) e sempre
  interceptam `POST /api/contact` — nunca dependem do Discord nem de
  `netlify dev`.
- Fatia 1 cobre smoke/rotas/navegação/tema; fatia 2 cobre conteúdo das seções
  (Experiência, Jornada, Skills, Filosofia, GitHub, Footer) com links íntegros;
  fatia 3 cobre o formulário (validação dos 3 campos, honeypot, submit com
  stub, snackbar, 429, offline e o form da `/immersive`).
- Cada fatia implementa e fecha os issues correspondentes de
  `.scratch/07-testes-e2e/` (`cypress-smoke-navegacao`,
  `cypress-secoes-conteudo`, `cypress-formularios-contato`), preservando os
  critérios de aceite lá definidos.
- O job `e2e` do CI já existe; a aceitação é o suite verde com os novos specs e
  runtime saudável (< 10 min, specs críticos primeiro).

## Fora do escopo

- PWA/offline e instalação (PRD `cypress-pwa-offline`).
- axe-core, teclado e viewports (PRD `cypress-a11y-responsivo`).
- Mudanças de produto descobertas pelos testes (viram issues novas).

## Dependências de outros PRDs

- Nenhuma. A infraestrutura `cypress-infraestrutura` está concluída; os specs
  podem começar imediatamente.
