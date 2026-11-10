# Issue — Aceitação de produção do contato e docs operacionais

Status: ready-for-human

## Parent
PRD: `.scratch/08-correcoes-review/contato-producao/PRD.md`

## What to build
Fechar o ciclo em produção: configurar `VITE_CONTACT_ENDPOINT` no build
publicado, validar envio real a partir do site (mensagem chega ao Discord com
honeypot vazio), conferir os estados de erro (429/503) e atualizar
`docs/CONTACT-ENDPOINT.md` e `.env.example` com o host publicado e o fluxo de
rotação do webhook.

## Acceptance criteria
- [ ] Envio real pelo site publicado entrega a mensagem ao Discord
- [ ] Estados de erro do cliente batem com as respostas do servidor em produção
- [ ] Docs operacionais citam o endpoint publicado e a rotação do webhook
- [ ] Teste E2E de contato continua sem depender do Discord (intercept)

## Blocked by
- 01-cp-1-endpoint-configuravel.md
- 02-cp-2-funcao-producao.md

## Comments
- 2026-11-08: depende do deploy do CP-2 (credenciais). O código já cobre o resto:
  o workflow injeta `vars.VITE_CONTACT_ENDPOINT`, `docs/CONTACT-ENDPOINT.md` §6
  traz a verificação por curl (204 no preflight, 400 no POST vazio) e o E2E usa
  `cy.interceptContact` sem tocar no Discord.
