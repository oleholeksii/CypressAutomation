describe('Alerts', () => {

  it('JS alert', () => {

    //JS alert: some text and OK button

    cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
    cy.get("button[onclick='jsAlert()']").click()

    cy.on('window:alert', (t) => {
      expect(t).to.contains('I am a JS Alert') // checking text on the alert
    })

    //alert window automatically closed by cypress

    cy.get('#result').should('have.text', 'You successfully clicked an alert')

  })

  it('JS confirmation alert - OK button (default)', () => {

    cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
    cy.get("button[onclick='jsConfirm()']").click()

    cy.on('window:confirm', (t) => {
      expect(t).to.contains('I am a JS Confirm') // checking text on the alert
    })

    //cypress automatically closed alert window by clicking OK button - default

    cy.get('#result').should('have.text', 'You clicked: Ok')

  })

  it('JS confirmation alert', () => {

    cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
    cy.get("button[onclick='jsConfirm()']").click()

    cy.on('window:confirm', (t) => {
      expect(t).to.contains('I am a JS Confirm') // checking text on the alert
    })

    cy.on('window:confirm', () => false) //cypress closes alert window using cancel button

    cy.get('#result').should('have.text', 'You clicked: Cancel')
  })

  it('JS Prompt alert', () => {

    cy.visit('https://the-internet.herokuapp.com/javascript_alerts')

    //before opening the alert window
    cy.window().then((windoow) => {

      cy.stub(windoow, 'prompt').returns('welcome')
    })

    cy.get("button[onclick='jsPrompt()']").click()
    //cypress will automatically close promted alert - it will use OK button by default

    // cy.on('window:prompt', () => false) trzeba pogrzebac bo nie dziala

    cy.get('#result').should('have.text', 'You entered: welcome')

  })

  it('Authenticated alert, approach 1', () => {

    cy.visit('https://the-internet.herokuapp.com/basic_auth',
      {
        auth:
        {
          username: 'admin',
          password: 'admin'
        }
      })


    cy.get("div[class='example'] p").should('have.contain', 'Congratulations!')

  })

  it.only('Authenticated alert, approach 2', () => {

    cy.visit('https://admin:admin@the-internet.herokuapp.com/basic_auth')


    cy.get("div[class='example'] p").should('have.contain', 'Congratulations!')

  })

})