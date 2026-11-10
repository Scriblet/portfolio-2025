# DESIGN: Manifesto Técnico

## Conceito em uma frase

Spread editorial: a tese ocupa o topo em escala de display, a foto das mãos aparece como faixa full-bleed, e sete princípios são dispostos como página de livro com numeral recortado, impacto em itálico e consequência em coluna estreita.

## Wireframes

### Desktop (≥1200px)

```
+------------------------------------------------------------------+
|  PRINCÍPIOS / 03                                                 |
|  Como eu construo                                                |
|  Construo software e interfaces acessíveis onde design e         |
|  engenharia são a mesma decisão.                                 |
|  Sete regras que eu uso para decidir, não para decorar.         |
+------------------------------------------------------------------+
|  [faixa full-bleed com foto das mãos]                            |
+------------------------------------------------------------------+
|                                                                  |
|  01| Código é meio, não fim.                                     |
|    | O problema vem antes da stack.                              |
|    | Já vi sistema tecnicamente elegante...                      |
|  ----------------------------------------------------------------|
|  02| Acessibilidade é padrão, não feature.                       |
|    | Se não funciona para todos, não está pronto.                |
|    | Semântica, teclado e contraste...                           |
|  ----------------------------------------------------------------|
|  ...                                                             |
|                                                                  |
+------------------------------------------------------------------+
|  Os cases abaixo são o teste dessas regras.                      |
+------------------------------------------------------------------+
```

### Mobile (≤600px)

```
+------------------------+
| PRINCÍPIOS / 03        |
| Como eu construo       |
| Construo software...   |
| Sete regras...         |
+------------------------+
| [foto full-bleed]      |
+------------------------+
| 01 Código é meio...    |
| O problema vem...      |
| Já vi sistema...       |
+------------------------+
| 02 Acessibilidade...   |
| ...                    |
+------------------------+
| Fecho                  |
+------------------------+
```

## Grid e layout

- **Container**: `width: min(1320px, calc(100% - clamp(24px, 6vw, 112px)))`, centralizado.
- **Fundo**: `--void-2`.
- **Abertura**:
  - Label "Princípios / 03".
  - Eyebrow "Como eu construo" em Syne 700, 14px, `--paper-2`.
  - Statement/h2: Syne 700, `clamp(3rem, 7vw, 5.8rem)`, line-height 0.96, max-width 16ch.
  - Apoio: Inter 400, `clamp(0.95rem, 1.3vw, 1.1rem)`, max-width 52ch.
- **Faixa full-bleed**:
  - Imagem das mãos ocupando toda a largura da viewport (`width: 100vw; margin-left: calc(-50vw + 50%)`).
  - Altura: `clamp(220px, 32vh, 420px)`.
  - Overlay escuro sutil para integração com `--void-2`.
- **Lista de princípios**:
  - `ol` semântico, cada `li` separado por `border-top: 1px solid var(--hairline)`.
  - Último item com `border-bottom`.
  - Padding vertical de cada princípio: `clamp(48px, 7vh, 88px)`.
- **Estrutura de cada princípio**:
  - Grid desktop: `grid-template-columns: clamp(56px, 6vw, 88px) 1fr`.
  - Numeral recortado na coluna esquerda.
  - Coluna direita com título, impacto e consequência.
  - Consequência com max-width 60ch.

## Hierarquia tipográfica (valores explícitos)

| Elemento | Fonte | Peso | Tamanho | Altura | Cor |
|---|---|---|---|---|---|
| Label | Sora | 600 | 10px / 0.625rem | 1.4 | `--muted` |
| Eyebrow | Syne | 700 | 14px / 0.875rem | 1.2 | `--paper-2` |
| Statement h2 | Syne | 700 | clamp(3rem, 7vw, 5.8rem) | 0.96 | `--paper` |
| Apoio | Inter | 400 | clamp(0.95rem, 1.3vw, 1.1rem) | 1.65 | `--paper-2` |
| Numeral recortado | Syne | 800 | clamp(4.5rem, 9vw, 7rem) | 0.75 | transparent / stroke `--hairline` |
| Título do princípio | Syne | 700 | clamp(1.4rem, 2.4vw, 1.9rem) | 1.1 | `--paper` |
| Frase de impacto | Inter | 500 | clamp(1.15rem, 2vw, 1.55rem) | 1.35 | `--paper`, italic |
| Consequência | Inter | 400 | clamp(0.9rem, 1.15vw, 1rem) | 1.7 | `--paper-2` |
| Fecho | Inter | 400 | clamp(0.9rem, 1.1vw, 1rem) | 1.65 | `--paper-2` |

