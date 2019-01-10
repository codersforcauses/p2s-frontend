// https://docs.cypress.io/api/introduction/api.html

describe('Landing Test', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('Visits the root app and is redirected to login', () => {
    cy.url().should('include', '/login');
  });

  // Works only when connected to a server
  // it('Visits the app root url and finds VueJS logo', () => {
  //   cy.visit('/');
  //   cy.login();
  //   cy.get('div').find('img').should('be.visible');
  // });
});
