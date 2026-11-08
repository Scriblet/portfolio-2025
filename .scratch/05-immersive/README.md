# Onda 6 — Refactor imersivo

> Design system imersivo aplicado ao portfólio inteiro.  
> A rota `/immersive` é a referência visual e o laboratório aprovado.

## PRDs (7)

| # | Slug | Título | Status | Issues |
|---|------|--------|--------|--------|
| 1 | `design-system-immersive` | Design system imersivo | done | 4 |
| 2 | `portal-hero` | Portal hero scroll-driven | done | 4 |
| 3 | `editorial-about` | Seção Sobre editorial + HUD pessoal | done | 4 |
| 4 | `skills-glass-cards` | Grid de cards de glass para skills | done | 4 |
| 5 | `experience-timeline` | Timeline vertical de experiências | done | 4 |
| 6 | `contact-closing` | Fechamento escuro com formulário de contato | done | 4 |
| 7 | `motion-a11y-performance` | Motion, acessibilidade e performance | done | 4 |

**Total de issues:** 28 (4 por PRD).

## Referência visual

- `immersive-preview-page` — rota `/immersive` já existe como laboratório navegável.
  Status: **done** (mantida como referência).

## Estrutura de referência da página `/immersive`

1. **Portal Hero** — scroll-driven, painéis abrindo, wordmark dividido, foto + HUD real.
2. **Sobre** — layout split editorial + HUD pessoal com dados reais.
3. **Skills** — grid de cards de glass flutuantes de `src/data/skills.ts`.
4. **Experiência** — timeline vertical com datas reais de `src/data/experiences.ts`.
5. **Contato** — fechamento escuro com headline oversized + card de glass com formulário.

## Fundação global

- `src/styles/design-system.css` — tokens, vidro, grão, hairline, foco e reduced motion.
- `src/theme/designTokens.ts` — mesmos tokens em TypeScript.
- `src/components/design-system/index.tsx` — primitivas `GlassPanel`, `PillButton`,
  `SectionLabel`, `Hairline`, `GrainOverlay`, `IndexNumeral`.
- `src/theme.ts` / `src/theme/palettes.ts` — tema MUI alinhado à paleta imersiva.
- `src/main.tsx` — fontes Syne/Inter/Sora e CSS global.

## Convenções

- Cada PRD: `<slug>/PRD.md`
- Cada issue: `<slug>/issues/<NN>-<slug>.md`
- Triage: `Status:` no topo de cada issue (`ready-for-agent`, `done`, etc.)
