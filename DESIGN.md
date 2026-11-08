# Design — Lucas Nonato Portfolio

Documento de design do portfólio. A linguagem imersiva nasceu na rota
`/immersive` e agora é o sistema visual de todo o site.

## 1. Registro & tom

- **Registro**: portfólio pessoal / creative-developer. Design é o produto.
- **Tom**: técnico, editado, com arquitetura clara. Sem clichês de SaaS, sem
  métricas-herói genéricas.
- **Big idea**: uma interface que parece um HUD sofisticado — vidro fosco,
  tipografia expansiva, scroll como narrativa. Ainda é um portfólio: Hero,
  Experiência, Jornada, Filosofia, Habilidades, Stack, GitHub, Contato.

## 2. Paleta

Tokens em `src/styles/design-system.css` (CSS) e
`src/theme/designTokens.ts` (TypeScript).

| Token | Valor | Uso |
|---|---|---|
| `--void` | `#090b0d` | Fundo principal |
| `--void-2` | `#101317` | Superfície de seções alternadas |
| `--surface` | `#18181b` | Cards e superfícies secundárias |
| `--paper` | `#f1eee8` | Texto primário |
| `--paper-2` | `#a8afb2` | Texto secundário |
| `--muted` | `#737a7f` | Metadados e subtítulos |
| `--light-bg` | `#f4f4f5` | Fundo de seção clara |
| `--light-surface` | `#ffffff` | Vidro sobre claro |
| `--light-text` | `#18181b` | Texto sobre claro |
| `--emerald` | `#34d399` | Estados, indicadores, links |
| `--amber` | `#e8913c` | Ênfase editorial |
| `--deep-teal` | `#2e6b72` | Duotone e contraste no tema claro |

**Regra de acentos**: esmeralda e âmbar nunca aparecem como grandes superfícies
sólidas. São usados em detalhes, bordas finas, indicadores e palavras
destacadas.

## 3. Tipografia

- **Display / wordmark**: `Syne`, 600–800.
- **Corpo / UI**: `Inter`, 300–500.
- **Labels / metadados**: `Sora`, 400–600 (mono editorial).

| Elemento | Tamanho | Tracking | Altura de linha |
|---|---|---|---|
| Wordmark hero | `clamp(3rem, 10vw, 11rem)` | `-0.02em → -0.05em` | 0.78 |
| Display seção | `clamp(2.4rem, 6.2vw, 5.6rem)` | -0.04em | 0.95 |
| Statement | `clamp(2rem, 4.8vw, 4.2rem)` | -0.04em | 1.02 |
| Título card | `clamp(1.15rem, 2vw, 1.6rem)` | -0.03em | 1.2 |
| Corpo | `13–16px` | normal | 1.55–1.65 |
| Labels / mono | `9–11px` | `0.12em–0.18em` uppercase | 1.2 |

## 4. Glassmorphism

Material principal da interface. Deve ser arquitetural, não decorativo.

```css
background: rgba(255, 255, 255, 0.12);
backdrop-filter: blur(48px) saturate(190%);
border: 1px solid rgba(255, 255, 255, 0.2);
border-radius: 24px;
box-shadow:
  0 12px 40px rgba(0, 0, 0, 0.22),
  inset 0 1px 0 rgba(255, 255, 255, 0.12);
```

Sobre fundo claro:

```css
background: rgba(255, 255, 255, 0.84);
backdrop-filter: blur(48px) saturate(190%);
border: 1px solid rgba(255, 255, 255, 0.72);
box-shadow:
  0 12px 40px rgba(0, 0, 0, 0.08),
  inset 0 1px 0 rgba(255, 255, 255, 0.55);
```

Usado em: header, hero, HUD, cards de experiência, timeline, skills, toolbox,
GitHub, formulário de contato e rodapé.

## 5. Layout & grid

### Container global

`.ds-container`: `width: min(1600px, calc(100% - clamp(28px, 6vw, 112px)))`.
Ritmo vertical: `padding-block: clamp(120px, 18vh, 200px)`.

### Seções do site

1. **Header + Hero** — header glass pill fixo; hero editorial com foto,
   metadados reais e CTA.
2. **Experiência** — cards de vidro com numeração e dados de `experiences.ts`.
3. **Jornada** — timeline vertical com trilho em degradê e marcadores.
4. **Filosofia** — seção editorial escura com foto e CTA.
5. **Habilidades** — grid de cards de vidro de `skills.ts`.
6. **Stack e ferramentas** — catálogo filtrável com chips e cards de vidro.
7. **GitHub** — painel de vidro com CTA e logo.
8. **Contato** — fechamento com headline oversized, card de vidro e formulário.
9. **Rodapé** — wordmark, links mono, sociais e hairline.

## 6. Componentes

### Primitivas compartilhadas

Em `src/components/design-system/`:

- `GlassPanel` — superfície de vidro (dark/light).
- `Hairline` — linha de 1px com token.
- `GrainOverlay` — grão SVG fixo.
- `IndexNumeral` — numeral vazado.
- `PillButton` — botão-pílula com ícone.
- `PillIcon` — ícone circular.
- `SectionLabel` — label editorial mono.

### Seções

- `src/pages/header.tsx`, `presentation.tsx`
- `src/pages/experience/experience.tsx`
- `src/pages/timeline/timeline.tsx`
- `src/pages/filosofia/filosofia.tsx`
- `src/pages/skills/skills.tsx`
- `src/pages/toolbox/toolbox.tsx`
- `src/pages/github/github.tsx`
- `src/pages/formContact/contactForm.tsx`
- `src/pages/footer.tsx`

### Referência

- `src/pages/immersive/` — laboratório e referência visual (portal scroll-driven,
  Sobre, Skills, Experiência e Contato).

## 7. Movimento

- **Portal**: scroll-driven. `--p` varia de 0 a 1; painéis saem, foto escala,
  wordmark separa, tracking aperta. Reversível.
- **Reveal**: `opacity` + `translateY(20px)` para `0`, `800ms`,
  `cubic-bezier(0.16, 1, 0.3, 1)`. Disparado uma vez por `IntersectionObserver`.
- **Hover**: `300ms`, scale até 1.05, transições de cor/borda.
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` remove
  animações; portal fica estático/aberto; reveals instantâneos.

## 8. Responsivo

- Desktop: hero completo, grids 2–4 colunas, timeline lado a lado.
- Tablet: grids reduzidos, tipografia proporcional, hero preservado.
- Mobile: colunas empilhadas, timeline linear, navegação compacta, metadados
  escondidos progressivamente.

## 9. Assets

- Foto do hero/retrato: asset real quando disponível; placeholders sinalizados.
- Grain overlay SVG fixo a ~7,5% de opacidade.
- Fontes via `@fontsource` (Syne, Inter, Sora).

## 10. Integridade de conteúdo

- Dados de experiência e skills vêm de `src/data/experiences.ts` e
  `src/data/skills.ts`.
- Períodos profissionais vêm do currículo `public/cv/lucas-nonato-cv.pdf`.
- Nenhum dado inventado (streaming, números, prêmios, datas).
