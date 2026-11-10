import { A11Y_EXCEPTIONS } from './a11y-exceptions'

type AxeImpact = 'minor' | 'moderate' | 'serious' | 'critical'

type AxeNode = {
  target: string[]
  html: string
  failureSummary?: string
}

type AxeViolation = {
  id: string
  impact: AxeImpact | null
  help: string
  nodes: AxeNode[]
}

type AxeResults = {
  violations: AxeViolation[]
}

const BLOCKING_IMPACTS: AxeImpact[] = ['serious', 'critical']

const formatViolation = (violation: AxeViolation) =>
  [
    `[axe] ${violation.id} (${violation.impact ?? 'sem impacto'}): ${violation.help}`,
    ...violation.nodes.map(
      (node) =>
        `  • ${node.target.join(' ')} :: ${node.html.slice(0, 160)}${
          node.failureSummary ? `\n    ${node.failureSummary}` : ''
        }`,
    ),
  ].join('\n')

/**
 * Injeta axe-core na página e roda a varredura no contexto informado.
 *
 * Bloqueia apenas `serious` e `critical`; `minor`/`moderate` são logadas.
 * Exceções vivem em `a11y-exceptions.ts`, com justificativa por regra.
 */
export const checkA11y = (
  context: string | Element = 'main',
  options: { impacts?: AxeImpact[] } = {},
) => {
  const impacts = options.impacts ?? BLOCKING_IMPACTS

  cy.readFile('node_modules/axe-core/axe.min.js').then((source) => {
    cy.window({ log: false }).then((win) => {
      const scopedWindow = win as Window & {
        axe?: {
          run: (
            node: Element,
            config: Record<string, unknown>,
          ) => Promise<AxeResults>
        }
        eval: (code: string) => void
      }

      if (!scopedWindow.axe) {
        scopedWindow.eval(source)
      }

      const node =
        typeof context === 'string'
          ? win.document.querySelector(context)
          : context

      expect(node, `contexto axe não encontrado: ${context}`).to.exist

      return scopedWindow.axe!.run(node as Element, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
        },
      })
    })
  }).then((results: AxeResults) => {
    const violations = results.violations.filter(
      (violation) => !A11Y_EXCEPTIONS[violation.id],
    )

    const accepted = results.violations.filter(
      (violation) => A11Y_EXCEPTIONS[violation.id],
    )

    if (accepted.length > 0) {
      cy.log(
        `[axe] exceções aceitas: ${accepted
          .map((violation) => violation.id)
          .join(', ')}`,
      )
    }

    results.violations
      .filter((violation) => !impacts.includes(violation.impact as AxeImpact))
      .forEach((violation) => cy.log(formatViolation(violation)))

    const blocking = violations.filter((violation) =>
      impacts.includes(violation.impact as AxeImpact),
    )

    if (blocking.length > 0) {
      throw new Error(
        `${blocking.length} violação(ões) axe bloqueante(s):\n\n${blocking
          .map(formatViolation)
          .join('\n\n')}`,
      )
    }
  })
}
