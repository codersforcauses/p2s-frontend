/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable spaced-comment */
/// <reference types="Cypress" />

import fake from 'faker';

describe('Desktop Login Test', () => {
  const email = fake.internet.email();
  const pass = fake.internet.password(8);

  // const admin = {
  //   email: 'super@admin.god',
  //   pass: 'Qwerty123',
  // };

  beforeEach(() => {
    cy.visit('/login');
  });

  it('Visits the Login page and finds the p2s logo', () => {
    cy.get('div.v-image')
      .should('be.visible')
      .should('have.css', 'background-image');
  });

  it('Visits the Login page and finds the login form', () => {
    cy.get('label').should('be.visible').contains('EMAIL');
    cy.get('[name="email"]').should('be.visible');
    cy.get('label').should('be.visible').contains('PASSWORD');
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
  //   cy.login(admin.email, admin.pass);
  // });
});
