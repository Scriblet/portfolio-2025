# Issue — Node 22 em todas as superfícies de build

Status: done

## Parent
PRD: `.scratch/08-correcoes-review/ci-node-22/PRD.md`

## What to build
Unificar a versão de Node em 22 em tudo que compila, testa e publica o projeto:
`deploy.yml` (GitHub Pages), `netlify.toml` (functions), `package.json`
(`engines`) e um `.nvmrc` novo. A versão mínima reflete o exigido pelo jsdom 31
(≥ 22.19). Verificação: `npm ci && npm run lint && npm run test:unit &&
npm run build` passa em Node 22 local e os dois workflows declaram a mesma
versão.

## Acceptance criteria
- [ ] `deploy.yml` e `netlify.toml` usam Node 22
- [ ] `engines.node` em `package.json` e `.nvmrc` declaram a versão mínima (≥ 22.19)
- [ ] `ci.yml` e `deploy.yml` declaram a mesma versão de Node
- [ ] Lint, testes unitários e build passam em Node 22

## Blocked by
- Nenhum — pode começar imediatamente
