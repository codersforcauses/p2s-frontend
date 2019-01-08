/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable spaced-comment */
/// <reference types="Cypress" />

describe('Testing 404 page', () => {
  beforeEach(() => {
    cy.visit('/abcd');
  });

  it('On mobile', () => {
    cy.viewport('iphone-5');
    cy.get('button[name="back"]').should('be.visible').contains('Back');
    cy.get('h1').should('be.visible').contains('404');
    cy.get('h2').should('be.visible').contains('Page Not Found');
  });

  it('On desktop', () => {
    cy.get('button[name="back"]').should('be.visible').contains('Back');
    cy.get('h1').should('be.visible').contains('404');
    cy.get('h2').should('be.visible').contains('Page Not Found');
  });
});
