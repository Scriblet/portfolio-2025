/**
 * Imagens responsivas usadas no portfólio.
 *
 * As variantes em `src/img/generated` são produzidas por
 * `npm run images:optimize` (scripts/optimize-images.mjs). Não edite os
 * arquivos gerados à mão.
 *
 * `sizes` descreve a largura renderizada em cada breakpoint. Sem ele o
 * navegador assume 100vw e baixa variantes grandes à toa.
 */

import hero480Avif from "./generated/retrato-hero-480.avif";
import hero800Avif from "./generated/retrato-hero-800.avif";
import hero1200Avif from "./generated/retrato-hero-1200.avif";
import hero480Webp from "./generated/retrato-hero-480.webp";
import hero800Webp from "./generated/retrato-hero-800.webp";
import hero1200Webp from "./generated/retrato-hero-1200.webp";
import heroJpg from "./generated/retrato-hero-1200.jpg";

import hands640Avif from "./generated/multiracial-hands-coming-together-640.avif";
import hands1024Avif from "./generated/multiracial-hands-coming-together-1024.avif";
import hands1600Avif from "./generated/multiracial-hands-coming-together-1600.avif";
import hands640Webp from "./generated/multiracial-hands-coming-together-640.webp";
import hands1024Webp from "./generated/multiracial-hands-coming-together-1024.webp";
import hands1600Webp from "./generated/multiracial-hands-coming-together-1600.webp";
import handsJpg from "./generated/multiracial-hands-coming-together-1600.jpg";

import type { PictureSources } from "../components/ResponsivePicture";

/** Retrato 1:1 do hero (portal e home). */
export const portraitHero: PictureSources = {
  avif: `${hero480Avif} 480w, ${hero800Avif} 800w, ${hero1200Avif} 1200w`,
  webp: `${hero480Webp} 480w, ${hero800Webp} 800w, ${hero1200Webp} 1200w`,
  fallback: heroJpg,
  width: 1200,
  height: 1200,
  sizes: "(max-width: 900px) 100vw, 60vw",
};

/** Imagem da seção Filosofia (3:2). */
export const philosophyHands: PictureSources = {
  avif: `${hands640Avif} 640w, ${hands1024Avif} 1024w, ${hands1600Avif} 1600w`,
  webp: `${hands640Webp} 640w, ${hands1024Webp} 1024w, ${hands1600Webp} 1600w`,
  fallback: handsJpg,
  width: 1600,
  height: 1053,
  sizes: "(max-width: 900px) 100vw, 50vw",
};
