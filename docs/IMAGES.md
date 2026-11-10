# Imagens: fonte, geração e orçamento

As imagens do site são **geradas** a partir dos originais de alta resolução em
`assets-src/img/`. O app nunca importa os originais: ele consome apenas as
variantes de `src/img/generated/` (AVIF, WebP e JPEG por largura) através de
`src/img/responsive.ts` e do componente `src/components/ResponsivePicture.tsx`.

## Fluxo

```bash
# 1. troque/adicione o original em assets-src/img/
# 2. registre as larguras em scripts/optimize-images.mjs (TARGETS)
npm run images:optimize   # regenera src/img/generated/
npm run images:check      # valida o orçamento (mesmo check do CI)
```

`images:optimize` exige `sharp` (já em devDependencies). O script grava
`<nome>-<largura>.{avif,webp,jpg}` e imprime o tamanho de cada arquivo.

## Orçamento

`scripts/check-image-budget.mjs` roda no CI antes do lint e falha o build se:

- algum AVIF passar de **60 KB**, WebP de **70 KB** ou JPEG de **130 KB**;
- a soma de todas as variantes passar de **800 KB**.

Se estourar, ajuste qualidade/larguras em `optimize-images.mjs` em vez de
commitar arquivos maiores. Os arquivos gerados são versionados para o build do
GitHub Pages não depender de `sharp`.

## Como usar no código

```tsx
import { portraitHeroPicture } from "../img/responsive";
import { ResponsivePicture } from "../components/ResponsivePicture";

<ResponsivePicture
  {...portraitHeroPicture}
  alt="Retrato de Lucas Nonato"
  sizes="(max-width: 900px) 100vw, 60vw"
/>;
```

- `sizes` deve refletir a largura real renderizada; sem ele o navegador assume
  `100vw` e baixa variantes grandes sem necessidade.
- Use `loading="eager"` + `fetchPriority="high"` apenas na imagem do hero;
  todo o resto fica `loading="lazy"` (padrão do componente).
- `width`/`height` intrínsecos evitam layout shift.

## Originais no repositório

`assets-src/img/` não entra no bundle nem no deploy (o Vite só processa
`src/` e `public/`). Mantenha os originais lá para permitir regerar variantes
com outra qualidade/largura no futuro.
