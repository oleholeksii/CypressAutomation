context('Network requests', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/network-requests')
  })

  it('request', () => {
    cy.request('https://jsonplaceholder.cypress.io/comments')
      .should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.length(500)
        expect(response).to.have.property('headers')
        expect(response).to.have.property('duration')
      })

    cy.request('https://jsonplaceholder.cypress.io/users?_limit=1')
      .its('body.0') // yields the first element of the returned list
      .then((user) => {
        expect(user).property('id').to.be.a('number')
        // make a new post on behalf of the user
        cy.request('POST', 'https://jsonplaceholder.cypress.io/posts', {
          userId: user.id,
          title: 'Cypress Test Runner',
          body: 'Fast, easy and reliable testing for anything that runs in a browser.',
        })
      })
      // note that the value here is the returned value of the 2nd request
      // which is the new post object
      .then((response) => {
        expect(response).property('status').to.equal(201) // new entity created
        expect(response).property('body').to.contain({
          title: 'Cypress Test Runner',
        })
        // we don't know the exact post id - only that it will be > 100
        // since JSONPlaceholder has built-in 100 posts
        expect(response.body).property('id').to.be.a('number')
          .and.to.be.gt(100)
        // we don't know the user id here - since it was in above closure
        // so in this test just confirm that the property is there
        expect(response.body).property('userId').to.be.a('number')
      })
  })

})