# PRD — Contato funcional em produção

Status: ready-for-agent
Feature slug: `contato-producao`

## Problem Statement

Em produção o portfólio é servido como estático no GitHub Pages
(`Server: GitHub.com`) e `POST /api/contact` responde **404** — verificado no ar
em 2026-11-08. O endpoint só existe como Netlify Function
(`netlify/functions/contact.mjs`), ativa apenas no `netlify dev`. Consequência:
todo envio do formulário de contato (home e `/immersive`) falha com "Não foi
possível enviar" para qualquer visitante real — a feature mais importante de
conversão do portfólio está morta em produção. Além disso, o endpoint está
hardcoded como caminho relativo no cliente, sem forma de apontar para outro host.

## Solution

Preservar o contrato HTTP documentado em `docs/CONTACT-ENDPOINT.md` (validação
de payload, honeypot, rate limit 5 req/IP/min, webhook do Discord server-only)
e publicar a função em um host serverless que rode ao lado do GitHub Pages.
Tornar o endpoint do cliente configurável por variável de ambiente
(`VITE_CONTACT_ENDPOINT`, com fallback `/api/contact` para manter o
`netlify dev` inalterado), com CORS restrito à origem do portfólio.

Decisão recomendada: manter o GitHub Pages como site estático e publicar a
function como deployment só-de-functions na Netlify (reusando
`netlify/functions/contact.mjs` intacto), apontando `VITE_CONTACT_ENDPOINT`
para `https://<app>.netlify.app/api/contact`. Alternativas documentadas: porta
para Cloudflare Workers (mesma lógica baseada em fetch) ou migrar o deploy
completo para Netlify (contrato HTTP idêntico, muda a URL pública).

## User Stories

1. Como visitante, quero que o envio do formulário de contato funcione no site
   publicado, para que minha mensagem realmente chegue ao Lucas.
2. Como visitante, quero as mesmas mensagens de erro (validação, rate limit,
   offline) que existem hoje, para não ser surpreendido por falhas mudas.
3. Como mantenedor, quero o webhook do Discord fora do bundle e configurado
   só no servidor, para poder rotacionar o segredo sem rebuild.
4. Como mantenedor, quero poder trocar o host do endpoint por variável de
   ambiente, para não depender de um único provedor.
5. Como mantenedor, quero CORS restrito à origem do portfólio, para que o
   endpoint não seja usado como relay aberto.

## Implementation Decisions

- Seam principal: serviço/API — o contrato `POST /api/contact` de
  `docs/CONTACT-ENDPOINT.md` é a fonte de verdade e não muda (200/400/405/429/
  502/503, mesmos corpos JSON, `Cache-Control: no-store`).
- Seam secundário: componente — `contactForm.tsx` e
  `ImmersiveContactForm.tsx` passam a ler `import.meta.env.VITE_CONTACT_ENDPOINT`
  com fallback `/api/contact`; nenhuma mudança de UX.
- Publicação: deployment Netlify só-de-functions (ou Worker equivalente) com
  `DISCORD_WEBHOOK_URL` como env server-only; CORS
  (`Access-Control-Allow-Origin`) limitado à origem do portfólio + pré-flight.
- Verificação de produção inclui envio real (mensagem chega ao Discord) e
  checagem de que `grep -rn "discord.com/api/webhooks" src` continua vazio.

## Fora do escopo

- Redesign do formulário ou novos campos.
- Troca do destino das mensagens (Discord → e-mail, CRM etc.).
- Migração do site inteiro para outro provedor de estáticos.

## Dependências de outros PRDs

- Nenhuma. Este PRD pode começar imediatamente.
