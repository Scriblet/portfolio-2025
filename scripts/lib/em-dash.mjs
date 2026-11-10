/**
 * Regra de copy do projeto: o travessão (em dash, U+2014) é proibido.
 *
 * O caractere é montado com `String.fromCharCode` de propósito: este arquivo
 * precisa poder se autoconsultar sem acusar a si mesmo. Ao editar, não escreva
 * o caractere nem entidades/escapes literais nos padrões abaixo.
 *
 * Consumido por:
 *  - `eslint-rules/no-em-dash.mjs` (arquivos de código)
 *  - `scripts/check-no-em-dash.mjs` (markdown, css, html, yml, json, txt)
 *
 * Ver `docs/agents/copy.md`.
 */

/** O caractere proibido (travessão / em dash / U+2014). */
export const EM_DASH = String.fromCharCode(0x2014);

/** Mensagem única usada por ESLint e pelo checker. */
export const EM_DASH_MESSAGE =
  "Travessão (em dash, U+2014) proibido. Use vírgula, dois-pontos, parênteses ou ponto final. Ver docs/agents/copy.md.";

/**
 * Formas de escrever o travessão. Todas caem na mesma regra:
 * o caractere literal, a entidade HTML e os escapes de string.
 */
export const EM_DASH_PATTERNS = Object.freeze([
  new RegExp(EM_DASH, "g"),
  /&(?:mdash|#8212|#x2014);/gi,
  /\\u\{?2014\}?/g,
  /\\x2014/g,
]);

/**
 * Localiza todas as ocorrências do travessão em um texto.
 * @param {string} text
 * @returns {{ index: number, length: number }[]}
 */
export const findEmDashes = (text) => {
  const hits = [];
  for (const pattern of EM_DASH_PATTERNS) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      hits.push({ index: match.index, length: match[0].length });
    }
  }
  return hits.sort((a, b) => a.index - b.index);
};
