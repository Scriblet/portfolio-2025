import { defineConfig } from 'cypress'

/**
 * Cypress E2E — configuração base.
 *
 * Regras do repo (docs/agents/testing.md):
 * - E2E é opt-in: nunca no loop de desenvolvimento.
 * - Localmente, rode um spec por vez (`npm run test:e2e:spec -- <arquivo>`).
 * - A suíte completa roda em CI.
 *
 * `CYPRESS_BASE_URL` permite apontar a mesma suíte para dev (`/`), preview
 * local (`http://localhost:4173`) ou GitHub Pages (`.../portfolio-2025/`).
 * `CYPRESS_SPEC` permite restringir o specPattern sem mexer no config.
 *
 * O E2E sobe o próprio dev server em :5174 para não colidir com o `npm run dev`
 * normal (:5173).
 */
const baseUrl = process.env.CYPRESS_BASE_URL || 'http://localhost:5174'
const specPattern = process.env.CYPRESS_SPEC || 'cypress/e2e/**/*.cy.ts'

export default defineConfig({
  e2e: {
    baseUrl,
    specPattern,
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
    // Local: sem vídeo para não pesar; screenshots só em falha.
    video: false,
    screenshotOnRunFailure: true,
    // Um retry em CI absorve flakes de timing; local não esconde problema.
    retries: { runMode: 1, openMode: 0 },
    setupNodeEvents() {
      // Sem plugins por enquanto (axe-core entra no PRD de a11y).
    },
  },
})
