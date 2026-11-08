# Issue — Tokens e tipografia do sistema imersivo

Status: done

## Parent

PRD: `.scratch/05-immersive/design-system-immersive/PRD.md`

## What to build

Criar `src/theme/immersive.tokens.ts` e o bloco de custom properties escopado (`.immersiveScope`) com a paleta escura, acentos, escala tipográfica, espaçamento, raios, hairlines, sombras e tokens de movimento. Configurar `@fontsource/syne`, `@fontsource/inter` e `@fontsource/sora` com subsets `latin` no escopo da rota `/immersive`.

## Acceptance criteria

- [x] Tokens exportados e tipados com os valores exatos da direção (`#0A0C0E`, `#101317`, `#18181B`, `#EDE7DC`, `#9EA5A8`, `#6C7378`, `#34D399`, `#E8913C`, `#2E6B72`).
- [x] Escala tipográfica definida: Syne 600/700/800, Inter 300/400/500, Sora 400/500.
- [x] Custom properties sob `.immersiveScope` espelham os tokens TS para consumo em SCSS.
- [x] Fontes carregadas no chunk da rota sem alterar a tipografia global do MUI.
- [x] Nenhum valor de cor/tamanho duplicado em componentes consumidores.
- [x] Teste unitário valida o espelho TS e a presença dos tokens obrigatórios.

## Blocked by

Nenhum.
