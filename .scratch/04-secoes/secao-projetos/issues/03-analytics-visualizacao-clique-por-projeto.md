# Issue — Analytics de visualização e clique por projeto

Status: ready-for-agent

## Parent
PRD: `.scratch/04-secoes/secao-projetos/PRD.md`

## What to build
Emissão de eventos de analytics para view da seção e cliques em demo/repositório com identificador do projeto e tipo de destino.

## Acceptance criteria
- [ ] Evento de view da seção dispara ao entrar no viewport
- [ ] Clique em demo emite evento com id do projeto e destino=demo
- [ ] Clique em repositório emite evento com id do projeto e destino=repo
- [ ] Teste E2E confirma eventos sem depender de rede externa

## Blocked by
- `.scratch/04-secoes/secao-projetos/issues/02-grid-curado-3-6-projetos-responsividade-motion.md`
