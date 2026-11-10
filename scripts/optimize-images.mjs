/**
 * Gera variantes responsivas (AVIF/WebP/JPEG) a partir dos originais em
 * `assets-src/img`.
 *
 * Uso: `npm run images:optimize`
 *
 * Os originais ficam fora de `src/` (não entram no bundle nem no build) e
 * servem só como fonte. O app importa apenas as variantes em
 * `src/img/generated`, o que permite `srcset` por largura/formato.
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE_DIR = path.join(ROOT, "assets-src", "img");
const OUTPUT_DIR = path.join(ROOT, "src", "img", "generated");

/** Larguras por arquivo de origem (a maior vira o fallback JPEG). */
const TARGETS = {
  "retrato-hero.jpg": [480, 800, 1200],
  "multiracial-hands-coming-together.jpg": [640, 1024, 1600],
};

const baseName = (file) => path.parse(file).name;

const emit = async (file, width) => {
  const source = path.join(SOURCE_DIR, file);
  const name = `${baseName(file)}-${width}`;
  const pipeline = sharp(source).resize({ width, withoutEnlargement: true });

  await Promise.all([
    pipeline.clone().avif({ quality: 50 }).toFile(path.join(OUTPUT_DIR, `${name}.avif`)),
    pipeline.clone().webp({ quality: 72 }).toFile(path.join(OUTPUT_DIR, `${name}.webp`)),
    pipeline.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(OUTPUT_DIR, `${name}.jpg`)),
  ]);
};

const main = async () => {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const existing = new Set(await readdir(SOURCE_DIR));
  for (const [file, widths] of Object.entries(TARGETS)) {
    if (!existing.has(file)) {
      console.warn(`[images] original ausente, ignorando: ${file}`);
      continue;
    }
    for (const width of widths) {
      await emit(file, width);
    }
    console.log(`[images] ${file} → ${widths.join(", ")}px (avif/webp/jpg)`);
  }

  const files = (await readdir(OUTPUT_DIR)).sort();
  let total = 0;
  for (const file of files) {
    const { size } = await stat(path.join(OUTPUT_DIR, file));
    total += size;
    console.log(`  ${file.padEnd(44)} ${(size / 1024).toFixed(1)} KB`);
  }
  console.log(`[images] ${files.length} arquivos, ${(total / 1024).toFixed(0)} KB no total`);
};

main().catch((error) => {
  console.error("[images] falhou:", error);
  process.exitCode = 1;
});
