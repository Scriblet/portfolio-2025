# Issue: Fila/dedup + analytics + remoção do Alert

Status: ready-for-agent

## Parent
PRD: `.scratch/03-features/snackbar-contato/PRD.md`

## What to build
Fila simples FIFO ou dedup de mensagens concorrentes, eventos de analytics por severidade/contexto e remoção do feedback estático antigo após paridade.

## Acceptance criteria
- [ ] Envíos consecutivos não empilham notificações sem controle (fila ou dedup)
- [ ] Exibição registra severidade e contexto de origem via analytics, sem dados pessoais
- [ ] Alert estático do formulário é removido após paridade visual e de acessibilidade
- [ ] Snackbar aberto não cria armadilha de foco nem impede navegação

## Blocked by
- `.scratch/03-features/snackbar-contato/issues/01-snackbar-global-sucesso-contactform.md`
