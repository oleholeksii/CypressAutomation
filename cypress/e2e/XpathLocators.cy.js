describe ('Xpath locators', () => {
  
  it('find number of products', () => {
    cy.visit('http://www.automationpractice.pl/index.php')

    cy.get(".blockbestsellers[data-toggle='tab']").click()

    // cy.get("//ul[@id='blockbestsellers']/li").should('have.length', 6) //This package has been deprecated

    cy.get('#blockbestsellers').find('li').should('have.length', 6)
  })
})