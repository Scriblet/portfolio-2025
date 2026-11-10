# Issue: Contato com Proposta de Valor: dados + cartões mantendo o formulário

Status: done

## Parent
PRD: `.scratch/04-secoes/contato-proposta-valor/PRD.md`

## What to build
Criar o módulo tipado `contactPropositions` com 3 propostas de valor e renderizá-las na seção `#contact`, mantendo integralmente o formulário atual (validação, honeypot, snackbar, analytics e envio). Os cartões podem aparecer acima ou ao lado do formulário.

## Acceptance criteria
- [ ] `src/data/contactPropositions.ts` exporta 3 propostas com título, descrição, benefício e CTA
- [ ] Tipo `ValueProposition` adicionado em `src/data/types.ts`
- [ ] Seção `#contact` exibe os 3 cartões de proposta
- [ ] Formulário continua funcionando com validação, envio, snackbar e analytics
- [ ] Texto das propostas presente no HTML inicial (SEO)
- [ ] Teste unitário valida quantidade e estrutura do módulo

## Blocked by
- `.scratch/04-secoes/selected-work/issues/01-dados-secao-base-remocao.md`
