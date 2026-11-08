# PRD — PWA e Offline Básico

Status: done
Feature slug: `pwa-offline`

## Problem Statement

O portfólio hoje é uma SPA servida via Vite/Netlify sem qualquer capacidade PWA: sem manifest, sem ícones instaláveis, sem service worker, sem cache offline. Um visitante que abre o site em uma conexão instável, ou que gostaria de instalá-lo como app no celular, encontra uma página em branco ou um erro de rede genérico, e não há nenhum caminho de instalação. Isso reduz visitas recorrentes, prejudica a resiliência em redes móveis fracas (público-alvo frequente em portfólios pessoais) e perde o sinal de qualidade que o PWA transmite em auditorias Lighthouse e em dispositivos Android.

## Solution

Transformar o portfólio em um PWA básico e instalável: manifest com nome, ícones em tamanhos essenciais (192px e 512px, incluindo máscara), tema escuro consistente com a paleta atual; service worker com estratégia de cache que mantém o conteúdo estático da SPA disponível offline após a primeira visita; uma tela amigável de fallback offline quando o visitante está sem rede e tenta navegar para algo não cacheado; e um fluxo de instalação discreto (prompt nativo onde o navegador suporta, sem banners intrusivos). Nenhuma mudança visual na composição atual de App.tsx nem nos componentes existentes, além de ajustes de Build para gerar o manifesto e registrar o worker.

## User Stories

1. Como um(a) visitante em conexão instável, quero que o portfólio carregue com o conteúdo principal mesmo após perder a rede, para conseguir ver apresentação, experiência, skills e contato sem depender de uma conexão perfeita.
2. Como um(a) visitante que volta ao site pela segunda vez, quero que a navegação seja instantânea a partir do cache em visitas repetidas, para perceber a página carregando imediatamente.
3. Como um(a) visitante em dispositivo Android, quero ter a opção de instalar o portfólio na tela inicial como aplicativo, para acessar meu trabalho com um toque, como qualquer outro app.
4. Como um(a) visitante que chega ao site em uma rede ruim e cai para offline, quero ver uma mensagem clara de que estou offline em vez de uma página em branco, para entender o que aconteceu e saber que posso tentar de novo.
5. Como um(a) visitante que usa leitor de tela, quero que a tela de fallback offline seja anunciada de forma acessível (papel de alerta/status e foco ordenado), para saber que estou offline sem depender de pistas visuais apenas.
6. Como um(a) visitante com preferência de movimento reduzido, quero que a tela offline e qualquer animação de transição respeitem essa preferência, para não ter experiências de movimento forçado.
7. Como um(a) visitante em mobile com tela pequena, quero que os ícones de instalação e o fallback offline sejam legíveis e tocáveis (alvos generosos), para conseguir agir sem dificuldade.
8. Como um(a) visitante que visita o portfólio em um desktop Chrome, quero que a opção de instalação apareça de forma discreta e não bloqueie meu conteúdo, para poder decidir sem interrupção.
9. Como um(a) mantenedor, quero que o manifest e o service worker sejam gerados a partir da configuração de build (sem arquivos duplicados manuais), para que o PWA entre em produção junto do deploy normal na Netlify.
10. Como um(a) mantenedor, quero que o cache seja versionado por build (chave de cache amarrada ao hash do Vite), para que um deploy novo não sirva conteúdo desatualizado preso em cache.
11. Como um(a) mantenedor, quero que o service worker se atualize de forma limpa (novo worker substitui o antigo e limpa caches obsoletos), para não acumular caches velhos nos dispositivos dos visitantes.
12. Como um(a) mantenedor, quero que o comportamento offline seja testável de forma automatizada no Playwright (simulação de offline e verificação de disponibilidade de conteúdo), para garantir que o PWA não regredir em silêncio.
13. Como um(a) visitante com JavaScript desabilitado ou em navegador sem suporte a service worker, quero que o site continue funcionando normalmente como hoje, para não perder acesso por causa de uma funcionalidade progressiva.
14. Como um(a) mantenedor, quero que o formulário de contato mantenha seu comportamento atual (webhook Discord) e falhe com feedback claro quando offline, para não prometer um envio que não aconteceu.
15. Como um(a) visitante que quer compartilhar meu portfólio, quero que metadados de preview (título, descrição, tema escuro) estejam corretos no manifest e nas tags, para que o link tenha uma aparência profissional ao ser compartilhado.
16. Como um(a) mantenedor, quero que a performance do PWA seja verificável na auditoria Lighthouse (instalabilidade e offline passam), para ter uma métrica objetiva de qualidade a cada release.

