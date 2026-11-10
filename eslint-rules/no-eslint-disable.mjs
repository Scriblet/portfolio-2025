/**
 * Regra local do ESLint: proíbe comentários que desligam regras.
 *
 * Desabilitar uma regra esconde o problema no ponto onde ele acontece. A
 * correção esperada é ajustar o código ou a configuração da regra, com a
 * justificativa registrada na config, não espalhada em comentários.
 *
 * @type {import('eslint').Rule.RuleModule}
 */
const noEslintDisable = {
  meta: {
    type: "problem",
    docs: {
      description: "Proíbe comentários eslint-disable",
      url: "docs/agents/testing.md",
    },
    schema: [],
    messages: {
      forbidden:
        "Comentários eslint-disable são proibidos. Corrija a regra ou ajuste a configuração com justificativa.",
    },
  },
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode();

    return {
      Program() {
        for (const comment of sourceCode.getAllComments()) {
          if (!/^\s*eslint-(disable|enable)/.test(comment.value)) continue;

          context.report({
            loc: comment.loc,
            messageId: "forbidden",
          });
        }
      },
    };
  },
};

export default noEslintDisable;
