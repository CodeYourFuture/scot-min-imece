beforeEach(() => {
    cy.visit("/");
})

describe("Login", () => {
    it("Form should show when not logged in", () => {
        cy.contains("Log-in to your account")
    })
    it("Should show dashboard after successful login", () => {
        cy.get("input[name=email]")
            .type("admin@cyf.org")
            .should("have.value", "admin@cyf.org")
        cy.get("input[name=password]")
            .type("admin_password")
            .should("have.value", "admin_password")
        cy.get("button").click()
        cy.contains("Service Users")
    })
    it("Should reject incorrect credentials with a suitable message", () => {
        cy.get("input[name=email]").type("admin@cyf.org")
        cy.get("input[name=password]").type("wrong")
        cy.get("button").click()
        cy.contains("Log-in to your account")
        cy.contains("The login details are not correct")
    })
})

