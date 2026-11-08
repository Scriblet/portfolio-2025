# Issue — Pipeline de CI com a suíte E2E e artefatos de falha

Status: done

## Parent
PRD: `.scratch/07-testes-e2e/cypress-infraestrutura/PRD.md`

## What to build
Job de E2E no GitHub Actions (`.github/workflows/ci.yml` ou `e2e.yml`) usando
`cypress-io/github-action`: `npm ci`, lint/test:unit/build inalterados, build do
app (com `VITE_BASE_PATH` do ambiente) + `vite preview`, execução da suíte
Cypress em headless e upload de `cypress/screenshots`/`cypress/videos` como
artefatos quando houver falha. Concurrency cancelando execuções obsoletas.

## Acceptance criteria
- [ ] Job `e2e` roda em push/PR para `main` e não bloqueia o deploy além do esperado
- [ ] Cache do binário do Cypress (`~/.cache/Cypress`) configurado
- [ ] Artefatos de screenshots/vídeos anexados em falha
- [ ] Falha no E2E faz o check do PR falhar (não é `continue-on-error`)
- [ ] Runtime do job documentado (alvo: < 10 min) e specs críticos primeiro

## Blocked by
- 01-ci-1-setup-cypress.md
- 02-ci-2-comandos-servidor.md
