/**
 * Orçamento das imagens geradas (`src/img/generated`).
 *
 * Uso: `npm run images:check` (roda no CI).
 *
 * O site é estático e as imagens são o maior ativo do carregamento inicial.
 * Se uma variante estourar o orçamento, `npm run images:optimize` deve ser
 * ajustado (qualidade/larguras) antes do merge.
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, "src", "img", "generated");

/** Limite por arquivo, em KB, por formato. */
const PER_FILE_KB = { avif: 60, webp: 70, jpg: 130 };
/** Soma de todas as variantes, em KB. */
const TOTAL_KB = 800;

const parseKb = (bytes) => bytes / 1024;

const main = async () => {
  const files = (await readdir(DIR)).filter((file) => !file.startsWith("."));
  if (files.length === 0) {
    console.error("[images:check] nenhuma variante encontrada. Rode `npm run images:optimize`.");
    process.exitCode = 1;
    return;
  }

  const failures = [];
  let total = 0;

  for (const file of files.sort()) {
    const { size } = await stat(path.join(DIR, file));
    const kb = parseKb(size);
    total += kb;

    const ext = path.extname(file).slice(1).toLowerCase();
    const budget = PER_FILE_KB[ext];
    if (budget === undefined) continue;

    if (kb > budget) {
      failures.push(`${file}: ${kb.toFixed(1)} KB > ${budget} KB`);
    }
  }

  if (total > TOTAL_KB) {
    failures.push(`total: ${total.toFixed(0)} KB > ${TOTAL_KB} KB`);
  }

  if (failures.length > 0) {
    console.error("[images:check] orçamento estourado:");
    for (const failure of failures) console.error(`  - ${failure}`);
    process.exitCode = 1;
    return;
  }

  console.log(
    `[images:check] ok — ${files.length} arquivos, ${total.toFixed(0)} KB (limite ${TOTAL_KB} KB)`,
  );
};

main().catch((error) => {
  console.error("[images:check] falhou:", error);
  process.exitCode = 1;
});
