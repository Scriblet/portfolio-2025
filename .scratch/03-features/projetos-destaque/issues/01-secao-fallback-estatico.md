# Issue — Seção de projetos com fallback estático no lugar do banner

Status: ready-for-agent

## Parent
PRD: `.scratch/03-features/projetos-destaque/PRD.md`

## What to build
Nova seção Projects intercalada na ordem das seções, substituindo o banner genérico, renderizando cards básicos (nome, descrição, link externo) a partir de lista estática inicial configurável sem mudar código.

## Acceptance criteria
- [ ] Seção visível entre Skills e Contact com cards mostrando nome, descrição e link para o repo/demonstração
- [ ] Clicar no card/link abre o destino em nova janela sem perder o portfólio
- [ ] Lista de destaques é configurável pelo mantenedor sem alterar o contrato de dados
- [ ] Seção carrega sem bloquear o restante da página

## Blocked by
- `.scratch/01-tecnicos/dados-centralizados/issues/01-fundacao-dados-centralizados.md` — consuma o contrato centralizado e não duplique src/data com lista estática local.
