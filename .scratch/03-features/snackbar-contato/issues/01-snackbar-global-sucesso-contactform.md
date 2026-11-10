# Issue: Sistema global de snackbar + sucesso do ContactForm

Status: ready-for-agent

## Parent
PRD: `.scratch/03-features/snackbar-contato/PRD.md`

## What to build
Provedor global com contrato de notificação (severidade, título, mensagem, auto-dismiss) e integração do ContactForm para exibir sucesso após envio, mantendo loading/disabled do formulário.

## Acceptance criteria
- [ ] Após envio com sucesso, snackbar de confirmação aparece claramente sem depender do Alert estático
- [ ] Snackbar fecha manualmente e desaparece automaticamente após tempo razoável
- [ ] Provedor global permite disparar notificações de qualquer seção futura sem duplicar componentes
- [ ] Loading e validação do formulário continuam funcionais durante o envio

## Blocked by
- None - can start immediately
