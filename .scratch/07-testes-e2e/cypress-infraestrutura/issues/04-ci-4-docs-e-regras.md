# Issue — Documentação das regras de E2E e limpeza dos resíduos da suíte antiga

Status: ready-for-agent

## Parent
PRD: `.scratch/07-testes-e2e/cypress-infraestrutura/PRD.md`

## What to build
Atualizar `docs/agents/testing.md` (Playwright → Cypress, mantendo a regra de ouro:
E2E fora do loop de dev, local = 1 spec por vez, suíte completa = CI) e o trecho
de testes do AGENTS.md. Atualizar `docs/CONTACT-ENDPOINT.md` (que ainda cita
`tests/contact.spec.ts` + Playwright) para o novo caminho dos specs. Remover
`test-results/.last-run.json` e o diretório `tests/` vazio (ou reposicioná-los
no `.gitignore`).

## Acceptance criteria
- [ ] `docs/agents/testing.md` descreve Cypress como runner E2E com os scripts novos e as regras de execução
- [ ] AGENTS.md menciona `test:unit` como padrão e `test:e2e` como opt-in (1 spec por vez localmente)
- [ ] `docs/CONTACT-ENDPOINT.md` referencia o spec Cypress correto (ou instrução equivalente)
- [ ] Resíduos da suíte Playwright antiga removidos do repositório
- [ ] Nenhuma referência restante a `npx playwright test` no repo (grep limpo)

## Blocked by
- 01-ci-1-setup-cypress.md
