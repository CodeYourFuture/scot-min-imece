
Cypress.Commands.add('login', (email, password) => {
    cy.request('POST', '/auth/login', {
        email: email,
        password: password
    })
    .its('body')
    .then((res) => {
        cy.window().its('localStorage').invoke('setItem', 'token', res.token)
    })
});

