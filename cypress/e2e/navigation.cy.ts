/**
 * Navegação e tema (PRD cypress-smoke-navegacao).
 *
 * Cobre: rotas públicas, âncoras do header e do rodapé, drawer mobile com
 * Escape e restauração de foco, troca de tema persistida e barra de progresso.
 */
describe('navegação: rotas, âncoras e tema', () => {
  it('serve o portfólio em / e a prévia imersiva em /immersive', () => {
    cy.visitApp('/')
    cy.get('[data-testid="presentation-section"]').should('be.visible')

    cy.visitApp('/immersive')
    cy.get('[data-testid="immersive-page"]').should('be.visible')
    cy.get('[data-testid="immersive-hero"]').should('be.visible')
    cy.title().should('contain', 'Preview imersivo')
    cy.get('meta[name="robots"]').should('have.attr', 'content', 'noindex, nofollow')
  })

  it('rola até a seção ao clicar em uma âncora do header', () => {
    cy.visitApp('/')
    cy.waitForSection('selected-work-section')

    cy.get('header').contains('a', 'Trabalho').click()

    // O offset do header (-80px) deixa o topo da seção perto de 0.
    cy.get('[data-testid="selected-work-section"]').should(($section) => {
      const top = $section[0].getBoundingClientRect().top
      expect(top).to.be.lessThan(120)
      expect(top).to.be.greaterThan(-200)
    })
  })

  it('rola até a seção pelo link do rodapé', () => {
    cy.visitApp('/')
    cy.waitForSection('contact-section')

    cy.get('footer').contains('a', 'Trabalho').click()

    cy.get('[data-testid="selected-work-section"]').should(($section) => {
      const top = $section[0].getBoundingClientRect().top
      expect(top).to.be.lessThan(120)
    })
  })

  describe('drawer mobile', () => {
    beforeEach(() => {
      cy.viewport(390, 844)
      cy.visitApp('/')
      cy.waitForSection('selected-work-section')
    })

    it('abre, navega e fecha ao clicar em um item', () => {
      cy.get('[data-testid="mobile-menu-button"]')
        .should('have.attr', 'aria-expanded', 'false')
        .click()

      cy.get('[data-testid="mobile-menu"]')
        .should('be.visible')
        .and('have.attr', 'aria-modal', 'true')

      cy.get('[data-testid="mobile-menu"]').contains('a', 'Trabalho').click()

      cy.get('[data-testid="mobile-menu"]').should('not.exist')
      cy.get('[data-testid="selected-work-section"]').should(($section) => {
        expect($section[0].getBoundingClientRect().top).to.be.lessThan(120)
      })
    })

    it('fecha com Escape e devolve o foco ao botão do menu', () => {
      cy.get('[data-testid="mobile-menu-button"]').click()
      cy.get('[data-testid="mobile-menu"]').should('be.visible')

      cy.get('body').type('{esc}')

      cy.get('[data-testid="mobile-menu"]').should('not.exist')
      cy.get('[data-testid="mobile-menu-button"]').should('be.focused')
    })
  })

  it('alterna e persiste o tema claro/escuro', () => {
    cy.visitApp('/')

    cy.get('html').should('have.attr', 'data-mui-color-scheme', 'dark')

    cy.get('[data-testid="theme-toggle"]').should('have.attr', 'aria-pressed', 'true').click()

    cy.get('html').should('have.attr', 'data-mui-color-scheme', 'light')
    cy.get('[data-testid="theme-toggle"]')
      .should('have.attr', 'aria-pressed', 'false')
      .and('have.attr', 'aria-label', 'Ativar tema escuro')
    cy.window().then((win) => {
      expect(win.localStorage.getItem('portfolio-color-mode')).to.eq('light')
    })

    cy.reload()
    cy.get('html').should('have.attr', 'data-mui-color-scheme', 'light')
  })

  it('avança a barra de progresso ao rolar a página', () => {
    cy.visitApp('/')
    cy.waitForSection('contact-section')

    cy.get('[data-testid="reading-progress"]')
      .invoke('attr', 'aria-valuenow')
      .then((initial) => {
        expect(Number(initial)).to.be.lessThan(5)
      })

    cy.scrollTo('bottom')

    cy.get('[data-testid="reading-progress"]').should(($bar) => {
      expect(Number($bar.attr('aria-valuenow'))).to.be.greaterThan(60)
    })
  })
})
