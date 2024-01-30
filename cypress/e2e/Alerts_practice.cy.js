describe('Alerts', () => {

  it('Alert with OK', () => {
    cy.visit('https://demo.automationtesting.in/Alerts.html')
    cy.get(".analystic[href='#OKTab']").click()
    cy.get(".btn.btn-danger").click()

    cy.on('window:alert', (t) => {
      expect(t).to.contain("I am an alert box!")
    })
  })

  it('Alert with OK&Cancel - OK', () => {
    cy.visit('https://demo.automationtesting.in/Alerts.html')
    cy.get(".analystic[href='#CancelTab']").click()
    cy.get(".btn.btn-primary").click()

    cy.on('window:confirm', (confirmMessage) => {
      expect(confirmMessage).to.contain("Press a Button !")
      return true
    })

    cy.get('#demo').should('have.text', 'You pressed Ok')
  })

  it('Alert with OK&Cancel - Cancel', () => {
    cy.visit('https://demo.automationtesting.in/Alerts.html')
    cy.get(".analystic[href='#CancelTab']").click()
    cy.get(".btn.btn-primary").click()

    cy.on('window:confirm', (confirmMessage) => {
      expect(confirmMessage).to.contain("Press a Button !")
      return false
    })

    cy.get('#demo').should('have.text', 'You Pressed Cancel')
  })

  it('Alert with Textbox', () => {
    cy.visit('https://demo.automationtesting.in/Alerts.html')

    //before the window is open we need to pass this window to 'win', then to arrow function
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Oleh')
    })
    cy.get(".analystic[href='#Textbox']").click()
    cy.get(".btn.btn-info").click()

    cy.get("#demo1").should('have.text', 'Hello Oleh How are you today')
  })

}
)