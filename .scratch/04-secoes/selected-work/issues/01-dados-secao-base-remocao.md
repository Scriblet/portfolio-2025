# Issue: Selected Work: dados + seção base + remoção de Experience/Jornada

Status: done

## Parent
PRD: `.scratch/04-secoes/selected-work/PRD.md`

## What to build
Criar o módulo tipado `selectedWorks` com os cases reais (Aura, Porto Seguro, Thoughtworks, ArcoTech, Finger Consultoria e, se fizer sentido, hackathons) e renderizar a seção `#selected-work` como narrativa contínua. Remover `Experience` e `Timeline` do fluxo principal do `App.tsx`, substituindo-as pela nova seção. O acabamento visual fica para a próxima issue.

## Acceptance criteria
- [ ] `src/data/selectedWorks.ts` exporta os cases com empresa, período, papel, headline, contexto, ação, resultado e stack
- [ ] Tipo `SelectedWork` adicionado em `src/data/types.ts`
- [ ] Seção `#selected-work` renderiza todos os cases em ordem decrescente (mais recente primeiro)
- [ ] `Experience` e `Timeline` removidas do fluxo principal
- [ ] Nenhum dado inventado; períodos e empresas conferidos com o currículo
- [ ] Teste unitário valida quantidade e ordenação do módulo

## Blocked by
- `.scratch/04-secoes/mapa-maturidade-ia/issues/01-dados-secao-base.md`
- `.scratch/04-secoes/manifesto-tecnico/issues/01-dados-secao-base.md`
