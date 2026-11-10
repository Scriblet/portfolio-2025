# Issue — Envio, payload e feedback via snackbar

Status: done

## Parent
PRD: `.scratch/07-testes-e2e/cypress-formularios-contato/PRD.md`

## What to build
Spec do envio do form principal com `cy.interceptContact`: payload
`{name, email, message, website}` enviado corretamente; sucesso (`200 {ok:true}`)
mostra `snackbar-success` ("Mensagem enviada") e limpa o form; falha (500/502)
mostra `snackbar-error`; durante o POST o botão fica `disabled`/`aria-disabled`
com texto "Enviando..."; snackbar fecha com Escape e com o botão "Fechar", e
clickaway não fecha (comportamento atual); auto-hide validado com `cy.clock`.

## Acceptance criteria
- [ ] Payload assertado em `@postContact` (chaves e tipos)
- [ ] Sucesso: `snackbar-success` visível + form limpo após envio
- [ ] Falha: `snackbar-error` com a mensagem correta
- [ ] Estado pending: botão desabilitado e "Enviando..." enquanto o POST não resolve
- [ ] Fechar por Escape e por botão; clickaway não fecha; auto-hide via `cy.clock`/`cy.tick`

## Blocked by
- 01-fc-1-validacao-campos.md
