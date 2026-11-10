# Issue — Hero em AVIF/WebP com srcset e orçamento de peso

Status: done

## Parent
PRD: `.scratch/08-correcoes-review/otimizacao-imagens/PRD.md`

## What to build
Exportar o retrato do hero (`src/img/retrato-hero.jpg`, hoje 294 KB) em
AVIF/WebP/JPEG e renderizá-lo via `<picture>` com `srcset`/`sizes` por viewport,
`width`/`height` declarados para zerar CLS e prioridade de carregamento coerente
com o LCP. Pipeline de exportação simples e repetível, documentado no repo.
Orçamento: ≤ 120 KB no formato servido à viewport principal.

## Acceptance criteria
- [ ] Hero servido em AVIF/WebP com fallback JPEG
- [ ] `srcset`/`sizes` cobrem mobile e desktop
- [ ] `width`/`height` declarados; sem regressão de CLS
- [ ] Peso do asset servido ≤ 120 KB e LCP medido sem regressão

## Blocked by
- Nenhum — pode começar imediatamente
