# Issue — Smoke da home e rotas (/, /immersive, catch-all, /roadmap)

Status: ready-for-agent

## Parent
PRD: `.scratch/07-testes-e2e/cypress-smoke-navegacao/PRD.md`

## What to build
Specs de smoke: a home carrega com hero (`presentation-section`, `presentation-name`),
seções principais presentes após lazy load e título do documento correto; `/immersive`
renderiza `immersive-page`, muda `document.title` e injeta `robots noindex`; URL
desconhecida renderiza a home (catch-all, sem página 404); `/roadmap` em build de
produção cai na home (sem `roadmap-page`).

## Acceptance criteria
- [ ] Smoke da home passa headless e identifica as 8 seções principais (hero, experience, jornada, filosofia, skills, github, contact, footer) após `waitForSection`
- [ ] `/immersive` valida `immersive-page`, title e meta robots
- [ ] URL desconhecida (ex.: `/rota-inexistente`) renderiza `presentation-section`
- [ ] Em build/preview, `/roadmap` não renderiza `roadmap-page` e mostra a home
- [ ] Nenhum `cy.wait` fixo no spec

## Blocked by
- 02-ci-2-comandos-servidor.md
