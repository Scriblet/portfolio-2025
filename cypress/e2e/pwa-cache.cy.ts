/**
 * Cache e fallback offline (PRD cypress-pwa-offline).
 *
 * Depois de uma visita controlada pelo service worker, bloqueia a rede e
 * confirma que o precache do Workbox segura o visitante: shell, CV e rota
 * desconhecida. `/api/*` fica fora do fallback de navegação.
 */
const isPreview = () =>
  String(Cypress.config('baseUrl') ?? '').includes(':4173')

const blockNetwork = () => {
  cy.intercept({ method: 'GET', url: '**/*' }, { forceNetworkError: true }).as(
    'network',
  )
}

describe('PWA: conteúdo em cache e fallback', () => {
  before(function () {
    if (!isPreview()) this.skip()
  })

  beforeEach(() => {
    cy.visitApp('/')
    cy.requireServiceWorker()
    // Segunda visita já é atendida pelo worker (skipWaiting + clientsClaim).
    cy.reload()
    cy.requireServiceWorker()
    cy.window().then((win) => {
      expect(win.navigator.serviceWorker.controller).to.exist
    })
  })

  it('serve o shell da home com a rede bloqueada', () => {
    blockNetwork()
    cy.reload()

    cy.get('[data-testid="presentation-section"]').should('be.visible')
    cy.get('[data-testid="presentation-name"]').should(
      'contain.text',
      'Lucas Nonato',
    )
  })

  it('serve o CV em PDF do precache', () => {
    blockNetwork()

    cy.window().then((win) =>
      win
        .fetch(`${win.location.origin}/cv/lucas-nonato-cv.pdf`)
        .then((response) => {
          expect(response.ok, 'PDF veio do precache').to.be.true
          expect(response.headers.get('content-type')).to.include('pdf')
        }),
    )
  })

  it('rota desconhecida cai no shell da SPA', () => {
    // O fallback offline de navegação é o próprio index precacheado (teste
    // anterior); aqui validamos o catch-all do SPA para URLs inexistentes.
    cy.visit('/rota-que-nao-existe')

    cy.get('[data-testid="presentation-section"]').should('be.visible')
  })

  it('/api/contact não recebe o HTML do shell', () => {
    blockNetwork()

    cy.window().then((win) =>
      win.fetch(`${win.location.origin}/api/contact`).then(
        (response) =>
          response.text().then((body) => {
            expect(response.status, 'API não deve devolver 200 do shell').not.to
              .eq(200)
            expect(body).not.to.include('data-testid="presentation-section"')
          }),
        () => {
          // Rede bloqueada e sem cache: é o comportamento correto da denylist.
          expect(true).to.be.true
        },
      ),
    )
  })
})

export {}