## Implementation Decisions

- Módulo de Build/CI como seam principal: o build do Vite passa a gerar o manifest e registrar o service worker, de forma que o resultado PWA é emitido automaticamente a cada build publicado na Netlify, sem arquivos estáticos duplicados para manter à mão.
- Contrato do manifesto: name/short_name, display standalone, orientação/portrait, cores de tema e fundo alinhadas à paleta escura existente (background #121212, primary #673ab7), ícones em 192px e 512px (incluindo um ícone mascarável para Android), sem alterar nenhum componente visual existente.
- Contrato do service worker: estratégia de cache-first para assets estáticos versionados (JS/CSS/imagens gerados pelo Vite) e network-first com fallback em cache para a navegação, de modo que o shell da SPA responde offline após a primeira visita.
- Decisão arquitetural — cache versionado por build: a chave de cache é derivada do hash do build, e na ativação de um novo worker os caches de versões antigas são removidos, evitando conteúdo obsoleto preso no dispositivo.
- Módulo de UI (App shell): um componente de fallback offline, renderizado apenas quando o navegador sinaliza estado offline e o conteúdo solicitado não está em cache, com mensagem clara e botão de nova tentativa; o fluxo de instalação usa o prompt nativo (beforeinstallprompt) capturado de forma discreta, sem banner intrusivo, e some silenciosamente em navegadores sem suporte.
- Decisão de progressividade: todas as capacidades PWA são aditivas — navegadores sem service worker ou sem suporte a instalação degradam para o comportamento atual da SPA, sem regressão visual ou funcional.
- O formulário de contato (consumer do serviço de webhook) mantém seu contrato atual: sem rede, o envio falha e o usuário recebe feedback de erro, sem simulação de sucesso offline.

## Testing Decisions

- Seam de teste principal: Playwright E2E em tests/, seguindo o prior art de tests/app.spec.ts (data-testid e estrutura de asserção já estabelecida no projeto) — verificar que, com a rede simulada como offline após uma visita inicial, o conteúdo principal (âncoras #experience, #skills, #contact da composição Header → Presentation → Experience → Skills → ContactForm → Footer) continua acessível.
- Bom teste aqui é comportamental (o que o visitante consegue fazer offline) e não teste de snapshot de CSS ou de hash de build: o teste deve falhar se um visitante offline perder o acesso ao conteúdo, mas não deve quebrer por mudança irrelevante de nome de arquivo versionado.
- Cobrir o fallback offline (mensagem visível quando offline sem conteúdo cacheado) e a ausência de regressão no fluxo normal quando online (app carrega e âncoras funcionam), usando as mesmas convenções de data-testid dos specs existentes.
- Decisões de cache/ativação do worker devem ser validadas manualmente ou por inspeção de build (instalabilidade no Chrome), complementando o E2E, já que o Playwright não cobre todo o ciclo de vida do service worker de forma confiável.

## Out of Scope

- Push notifications e sincronização em background.
- Sincronização offline ou fila de envio para o formulário de contato.
- App nativo para iOS/Android ou publicação em lojas.
- Mudanças de layout, tema ou componentes da composição atual da SPA.
- Correção do webhook Discord hardcoded no formulário (tratada em outro PRD).
- Service worker com cache de respostas de API/externas (fora do shell estático).

## Further Notes

- Risco principal: cache preso em versões antigas — mitigado pelo versionamento por build e pela limpeza na ativação.
- OS ícones PWA devem reutilizar uma arte já existente do portfólio (favicon) em tamanhos maiores, sem identidade nova.
- O navegador iOS Safari tem suporte limitado a instalação PWA; o comportamento esperado é degradação silenciosa para a SPA normal, sem erros.
- Performance: o worker não deve aumentar o tempo de primeira visita; o cache é populado em segundo plano após o carregamento inicial.
