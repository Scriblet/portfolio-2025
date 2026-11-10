# PRD: PWA e offline: conteúdo em cache, OfflineNotice e instalação

Status: draft
Feature slug: `cypress-pwa-offline`
Onda: `07-testes-e2e`

## Problem Statement

O portfólio é um PWA com service worker (precachê do shell, do CV em PDF e das
imagens), aviso de offline com recarga e botão de instalação. Nada disso é
testado: o service worker só existe no build de produção, e uma regressão no
`navigateFallback`, no cache ou no `OfflineNotice` faria o visitante offline ver
uma página em branco: exatamente o cenário que motivou o PWA.

## Solution

Specs de PWA rodando contra **build + preview** (onde o service worker ativa),
cobrindo: primeira visita + segunda visita (conteúdo servido do cache), fallback
de navegação offline (home e rota desconhecida), `OfflineNotice` (aparece ao
ficar offline, some ao voltar, botão "Tentar novamente" recarrega), e
`InstallButton` (aparece quando o navegador dispara `beforeinstallprompt` e some
em `display-mode: standalone`). Todos os cenários de rede são simulados no
Cypress (intercepts e eventos `offline`/`online`), sem depender da conexão real.

## User Stories

1. Como visitante em conexão instável, quero que o site carregue mesmo sem rede
   após a primeira visita, para ver experiência, skills e contato.
2. Como visitante que cai offline no meio da navegação, quero ver um aviso claro
   ("Você está offline..."), para entender o que aconteceu.
3. Como visitante offline, quero tentar recarregar com um botão, para retomar
   quando a rede voltar.
4. Como visitante que voltou online, quero que o aviso desapareça sozinho, para
   não ficar com banner obsoleto.
5. Como visitante em Android/desktop Chrome, quero ver a opção de instalar o
   portfólio como app, para acessá-lo pela tela inicial.
6. Como visitante com o site já instalado, quero não ver mais o botão de
   instalação, para não ser incomodado.
7. Como visitante em navegador sem suporte a instalação, quero que nada quebre
   nem apareça botão inútil, para ter a mesma experiência de hoje.
8. Como mantenedor, quero validar o PWA em CI (build + preview) a cada release,
   para não publicar regressão de offline.
9. Como mantenedor, quero que o `/api/` continue fora do fallback de navegação
   (denylist do SW), para que chamadas de rede não virem HTML.
10. Como mantenedor, quero o CV em PDF disponível mesmo offline, para o download
    não depender de rede.

## Implementation Decisions

- Specs: `cypress/e2e/pwa-offline.cy.ts`, `pwa-cache.cy.ts`, `pwa-installacao.cy.ts`
  (agrupáveis; a separação ajuda a rodar 1 spec por vez).
- **Servidor**: specs rodam contra `vite preview` (porta 4173) de um build com
  `VITE_BASE_PATH` do ambiente; o service worker só ativa aí (`devOptions.enabled:
  false`). Workflow: `npm run build` → preview → specs.
- Simulação de offline:
  - Para o app "sentir": despachar eventos `offline`/`online` na `window`
    (`cy.window().then(win => win.dispatchEvent(new Event('offline')))`),
    cobrindo `useOnlineStatus`/`OfflineNotice`.
  - Para rede falhar de verdade nos requests: `cy.intercept` com
    `forceNetworkError` nas navegações e assets, cobrindo o fallback do SW.
  - Para validar cache: visita → segunda visita com rede bloqueada → conteúdo
    principal (`presentation-section`) ainda renderiza.
- `OfflineNotice`: assertar `offline-notice` com `role="status"`, texto de offline,
  botão "Tentar novamente" dispara `location.reload()` (stub/spy para não perder o
  contexto do teste).
- `InstallButton`: disparar evento sintético `beforeinstallprompt` (com
  `prompt()`/`userChoice` stubados) e assertar `install-button`; simular
  `display-mode: standalone` (`window.matchMedia`) e confirmar que some.
- CV offline: `cy.request` no PDF após visita cacheada (precachê do Workbox).
- Navegação desconhecida offline: a URL deve servir o shell (fallback do SW);
  o app renderiza a home (sem 404 custom).

## Testing Decisions

- É a única área em que o runtime é determinístico apenas no build, os specs
  devem falhar claro se rodarem contra dev (validar `navigator.serviceWorker`
  presente e marcar `this.skip()` com mensagem explícita se não houver SW).
- Assertar comportamento visitante (conteúdo acessível offline), não chaves de
  cache do Workbox (internas, mudam por build).
- Evitar dependência de timing do SW: aguardar `navigator.serviceWorker.ready`
  e usar retries do Cypress.
- Rodar em CI com Chromium; sem vídeo, screenshots em falha.

## Out of Scope

- Push notifications, background sync, fila offline do formulário.
- Ciclo completo de atualização de SW (`skipWaiting`/`clientsClaim`), inspecionado
  manualmente/por build.
- Auditoria Lighthouse (instalabilidade/perf): fica em issue de docs/manual.
- iOS/Safari (instalação limitada; degradação esperada é não mostrar o botão).

## Further Notes

- Dependências: PRD `cypress-infraestrutura` (necessário o modo preview/CI).
- Risco: timing do registro do SW em CI: mitigado com `serviceWorker.ready` e
  retries; se persistir, isolar em `before` com uma visita de aquecimento.
- `navigateFallback` tem denylist `/\/api\//`: um spec deve confirmar que
  `/api/contact` não devolve HTML do shell (intercept `forceNetworkError` e
  assertar que não houve render de app nessa rota).
