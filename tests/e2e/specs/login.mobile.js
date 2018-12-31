
describe('Mobile Login Test', () => {
  it('Visits the Login page and finds the p2s logo', () => {
    cy.viewport('iphone-5');
    cy.visit('/login');
    cy.get('div.v-image')
      .should('be.visible')
      .should('have.css', 'background-image');
  });

  it('Visits the Login page and finds the login form', () => {
    cy.viewport('iphone-5');
    cy.visit('/login');
    cy.get('label').should('be.visible').contains('EMAIL');
    cy.get('[type="email"]').should('be.visible');
    cy.get('label').should('be.visible').contains('PASSWORD');
    cy.get('[type="password"]').should('be.visible');
    cy.get('button').should('be.disabled');
    cy.get('button').should('be.visible');
  });
});
