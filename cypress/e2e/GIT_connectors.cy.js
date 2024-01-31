context('Connectors', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/connectors')
  })

  it('.each() - iterate over an array of elements', () => {
    cy.get('.connectors-each-ul>li')
      .each(($el, index, $list) => {
        console.log($el, index, $list)
      })
  })
})
