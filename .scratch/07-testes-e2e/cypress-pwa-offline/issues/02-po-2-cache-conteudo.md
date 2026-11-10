# Issue: Conteúdo em cache e fallback de navegação offline

Status: done

## Parent
PRD: `.scratch/07-testes-e2e/cypress-pwa-offline/PRD.md`

## What to build
Specs de cache: após uma visita inicial, simular rede indisponível
(`forceNetworkError`) e confirmar que a home e o conteúdo principal
(`presentation-section`, seções lazy) ainda renderizam via cache; rota desconhecida
offline serve o shell do SPA (fallback do SW) e renderiza a home; o CV em PDF
responde do precachê; `/api/contact` **não** devolve HTML do shell (denylist
`/\/api\//`).

## Acceptance criteria
- [ ] Segunda visita offline renderiza hero e seções principais
- [ ] Rota desconhecida offline renderiza a home (sem tela em branco)
- [ ] `cv/lucas-nonato-cv.pdf` acessível com rede bloqueada (precachê)
- [ ] `/api/contact` offline não devolve o shell HTML (navegação para a rota não renderiza o app)
- [ ] Testes aguardam `navigator.serviceWorker.ready` antes de simular a queda

## Blocked by
- 01-po-1-offline-notice.md
