describe('smoke: home', () => {
  it('carrega o hero e as seções principais', () => {
    cy.visitApp('/')

    cy.get('[data-testid="presentation-section"]').should('be.visible')
    cy.get('[data-testid="presentation-name"]').should('contain.text', 'Lucas Nonato')

    cy.waitForSection('ia-maturity-section')
    cy.waitForSection('manifesto-section')
    cy.waitForSection('selected-work-section')
    cy.waitForSection('skills-section')
    cy.waitForSection('contact-section')
  })

  it('expõe o controle de tema no header', () => {
    cy.visitApp('/')

    cy.get('[data-testid="site-header"]').should('be.visible')
    cy.get('[data-testid="theme-toggle"]').should('be.visible')
  })
})
