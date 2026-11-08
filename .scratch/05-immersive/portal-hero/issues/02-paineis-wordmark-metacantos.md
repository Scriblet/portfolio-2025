# Issue — Painéis, wordmark e meta-cantos do hero

Status: done

## Parent

PRD: `.scratch/05-immersive/portal-hero/PRD.md`

## What to build

Implementar os painéis arquitetônicos que se abrem, o wordmark "LUCAS NONATO" dividido em duas metades e os quatro meta-cantos de glass com dados reais (nome, cargo, localização, stack, experiência).

## Acceptance criteria

- [x] Painéis esquerdo/direito ocupam 50.25% cada e se deslocam `±101% * --p`.
- [x] Wordmark dividido em spans "LUCAS" e "NONATO" que se afastam `∓16vw` com `--p`.
- [x] Wordmark é `h1` com `aria-label="LUCAS NONATO"`; spans `aria-hidden`.
- [x] Quatro meta-cantos de glass posicionados nos cantos do palco.
- [x] Meta-cantos exibem dados reais de `PERSON`/`heroMeta` (`content.ts`).
- [x] Painéis são `aria-hidden`; meta-cantos legíveis por leitor de tela.

## Blocked by

- `.scratch/05-immersive/portal-hero/issues/01-hook-progresso-portal.md`
- `.scratch/05-immersive/design-system-immersive/issues/02-vidro-grao-rotulos.md`
