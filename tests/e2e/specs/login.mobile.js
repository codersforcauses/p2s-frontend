/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable spaced-comment */
/// <reference types="Cypress" />

import fake from 'faker';

describe('Mobile Login Test', () => {
  const email = fake.internet.email();
  const pass = fake.internet.password(8);

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport('iphone-5');
    cy.visit('/login');
  });

  it('Visits the Login page and finds the p2s logo', () => {
    cy.get('div.v-image')
      .should('be.visible')
      .should('have.css', 'background-image');
  });

  it('Visits the Login page and finds the login form', () => {
    cy.get('label').contains('EMAIL').should('be.visible');
    cy.get('[name="email"]').should('be.visible');
    cy.get('label').contains('PASSWORD').should('be.visible');
    cy.get('[name="password"]').should('be.visible');
    cy.get('button[name="login"]').should('be.disabled');
    cy.get('button[name="forgotPass"]').should('be.visible');
  });

  it('Logs user in, fails', () => {
    cy.login(email, pass);
    cy.wait(5000);
    cy.get('div[name="alert"]').contains('Error:').should('be.visible');
  });

  // Fails until connected to the backend
  // it('Logs user in, pass', () => {
  //   cy.login();
  // });
});
