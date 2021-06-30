beforeEach(() => {
    cy.login("admin@cyf.org", "admin_password");
})

describe("Add new profile", () => {
    it("Should successfully create a profile and show it in the dashboard", () => {
        cy.visit("/")
        cy.contains("New Profile").click()
        cy.contains("Profile type")
        cy.get("#firstname").type("Somebody").should("have.value", "Somebody")
        cy.get("#lastname").type("New")
        cy.get("#address").type("1 Some Street, Glasgow, G99 001")
        let email = "somebody" + Math.random().toString().substring(2,9) + "@somewhere.com";
        cy.get("#email").type(email)
        cy.get("#phone").type("0141 123 4567")
        cy.get("#dob").type("1988-05-05")
        cy.get("#nationality")
            .click()
            .find('input')
            .eq(1)
            .type('{downarrow}{enter}', { force: true })
        cy.get("#gender")
            .click()
            .find('input')
            .eq(1)
            .type('{downarrow}{downarrow}{enter}', { force: true })
        cy.get("#groups")
            .click()
            .find('input')
            .eq(1)
            .type('{downarrow}{enter}', { force: true })
        cy.get("#profile_type")
            .click()
            .find('input')
            .eq(1)
            .type('{downarrow}{enter}', { force: true })
        cy.get("button[type=submit]").click()
        cy.visit("/")
        cy.contains(email)

    })
})

