# Issue — Imagem da filosofia otimizada com lazy-load

Status: done

## Parent
PRD: `.scratch/08-correcoes-review/otimizacao-imagens/PRD.md`

## What to build
Aplicar o mesmo tratamento à imagem da seção de filosofia
(`multiracial-hands-coming-together.jpg`, hoje 821 KB): formatos modernos com
fallback JPEG, `loading="lazy"` + `decoding="async"`, dimensões declaradas e
orçamento ≤ 250 KB.

## Acceptance criteria
- [ ] Imagem da filosofia ≤ 250 KB em formato moderno, com fallback
- [ ] Lazy-load ativo; não compete com o hero no primeiro carregamento
- [ ] Dimensões declaradas; sem salto de layout ao entrar na viewport

## Blocked by
- 01-oi-1-hero-formatos.md (reusa o pipeline de exportação)
