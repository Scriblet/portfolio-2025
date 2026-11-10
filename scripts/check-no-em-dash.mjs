/**
 * Guarda de copy: nenhum travessão (em dash, U+2014) no repositório.
 *
 * Uso: `npm run lint:text` (roda dentro de `npm run lint`, portanto no CI).
 *
 * O ESLint cobre arquivos de código via `eslint-rules/no-em-dash.mjs`. Este
 * script cobre o que o ESLint não lê: markdown, css/scss, html, json, yml,
 * txt e arquivos de configuração soltos.
 *
 * Ver `docs/agents/copy.md`.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { findEmDashes } from "./lib/em-dash.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");

/** Diretórios que não são fonte (build, cache, deps, artefatos de teste). */
const IGNORED_DIRS = new Set([
  ".cache",
  ".git",
  ".parcel-cache",
  ".vitest",
  "coverage",
  "dist",
  "dist-ssr",
  "downloads",
  "node_modules",
  "out",
  "screenshots",
  "videos",
]);

/** Extensões de texto lidas por este script (código fica com o ESLint). */
const TEXT_EXTENSIONS = new Set([
  ".css",
  ".example",
  ".gitignore",
  ".html",
  ".json",
  ".md",
  ".mdx",
  ".scss",
  ".svg",
  ".txt",
  ".webmanifest",
  ".yaml",
  ".yml",
]);

/** Arquivos de texto sem extensão que valem conferir. */
const TEXT_FILENAMES = new Set([".editorconfig", ".gitattributes", ".gitignore", ".nvmrc"]);

/** Gerados ou enormes, sem valor de copy. */
const IGNORED_FILES = new Set(["package-lock.json", "pnpm-lock.yaml", "yarn.lock"]);

const isTextFile = (name) =>
  TEXT_FILENAMES.has(name) || TEXT_EXTENSIONS.has(path.extname(name).toLowerCase());

/** @param {string} dir @returns {Promise<string[]>} caminhos absolutos */
const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      if (entry.isDirectory()) {
        return IGNORED_DIRS.has(entry.name) ? [] : walk(path.join(dir, entry.name));
      }
      if (!entry.isFile() || IGNORED_FILES.has(entry.name)) return [];
      return isTextFile(entry.name) ? [path.join(dir, entry.name)] : [];
    }),
  );
  return files.flat();
};

const main = async () => {
  const files = await walk(ROOT);
  const failures = [];
  let scanned = 0;

  for (const file of files.sort()) {
    scanned += 1;
    const text = await readFile(file, "utf8");
    const hits = findEmDashes(text);
    if (hits.length === 0) continue;

    const lines = text.split(/\r?\n/);
    for (const hit of hits) {
      const before = text.slice(0, hit.index);
      const line = before.split(/\r?\n/).length;
      const column = before.length - before.lastIndexOf("\n");
      const source = (lines[line - 1] ?? "").trim().slice(0, 120);
      failures.push(`${path.relative(ROOT, file)}:${line}:${column}  ${source}`);
    }
  }

  if (failures.length > 0) {
    console.error(`[lint:text] travessão (em dash, U+2014) encontrado em ${failures.length} ponto(s):`);
    for (const failure of failures) console.error(`  ${failure}`);
    console.error("  Use vírgula, dois-pontos, parênteses ou ponto final. Ver docs/agents/copy.md.");
    process.exitCode = 1;
    return;
  }

  console.log(`[lint:text] ok, ${scanned} arquivos sem travessão.`);
};

main().catch((error) => {
  console.error("[lint:text] falhou:", error);
  process.exitCode = 1;
});
