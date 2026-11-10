# Issue: Specs do formulário de contato

Status: done

## Parent
PRD: `.scratch/08-correcoes-review/e2e-cobertura-critica/PRD.md`
Implementa (issues equivalentes): `.scratch/07-testes-e2e/cypress-formularios-contato/`

## What to build
Cobrir o fluxo do formulário na home e na `/immersive`: validação dos 3 campos
com as mensagens esperadas, honeypot, envio com `interceptContact` (sucesso,
429 e falha de rede), snackbar de feedback e estado offline. Nunca depende do
Discord nem de `netlify dev`. Critérios detalhados nos issues `01-fc-1` a
`04-fc-4` da onda 7.

## Acceptance criteria
- [ ] Validação coberta nos 3 campos, nos dois formulários
- [ ] Envio stubado cobre sucesso, 429 e falha com as mensagens esperadas
- [ ] Honeypot e estado offline cobertos
- [ ] Specs verdes em `npm run test:e2e:preview`

## Blocked by
- Nenhum: pode começar imediatamente
