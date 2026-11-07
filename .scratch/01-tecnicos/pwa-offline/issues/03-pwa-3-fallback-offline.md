# Issue — Exibir fallback offline acessível com nova tentativa

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/pwa-offline/PRD.md`

## What to build
Visitante que cai para offline sem o conteúdo em cache vê mensagem clara com botão de nova tentativa — anunciada por leitor de tela, respeitando movimento reduzido e com alvos de toque generosos — em vez de página em branco.

## Acceptance criteria
- [ ] Offline sem conteúdo em cache exibe mensagem clara + botão de nova tentativa
- [ ] Fallback anunciado de forma acessível (papel de alerta/status, foco ordenado)
- [ ] Animação/transição do fallback respeita `prefers-reduced-motion`
- [ ] Elementos legíveis e tocáveis em telas pequenas

## Blocked by
- 02-pwa-2-service-worker-cache.md
