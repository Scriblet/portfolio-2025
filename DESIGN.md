# Design — Lucas Nonato Portfolio

Documento de design do portfólio. Captura o sistema visual atual (base) e a nova direção imersiva em preview na rota `/immersive`.

## 1. Registro & tom

- **Registro**: portfólio pessoal / creative-developer. Design é o produto.
- **Tom**: técnico, editado, com arquitetura clara. Sem clichês de SaaS, sem métricas-herói genéricas.
- **Big idea**: interface que parece um HUD sofisticado — vidro fosco, tipografia expansiva, scroll como narrativa. Ainda é um portfólio: Hero, Sobre, Skills, Experiência, Contato.

## 2. Paleta

### Base (portfólio atual)

Tokens definidos em `src/theme.ts`:

| Token | Valor | Uso |
|---|---|---|
| `colors.primary` | `#0a192f` | Background principal escuro |
| `colors.secondary` | `#112240` | Surface secundário |
| `colors.tertiary` | `#233554` | Hover/destaque sutil |
| `colors.textPrimary` | `#ccd6f6` | Texto primário |
| `colors.textSecondary` | `#8892b0` | Texto secundário |
| `colors.accent` | `#64ffda` | Links, bordas, estados |
| `colors.white` | `#e6f1ff` | Títulos, texto branco suave |
| `colors.black` | `#020c1b` | Áreas muito escuras |

### Imersivo (`/immersive`)

Tokens em `src/pages/immersive/immersive.module.scss`:

| Token | Valor | Uso |
|---|---|---|
| `--void` | `#0a0c0e` | Fundo hero e fechamento |
| `--void-2` | `#101317` | Fundo seção Experiência |
| `--surface` | `#18181b` | Cards e surfaces secundários |
| `--paper` | `#ede7dc` | Texto primário imersivo |
| `--paper-2` | `#9ea5a8` | Texto secundário |
| `--muted` | `#6c7378` | Metadados, subtítulos |
| `--light-bg` | `#f4f4f5` | Fundo seção Sobre |
| `--light-surface` | `#ffffff` | Glass sobre fundo claro |
| `--light-text` | `#18181b` | Texto sobre fundo claro |
| `--emerald` | `#34d399` | Estados, indicadores, períodos |
| `--amber` | `#e8913c` | Ênfase editorial |
| `--deep-teal` | `#2e6b72` | Duotone sobre fotografia |

**Regra de acentos**: esmeralda e âmbar nunca aparecem como grandes superfícies sólidas. São usados em detalhes, bordas finas, indicadores e palavras destacadas.

## 3. Tipografia

### Famílias

- **Base do portfólio**: `Calibre` (fallback Inter/system-ui) para títulos; `Inter` para corpo. Definido em `theme.ts`.
- **Imersivo**:
  - Display / wordmark: `Syne`, 700–800.
  - Corpo / UI: `Inter`, 300–500.
  - Mono / labels: `Sora`, 400–600 (ou var(--font-mono)).

### Escala imersiva

| Elemento | Tamanho | Tracking | Altura de linha |
|---|---|---|---|
| Wordmark hero | `clamp(3.2rem, 10vw, 10.5rem)` | `-0.02em → -0.05em` (scroll) | 0.78 |
| Display seção | `clamp(2.4rem, 6.2vw, 5.6rem)` | -0.04em | 0.95 |
| Statement Sobre | `clamp(2rem, 4.8vw, 4.2rem)` | -0.04em | 1.02 |
| Título card | `clamp(1.3rem, 2vw, 1.6rem)` | -0.03em | 1.2 |
| Corpo | `13–16px` | normal | 1.55–1.65 |
| Labels / mono | `9–11px` | `0.12em–0.18em` uppercase | 1.2 |
| Index numeral | `clamp(8rem, 22vw, 18rem)` | -0.06em | 0.72 |

## 4. Glassmorphism

Material principal da interface imersiva. Deve ser arquitetural, não decorativo.

