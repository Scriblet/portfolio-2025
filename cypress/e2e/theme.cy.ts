/**
 * Tema claro/escuro (PRD cypress-smoke-navegacao).
 *
 * Cobre alternância, meta theme-color, persistência em localStorage e herança
 * na prévia /immersive. Todas as asserções usam estado (atributos, storage),
 * nunca classes CSS do MUI.
 */
describe('tema: alternância, meta e persistência', () => {
  it('alterna tema, atualiza meta theme-color e persiste', () => {
    cy.visitApp('/')
    cy.waitForSection('presentation-section')

    cy.get('html').should('have.attr', 'data-mui-color-scheme', 'dark')
    cy.get('meta[name="theme-color"]')
      .invoke('attr', 'content')
      .as('darkColor')

    cy.get('[data-testid="theme-toggle"]')
      .should('have.attr', 'aria-pressed', 'true')
      .click()

    cy.get('html').should('have.attr', 'data-mui-color-scheme', 'light')
    cy.get('[data-testid="theme-toggle"]')
      .should('have.attr', 'aria-pressed', 'false')
      .and('have.attr', 'aria-label', 'Ativar tema escuro')

    cy.get('meta[name="theme-color"]')
      .invoke('attr', 'content')
      .then((lightColor) => {
        cy.get<string>('@darkColor').then((darkColor) => {
          expect(darkColor).not.to.eq(lightColor)
        })
      })

    cy.window().then((win) => {
      expect(win.localStorage.getItem('portfolio-color-mode')).to.eq('light')
    })

    cy.reload()
    cy.get('html').should('have.attr', 'data-mui-color-scheme', 'light')
    cy.get('[data-testid="theme-toggle"]').should(
      'have.attr',
      'aria-pressed',
      'false',
    )
  })

  it('primeira visita sem preferência começa no tema escuro', () => {
    cy.visitApp('/')
    cy.waitForSection('presentation-section')

    cy.window().then((win) => {
      expect(win.localStorage.getItem('portfolio-color-mode')).to.be.null
    })
    cy.get('html').should('have.attr', 'data-mui-color-scheme', 'dark')
  })

  it('/immersive herda o tema persistido e não mostra o toggle', () => {
    cy.visitApp('/')
    cy.waitForSection('presentation-section')
    cy.get('[data-testid="theme-toggle"]').click()
    cy.get('html').should('have.attr', 'data-mui-color-scheme', 'light')

    cy.visit('/immersive')
    cy.get('[data-testid="immersive-page"]').should('be.visible')
    cy.get('html').should('have.attr', 'data-mui-color-scheme', 'light')
    // A prévia é sempre escura por design, mas não expõe o controle de tema.
    cy.get('[data-testid="theme-toggle"]').should('not.exist')
  })
})
