describe('Assertions demo', () => {
  it('Implicit assertions', () => {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    // 1) should, 2) and
    //eq > exactly equal

    // cy.url().should('include', 'orangehrmlive.com')
    // cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    // cy.url().should('contain', 'orangehrm')

    // cy.url().should('include', 'orangehrmlive.com')
    //   .should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    //   .should('contain', 'orangehrm')

    cy.url().should('include', 'orangehrmlive.com')
      .and('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      .and('contain', 'orangehrm')
      .and('not.contain', 'greenhrm')

    cy.title().should('include', 'HRM')
      .and('eq', 'OrangeHRM')
      .and('contain', 'HRM')

    cy.get('.orangehrm-login-branding > img').should('be.visible')
      .and('exist')
    //be.visible and exist are the same in this case


    cy.get('a').should('have.length', '5') //number of links

    cy.get("input[placeholder='Username']").type('Admin')
    cy.get("input[placeholder='Username']").should('have.value', 'Admin')
  })

  it('Explicit assertions', () => {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get("input[placeholder='Username']").type('Admin')
    cy.get("input[placeholder='Password']").type('admin123')
    cy.get("[type='submit']").click()

    let expName = "Test 9 Collings"

    cy.get('.oxd-userdropdown-name').then((x) => {
      let actName = x.text()

      //BDD Style
      expect(actName).to.equal(expName)
      // expect(actName).to.not.equal(expName)

      //TDD Style
      assert.equal(actName, expName)
      // assert.not.equal(actName, expName)

    })



  })

})