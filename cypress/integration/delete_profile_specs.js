beforeEach(() => {
  cy.login('admin@cyf.org', 'admin_password');
});

describe('Delete profile', () => {
  let email = 'malika@hotmail.co.uk';
  it('Should access to profile page and successfully delete it', () => {
    cy.visit('/');
    cy.get('#search').type(email).should('have.value', email);
    cy.contains(email).click();
    cy.contains('Delete').click();
    cy.contains('Are you sure you want to delete this profile?');
    cy.get('[role="dialog"] button').contains('Delete').click();
    cy.contains('Service Users');
    cy.get('#search').type(email).should('have.value', email);
    cy.contains('No matching profiles found');
  });
});
