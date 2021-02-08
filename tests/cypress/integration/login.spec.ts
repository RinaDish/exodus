/// <reference types="cypress" />


describe.only('Login', () => {
  //TO DO
  // before(() => cy.registerUserIfNeeded())
  beforeEach(() => {
    cy.visit('/')
  })

  // it('greets with Sign in', () => {
  //   cy.contains('h1', 'Sign In')
  // })

  // it('displays register page on "Join now" click', () => {
  //   cy.contains('Join now').click()
  //     .should('have.attr', 'href', '/signup')
  // })

  // it('requires phone number', () => {
  //   cy.get('form').contains('Sign in').click()
  // })

  // it('requires password', () => {
  //   cy.getBySel('phone').type(`${Cypress.env('user').username}{enter}`)
  //   cy.get('.error-msg')
  //     .should('contain', 'password number can\'t be blank')
  // })

<<<<<<< HEAD:e2e/cypress/integration/login.spec.js
  it('does not work with wrong credentials', {
    env: {
      invalid_password: 'invalid'
    }
  }, () => {
    cy.get('[data-automation-id=phone]').type(`${Cypress.env('user').phone}{enter}`)
    cy.get('[data-automation-id=password]').type("invalid{enter}")
    cy.get('.error-msg')
      .should('contain', 'phone or password is invalid')
  })
=======
  // it('does not work with wrong credentials', {
  //   env: {
  //     invalid_password: 'invalid'
  //   }
  // }, () => {
  //   cy.getBySel('phone').type(`${Cypress.env('user').username}{enter}`)
  //   cy.getBySel('password').type("invalid{enter}")
  //   cy.get('.error-msg')
  //     .should('contain', 'phone or password is invalid')
  // })
>>>>>>> main:tests/cypress/integration/login.spec.ts

  it('displays home page on successful login', () => {
    // cy.getBySel('phone').type(`Cypress.env('user').username{enter}`)
    // cy.getBySel('password').type(`Cypress.env('user').password{enter}`)
    // cy.task("db:getUser", "testtest");
    cy.window().should('have.property', 'top');
  })

})
