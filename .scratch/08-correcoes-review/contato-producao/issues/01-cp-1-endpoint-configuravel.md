# Issue — Endpoint de contato configurável por ambiente

Status: done

## Parent
PRD: `.scratch/08-correcoes-review/contato-producao/PRD.md`

## What to build
Os dois formulários (`contactForm.tsx` e `ImmersiveContactForm.tsx`) passam a
enviar para `import.meta.env.VITE_CONTACT_ENDPOINT` com fallback
`/api/contact`, preservando o contrato HTTP atual (payload com honeypot,
respostas 200/400/429/5xx e as mesmas mensagens de UX). Coberto por teste
unitário do módulo que resolve o endpoint.

## Acceptance criteria
- [ ] Envio usa `VITE_CONTACT_ENDPOINT` quando definida e `/api/contact` caso contrário
- [ ] Contrato e mensagens de feedback inalterados (sucesso, validação, 429, offline, erro)
- [ ] `.env.example` documenta a variável, sem segredos
- [ ] Teste unitário cobre a resolução do endpoint

## Blocked by
- Nenhum — pode começar imediatamente
