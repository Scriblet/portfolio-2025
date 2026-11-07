# Issue — Integração com GitHub API + cache silencioso

Status: ready-for-agent

## Parent
PRD: `.scratch/03-features/projetos-destaque/PRD.md`

## What to build
Serviço GitHub consumindo a API pública com cache em memória + persistência com expiração; em falha/rate limit, retorna o fallback estático silenciosamente.

## Acceptance criteria
- [ ] Projetos reais são carregados da API com ordenação/atualização preservadas
- [ ] Cache evita requisições repetidas e expira conforme TTL configurado
- [ ] Se a API falhar, a seção exibe o fallback sem mensagem de erro técnica ao visitante
- [ ] Nenhum teste depende da rede real do GitHub (mock/intercept)

## Blocked by
- `.scratch/03-features/projetos-destaque/issues/01-secao-fallback-estatico.md`
