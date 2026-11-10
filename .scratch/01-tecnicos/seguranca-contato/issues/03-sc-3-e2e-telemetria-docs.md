# Issue: Cobrir endpoint com E2E mockado, telemetria e docs de deploy

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/seguranca-contato/PRD.md`

## What to build
Teste ponta a ponta com o endpoint mockado (sem depender do serviço final em CI), evento de conversão emitido, ponto de inserção opcional para captcha definido, e guia reproduzível de deploy da função.

## Acceptance criteria
- [ ] E2E cobre sucesso (200), validação (400) e snackbar exibido, sem chamar o serviço de destino em CI
- [ ] Existe guarda que falha se o segredo voltar a aparecer no bundle do cliente
- [ ] Envio bem-sucedido emite evento de conversão para medição
- [ ] Guia de deploy da função está publicado e reproduzível do zero
- [ ] Hook opcional de captcha documentado, sem penalizar humanos no fluxo padrão

## Blocked by
- 02-sc-2-form-endpoint.md
