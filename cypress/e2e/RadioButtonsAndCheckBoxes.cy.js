describe('Check UI elements', () => {

  xit('Checking Radio Buttons', () => {
    cy.visit('https://testautomationpractice.blogspot.com/')
    cy.get('#cookieChoiceDismiss').click()

    //visibility of radio buttons
    cy.get('#male').should('be.visible')
    cy.get('#female').should('be.visible')

    //selecting radio buttons
    cy.get('#male').check().should('be.visible')
    cy.get('#female').should('not.be.checked')

    cy.get('#female').check().should('be.visible')
    cy.get('#male').should('not.be.checked')

  })

  it('Checking check boxes', () => {
    cy.visit('https://testautomationpractice.blogspot.com/')
    cy.get('#cookieChoiceDismiss').click()

    cy.get('#sunday')
      .should('be.visible')
      .check()
      .should('be.checked')

    cy.get('#sunday')
      .uncheck()
      .should('not.be.checked')

    //selecting all the checkboxes

    cy.get("input.form-check-input[type='checkbox']")
      .check()
      .should('be.checked')

    cy.get("input.form-check-input[type='checkbox']")
      .uncheck()
      .should('not.be.checked')

    cy.get("input.form-check-input[type='checkbox']")
      .first().check()

    cy.get("input.form-check-input[type='checkbox']")
      .last().check()

  })

})