# Issue: Analytics e reforço em Contact

Status: ready-for-agent

## Parent
PRD: `.scratch/03-features/download-cv/PRD.md`

## What to build
Reuso do componente de botão em Contact e disparo do evento de analytics já existente no serviço de analítica ao baixar.

## Acceptance criteria
- [ ] Cada download registra o evento de analytics preexistente, sem dados pessoais
- [ ] Botão de reforço em Contact reutiliza o mesmo componente e comportamento
- [ ] Testes validam rótulo, destino do link e disparo do evento sem baixar o arquivo real

## Blocked by
- `.scratch/03-features/download-cv/issues/01-botao-download-asset-estatico.md`
