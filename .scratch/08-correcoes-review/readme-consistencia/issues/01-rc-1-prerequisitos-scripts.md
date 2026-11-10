# Issue: Pré-requisitos, scripts e variáveis de ambiente reais

Status: done

## Parent
PRD: `.scratch/08-correcoes-review/readme-consistencia/PRD.md`

## What to build
Corrigir a seção de instalação do README: Node ≥ 22.19 como pré-requisito,
lista de scripts exatamente igual ao `package.json` (remover `type-check`
inexistente; incluir `test:unit`, `dev:test`, `test:e2e*`, `preview`), e
`.env.example` alinhado (`DISCORD_WEBHOOK_URL` server-only; nenhuma variável
obsoleta tipo `VITE_DISCORD_WEBHOOK_URL`). Toda instrução testada como está.

## Acceptance criteria
- [ ] Versão de Node do README bate com `engines`/CI
- [ ] Nenhum comando citado que não exista no `package.json`
- [ ] Variáveis documentadas batem com `.env.example` real
- [ ] Cada instrução de instalação executada com sucesso durante a revisão

## Blocked by
- Nenhum: pode começar imediatamente
