context('Navigation', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io')
    cy.get('.navbar-nav').contains('Commands').click()
    cy.get('.dropdown-menu').contains('Navigation').click()
  })

  it('cy.go() - go back or forward in the browser\'s history', () => {
    cy.location('pathname').should('include', 'navigation')

    cy.go('back')
    cy.location('pathname').should('not.include', 'navigation')

    cy.go('forward')
    cy.location('pathname').should('include', 'navigation')

    //clicling back
    cy.go(-1)
    cy.location('pathname').should('not.include', 'navigation')

    //clicking forward
    cy.go(1)
    cy.location('pathname').should('include', 'navigation')
  })

  it('.reload() - relaod the page', () => {
    cy.reload()

    // reload the page without using the cache
    cy.reload(true)
  })

  it('cy.visit() - visit a remote url', () => {
    // Visit any sub-domain of your current domain

    // Pass options to the visit
    cy.visit('https://example.cypress.io/commands/navigation', {
      timeout: 5000, // increase total time for the visit to resolve
      onBeforeLoad(contentWindow) {
        // contentWindow is the remote page's window object
        expect(typeof contentWindow === 'object').to.be.true
      },
      onLoad(contentWindow) {
        // contentWindow is the remote page's window object
        expect(typeof contentWindow === 'object').to.be.true
      }
    })
  })
})