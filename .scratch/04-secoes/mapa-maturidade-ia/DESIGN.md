# DESIGN: Mapa de Maturidade em IA

## Conceito em uma frase

Corte arquitetural de uma pilha: uma coluna contínua de cinco camadas dividida por hairlines, com um rail de referência sticky à esquerda que escurece e acende conforme a leitura avança.

## Wireframes

### Desktop (≥1200px)

```
+------------------------------------------------------------------+
|  COMPETÊNCIA EM IA / 02                                          |
|  Onde a IA vira sistema                                          |
|  O mapa do que eu coloco de pé, não um ranking de senioridade.  |
+------------------------------------------------------------------+
|                                                                  |
|  +-----+  +---------------------------------------------------+  |
|  | 05  |  | 01  Produto e uso                                 |  |
|  |     |  |       IA só vale quando muda o trabalho de alguém.|  |
|  | 01  |  |       [mapear] [revisar código] [prototipar]      |  |
|  | 02  |  |       rotina de engenharia em produto             |  |
|  | 03  |  +---------------------------------------------------+  |
|  | 04  |  +---------------------------------------------------+  |
|  | 05  |  | 02  Integração de modelos                         |  |
|  +-----+  |       Modelo bom é modelo que aguenta produção.   |  |
|  (rail   |       [LLMs] [embeddings] [validação]               |  |
|   sticky)|       plataforma de IA de grande porte              |  |
|          +---------------------------------------------------+  |
|          ... 03, 04, 05 ...                                     |
|                                                                  |
+------------------------------------------------------------------+
|  As camadas de baixo sustentam as de cima. Nenhuma funciona     |
|  sozinha.                                                        |
+------------------------------------------------------------------+
```

### Mobile (≤600px)

```
+------------------------+
| COMPETÊNCIA EM IA / 02 |
| Onde a IA vira sistema |
| O mapa do que eu...    |
+------------------------+
| 01  Produto e uso      |
|     IA só vale...      |
|     [mapear]           |
|     [revisar código]   |
|     [prototipar]       |
|     rotina de...       |
+------------------------+
| 02  Integração...      |
| ...                    |
+------------------------+
| ...                    |
+------------------------+
| Fecho                  |
+------------------------+
```

## Grid e layout

- **Container**: `width: min(1320px, calc(100% - clamp(24px, 6vw, 112px)))`, centralizado.
- **Estrutura geral**: seção full-width com fundo `--void`. Conteúdo em coluna central.
- **Header da seção**: label mono + `h2` headline + parágrafo de apoio, alinhados à esquerda, max-width 72ch.
- **Corpo**: grid de duas colunas no desktop: rail fixo à esquerda + pilha contínua à direita.
  - `grid-template-columns: 96px 1fr` desktop.
  - Mobile: coluna única, com número da camada flutuando na calha.
- **Rail sticky** (desktop):
  - `position: sticky; top: 33vh; align-self: start;`
  - Contém numeral gigante "05" e índice 01–05 vertical.
  - Altura total do rail: ~280px.
- **Pilha contínua**:
  - `ol` semântico, sem padding, margin 0.
  - Cada `li` separado por `border-top: 1px solid var(--hairline)`.
  - Último item com `border-bottom` também.
- **Calha do número**:
  - Número da camada posicionado à esquerda do título, na mesma linha do título.
  - Fonte mono, 12px, cor `--violet`.
- **Micro-grid de capacidades**:
  - `display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;`
  - Em telas <900px: 2 colunas.
  - Em mobile: 1 coluna.

## Hierarquia tipográfica (valores explícitos)

| Elemento | Fonte | Peso | Tamanho | Altura | Cor |
|---|---|---|---|---|---|
| Label | Sora | 600 | 10px / 0.625rem | 1.4 | `--muted` |
| Headline h2 | Syne | 700 | clamp(2.4rem, 5.6vw, 4.5rem) | 0.96 | `--paper` |
| Apoio | Inter | 400 | clamp(0.95rem, 1.3vw, 1.1rem) | 1.65 | `--paper-2` |
| Numeral do rail | Syne | 800 | 96px / 6rem | 0.8 | `--paper`, opacidade controlada |
| Índice do rail | Sora | 500 | 11px / 0.6875rem | 1.6 | `--muted` |
| Número da camada | Sora | 600 | 12px / 0.75rem | 1 | `--violet` |
| Título da camada | Syne | 700 | clamp(1.6rem, 2.8vw, 2.6rem) | 1.05 | `--paper` |
| Tese | Inter | 500 | clamp(1rem, 1.3vw, 1.15rem) | 1.55 | `--paper-2` |
| Capacidade | Inter | 400 | clamp(0.78rem, 1vw, 0.88rem) | 1.5 | `--paper` |
| Evidência | Sora | 500 | 10px / 0.625rem | 1.5 | `--muted` |
| Fecho | Inter | 400 | clamp(0.9rem, 1.1vw, 1rem) | 1.65 | `--paper-2` |

## Espaçamentos

