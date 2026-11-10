# Issue: Função /api/contact publicada em produção com CORS restrito

Status: ready-for-human

## Parent
PRD: `.scratch/08-correcoes-review/contato-producao/PRD.md`

## What to build
Publicar a função de contato em um host serverless que responda em produção
(deployment Netlify só-de-functions reusando `netlify/functions/contact.mjs`,
ou porta equivalente para Cloudflare Workers), com `DISCORD_WEBHOOK_URL` como
env server-only e CORS restrito à origem do portfólio. O contrato de
`docs/CONTACT-ENDPOINT.md` (200/400/405/429/502/503) continua sendo a fonte de
verdade.

## Acceptance criteria
- [ ] `POST /api/contact` público responde com o contrato documentado (verificado por curl)
- [ ] Rate limit 5 req/IP/min e honeypot continuam ativos
- [ ] `DISCORD_WEBHOOK_URL` configurada apenas no servidor; `grep -rn "discord.com/api/webhooks" src` vazio
- [ ] CORS permite apenas a origem do portfólio, com pré-flight

## Blocked by
- Nenhum: pode começar imediatamente

## Comments
- 2026-11-08: parte de código pronta e verificada: `json()`/`corsHeaders()` com
  origem restrita, `CONTACT_ALLOWED_ORIGINS`, preflight `OPTIONS` 204 e
  `Allow: POST, OPTIONS`; contrato e deploy das functions documentados em
  `docs/CONTACT-ENDPOINT.md` §6. Falta o deploy externo (Netlify + segredo
  `DISCORD_WEBHOOK_URL`), que exige credenciais: segue com humano.
