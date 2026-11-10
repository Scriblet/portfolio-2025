# Issue — Orçamento de imagens com verificação anti-regressão

Status: done

## Parent
PRD: `.scratch/08-correcoes-review/otimizacao-imagens/PRD.md`

## What to build
Tabela de orçamento de peso por imagem versionada no repo e verificação
automática (script de build ou teste de unidade) que falha quando um asset de
`src/img`/`public` passa do peso orçado. Inclui conferir os assets de `public/`
(`og-preview.jpg` 1200×630 etc.) e documentar a execução no pipeline.

## Acceptance criteria
- [ ] Orçamentos documentados por imagem (hero, filosofia, og, ícones PWA)
- [ ] Verificação automatizada falha build/teste com asset acima do orçamento
- [ ] Execução integrada ao loop (script citado no README/CI)

## Blocked by
- 01-oi-1-hero-formatos.md
- 02-oi-2-filosofia-lazy.md