- Padding da seção: `clamp(80px, 14vh, 160px) 0`.
- Gap entre header e pilha: `clamp(64px, 9vh, 104px)`.
- Padding vertical de cada camada: `clamp(40px, 5.5vh, 72px)`.
- Gap entre número/título/tese/capacidades/evidência: 16px, 12px, 20px, 14px.
- Gap entre itens do micro-grid: 12px.
- Padding interno do micro-grid item: 0.
- Gap entre rail e pilha: 32px desktop; 0 mobile.

## Cores por token

- Fundo: `--void`.
- Texto principal: `--paper`.
- Texto secundário: `--paper-2` / `--muted`.
- Destaque: `--violet` para números de camada.
- Hairlines: `--hairline`.
- Rail numeral gigante: `--paper` com opacidade 0.08 inativo, 0.22 ativo.
- Índice do rail: `--muted` com opacidade 0.5 inativo, 1 ativo.
- Hover da camada: fundo `--surface-soft` (sem glass), 200ms.

## Componentes do design system usados

- `SectionLabel` (tone="dark"): label "Competência em IA / 02".
- `Hairline` (tone="dark"): separadores entre camadas.
- Nenhum `GlassPanel`. Superfície sólida com hairline conforme decisão validada.

## Tema claro

- Fundo `--light-bg`.
- Texto `--light-text` / `--light-text-2`.
- Hairlines `--hairline-light`.
- Rail numeral gigante em `--light-text` com opacidade reduzida.
- `--violet` continua para números de camada.

## Movimento

### Entrada
- Header: `opacity 0→1`, `translateY(24px)→0`, 800ms, easing `--ease-out`.
- Rail: fade-in 600ms após header.
- Camadas: reveal por scroll com IntersectionObserver (`threshold: 0.25`), `translateY(28px)→0`, 700ms, stagger 100ms entre camadas.

### Scroll: rail ativo
- Cada camada acende o índice correspondente no rail quando entra no centro da viewport (IntersectionObserver `rootMargin: '-45% 0px -45% 0px'`).
- Índice ativo: opacidade 1, cor `--paper`.
- Numeral gigante "05" permanece sutil; apenas o índice 01–05 acende.
- Transição suave de 250ms.

### Hover
- Camada inteira ganha fundo `--surface-soft`.
- Sem deslocamento, sem sombra.
- Duração 200ms.

### Fallback `prefers-reduced-motion`
- Rail nasce com o índice 01 ativo (estado inicial) e não anima com scroll.
- Reveal de entrada desativado: camadas já visíveis.
- Hover mantém mudança de fundo sem transição visível.

## Acessibilidade

- Semântica: `section` com `aria-labelledby="ia-maturity-title"`, `h2` com id.
- Lista: `ol` para as cinco camadas, cada `li` é uma camada.
- Rail decorativo: `aria-hidden="true"`. A informação do número da camada já está no conteúdo principal.
- Índice do rail: `aria-hidden="true"` (visual apenas; a numeração real está na `ol`).
- Ordem de leitura: label → headline → apoio → lista ordenada → fecho. Rail fora do fluxo de leitura.
- Foco: `:focus-visible` padrão.
- Contraste AA com tokens do design system.
- Alvos de toque: itens da pilha não são clicáveis; se houver interação futura, mínimo 44×44.

## Conexões visuais

- **Anterior (Hero/About)**: transição de `--light-bg` para `--void` (ou de `--void` para `--void`, dependendo do fluxo), marcando a mudança para conteúdo técnico.
- **Posterior (Manifesto)**: de `--void` para `--void-2`, mantendo a descida.

## Riscos de design e mitigações

| Risco | Mitigação |
|---|---|
| Rail vira enfeite inútil | Ele carrega função de referência visual e acendimento sutil no scroll; `aria-hidden` evita duplicar info. |
| Pilha parece tabela | Hairlines finas e título em escala alta evitam leitura tabular; tese e capacidades quebram a rigidez. |
| Micro-grid vira parede de texto | Capacidades são curtas (3–4 palavras) e bem espaçadas. |
| Mobile perde a arquitetura | Números na calha preservam a ordenação; hairlines mantêm a segmentação. |

## Checklist de aceitação visual

- [ ] Header com label "Competência em IA / 02", headline e apoio corretos.
- [ ] Rail sticky no desktop com numeral "05" gigante e índice 01–05.
- [ ] Cinco camadas em pilha contínua, divididas por hairlines.
- [ ] Cada camada exibe número, título, tese, micro-grid de capacidades e evidência.
- [ ] Capacidades em 3 colunas desktop, 2 colunas tablet, 1 coluna mobile.
- [ ] Camada ativa acende índice no rail (desktop).
- [ ] Sem cards, sem vidro, sem gradientes, sem ícones soltos.
- [ ] Tema claro funciona sem quebrar.
- [ ] `prefers-reduced-motion`: rail não anima, conteúdo visível.

## Alternativas descartadas

1. **Cards empilhados com GlassPanel**: rejeitado pelo usuário; substituído por pilha contínua sólida.
2. **Rail com marcador deslizante**: descartado para evitar efeito gratuito; optou-se por acender o índice numeral.
3. **Camadas em duas colunas lado a lado**: descartado para manter a leitura linear da pilha.
