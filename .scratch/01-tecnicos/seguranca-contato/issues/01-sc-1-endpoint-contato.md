# Issue — Criar endpoint server-side de contato com validação e rate limit

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/seguranca-contato/PRD.md`

## What to build
Função server-side que recebe o payload do formulário, valida email/mensagem, aplica rate limit por IP, bloqueia payloads malformados e envia ao destino final usando segredo apenas no servidor — nenhum segredo no bundle do cliente.

## Acceptance criteria
- [ ] `POST /api/contact` com payload válido retorna 200 e entrega a mensagem ao destino final
- [ ] Payload malformado (sem email/mensagem válida) retorna 400 com shape de erro estável
- [ ] Flood a partir do mesmo IP é barrado com 429 + `Retry-After`
- [ ] Destino/segredo configurado apenas via variável de ambiente no servidor; bundle do cliente não contém o webhook
- [ ] Logs server-side não registram dados sensíveis; setup documentado em `.env.example`

## Blocked by
- None - can start immediately
