# Issue — Acessibilidade e movimento reduzido da barra

Status: ready-for-agent

## Parent
PRD: `.scratch/02-ux/progresso-leitura/PRD.md`

## What to build
Barra apresentada como indicador de progresso informativo sem live regions verbosas, sem interceptar foco, sem suavização automática com prefers-reduced-motion, e comunicando progresso também por posição/tamanho, não só por cor.

## Acceptance criteria
- [ ] Usuário de leitor de tela não é interrompido por atualizações de porcentagem a cada tick
- [ ] O foco de teclado nunca é interceptado pela barra
- [ ] Com prefers-reduced-motion, o preenchimento acompanha o scroll sem animação suavizada
- [ ] O progresso é compreensível mesmo sem percepção de cor (posição/tamanho também indicam)

## Blocked by
- `.scratch/02-ux/progresso-leitura/issues/01-hook-progresso-barra-topo.md`
