# Issue: Migrar formulário para o endpoint seguro mantendo a UX

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/seguranca-contato/PRD.md`

## What to build
O formulário passa a enviar ao endpoint server-side com os mesmos campos e apresentação, validação no cliente e no servidor, feedback de sucesso/erro via snackbar amigável e retry claro em falha de rede.

## Acceptance criteria
- [ ] Visitante vê o mesmo formulário (nome, email, mensagem) e consegue enviar com sucesso exibido no snackbar
- [ ] Email inválido ou mensagem vazia gera feedback claro no cliente e é rejeitado no servidor (400)
- [ ] Falha de rede exibe erro amigável com caminho de nova tentativa, sem expor detalhes internos
- [ ] Labels e `aria-describedby` de erro presentes (navegação por teclado/leitor ok)
- [ ] Nenhuma referência ao webhook antigo permanece no código do cliente

## Blocked by
- 01-sc-1-endpoint-contato.md
