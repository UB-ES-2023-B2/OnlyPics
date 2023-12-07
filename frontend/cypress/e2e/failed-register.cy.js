
describe('Failed Register', () => {
  it('should fail to register due to incorrect data', () => {
    // Visit the login page
    cy.visit('/')
    // Fill out the login form with incorrect password
    cy.get('#username').type('nametest')
    cy.get('#password').type('incorrectpassword')
    cy.get('#email').type('incorrectemail')
    // Click the "LOG IN" button
    cy.get('.btn-primary').click()

    // Assert an error message or any indication of failed login
    cy.on('window:alert',(txt)=>
       //Mocha assertions
       expect(txt).to.contains('Error creating the account'))
  })
})
