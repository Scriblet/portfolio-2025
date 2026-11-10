# PRD: Indicador de Progresso de Leitura

Status: ready-for-agent
Feature slug: `progresso-leitura`

## Problem Statement

A página é uma single-page longa (Header → Presentation → Experience → PhilosophyBanner → Skills → GithubBanner → ContactForm → Footer) sem nenhum sinal de quanto falta para chegar ao fim. O visitante não sabe se já viu tudo, se falta muito conteúdo, ou onde está na leitura, o que reduz o consumo completo do portfólio e aumenta a chance de abandonar antes das seções de contato, que são justamente a conversão mais importante. Sem um indicador de posição, a experiência de leitura de uma página única longa depende apenas da intuição do visitante.

## Solution

Adicionar uma barra fina de progresso de leitura fixa no topo da viewport (0–100%), que preenche de forma contínua conforme o visitante rola em direção ao fim da página e completa em 100% ao alcançar o rodapé. A barra deve ser discreta (poucos pixels, cor da paleta atual), não interferir na navegação ou no conteúdo, funcionar em todos os viewports (mobile incluso), estar disponível para tecnologia assistiva de forma informativa (sem anunciar cada atualização de porcentagem) e respeitar preferências de movimento reduzido (atualização sem animação suave). Ela deve compor com o Header existente sem sobrepor links nem quebrar o backdrop blur.

## User Stories

1. Como um(a) visitante que está rolando o portfólio, quero ver uma barra de progresso no topo que indica quanto da página já li, para saber onde estou na leitura.
2. Como um(a) visitante que chega ao fim da página, quero que a barra complete em 100% ao alcançar o rodapé, para ter a sensação de ter concluído a leitura.
3. Como um(a) visitante que acabou de abrir o site, quero que a barra comece em 0% (ou próxima de 0), para entender que há conteúdo à frente.
4. Como um(a) visitante em mobile, quero que a barra seja visível e legível em tela estreita sem roubar espaço vertical, para acompanhar a leitura com uma mão.
5. Como um(a) usuário(a) de leitor de tela, quero que a barra seja informada de forma não verbosa (sem me interromper com cada percentual), para não ter minha leitura interrompida por atualizações constantes.
6. Como um(a) visitante com preferência de movimento reduzido, quero que o preenchimento da barra acompanhe o scroll sem animação suavizada automática, para não ter movimento forçado.
7. Como um(a) visitante com baixa visão, quero que a barra tenha contraste suficiente contra o fundo escuro e o conteúdo rolado por baixo, para conseguir percebê-la.
8. Como um(a) visitante que rola para cima, quero que a barra recue proporcionalmente, para refletir fielmente minha posição atual na página.
9. Como um(a) visitante daltônico, quero que a barra não dependa apenas de cor para comunicar progresso (posição/tamanho também indicam), para não depender de percepção cromática.
10. Como um(a) mantenedor, quero que o cálculo de progresso seja centralizado em um hook reutilizável (posição de scroll normalizada 0–1), para que qualquer componente futuro possa consumir o progresso sem recalcular.
11. Como um(a) mantenedor, quero que a barra reuse a cor primária da paleta atual (#673ab7) e o sistema de tema MUI, para manter a identidade visual sem novos tokens de cor.
12. Como um(a) visitante que está no meio da página e clicou numa âncora (#skills), quero que a barra reflita a posição real após o salto, para não ficar dessincronizada da leitura.
13. Como um(a) visitante que abre o site em uma página com altura zero ou conteúdo ainda carregando, quero que a barra não quebre nem exiba valores inválidos, para continuar navegando normalmente.
14. Como um(a) mantenedor, quero que a implementação não dependa de librerias novas (scroll nativo + Framer Motion já instalado), para não aumentar bundle nem manutenção.
15. Como um(a) visitante que quer ir direto ao contato, quero que a barra não bloqueie nem cubra o link de contato, para que o progresso nunca atrapalhe a conversão.
16. Como um(a) mantenedor, quero que o progresso seja verificável em E2E automatizado (scroll simulado e largura/valor da barra verificados), para não regredir em refactors da composição de App.tsx.

## Implementation Decisions

- Módulo de componente (MUI/Framer) como seam principal: uma barra de progresso fina fixa no topo da viewport, montada na composição do App shell acima do conteúdo existente (sem alterar a ordem das seções Header → Presentation → Experience → PhilosophyBanner → Skills → GithubBanner → ContactForm → Footer).
- Contrato do hook de progresso: expõe um valor normalizado de 0 a 1 calculado a partir da posição do scroll em relação à altura rolável do documento, com proteção contra altura zero e contra scroll além do fim, reutilizável por qualquer componente consumidor.
- Decisão arquitetural: a barra usa o tema MUI existente (cor primária #673ab7 sobre o fundo escuro) e atualização via scroll nativo com interpolação suave pelo Framer Motion; com prefers-reduced-motion, a interpolação é desativada e a barra reflete a posição sem suavização.
- Acessibilidade como parte do contrato: a barra é apresentada como indicador de progresso com valor acessível, mas sem região de anúncio verbosa (atualizações de scroll não disparam live regions a cada tick); o foco de teclado nunca é interceptado pela barra.
- A barra é puramente visual e informativa: não é um controle clicável, não substitui a navegação por âncoras e não altera nenhum comportamento existente de scroll ou foco.
- Nenhuma dependência nova; o cálculo usa geometria do documento em tempo de scroll, sem medições periódicas por timer.

## Testing Decisions

- Seam de teste principal: Playwright E2E em tests/, seguindo o prior art de tests/app.spec.ts (data-testid e composição da página já verificados), verificar que a barra existe, que está em 0% (ou próxima) no topo e que atinge 100% ao rolar até o rodapé.
- Bom teste aqui é comportamental (a barra reflete a posição de leitura) e não snapshot de largura em pixels: o teste deve tolerar diferenças de suavização de animação, verificando estados estáveis (início, meio, fim), não valores intermediários exatos em um instante qualquer.
- Cobrir o caso de página curta ou altura ainda não resolvida (barra não quebra, sem valores inválidos) e a compatibilidade com a navegação por âncoras herdada dos specs existentes.
- O comportamento com prefers-reduced-motion deve ser verificado manualmente ou por emulação de contexto no Playwright, sem testes frágeis de timing de animação.

## Out of Scope

- Progresso por seção individual (ex.: "você está em Skills"), apenas progresso global da página.
- Scroll inteligente do Header (PRD separado: header-scroll-inteligente), embora os dois devam compor visualmente.
- Marcadores clicáveis ou sumário da página.
- Salvamento de posição de leitura entre visitas.
- Mudanças de layout, tema ou das seções existentes.
- Estimativa de tempo de leitura.

## Further Notes

- A interação entre esta barra e o Header com scroll inteligente (outro PRD) precisa ser resolvida na integração: a barra deve permanecer utilizável mesmo quando o Header se esconde, sem sobrepor links.
- Em páginas cuja altura rolável é muito grande, a granularidade visual da barra pode parecer coarse no início; isso é aceitável para o indicador global e não deve ser "corrigido" com médias móveis那会 mascarar a posição real.
- O cálculo deve lidar com o overscroll de navegadores mobile (iOS rubber-band) sem exceder 100%.
