# Issue — Navegação por âncoras e menu mobile (drawer)

Status: ready-for-agent

## Parent
PRD: `.scratch/07-testes-e2e/cypress-smoke-navegacao/PRD.md`

## What to build
Specs de navegação: links do header (Experiência, Jornada, Habilidades, Contato)
rolam até a seção certa respeitando o offset do header; marca "Lucas Nonato." volta
ao topo; nav do footer faz o mesmo. Menu mobile (viewport 375x812): hambúrguer abre
o `mobile-menu` (`role="dialog"`, `aria-expanded`), links fecham o drawer e rolam,
Escape/overlay/botão fechar encerram e devolvem o foco ao hambúrguer, body fica
com scroll travado enquanto aberto.

## Acceptance criteria
- [ ] Cada link do header leva sua seção ao viewport (folga de ~120px pelo offset −80)
- [ ] Nav do footer cobre as mesmas âncoras funcionando
- [ ] Drawer abre/fecha por botão, overlay e Escape; `aria-expanded` acompanha
- [ ] Foco vai para o botão de fechar ao abrir e volta ao hambúrguer ao fechar
- [ ] `body` com `overflow: hidden` durante o drawer e liberado após fechar

## Blocked by
- 02-ci-2-comandos-servidor.md
