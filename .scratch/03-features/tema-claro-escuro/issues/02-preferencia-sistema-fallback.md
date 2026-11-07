# Issue — Preferência do sistema e fallback de armazenamento

Status: ready-for-agent

## Parent
PRD: `.scratch/03-features/tema-claro-escuro/PRD.md`

## What to build
Leitura inicial via prefers-color-scheme quando não há escolha salva, com fallback silencioso para tema escuro quando o armazenamento falha.

## Acceptance criteria
- [ ] Primeira visita sem escolha salva segue a preferência do sistema
- [ ] Com escolha salva, ela tem prioridade sobre a preferência do sistema
- [ ] Storage indisponível não quebra a página (fallback silencioso)
- [ ] Remover a escolha salva restaura o comportamento do sistema

## Blocked by
- `.scratch/03-features/tema-claro-escuro/issues/01-toggle-header-tema-reativo.md`
