# Issue: InstallButton: prompt de instalação e modo standalone

Status: done

## Parent
PRD: `.scratch/07-testes-e2e/cypress-pwa-offline/PRD.md`

## What to build
Spec da instalação PWA: disparar `beforeinstallprompt` sintético (com `prompt()` e
`userChoice` stubados) faz `install-button` aparecer; clicar chama o prompt nativo
e trata a resposta ("accepted"/"dismissed"); em `display-mode: standalone`
(matchMedia stubado) o botão não é renderizado; sem o evento, nada aparece.

## Acceptance criteria
- [ ] `install-button` só aparece após `beforeinstallprompt`
- [ ] Clique invoca `prompt()` do evento e lida com `userChoice`
- [ ] Em `display-mode: standalone` o botão fica ausente
- [ ] Sem o evento, o header continua sem o botão (sem UI inútil)
- [ ] Nenhum estado residual entre testes (reloads/limpeza de stubs)

## Blocked by
- 02-ci-2-comandos-servidor.md
