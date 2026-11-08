# Issue — Selected Work: âncoras antigas + header

Status: ready-for-agent

## Parent
PRD: `.scratch/04-secoes/selected-work/PRD.md`

## What to build
Garantir que as âncoras antigas `#experience` e `#jornada` não quebrem após a remoção das seções, redirecionando suavemente para `#selected-work`. Atualizar o menu do Header para apontar para a nova seção.

## Acceptance criteria
- [ ] Links antigos para `#experience` e `#jornada` levam a `#selected-work` (fallback ou scroll suave)
- [ ] Item no menu do Header linka para `#selected-work` e a âncora posiciona no título
- [ ] Nenhum link morto ou âncora órfã permanece no site
- [ ] Teste valida o fallback das âncoras antigas

## Blocked by
- `.scratch/04-secoes/selected-work/issues/01-dados-secao-base-remocao.md`
