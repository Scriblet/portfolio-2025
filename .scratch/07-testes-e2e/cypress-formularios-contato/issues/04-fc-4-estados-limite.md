# Issue — Estados limite: rate limit 429, offline e feedback de download do CV

Status: ready-for-agent

## Parent
PRD: `.scratch/07-testes-e2e/cypress-formularios-contato/PRD.md`

## What to build
Spec dos estados limite: `429` do endpoint → `snackbar-warning` "Muitas
tentativas. Aguarde um minuto e tente novamente."; navegador offline (stub de
`navigator.onLine`/evento) → `snackbar-warning` "Você está offline. Verifique a
conexão e tente novamente."; falha de rede no POST (intercept `forceNetworkError`)
→ `snackbar-error`; e o feedback temporário do botão de download do CV
(`download-cv-feedback-{presentation,contact}` "Download iniciado" por 2500 ms,
`role="status"`).

## Acceptance criteria
- [ ] 429 dispara o snackbar de warning com o texto correto
- [ ] Offline dispara o snackbar de offline sem perder o conteúdo do form
- [ ] Erro de rede no POST dispara o snackbar de error
- [ ] Download do CV mostra o feedback `role="status"` por ~2500 ms (via `cy.clock`) e depois desaparece
- [ ] Os dois locais do botão (`presentation` e `contact`) são cobertos

## Blocked by
- 02-fc-2-submit-snackbar.md
