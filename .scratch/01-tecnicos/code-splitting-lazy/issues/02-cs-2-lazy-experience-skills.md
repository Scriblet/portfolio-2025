# Issue — Adiar Experience/Skills com skeleton de altura preservada

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/code-splitting-lazy/PRD.md`

## What to build
Dobra inicial (apresentação + cabeçalho) carrega primeiro; Experience e Skills passam a ser carregadas sob demanda no scroll com skeleton da mesma altura (sem salto de layout), e imagens fora da dobra só carregam quando necessárias.

## Acceptance criteria
- [ ] Apresentação renderiza sem esperar as seções adiadas (tempo de dobra < 2s)
- [ ] Scroll disparando o carregamento de Experience/Skills exibe skeleton de altura preservada
- [ ] CLS < 0.1 durante o carregamento das seções adiadas
- [ ] Conteúdo continua indexável após o lazy (cabeçalho + estrutura presentes no DOM)
- [ ] Navegação por âncora até as seções adiadas funciona

## Blocked by
- 01-cs-1-vendor-baseline.md
