/**
 * Teclado e foco (PRD cypress-a11y-responsivo).
 *
 * Ordem de tabulação, foco visível, Escape no drawer e no snackbar. Usa o
 * plugin cypress-plugin-tab para reproduzir Tab real, não .focus().
 */
const tabUntil = (testId: string, attempts = 20): void => {
  cy.focused().tab()
  cy.focused().then(($el) => {
    if ($el.attr('data-testid') === testId) return
    if (attempts <= 0) {
      throw new Error(`Tab não alcançou [data-testid="${testId}"]`)
    }
    tabUntil(testId, attempts - 1)
  })
}

describe('acessibilidade: teclado e foco', () => {
  it('alcança o toggle de tema por Tab, com foco visível', () => {
    cy.visitApp('/')
    cy.get('[data-testid="presentation-section"]').should('be.visible')

    cy.get('a[href="#home"]').first().focus()
    tabUntil('theme-toggle')

    cy.focused().should('have.attr', 'data-testid', 'theme-toggle')
    cy.focused().should(($el) => {
      const style = getComputedStyle($el[0])
      expect(style.outlineStyle, 'outline presente').not.to.eq('none')
      expect(parseFloat(style.outlineWidth), 'largura do outline').to.be.greaterThan(0)
    })
  })

  it('campos do formulário são alcançáveis e rotulados', () => {
    cy.visitApp('/')
    cy.waitForSection('contact-section')

    cy.get('#contact-nome').focus().should('be.focused')
    cy.focused().tab().should('have.id', 'contact-email')
    cy.focused().tab().should('have.id', 'contact-message')
  })

  it('Escape fecha o drawer e devolve o foco ao hambúrguer', () => {
    cy.viewport(390, 844)
    cy.visitApp('/')
    cy.get('[data-testid="presentation-section"]').should('be.visible')

    cy.get('[data-testid="mobile-menu-button"]').click()
    cy.get('[data-testid="mobile-menu"]').should('be.visible')
    cy.get('body').should('have.css', 'overflow', 'hidden')

    cy.get('body').type('{esc}')

    cy.get('[data-testid="mobile-menu"]').should('not.exist')
    cy.get('[data-testid="mobile-menu-button"]').should('be.focused')
    cy.get('body').should('not.have.css', 'overflow', 'hidden')
  })

  it('Escape fecha o snackbar de erro', () => {
    cy.visitApp('/')
    cy.waitForSection('contact-section')
    cy.interceptContact({ statusCode: 500, body: { ok: false } })

    cy.get('#contact-nome').type('Lucas')
    cy.get('#contact-email').type('lucas@example.com')
    cy.get('#contact-message').type('Mensagem de teste')
    cy.get('[data-testid="contact-section"]')
      .contains('button', 'Enviar mensagem')
      .click()

    cy.get('[role="alert"]').should('be.visible')
    cy.get('body').type('{esc}')
    cy.get('[role="alert"]').should('not.exist')
  })
})

export {}
