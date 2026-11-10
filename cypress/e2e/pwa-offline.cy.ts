/**
 * OfflineNotice (PRD cypress-pwa-offline).
 *
 * Roda contra build/preview, onde o service worker existe. No dev server o
 * spec é pulado em vez de dar falso positivo.
 */
const isPreview = () =>
  String(Cypress.config('baseUrl') ?? '').includes(':4173')

describe('PWA: aviso de offline', () => {
  before(function () {
    if (!isPreview()) this.skip()
  })

  beforeEach(() => {
    cy.visitApp('/')
    cy.requireServiceWorker()
  })

  it('mostra, esconde e recarrega pelo botão', () => {
    cy.get('[data-testid="offline-notice"]').should('not.exist')

    cy.window().then((win) => {
      win.dispatchEvent(new win.Event('offline'))
    })

    cy.get('[data-testid="offline-notice"]')
      .should('be.visible')
      .and('have.attr', 'role', 'status')
      .and(
        'contain.text',
        'Você está offline. O conteúdo em cache continua disponível.',
      )

    cy.window().then((win) => {
      win.dispatchEvent(new win.Event('online'))
    })

    cy.get('[data-testid="offline-notice"]').should('not.exist')

    cy.window().then((win) => {
      win.dispatchEvent(new win.Event('offline'))
      // Marcador em memória: sobrevive a qualquer coisa, menos a um reload.
      ;(win as Window & { __reloadProbe?: string }).__reloadProbe = 'alive'
    })

    cy.get('[data-testid="offline-notice"]')
      .contains('button', 'Tentar novamente')
      .click()

    cy.window().should((win) => {
      expect(
        (win as Window & { __reloadProbe?: string }).__reloadProbe,
        'o reload limpou o marcador',
      ).to.be.undefined
    })
  })
})

export {}
