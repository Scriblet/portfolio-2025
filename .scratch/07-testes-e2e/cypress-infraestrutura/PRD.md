# PRD — Infraestrutura de testes E2E com Cypress

Status: done
Feature slug: `cypress-infraestrutura`
Onda: `07-testes-e2e`

## Problem Statement

O portfólio não tem nenhum teste de navegador: o Vitest cobre lógica (hooks, tema,
dados) mas nada garante que um visitante consiga navegar, alternar tema, preencher
o formulário ou ver o site offline depois de uma mudança. Já existiu uma suíte de
100+ testes de navegador (Playwright) que foi removida por congelar a máquina no
loop de desenvolvimento (`docs/agents/testing.md`). Hoje qualquer regressão visual
ou de interação só é percebida manualmente. Sem uma base de E2E estável — runner,
servidor, comandos e regras de execução — não vale a pena escrever specs.

## Solution

Instalar Cypress como runner de E2E com uma base mínima e estável: configuração
oficial (`cypress.config.ts`), specs em `cypress/e2e/*.cy.ts`, suporte com comandos
reutilizáveis (visitar a app respeitando o base path, limpar tema, reduzir movimento,
interceptar `/api/contact`, aguardar seções lazy), rodando contra o dev server do
Vite (ou `vite preview` para specs de PWA). Scripts npm explícitos (`test:e2e`,
`test:e2e:open`, `test:e2e:spec`) **nunca** conectados ao loop padrão: `npm run
test`/`test:unit` continuam sendo Vitest. A suíte completa roda em CI (GitHub
Actions) com artefatos de falha (screenshots/vídeos); localmente roda **um spec
por vez**. Inclui a atualização de `docs/agents/testing.md`, AGENTS.md e
`docs/CONTACT-ENDPOINT.md` para refletir o runner novo, e a limpeza de resíduos
da suíte antiga (`tests/` vazio, `test-results/.last-run.json`).

## User Stories

1. Como mantenedor, quero rodar `npm run test:e2e:open` para desenvolver specs no
   runner do Cypress, com hot reload, sem afetar o loop de testes unitários.
2. Como mantenedor, quero rodar `npm run test:e2e -- --spec cypress/e2e/<spec>.cy.ts`
   para executar **um** spec isolado em modo headless, sem travar meu computador.
3. Como mantenedor, quero que a suíte completa rode apenas em CI, com screenshots
   e vídeos anexados quando algo falhar, para diagnosticar sem ocupar minha máquina.
4. Como mantenedor, quero comandos prontos (`cy.visitApp`, `cy.resetTheme`,
   `cy.enableReducedMotion`, `cy.interceptContact`) para que os specs não repitam
   setup e não fiquem quebradiços.
5. Como mantenedor, quero que os specs usem apenas `data-testid`/IDs estáveis e
   nunca classes CSS modules, para que mudanças de estilo não quebrem testes.
6. Como mantenedor, quero que `/api/contact` seja sempre interceptado nos specs,
   para que testes não dependam do webhook do Discord nem de `netlify dev`.
7. Como mantenedor, quero o `baseUrl` configurável por `CYPRESS_BASE_URL`, para
   rodar a mesma suíte contra dev (`/`), preview local e o GitHub Pages
   (`/portfolio-2025/`).
8. Como mantenedor, quero que a documentação de testes (`docs/agents/testing.md`,
   AGENTS.md) descreva Cypress como runner E2E com a mesma regra de ouro — E2E
   fora do loop de desenvolvimento — para o time não repetir o erro da suíte antiga.
9. Como mantenedor, quero confirmar em CI que `lint`, Vitest e `build` continuam
   passando junto dos novos specs, para não quebrar a entrega atual.
10. Como visitante, quero que o site continue exatamente igual: nenhum código de
    app é alterado para torná-lo "testável" além de ajustes mínimos de seletores
    já existentes.

## Implementation Decisions

- Runner: **Cypress 15+** (`cypress.config.ts` em TypeScript, e2e testing).
  Specs em `cypress/e2e/**/*.cy.ts`; suporte em `cypress/support/e2e.ts`;
  comandos custom em `cypress/support/commands.ts`; fixtures em `cypress/fixtures/`.
