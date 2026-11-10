# Issue: Motion discreto e leitura estável em zoom

Status: ready-for-agent

## Parent
PRD: `.scratch/04-secoes/secao-timeline/PRD.md`

## What to build
Reveal discreto via Framer Motion ao entrar no viewport, desativado com `prefers-reduced-motion`, com linha alinhada em zoom de 200%.

## Acceptance criteria
- [ ] Reveal da timeline aparece ao entrar no viewport
- [ ] `prefers-reduced-motion` remove animações de reveal (teste com emulação)
- [ ] Sem animação contínua da linha ou dos marcadores
- [ ] Em zoom de 200%, linha vertical permanece alinhada e sem sobreposição
- [ ] Timeline carrega sem deslocamento após ícones e datas renderizarem

## Blocked by
- `.scratch/04-secoes/secao-timeline/issues/02-responsividade-links-certificado-acessibilidade.md`
