beforeEach(() => {
  cy.login('admin@cyf.org', 'admin_password');
  cy.visit('/');
});

describe('Logout', () => {
  it('Should show the login form after successful logout', () => {
    cy.contains('Logout').click();
    cy.contains('Log-in to your account');
  });
});
