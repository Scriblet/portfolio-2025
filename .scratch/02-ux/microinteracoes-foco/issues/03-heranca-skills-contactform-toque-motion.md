# Issue — Herança em Skills e ContactForm, resposta de toque e reduced motion

Status: ready-for-agent

## Parent
PRD: `.scratch/02-ux/microinteracoes-foco/PRD.md`

## What to build
Cards de Skills e campos do ContactForm herdam os estados padronizados sem reescrever a lógica existente, com resposta ativa imediata ao toque e sem deslocamento/escala com prefers-reduced-motion.

## Acceptance criteria
- [ ] Cards de Skills e campos do formulário exibem os mesmos estados de foco/erro/preenchimento
- [ ] No mobile, tocar em um elemento gera resposta imediata (active), sem atraso
- [ ] Com prefers-reduced-motion, microinterações usam apenas cor/sombra, sem deslocamento ou escala
- [ ] Em telas pequenas, alvos de toque e indicadores de foco não são cortados nem sobrepostos
- [ ] A lógica existente de Skills (dados) e de envio do formulário não é alterada

## Blocked by
- `.scratch/02-ux/microinteracoes-foco/issues/01-tokens-estado-interativo-tema.md`
- `.scratch/02-ux/microinteracoes-foco/issues/02-focus-visible-anel-contraste-forma.md`