## Espaçamentos

- Padding da seção: `clamp(80px, 14vh, 160px) 0`.
- Gap entre label e eyebrow: 16px.
- Gap entre eyebrow e statement: 20px.
- Gap entre statement e apoio: 22px.
- Gap entre apoio e faixa de imagem: `clamp(56px, 8vh, 96px)`.
- Gap entre faixa de imagem e lista: `clamp(72px, 10vh, 120px)`.
- Gap entre título e impacto: 12px.
- Gap entre impacto e consequência: 18px.
- Padding vertical do item: `clamp(48px, 7vh, 88px)`.

## Cores por token

- Fundo: `--void-2`.
- Texto principal: `--paper`.
- Texto secundário: `--paper-2` / `--muted`.
- Hairlines: `--hairline`.
- Numeral recortado: stroke `--hairline`, opacidade 0.5.
- Overlay da imagem: gradiente de `--void-2` transparente para `--void-2` 85%.

## Componentes do design system usados

- `SectionLabel` (tone="dark"): label "Princípios / 03".
- `Hairline` (tone="dark"): separadores entre princípios.
- Nenhum `GlassPanel` exceto no tratamento visual da foto (pode ser simples `img` com overlay; o BRIEF permite vidro apenas na foto).

## Tema claro

- Fundo `--light-surface` / `--light-bg`.
- Texto `--light-text` / `--light-text-2`.
- Hairlines `--hairline-light`.
- Numeral recortado com stroke `--hairline-light`.
- Overlay da imagem usa `--light-bg`.

## Movimento

### Entrada
- Label, eyebrow, statement, apoio: reveal comum, 800ms, stagger 80ms.
- Faixa de imagem: `scale(1.02)→1`, `opacity 0→1`, 1000ms.
- Princípios: reveal por scroll, `translateY(28px)→0`, 700ms, stagger 100ms.

### Hover
- Item do manifesto: fundo `--surface-soft`.
- Numeral recortado aumenta levemente a opacidade de 0.5 para 0.7.
- Sem deslocamento.
- Duração 200ms.

### Fallback `prefers-reduced-motion`
- Tudo visível sem animação.
- Hover mantém mudança de fundo sem transição visível.

## Acessibilidade

- Semântica: `section` com `aria-labelledby="manifesto-title"`.
- Eyebrow "Como eu construo" não é `h2`; o `h2` é o statement.
- Lista: `ol` para os 7 princípios, cada `li` contém `article` com `aria-labelledby` apontando para o título.
- Numeral recortado: `aria-hidden="true"`.
- Imagem com `alt` descritivo.
- Ordem de leitura: label → eyebrow → h2 statement → apoio → imagem → lista ordenada → fecho.
- Contraste AA com tokens.

## Conexões visuais

- **Anterior (Mapa)**: de `--void` para `--void-2`.
- **Posterior (Selected Work)**: provavelmente volta para `--void` ou `--surface`; o manifesto funciona como bloco mais profundo.

## Riscos de design e mitigações

| Risco | Mitigação |
|---|---|
| Statement grande demais | max-width de 16ch e line-height apertado mantêm controle. |
| Sete itens virarem parede de texto | Escala alta no impacto, consequência em coluna estreita e espaçamento generoso. |
| Numeral recortado sumir no fundo escuro | stroke sobre hairline com opacidade 0.5 é suficiente para leitura decorativa; se necessário, eleva-se para 0.6. |
| Faixa full-bleed quebrar layout | `100vw` com compensação de margem do container. |

## Checklist de aceitação visual

- [ ] Label "Princípios / 03", eyebrow "Como eu construo", statement como h2.
- [ ] Statement: "Construo software e interfaces acessíveis onde design e engenharia são a mesma decisão."
- [ ] Faixa full-bleed com foto das mãos entre abertura e princípios.
- [ ] Sete princípios em lista contínua, separados por hairlines.
- [ ] Numeral recortado na borda esquerda, `aria-hidden`.
- [ ] Impacto em itálico e escala alta; consequência em coluna estreita.
- [ ] Sem cards, sem glassmorphism exceto na foto.
- [ ] Tema claro funciona.
- [ ] `prefers-reduced-motion` coberto.

## Alternativas descartadas

1. **Lista compacta de sete linhas idênticas**: rejeitada por ser simples demais.
2. **Cards para cada princípio**: rejeitada pelo BRIEF.
3. **Título "Como eu construo" como h2**: substituído por eyebrow; o statement vira h2.
