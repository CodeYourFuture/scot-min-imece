beforeEach(() => {
    cy.login("admin@cyf.org", "admin_password");
    cy.visit("/");
})

describe("The home page", () => {
    it("Should show the dashboard", () => {
        cy.contains("Service Users")
        cy.contains("This month")
    })
    it("Should enable searching by email", () => {
        cy.get("#search")
            .type("kabaros")
            .should("have.value", "kabaros")
        cy.get("tbody tr").should("have.length", 1)
        cy.contains("mozafariscool").click()
        cy.contains("Don't add me to groups!")
    })
})

