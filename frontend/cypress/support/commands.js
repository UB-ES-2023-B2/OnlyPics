// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', () => {
   // Visit the login page
    cy.visit('/')
    // Switch to registration view
    cy.contains('Log In').click()

    // Fill out the registration form
    cy.get('#username').type('nametest')
    cy.get('#password').type('.12345aA')
    // Click the "SIGN UP" button
    cy.get('.btn-primary').click()
    // Verify alert
     cy.once('window:alert',(txt)=>
       //Mocha assertions
       expect(txt).to.contains('Succesfully logged'))
    // Assert the URL after successful login
    cy.url().should('include', '/inicio')
})

Cypress.Commands.add('login_2', (username,password) => {
   // Visit the login page
    cy.visit('/')
    // Switch to registration view
    cy.contains('Log In').click()

    // Fill out the registration form
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    // Click the "SIGN UP" button
    cy.get('.btn-primary').click()
    // Verify alert
    cy.once('window:alert',(txt)=>
       //Mocha assertions
       expect(txt).to.contains('Succesfully logged'))
    // Assert the URL after successful login
    cy.url().should('include', '/inicio')
})

