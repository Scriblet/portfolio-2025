# PRD: Download de CV

Status: ready-for-agent
Feature slug: `download-cv`

## Problem Statement

O portfólio não oferece uma forma de baixar o currículo completo do profissional em PDF, o que quebra uma das jornadas mais comuns de recrutadores: ver o portfólio, gostar do perfil e querer compartilhar ou arquivar o CV. Hoje o único caminho é abrir o e-mail ou o LinkedIn e solicitar, adicionando fricção e perda de candidatos interessados. Além disso, não há medição sobre o interesse real por download de currículo, impedindo priorizar melhorias com base em evidência.

## Solution

Adicionar um botão claro de download de CV em PDF na área principal do portfólio (Presentation e/ou Hero, com reforço pontual em Contact), servindo um arquivo estático versionado do próprio repositório, com estados visíveis de download, fallback para abrir em nova guia e eventos de analytics reutilizando o evento já existente de download de currículo do serviço de analítica.

## User Stories

1. Como um(a) recrutador, quero baixar o CV em PDF com um clique, para compartilhar com a equipe ou arquivar sem sair do portfólio.
2. Como um(a) visitante, quero um botão de CV claramente visível, para encontrar o currículo sem procurar na página.
3. Como um(a) recrutador, quero que o PDF abra em nova guia ou baixe diretamente, para não perder a página do portfólio.
4. Como um(a) visitante mobile, quero o botão com área de toque adequada e rótulo legível, para baixar com uma mão.
5. Como um(a) usuário(a) de leitor de tela, quero que o botão tenha rótulo acessível claro (ação + formato), para entender o que acontece ao ativá-lo.
6. Como um(a) usuário(a) de teclado, quero alcançar o botão na ordem lógica da página, para baixar sem depender do mouse.
7. Como um(a) visitante em conexão lenta, quero feedback visual de que o download foi iniciado, para não clicar repetidamente.
8. Como um(a) visitante cujo navegador bloqueia pop-ups/downloads, quero um fallback (abrir o arquivo em nova guia), para ainda acessar o CV.
9. Como um(a) recrutador que baixa vários currículos, quero que o nome do arquivo seja descritivo (nome + CV), para organizar sem renomear.
10. Como um(a) mantenedor, quero trocar o PDF atualizando apenas o arquivo, sem mudar código, para manter o CV sempre atual.
11. Como um(a) analista, quero registrar cada download (evento já previsto no serviço de analítica), para medir o interesse por CV.
12. Como um(a) visitante com baixa visão, quero contraste e tamanho de texto adequados no botão, para identificá-lo facilmente.
13. Como um(a) recrutador que imprime, quero que o PDF seja legível em impressão preto e branco, para levar o CV a reuniões.
14. Como um(a) visitante internacional, quero o CV disponível mesmo que a página esteja em outro idioma, para avaliar o profissional sem barreira de idioma.
15. Como um(a) mantenedor, quero que o botão preserve a hierarquia tipográfica e o tema visual, para não parecer elemento alienígena na página.

## Implementation Decisions

- Módulo App/Presentation: componente de botão de download que consome o arquivo estático do currículo e dispara o analytics ao clicar; posicionado na área principal, com reforço opcional em Contact reutilizando o mesmo componente.
- Contrato do serviço de analítica: reutilizar o evento de download de currículo já existente no módulo de analytics (sem criar evento novo), registrando apenas a ocorrência do download (sem dados pessoais).
- Módulo de arquivo estático: o PDF vive como asset público versionado no repositório; o botão referencia a URL pública do asset, e o nome de download é definido via atributo de download do link.
- Decisão de UX: comportamento padrão de download direto com fallback de abertura em nova guia quando o navegador não suporta o atributo; sem navegação interna nem tela intermediária.
- Decisão de escopo de conteúdo: nenhum conteúdo gerado dinamicamente, o PDF é um arquivo único mantido pelo profissional; o portfólio não gera nem personaliza o CV.
- Acessibilidade: rótulo acessível contendo ação e formato; foco visível e ordem de tabulação preservada; contraste conforme o tema atual.

## Testing Decisions

- Bom teste aqui é validar presença, comportamento e analytics: o botão existe com rótulo correto, o link aponta para o PDF, o download/abertura acontece e o evento de analítica dispara.
- Módulo testado: componente/serviço do botão (renderização, rótulo acessível, disparo do evento) e fluxo E2E Playwright (prior art: tests/app.spec.ts) para o caminho completo visitante → clique → download/abertura. O download em si deve ser interceptado/mockado nos testes (sem baixar o arquivo real).
- Prior art: reutilizar data-testid e o padrão de verificação do evento de analytics presente em tests/app.spec.ts.
- Critério de aceite: nenhum teste deve falhar se o PDF for renomeado apenas pela atualização do asset, desde que o contrato do link seja mantido; testes não dependem do conteúdo do PDF.

## Out of Scope

- Geração dinâmica ou personalização do CV a partir dos dados da página.
- Versões em múltiplos idiomas ou formatos além de PDF.
- Formulário para solicitar CV por e-mail ou captura de leads.
- Upload ou armazenamento remoto do arquivo (o PDF é asset estático do repo).
- Tema claro/escuro, hierarquia tipográfica e projetos em destaque (features separadas; esta feature apenas respeita tema e tipografia existentes).

## Further Notes

- O evento de analytics já previsto no serviço analítico torna esta feature de baixo custo de instrumentação; validar que o nome do evento e o contrato não mudam.
- Risco principal: bloqueios de download em navegadores/schemas móveis, mitigado pelo fallback de abertura em nova guia.
