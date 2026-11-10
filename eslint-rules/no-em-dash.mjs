/**
 * Regra local do ESLint: proíbe o travessão (em dash, U+2014).
 *
 * Lê o texto bruto do arquivo, então pega strings, JSX, comentários e
 * templates de uma vez. Para arquivos fora do alcance do ESLint (markdown,
 * css, html, yml) existe `npm run lint:text`.
 */
import {
  EM_DASH_MESSAGE,
  findEmDashes,
} from "../scripts/lib/em-dash.mjs";
import noEslintDisable from "./no-eslint-disable.mjs";

/** @type {import('eslint').Rule.RuleModule} */
const noEmDash = {
  meta: {
    type: "problem",
    docs: {
      description: "Proíbe o travessão (em dash, U+2014) em qualquer texto",
      url: "docs/agents/copy.md",
    },
    schema: [],
    messages: {
      emDash: EM_DASH_MESSAGE,
    },
  },
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode();

    return {
      Program(node) {
        const text = sourceCode.getText();

        for (const hit of findEmDashes(text)) {
          context.report({
            node,
            loc: {
              start: sourceCode.getLocFromIndex(hit.index),
              end: sourceCode.getLocFromIndex(hit.index + hit.length),
            },
            messageId: "emDash",
          });
        }
      },
    };
  },
};

export default {
  meta: { name: "local" },
  rules: {
    "no-em-dash": noEmDash,
    "no-eslint-disable": noEslintDisable,
  },
};
