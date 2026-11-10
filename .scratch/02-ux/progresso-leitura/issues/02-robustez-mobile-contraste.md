# Issue: Robustez: mobile, contraste, casos inválidos e não-bloqueio da conversão

Status: ready-for-agent

## Parent
PRD: `.scratch/02-ux/progresso-leitura/PRD.md`

## What to build
Barra visível e legível em telas estreitas sem roubar espaço vertical, com proteção contra altura zero, scroll além do fim e overscroll mobile, e sem cobrir nem bloquear o link de contato.

## Acceptance criteria
- [ ] No mobile, a barra é visível e legível sem roubar espaço vertical significativo
- [ ] A barra tem contraste suficiente contra o fundo escuro e o conteúdo por baixo
- [ ] Com altura zero ou conteúdo ainda carregando, a barra não quebra nem exibe valores inválidos
- [ ] Overscroll mobile não faz a barra exceder 100%
- [ ] A barra nunca bloqueia nem cobre o link de contato

## Blocked by
- `.scratch/02-ux/progresso-leitura/issues/01-hook-progresso-barra-topo.md`
