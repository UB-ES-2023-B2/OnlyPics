// failed-login.spec.js

describe('Failed Login', () => {
  it('should fail to login due to incorrect password', () => {
    // Visit the login page
    cy.visit('/')

    cy.contains('Log In').click()
    // Fill out the login form with incorrect password
    cy.get('#username').type('nametest')
    cy.get('#password').type('incorrectpassword')

    // Click the "LOG IN" button
    cy.get('.btn-primary').click()

    // Assert an error message or any indication of failed login
    cy.on('window:alert',(txt)=>
       //Mocha assertions
       expect(txt).to.contains('Incorrect Password'))
  })
})
