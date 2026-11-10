# PRD: Formulários de contato: validação, envio e feedback

Status: draft
Feature slug: `cypress-formularios-contato`
Onda: `07-testes-e2e`

## Problem Statement

O contato é a conversão do portfólio e tem a lógica mais rica do app: validação
client-side com 6 mensagens, honeypot anti-bot, POST para `/api/contact` (que em
dev nem existe sem `netlify dev`), rate limit 429, estados de sucesso/erro/offline,
snackbar com auto-hide e uma variante do formulário na `/immersive` com feedback
inline. Nada disso é testado; uma regressão na validação ou no feedback quebraria
silenciosamente o único caminho de contato.

## Solution

Specs dedicados cobrindo os dois formulários (home e `/immersive`): labels e
campos, todas as mensagens de validação (vazio, email inválido, limites de
caractere), limpeza do erro ao digitar, honeypot oculto e ignorado, envio com
`cy.intercept` para sucesso (200 `{ok:true}`), rate limit (429), falha (500/502)
e rede offline, feedback correto em cada caso (snackbar no form principal,
mensagem inline no imersivo), botão de envio desabilitado com "Enviando..."
durante o POST e reset do form após sucesso.

## User Stories

1. Como visitante, quero saber exatamente o que corrigir quando envio o form
   incompleto, com mensagens claras em cada campo.
2. Como visitante, quero que erros desapareçam quando começo a corrigir o campo,
   para não ficar lendo avisos antigos.
3. Como visitante, quero enviar a mensagem e ver confirmação ("Mensagem enviada"),
   para ter certeza de que chegou.
4. Como visitante, quero receber um aviso claro se estiver offline, em vez de
   perder o que escrevi sem explicação.
5. Como visitante que tentou demais, quero entender o limite de tentativas
   ("Muitas tentativas...") e poder tentar de novo mais tarde.
6. Como visitante, quero que o botão fique indisponível enquanto envia, para não
   disparar mensagens duplicadas.
7. Como visitante, quero que o formulário limpe os campos após o envio, para
   começar outra mensagem do zero.
8. Como visitante na `/immersive`, quero o mesmo padrão de validação e feedback
   no form daquela página, com o aviso de erro aparecendo no próprio formulário.
9. Como visitante, quero que o campo oculto anti-bot não interfira nem apareça
   para mim nem para leitores de tela.
10. Como mantenedor, quero o endpoint sempre mockado nos testes, para não depender
    do webhook do Discord nem de `netlify dev` no CI.

## Implementation Decisions

- Specs: `cypress/e2e/form-contato-validacao.cy.ts`, `form-contato-envio.cy.ts`,
  `form-imersivo.cy.ts`, `form-contato-estados-limite.cy.ts`.
- `cy.interceptContact()` (do PRD de infra) faz stub de `POST /api/contact`;
  cada teste escolhe `{ statusCode, body }` e consulta `@postContact` para
  assertar o payload `{name, email, message, website}`.
- Matriz de feedback (form principal, via snackbar):
  - `200 {ok:true}` → `snackbar-success` com "Mensagem enviada"; form limpo.
  - `429` → `snackbar-warning` "Muitas tentativas...".
  - `500`/`502`/`503` → `snackbar-error` "Não foi possível enviar...".
  - rede cai (`cy.intercept` com `forceNetworkError` ou stub de `navigator.onLine`)
    → `snackbar-warning` "Você está offline...".
- Matriz de feedback (form imersivo, inline): `formSuccess` "Mensagem enviada.
  Responderei em breve."; `formError` com o texto correspondente (429 / erro /
  conexão). Assertar via `#immersive-contact-form` + seletores de erro já
  existentes (`#immersive-*-error`).
- Validação: cobrir as 6 mensagens exatas (empty/limite de nome, email vazio/
  inválido, mensagem vazia/limite de 2000), `aria-invalid="true"` e
  `aria-describedby` apontando para o span de erro.
- Honeypot: `#contact-website` existe mas está oculto (`aria-hidden`, tabIndex
  -1); preenchê-lo programaticamente e confirmar que o app envia com ele e que o
  contrato com o servidor o descarta (documentado; a rejeição real é da function).
- Estado pending: intercept com `delay` e assertar `disabled` + `aria-disabled`
  no botão e texto "Enviando...".
- Snackbar: fechar com Escape e com o botão "Fechar"; confirmar que clickaway não
  fecha (comportamento atual). Auto-hide (4–7 s) validado com relógio
  (`cy.clock`) para não alongar o runtime.

## Testing Decisions

- Comportamental: o que o visitante vê e faz; nunca assertar classes do MUI
  (`.MuiAlert-*`): usar `snackbar-*` e roles/labels.
- Payload enviado é contrato público do form → assertar chaves e tipos em
  `@postContact`, sem depender do servidor.
- Um teste por estado de feedback (é onde regressões custam caro) e um por
  mensagem de validação.
- Não testar a Netlify Function (validação server-side, rate limit real, webhook):
  é unidade dela, coberta por `docs/CONTACT-ENDPOINT.md` e por teste manual.

## Out of Scope

- Backend (`netlify/functions/contact.mjs`), webhook Discord, captcha.
- Envio real para o serviço (nunca em CI).
- Novos campos/fluxos de contato (propostas, assunto etc.).
- Corrigir comportamentos de produto fora do form (links sociais vazios etc.).

## Further Notes

- Dependências: PRD `cypress-infraestrutura` (principalmente `interceptContact`).
- `npm run dev` (Vite puro) não serve `/api/contact`, sem intercept o form cai
  no catch "Não foi possível enviar..."; os specs não devem nunca deixar o POST
  real passar.
- O auto-hide da snackbar e o timeout de 2500 ms do feedback de download são os
  únicos timers relevantes: usar `cy.clock`/`cy.tick`.