```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(44px) saturate(190%);
border: 1px solid rgba(255, 255, 255, 0.18);
border-radius: 24px;
box-shadow:
  0 12px 40px rgba(0, 0, 0, 0.22),
  inset 0 1px 0 rgba(255, 255, 255, 0.12);
```

Sobre fundo claro:

```css
background: rgba(255, 255, 255, 0.84);
backdrop-filter: blur(44px) saturate(190%);
border: 1px solid rgba(255, 255, 255, 0.72);
box-shadow:
  0 12px 40px rgba(0, 0, 0, 0.08),
  inset 0 1px 0 rgba(255, 255, 255, 0.55);
```

Usado em: navegação flutuante, metadados do hero, HUD pessoal, cards de Skills, cards da timeline, card de Contato, campos de formulário.

## 5. Layout & grid

### Container imersivo

Max-width `1600px`, padding lateral `clamp(28px, 6vw, 112px)`. Centralizado.

### Seções principais (`/immersive`)

1. **Hero / Portal**: `155vh` total, stage sticky `100svh`. Painéis de vidro escuro abrem via scroll.
2. **Sobre**: fundo claro `#f4f4f5`, grid 2 colunas (statement + HUD), numeral gigante de fundo.
3. **Skills**: fundo `--void`, grid `auto-fit minmax(280px, 1fr)`.
4. **Experiência**: fundo `--void-2`, timeline `110px 1fr` desktop, empilhado mobile.
5. **Contato**: fundo `--void`, grid 2 colunas (copy + card de formulário), wordmark final.

### Navegação

Barra flutuante fixa, `~58px` de altura, pill geometry, blur `20px`, borda fina. Wordmark + links uppercase + CTA pill.

## 6. Componentes

### Portfólio base

- `Header`, `Footer`, `Presentation`, `About`, `Experience`, `Projects`, `Skills`, `Contact`.
- Botão `DownloadCvButton` em `src/components/DownloadCvButton.tsx`.
- `PresentationAvatar`.

### Imersivo

Localizados em `src/pages/immersive/`:

- `immersive.tsx`: composição da página, lazy-loaded em `App.tsx`.
- `ImmersiveNav.tsx`: navegação flutuante.
- `PortalHero.tsx`: hero scroll-driven.
- `sections.tsx`: Sobre, Skills, Experiência, Contato.
- `ui.tsx`: primitivos `PillButton`, `SectionLabel`, `PillIcon`.
- `ImmersiveContactForm.tsx`: formulário enxuto no card de contato.
- `hooks/useScrollProgress.ts`, `hooks/useReveal.ts`, `hooks/useReducedMotion.ts`.
- `content.ts`: todos os textos reais do currículo.

## 7. Movimento

- **Portal**: totalmente scroll-driven. `--p` varia de 0 a 1 conforme scroll. Painéis saem, foto escala de 1.12 a 1, wordmark separa, tracking aperta. Reversível.
- **Reveal**: `opacity` + `translateY(20px)` para `0`, `800ms`, `cubic-bezier(0.16, 1, 0.3, 1)`. Disparado uma vez por `IntersectionObserver`.
- **Hover**: `300ms`, scale até 1.05, transições de cor/borda.
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` remove animações; portal fica estático/aberto; reveals instantâneos.

## 8. Responsivo

- Desktop: portal completo, 2–3 colunas, timeline lado a lado.
- Tablet: grid reduzido, tipografia proporcional, hero preservado.
- Mobile: colunas empilhadas, timeline em 1 coluna, navegação compacta, meta escondidos progressivamente.

## 9. Assets

- Foto do hero e retrato circular: placeholder controlado. Deve ser substituído por fotos reais do autor.
- Grain overlay SVG fixo a ~12% opacidade.
- Fontes via `@fontsource` (Syne, Inter, Sora).

## 10. Integridade de conteúdo

- Dados de experiência e skills extraídos de `src/data/experiences.ts` e `src/data/skills.ts`.
- Períodos profissionais originam do currículo `public/cv/lucas-nonato-cv.pdf`.
- Nenhum dado inventado (streaming, números, prêmios, datas).
