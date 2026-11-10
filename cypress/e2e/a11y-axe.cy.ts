import { checkA11y } from '../support/a11y'

/**
 * Varredura axe-core (PRD cypress-a11y-responsivo).
 *
 * Uma passada por página/estado. Apenas `serious`/`critical` bloqueiam;
 * exceções aceitas ficam em `cypress/support/a11y-exceptions.ts`.
 */
describe('acessibilidade: axe-core', () => {
  it('home sem violações bloqueantes', () => {
    cy.visitApp('/')
    cy.waitForSection('contact-section')

    checkA11y('main')
  })

  it('/immersive sem violações bloqueantes', () => {
    cy.visitApp('/immersive')
    cy.get('[data-testid="immersive-page"]').should('be.visible')
    cy.get('html').should('have.attr', 'data-mui-color-scheme', 'dark')

    checkA11y('main')
  })

  it('formulário com erros de validação visíveis', () => {
    cy.visitApp('/')
    cy.waitForSection('contact-section')

    cy.get('[data-testid="contact-section"]')
      .contains('button', 'Enviar mensagem')
      .click()

    cy.get('#contact-nome-error').should('be.visible')

    checkA11y('[data-testid="contact-section"]')
  })

  it('drawer aberto no mobile', () => {
    cy.viewport(390, 844)
    cy.visitApp('/')
    cy.get('[data-testid="presentation-section"]').should('be.visible')

    cy.get('[data-testid="mobile-menu-button"]').click()
    cy.get('[data-testid="mobile-menu"]').should('be.visible')

    checkA11y('[data-testid="mobile-menu"]')
  })

  it('tema claro', () => {
    cy.visitApp('/')
    cy.waitForSection('contact-section')

    cy.get('[data-testid="theme-toggle"]').click()
    cy.get('html').should('have.attr', 'data-mui-color-scheme', 'light')
    cy.get('main').should(($main) => {
      // Garante que os tokens claros já foram aplicados antes do axe.
      expect(
        getComputedStyle($main[0]).getPropertyValue('--paper').trim(),
      ).to.eq('#181023')
    })

    // O axe deve medir o estado final, não o meio de uma transição de cor.
    cy.window().then((win) => {
      const style = win.document.createElement('style')
      style.textContent =
        '*,*::before,*::after{transition:none!important;animation:none!important}'
      win.document.head.appendChild(style)
    })

    checkA11y('main')
  })
})
