# Issue: Footer: sociais, âncoras e comportamento documentado dos links vazios

Status: done

## Parent
PRD: `.scratch/07-testes-e2e/cypress-secoes-conteudo/PRD.md`

## What to build
Spec do footer: links sociais do GitHub e LinkedIn com URL válida, target `_blank`
e `rel="noopener noreferrer"`; nav do rodapé (Home, Experiência, Jornada,
Habilidades, Contato) rolando até as seções; fine print com ano corrente.
Registrar explicitamente que Instagram e Twitter hoje têm `href=""` (bug conhecido,
comentado no spec) para o teste não dar falso-positivo nem falso-negativo quando
isso mudar.

## Acceptance criteria
- [ ] Sociais do GitHub/LinkedIn seguem o contrato externo seguro
- [ ] Comportamento atual (`href=""`) de Instagram/Twitter é assertado e comentado como bug conhecido
- [ ] Âncoras do footer navegando corretamente (mesma regra de offset do header)
- [ ] Ano do copyright é o ano corrente (dinâmico, não literal fixo)
- [ ] Nenhuma classe CSS module usada como seletor

## Blocked by
- 02-ci-2-comandos-servidor.md
