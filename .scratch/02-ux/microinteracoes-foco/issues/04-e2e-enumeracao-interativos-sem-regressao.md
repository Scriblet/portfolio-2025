# Issue: Cobertura E2E por enumeração de interativos e sem regressão

Status: ready-for-agent

## Parent
PRD: `.scratch/02-ux/microinteracoes-foco/PRD.md`

## What to build
Testes E2E que enumeram todos os elementos interativos da composição e verificam alcance por teclado e aplicação do foco visível, sem snapshot frágil de CSS.

## Acceptance criteria
- [ ] Em E2E automatizado, todos os elementos interativos principais (Header, Skills, ContactForm, Footer) são alcançáveis por teclado
- [ ] O teste falha se algum interativo ficar sem indicador de foco visível
- [ ] O fluxo de preenchimento e envio do formulário de contato continua funcionando (sem regressão)
- [ ] A navegação por âncoras do Header continua funcionando (sem regressão)
- [ ] Sem testes frágeis de timing de animação (reduced motion verificado por emulação)

## Blocked by
- `.scratch/02-ux/microinteracoes-foco/issues/01-tokens-estado-interativo-tema.md`
- `.scratch/02-ux/microinteracoes-foco/issues/02-focus-visible-anel-contraste-forma.md`
- `.scratch/02-ux/microinteracoes-foco/issues/03-heranca-skills-contactform-toque-motion.md`
