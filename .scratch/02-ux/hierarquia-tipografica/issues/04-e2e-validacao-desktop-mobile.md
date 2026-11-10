# Issue: Verificação E2E e validação desktop/mobile sem regressão

Status: ready-for-agent

## Parent
PRD: `.scratch/02-ux/hierarquia-tipografica/PRD.md`

## What to build
Estender os testes E2E existentes com asserções de headings e ausência do título vazio, mantendo os identificadores atuais, e validar manualmente em desktop e viewport mobile.

## Acceptance criteria
- [ ] Em E2E automatizado: unicidade do título principal e ordem de headings verificadas
- [ ] Em E2E automatizado: o elemento de título vazio na Experience não aparece
- [ ] Nenhum teste E2E pré-existente falha por mudança de texto ou estrutura
- [ ] Identificadores atuais dos componentes são preservados (testes e analytics não quebram)
- [ ] Verificação manual em desktop e mobile confirma hierarquia legível em ambos, incluindo impressão/PDF

## Blocked by
- `.scratch/02-ux/hierarquia-tipografica/issues/01-escala-tipografica-central-responsiva.md`
- `.scratch/02-ux/hierarquia-tipografica/issues/02-remocao-titulo-vazio-experience.md`
- `.scratch/02-ux/hierarquia-tipografica/issues/03-contraste-textos-secundarios-headings.md`
