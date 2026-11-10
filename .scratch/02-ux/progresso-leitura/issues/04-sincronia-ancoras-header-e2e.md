# Issue: Sincronia com âncoras, integração com o Header e E2E

Status: ready-for-agent

## Parent
PRD: `.scratch/02-ux/progresso-leitura/PRD.md`

## What to build
Barra reflete a posição real após saltos por âncora, compõe visualmente com o Header inteligente sem sobrepor links, e é coberta por E2E automatizado de scroll simulado.

## Acceptance criteria
- [ ] Após clicar numa âncora (ex.: #skills), a barra reflete a posição real pós-salto
- [ ] Quando o Header se esconde, a barra permanece utilizável sem sobrepor links
- [ ] Em E2E automatizado: a barra existe, está em 0% no topo e atinge 100% no rodapé
- [ ] Sem dependência nova (scroll nativo + Framer Motion já instalado)

## Blocked by
- `.scratch/02-ux/progresso-leitura/issues/01-hook-progresso-barra-topo.md`
- `.scratch/02-ux/progresso-leitura/issues/02-robustez-mobile-contraste.md`
- `.scratch/02-ux/progresso-leitura/issues/03-acessibilidade-movimento-reduzido-barra.md`
- `.scratch/02-ux/header-scroll-inteligente/issues/01-hook-direcao-scroll-header.md`
