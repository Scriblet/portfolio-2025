# Issue — Fotografia, duotonia e vinheta do hero

Status: done

## Parent

PRD: `.scratch/05-immersive/portal-hero/PRD.md`

## What to build

Aplicar a fotografia pessoal full-bleed com tratamento duotônico teal→âmbar, vinheta radial e gradiente inferior. Garantir `object-fit: cover`, scale controlado por `--p` e `alt` descritivo.

## Acceptance criteria

- [x] Asset `src/img/presetation.jpg` usado como foto do hero.
- [x] Foto preenche o palco com `object-fit: cover` e `object-position` adequado.
- [x] Camada duotônica usa `mix-blend-mode: color` com teal `#2E6B72` e âmbar `#E8913C`.
- [x] Vinheta radial + gradiente inferior garantem contraste dos meta-cantos.
- [x] `scale(1.12 → 1)` ligado a `--p`.
- [x] Imagem tem `alt` descritivo e carregamento otimizado.

## Blocked by

- `.scratch/05-immersive/portal-hero/issues/01-hook-progresso-portal.md`
