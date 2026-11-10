/**
 * Header no scroll e progresso de leitura (PRD cypress-smoke-navegacao).
 *
 * Usa scroll real e asserções naturais (sem cy.wait fixo): o estado do header
 * é dirigido por requestAnimationFrame dentro de useScrollDirection.
 */
describe('header no scroll', () => {
  beforeEach(() => {
    cy.visitApp('/')
    cy.waitForSection('selected-work-section')
  })

  it('esconde ao descer e reaparece ao subir', () => {
    cy.get('[data-testid="site-header"]').should(
      'not.have.attr',
      'aria-hidden',
    )

    cy.scrollTo(0, 900)
    cy.get('[data-testid="site-header"]').should(
      'have.attr',
      'aria-hidden',
      'true',
    )

    cy.scrollTo(0, 300)
    cy.get('[data-testid="site-header"]').should(
      'not.have.attr',
      'aria-hidden',
    )
  })

  it('permanece visível no topo da página', () => {
    cy.scrollTo(0, 900)
    cy.get('[data-testid="site-header"]').should(
      'have.attr',
      'aria-hidden',
      'true',
    )

    cy.scrollTo(0, 0)
    cy.get('[data-testid="site-header"]').should(
      'not.have.attr',
      'aria-hidden',
    )
  })

  it('não se esconde enquanto o foco está no header', () => {
    cy.get('body').tab()
    cy.focused().then(($el) => {
      expect($el.closest('[data-testid="site-header"]')).to.have.length(1)
    })

    cy.scrollTo(0, 900)
    cy.get('[data-testid="site-header"]').should(
      'not.have.attr',
      'aria-hidden',
    )
  })

  it('avança o progresso de leitura e zera no topo', () => {
    cy.get('[data-testid="reading-progress"]')
      .invoke('attr', 'aria-valuenow')
      .then((initial) => expect(Number(initial)).to.be.lessThan(5))

    cy.scrollTo(0, 1200)
    cy.get('[data-testid="reading-progress"]').should(($bar) => {
      expect(Number($bar.attr('aria-valuenow'))).to.be.greaterThan(5)
    })

    cy.scrollTo(0, 0)
    cy.get('[data-testid="reading-progress"]').should(($bar) => {
      expect(Number($bar.attr('aria-valuenow'))).to.be.lessThan(5)
    })
  })
})
