/**
 * Responsivo e movimento (PRD cypress-a11y-responsivo).
 *
 * Regra do header em 375/768/1280, alvos de toque e prefers-reduced-motion.
 */
const expectMinTouchTarget = (testId: string) => {
  cy.get(`[data-testid="${testId}"]`).should(($el) => {
    const rect = $el[0].getBoundingClientRect()
    expect(rect.width, `${testId} largura`).to.be.at.least(44)
    expect(rect.height, `${testId} altura`).to.be.at.least(44)
  })
}

describe('responsivo e movimento', () => {
  beforeEach(() => {
    cy.enableReducedMotion()
  })

  it('375px: links somem, drawer aparece e CTA some', () => {
    cy.viewport(375, 812)
    cy.visitApp('/')
    cy.get('[data-testid="presentation-section"]').should('be.visible')

    cy.get('header nav ul').should('not.be.visible')
    cy.get('[data-testid="mobile-menu-button"]').should('be.visible')
    cy.get('[data-testid="header-cta"]').should('not.be.visible')

    expectMinTouchTarget('mobile-menu-button')
    expectMinTouchTarget('theme-toggle')
  })

  it('768px: links somem, drawer e CTA continuam visíveis', () => {
    cy.viewport(768, 1024)
    cy.visitApp('/')
    cy.get('[data-testid="presentation-section"]').should('be.visible')

    cy.get('header nav ul').should('not.be.visible')
    cy.get('[data-testid="mobile-menu-button"]').should('be.visible')
    cy.get('[data-testid="header-cta"]').should('be.visible')
    cy.get('[data-testid="theme-toggle"]').should('be.visible')
  })

  it('1280px: navegação completa, sem overflow horizontal', () => {
    cy.viewport(1280, 720)
    cy.visitApp('/')
    cy.waitForSection('contact-section')

    cy.get('header nav ul').should('be.visible')
    cy.get('[data-testid="mobile-menu-button"]').should('not.be.visible')
    cy.get('[data-testid="header-cta"]').should('be.visible')

    cy.window().should((win) => {
      expect(win.document.documentElement.scrollWidth).to.be.at.most(
        win.innerWidth,
      )
    })
  })

  it('reduced motion: reveal visível sem animação', () => {
    cy.visitApp('/')
    cy.get('[data-testid="presentation-section"]').should('be.visible')

    cy.get('[data-reveal]').first().should('be.visible')
    cy.get('.ds-reveal-root').should('not.have.attr', 'data-motion')
    cy.get('[data-testid="site-header"]').should(($header) => {
      expect(getComputedStyle($header[0]).transitionDuration).to.eq('0s')
    })
  })

  it('movimento normal: reveal acontece após rolar até a seção', () => {
    cy.disableReducedMotion()
    cy.visitApp('/')
    cy.waitForSection('manifesto-section')

    cy.get('[data-testid="manifesto-section"] [data-reveal]')
      .first()
      .scrollIntoView()
      .should('have.attr', 'data-revealed', 'true')
  })
})

export {}
