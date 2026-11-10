# Issue: Specs de conteúdo das seções

Status: done

## Parent
PRD: `.scratch/08-correcoes-review/e2e-cobertura-critica/PRD.md`
Implementa (issues equivalentes): `.scratch/07-testes-e2e/cypress-secoes-conteudo/`

## What to build
Cobrir o renderizado e os links das seções: Experiência, Jornada, Skills,
Filosofia, GitHub e Footer: dados reais visíveis (não só containers), links
externos com `target="_blank"` + `rel="noopener noreferrer"` e âncoras do
footer navegando. Critérios detalhados nos issues `01-ct-1` a `03-ct-3` da
onda 7.

## Acceptance criteria
- [ ] Cada seção validada por conteúdo visível, não só existência de container
- [ ] Links externos íntegros (target/rel) e âncoras do footer funcionais
- [ ] Specs verdes em `npm run test:e2e:preview`

## Blocked by
- Nenhum: pode começar imediatamente
