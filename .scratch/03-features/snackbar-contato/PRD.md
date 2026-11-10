# PRD: Toast de Contato

Status: ready-for-agent
Feature slug: `snackbar-contato`

## Problem Statement
O formulário de contato atual usa um Alert estático para comunicar sucesso ou erro, o que quebra o fluxo de atenção dentro de um formulário que já ocupa viewport, exige que o usuário procure o feedback dentro do layout, e não oferece uma confirmação temporizada e clara após o envio. O feedback também não é global, então futuras notificações de outras partes do portfólio teriam que duplicar padrões. Visitantes ficam sem saber se a mensagem foi enviada, se houve falha, ou se devem tentar novamente, e o time perde a oportunidade de medir confirmações de contato de forma confiável.

## Solution
Substituir o Alert estático por um sistema global de snackbar/toast em MUI, acionado a partir de um contexto ou store leve de notificações. O ContactForm passa a apenas solicitar uma notificação com severidade, título e mensagem, e o sistema global renderiza o snackbar com auto-dismiss, ação de fechar, severidade visual distinctiva e fila simples para mensagens concorrentes. O estado de envio continua com loading e disabled durante a request, analytics registra exibição e contexto da notificação, e a experiência mantém tema escuro, contraste e acessibilidade de região de status.

## User Stories
1. Como um(a) visitante que acabou de enviar o formulário de contato, quero ver um snackbar de confirmação de sucesso claramente visível, para saber que a mensagem foi recebida sem precisar procurar um Alert dentro da página.
2. Como um(a) visitante cuja tentativa de contato falha, quero ver um snackbar de erro com mensagem clara do motivo, para entender que a mensagem não foi enviada e decidir se tento novamente.
3. Como um(a) usuário(a) com leitor de tela, quero que o snackbar seja anunciado como live region, para ser informado do resultado do envio sem depender apenas de sinal visual.
4. Como um(a) visitante em dispositivos móveis, quero que o snackbar apareça em posição confortável e não cubra o botão de enviar ou os campos essenciais, para concluir o fluxo sem perder contexto.
5. Como um(a) visitante que envia várias vezes seguidas, quero que o sistema enfile ou deduplique snackbars recentes, para não ser bombardeado por notificações empilhadas ou repetidas.
6. Como um(a) visitante que prefere dispensar a notificação, quero um botão de fechar acessível por teclado e toque, para limpar o snackbar no meu próprio ritmo.
7. Como um(a) visitante que não fecha o snackbar, quero que ele desapareça automaticamente após um tempo razoável, para não bloquear persistentemente a tela após confirmação.
8. Como um(a) visitante que usa o formulário com zoom ou alto contraste, quero severidade visual e contraste suficientes entre sucesso, erro, aviso e informação, para distinguir o tipo de notificação sem ler atenção redobrada.
9. Como um(a) autor(a) do portfólio, quero poder disparar snackbars de qualquer seção futura a partir de um único provedor global, para manter um padrão consistente de feedback sem duplicar componentes locais.
10. Como um(a) visitante que clica em um CTA de GitHub ou navega entre seções, quero que um snackbar aberto não impeça a navegação e não crie armadilha de foco, para continuar explorando o portfólio livremente.
11. Como um(a) pessoa responsável por métricas, quero eventos de analytics para exibição de snackbar por severidade e por contexto de origem, para medir taxa de sucesso de contato e falhas típicas.
12. Como um(a) visitante que envia o formulário com sucesso, quero que o feedback de sucesso não dependa da permanência do Alert no layout, para poder continuar rolando a página sem perder a confirmação.
13. Como um(a) usuário(a) que Prefere movimento reduzido, quero que a animação do snackbar respeite configurações de acessibilidade, para evitar desconforto com animações excessivas.
14. Como um(a) visitante que abre a página em aba de fundo, quero que múltiplas notificações não disputem atenção de forma agressiva, para manter a experiência estável e respeitosa.

## Implementation Decisions
Módulo global de snackbar com contrato mínimo de notificação contendo severidade, título, mensagem, comportamento de auto-dismiss e ação opcional, exposto por um provedor no nível da aplicação e um hook de disparo para qualquer módulo consumidor. O ContactForm deixa de renderizar feedback estático e passa a emitir notificações através desse contrato após concluir o envio, mantendo loading, validação e reset do formulário como responsabilidades locais. O sistema de snackbar deve suportar fila simples FIFO ou substituição de mensagens repetidas, com um único host visual MUI Snackbar que herda tema escuro, tokens de cor por severidade e tipografia existentes, e região de live para leitores de tela. Analytics passa a emitir evento de notificação com severidade, contexto de origem e resultado, sem expor dados pessoais do formulário. Os seams são o componente de feedback persistente e a camada E2E, e nenhum novo módulo de dados centralizados é necessário além da lista de mensagens copy-ready manter-se próxima do consumidor. Decisões de duração por severidade, posição do toast e limites de fila devem ficar encapsuladas no módulo global para ajuste futuro sem alterar formulários ou seções.

## Testing Decisions
Bom teste é aquele que valida visibilidade, severidade, auto-dismiss, fechamento manual, acessibilidade de live region e disparo a partir do formulário sem depender de timers reais longos ou de snapshots estritos do MUI. O essencial é cobrir sucesso após envio mockado, erro após falha mockada, fechamento pelo usuário, desaparecimento automático, fila ou dedup de mensagens consecutivas, e não quebra da navegação com snackbar aberto. Prior art é a suite Playwright da aplicação, em especial o cenário de Contact que já exercita submissão, estados de loading e assertions por data-testid, ao qual deve ser adicionado um novo data-testid para o host de snackbar e para severidade, seguindo o mesmo padrão de mocks de rede e asserts de visibilidade. Testes de componente devem validar o hook de notificação, o contrato de severidade e a fila, enquanto testes E2E validam a jornada completa do visitante até a confirmação visual. Usar timers fake ou durações reduzidas em teste, para não tornar a suite lenta, e reutilizar fixtures de sucesso e erro já usadas pelo formulário.

## Out of Scope
Substituir sistema de validação do formulário, alterar lógica de envio, fila persistente com histórico visível, permitir customização de notificações pelo visitante, transformar snackbar em centro de notificações global com inbox, adicionar sons ou alertas nativos do navegador, exibir detalhes técnicos de erro de rede na tela, e criar padrões de notificação para outros domínios além do contato nesta entrega.

## Further Notes
A entrega deve manter a harmonia com tema escuro e animação já usados, sem introduzir nova biblioteca de toast. Se o sistema global for adotado por outras seções, apenas o módulo de snackbar deve ser estendido, sem retroagir no formulário além do contrato inicial. Prior art de GitHub e Contact deve ser preservado, com o Alert estático removido apenas depois que o snackbar alcançar paridade visual e de acessibilidade.
