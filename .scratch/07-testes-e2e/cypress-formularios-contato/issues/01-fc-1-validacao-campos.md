# Issue — Validação client-side do formulário de contato

Status: ready-for-agent

## Parent
PRD: `.scratch/07-testes-e2e/cypress-formularios-contato/PRD.md`

## What to build
Spec de validação do form principal: cobrir as 6 mensagens exatas ("Informe seu
nome.", "O nome deve ter no máximo 100 caracteres.", "Informe seu email.",
"Informe um email válido.", "Escreva sua mensagem.", "A mensagem deve ter no
máximo 2000 caracteres."), `aria-invalid` e `aria-describedby` apontando para o
span de erro (`#contact-*-error`), limpeza do erro ao digitar no campo, campos
com labels associadas e limites `maxLength` respeitados.

## Acceptance criteria
- [ ] Cada mensagem de validação é assertada pelo texto exato e pelo elemento de erro
- [ ] `aria-invalid="true"` presente com o campo em erro; removido/corrigido ao digitar
- [ ] Erro desaparece quando o usuário começa a digitar no campo afetado
- [ ] Honeypot `#contact-website` existe, oculto (`aria-hidden`, `tabIndex=-1`) e não interfere no fluxo
- [ ] Submit com form inválido não chama `@postContact`

## Blocked by
- 02-ci-2-comandos-servidor.md