- Servidor de teste: `start-server-and-test` ligando `vite --port 5173` para os
  specs normais e `vite preview --port 4173` para specs de PWA (só no build o
  service worker ativa). Em CI o build é feito antes e o preview sobe com o
  `VITE_BASE_PATH` do ambiente.
- Contrato de comandos de suporte:
  - `cy.visitApp(path?)` — visita respeitando `CYPRESS_BASE_URL` e o base path;
    em `beforeLoad` limpa `localStorage` (incluindo `portfolio-color-mode`) e
    força `prefers-reduced-motion: reduce` por padrão (estabilidade).
  - `cy.enableReducedMotion()` / `cy.disableReducedMotion()` — stub de `matchMedia`.
  - `cy.resetTheme(mode?)` — reseta/grava `portfolio-color-mode`.
  - `cy.interceptContact(response)` — faz stub de `POST /api/contact` com o
    status/corpo desejado e registra o alias `@postContact`.
  - `cy.waitForSection(testid)` — espera o `section-fallback` sair e o elemento
    final ficar visível (cobrindo as seções lazy).
- Estabilidade: retries `{ runMode: 1, openMode: 0 }`; viewport padrão 1280×720;
  `video: false` local e `screenshotOnRunFailure: true`; sem waits fixos — sempre
  asserções com retry ou `data-revealed`/`section-fallback` como condição.
- Scripts npm: `test:e2e` (headless, exige servidor via `start-server-and-test`),
  `test:e2e:open` (runner), `test:e2e:spec` (repasse de `--spec`). `test` e
  `test:unit` permanecem Vitest; `test:e2e` **não** entra em `test` nem em `prepare`.
- CI: novo job `e2e` em `.github/workflows/ci.yml` (ou `e2e.yml`) usando
  `cypress-io/github-action`, com cache de `~/.cache/Cypress`, build + preview,
  upload de `cypress/screenshots` e `cypress/videos` em falha (`actions/upload-artifact`).
  Concurrency group cancelando execuções antigas.
- Documentação: reescrever a seção de E2E de `docs/agents/testing.md` (Playwright →
  Cypress, mantendo "E2E é opt-in: nunca no loop de dev; local = 1 spec por vez;
  suíte completa = CI"), atualizar AGENTS.md e o trecho de testes de
  `docs/CONTACT-ENDPOINT.md` (que ainda cita `tests/contact.spec.ts` + Playwright).
- Limpeza: remover `test-results/.last-run.json` (resíduo) e o diretório `tests/`
  vazio (ou deixar explícito no `.gitignore` que specs vivem em `cypress/`).

## Testing Decisions

- Validação da infraestrutura é por prova de fogo: o primeiro spec de smoke
  (`cypress-smoke-navegacao`) deve passar localmente em headless e no CI.
- Critério de qualidade da base: rodar o mesmo spec duas vezes seguidas sem
  flakes (retries não devem ser necessários em condições normais).
- Não testar a si mesmo em profundidade: Cypress cobre interações de navegador;
  lógica de validação/hook continua no Vitest (não duplicar).
- Ordem de confiança dos seletores: `data-testid` → IDs → aria-label/role →
  texto visível. CSS modules são proibidos nos specs (ver ANALISE.md §10).

## Out of Scope

- Qualquer teste funcional (eles são os PRDs `cypress-smoke-navegacao`,
  `cypress-secoes-conteudo`, `cypress-formularios-contato`, `cypress-pwa-offline`
  e `cypress-a11y-responsivo`).
- Migração para Playwright ou qualquer outro runner; Cypress é a escolha única.
- Testes visuais/snapshot, testes de API da Netlify Function isolada, carga/perf.
- Alterar comportamento do app (inclusive o `href=""` de Instagram/Twitter e a
  falta de skip link — registrados para outros PRDs).

## Further Notes

- Risco principal: recriar a suíte pesada que congelava a máquina — mitigado por
  reduced motion por padrão, `video: false` local, 1 spec por vez e suíte completa
  só em CI (regra a ser escrita em `docs/agents/testing.md`).
- O PRD deve ser implementado primeiro: todos os outros PRDs da onda dependem
  dele (ver `Blocked by` nas issues).
- `cypress-axe`/`@axe-core/cypress` entra como dependência de dev aqui, mas só é
  usado no PRD `cypress-a11y-responsivo`.
