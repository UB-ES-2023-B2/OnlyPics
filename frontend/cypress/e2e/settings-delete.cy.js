describe('Settings delete', () => {
  it('should create a new user, delete it and check it has been deleted', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
    cy.visit('/')
    cy.get('#username').type('testtobedeleted')
    cy.get('#password').type('12345aA.')
    cy.get('#email').type('email@deleted.com')
    cy.get('.btn-primary').click()
    cy.once("window:alert", (str) => {
      expect(str).to.equal('Account created successfully')
    })
    cy.get('.text-center').contains('Log In').click()
    cy.get('#username').clear().type('testtobedeleted')
    cy.get('#password').clear().type('12345aA.')
    cy.get('.btn-primary').click()
    cy.once("window:alert", (str) => {
      expect(str).to.equal('Successfully logged')
    })
    cy.url().should('contain','/inicio')
    cy.get('.dropdown-content').contains('Settings').click({force: true})
    cy.get('.delete-button').contains('Delete Account').click()

    cy.once("window:confirm", (str) => {
      expect(str).to.contain('Are you sure you want to delete your account?')
    })
    cy.once("window:alert", (str) => {
      expect(str).to.contain('Your account has been successfully deleted.')
    })
    cy.url().should('contain','/')
    cy.contains("Log In").click()
    cy.get('#username').type("testtobedeleted")
    cy.get('#password').type("12345aA.")
    cy.once("window:alert",(str) => {
      expect(str).to.contain('Email or Password incorrect')
    })
  })
})
