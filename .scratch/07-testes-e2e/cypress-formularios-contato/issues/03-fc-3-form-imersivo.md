# Issue: Formulário da página /immersive: validação e feedback inline

Status: done

## Parent
PRD: `.scratch/07-testes-e2e/cypress-formularios-contato/PRD.md`

## What to build
Spec do formulário da `/immersive` (`#immersive-contact-form`, campos
`#immersive-nome`, `#immersive-email`, `#immersive-message`): as mesmas validações
e mensagens do form principal; feedback **inline** (não snackbar): sucesso
("Mensagem enviada. Responderei em breve."), 429 ("Muitas tentativas. Aguarde um
minuto."), erro ("Não foi possível enviar. Tente pelo e-mail ou LinkedIn.") e
falha de conexão ("Erro de conexão. Tente pelo e-mail ou LinkedIn."), com o
POST sempre interceptado.

## Acceptance criteria
- [ ] Validações idênticas às do form principal, com os erros em `#immersive-*-error`
- [ ] Sucesso (200 `{ok:true}`) mostra o feedback inline de sucesso e limpa o form
- [ ] 429 mostra o texto de limite de tentativas
- [ ] Erro de servidor mostra o texto de falha; falha de rede mostra o texto de conexão
- [ ] Nenhum snackbar é usado no form imersivo (feedback permanece inline)

## Blocked by
- 01-fc-1-validacao-campos.md
