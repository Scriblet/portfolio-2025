/**
 * Conteúdo das seções (PRD cypress-secoes-conteudo).
 *
 * Verifica o que o visitante realmente vê: hero, mapa de IA, manifesto,
 * selected work, habilidades, GitHub, contato e rodapé. Os dados vêm do
 * currículo de Lucas Nonato, então mudanças de copy precisam passar por aqui.
 */
describe('seções: conteúdo e dados reais', () => {
  beforeEach(() => {
    cy.visitApp('/')
    cy.waitForSection('presentation-section')
  })

  it('exibe o hero com nome e retrato responsivo', () => {
    cy.get('[data-testid="presentation-name"]').should('contain.text', 'Lucas Nonato')

    cy.get('[data-testid="presentation-image"]')
      .should('be.visible')
      // Foto decorativa: o nome vem do texto, então alt vazio é intencional.
      .and('have.attr', 'alt', '')
      .and('have.attr', 'loading', 'eager')

    cy.get('[data-testid="presentation-section"] picture source')
      .first()
      .should('have.attr', 'srcset')
      .and('include', '.avif')
  })

  it('conta os cinco cases em ordem do mais recente', () => {
    cy.waitForSection('selected-work-section')

    cy.get('[data-testid="selected-work-heading"]').should(
      'contain.text',
      'Cases, não cargos',
    )
    cy.get('[data-testid^="selected-work-case-"]').should('have.length', 5)

    cy.get('[data-testid="selected-work-case-vivo-aura"]')
      .should('contain.text', 'Vivo (Telefônica Brasil)')
      .and('contain.text', 'mar/2026 – atual')
      .and('contain.text', 'Agentes de IA em produção')
    cy.get('[data-testid="selected-work-case-porto-seguro"]').should(
      'contain.text',
      'Porto Seguro',
    )
    cy.get('[data-testid="selected-work-case-thoughtworks"]').should(
      'contain.text',
      'Thoughtworks',
    )
    cy.get('[data-testid="selected-work-case-arcotech"]').should(
      'contain.text',
      'ArcoTech',
    )
    cy.get('[data-testid="selected-work-case-finger"]').should(
      'contain.text',
      'Finger Consultoria',
    )
  })

  it('mantém as âncoras antigas experience e jornada', () => {
    cy.waitForSection('selected-work-section')

    cy.get('#experience').should('exist')
    cy.get('#jornada').should('exist')
  })

  it('mostra as competências técnicas', () => {
    cy.waitForSection('skills-section')

    cy.get('[data-testid="skills-heading"]').should('contain.text', 'Competências')
    cy.get('[data-testid^="skill-card-"]').should('have.length.at.least', 4)
  })

  it('mostra o mapa de maturidade com as cinco camadas', () => {
    cy.waitForSection('ia-maturity-section')

    cy.get('[data-testid="ia-maturity-heading"]').should(
      'contain.text',
      'Onde a IA vira sistema',
    )
    cy.get('[data-testid^="ia-maturity-layer-"]').should('have.length', 5)
    cy.get('[data-testid="ia-maturity-layer-contexto-rag"]').should(
      'contain.text',
      'estudo aplicado e protótipos',
    )
  })

  it('mostra o manifesto como spread editorial com a foto das mãos', () => {
    cy.waitForSection('manifesto-section')

    cy.get('[data-testid="manifesto-statement"]').should(
      'contain.text',
      'design e engenharia',
    )
    cy.get('[data-testid^="manifesto-principle-"]').should('have.length', 7)
    cy.get('[data-testid="manifesto-image"]')
      .should('have.attr', 'alt')
      .and('include', 'mãos')
  })

  it('convida ao GitHub com link seguro', () => {
    cy.waitForSection('github-section')

    cy.get('[data-testid="github-section"]').should('contain.text', 'Código aberto')
    cy.get('[data-testid="github-link"]')
      .should('have.attr', 'href')
      .and('include', 'github.com/scriblet')

    cy.get('[data-testid="github-link"]').should('have.attr', 'target', '_blank')

    cy.get('[data-testid="github-link"]')
      .should('have.attr', 'rel')
      .and('include', 'noopener')
  })

  it('oferece três propostas de valor antes do formulário', () => {
    cy.waitForSection('contact-section')

    cy.get('[data-testid="contact-section"] h2').should(
      'contain.text',
      'Vamos resolver algo real?',
    )
    cy.get('[data-testid^="contact-proposal-"]').should('have.length', 3)

    cy.get('[data-testid="contact-proposal-ia-no-produto"]')
      .should('contain.text', 'Integrar IA no seu produto')
      .and('contain.text', 'custo, latência e falha sob controle')
      .and('have.prop', 'tagName', 'BUTTON')
      .click()

    cy.get('#contact-message').should(
      'have.value',
      'Olá, quero falar sobre integrar IA no meu produto.',
    )
  })

  it('oferece LinkedIn na seção de contato', () => {
    cy.waitForSection('contact-section')

    cy.get('[data-testid="contact-email"]').should('not.exist')
    cy.get('[data-testid="contact-linkedin"]').should(
      'have.attr',
      'href',
      'https://www.linkedin.com/in/lucas-nonato1',
    )
  })

  it('fecha com rodapé, redes e ano corrente', () => {
    cy.get('footer').scrollIntoView()

    cy.get('footer a[aria-label]')
      .should('have.length', 2)
      .and(($links) => {
        const hrefs = Array.from($links).map((link) => link.getAttribute('href'))
        expect(hrefs).to.include('https://github.com/scriblet')
        expect(hrefs).to.include('https://www.linkedin.com/in/lucas-nonato1')
      })
    cy.get('footer').should('contain.text', String(new Date().getFullYear()))
    cy.get('footer a[href^="mailto:"]').should('not.exist')
  })
})
