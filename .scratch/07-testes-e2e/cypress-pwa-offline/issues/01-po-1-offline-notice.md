# Issue — OfflineNotice: aviso, recarga e volta online

Status: ready-for-agent

## Parent
PRD: `.scratch/07-testes-e2e/cypress-pwa-offline/PRD.md`

## What to build
Spec do `OfflineNotice` rodando contra `vite preview` (SW ativo): disparar evento
`offline` mostra `offline-notice` com `role="status"` e o texto de offline; botão
"Tentar novamente" dispara `location.reload()` (com spy); evento `online` some o
aviso. Garantir que o spec falhe com mensagem clara (skip explícito) se rodar em
ambiente sem service worker.

## Acceptance criteria
- [ ] `offline-notice` aparece ao disparar `offline` e desaparece ao disparar `online`
- [ ] Texto "Você está offline. O conteúdo em cache continua disponível." assertado
- [ ] "Tentar novamente" chama `reload` (spy)
- [ ] Spec detecta ausência de `navigator.serviceWorker` e marca `skip` com mensagem
- [ ] Roda contra preview/build, não contra dev

## Blocked by
- 02-ci-2-comandos-servidor.md
