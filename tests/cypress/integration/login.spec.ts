/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

describe.only('Login', () => {
  before(function() {
    cy.deleteMyUserIfExists()
    cy.registerUser()
  })

  beforeEach(() => {
    cy.clearCookies()
    cy.visit('/')
  })

  it('displays "Sign in to Exodus" on the login page', () => {
    cy.contains('h1', 'Sign in to Exodus').should('be.visible')
  })

  it('displays register page on "Join now" click', () => {
    cy.getBySel('link-signup-button').click()
    cy.get('h1')
      .should('contain', 'Sign Up')
      .and('be.visible')
  })

  it('requires phone number', () => {
    cy.getBySel('phone-input').clear()
    cy.getBySel('signin-button').click()
    cy.getBySel('login-error-message').should('contain', 'Required fields are empty')
  })

  it('requires password', () => {
    cy.getBySel('phone-input').clear()
    cy.getBySel('pwd-input').clear()
    cy.getBySel('phone-input').type(`${Cypress.env('phone')}`)
    cy.getBySel('signin-button').click()
    cy.getBySel('login-error-message')
      .should('be.visible')
      .and('contain', 'Required fields are empty')
  })

  it('should error for an invalid user', () => {
    cy.manualLogin({ username: `123456789123` })
      .its('response.statusCode')
      .should('eq', 400)
    cy.getBySel('login-error-message')
      .should('be.visible')
      .and('have.text', 'User does not exist.')
  })

  it('should error for an invalid password for existing user', () => {
    cy.manualLogin({ password: `Wr0ngPa$$word` })
      .its('response.statusCode')
      .should('eq', 400)
    cy.getBySel('login-error-message')
      .should('be.visible')
      .and('have.text', 'Incorrect password.')
  })

  it('displays home page on successful login', () => {
    cy.manualLogin()
      .its('response.statusCode')
      .should('eq', 200)
    cy.getBySel('menu-button').should('be.visible')
    cy.getCookie('jwt').should('have.property', 'value')
  })
})
