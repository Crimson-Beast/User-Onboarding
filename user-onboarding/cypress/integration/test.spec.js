describe("User Onboarding APP", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/")
    })

    const nameInput = () => cy.get(':nth-child(2) > input')
    const emailInput = () => cy.get(':nth-child(3) > input')
    const passInput = () => cy.get(':nth-child(4) > input')
    const termsBtn = () => cy.get(':nth-child(5) > input')
    const submitBtn = () => cy.get('button')
    const testName = "Danny"
    const testEmail = "Danny@danny.com"
    const testPass = "someamoutnofletterslol"
    const displayedChild = () => cy.get('form > :nth-child(4)')

    it("loads properly", () => {
        nameInput().should("exist")
        emailInput().should("exist")
        passInput().should("exist")
        termsBtn().should("exist")
        submitBtn().should(("be.disabled"))
    })
    it("runs a test submit user", () =>{
        nameInput().type(testName)
        emailInput().type(testEmail)
        passInput().type(testPass)
        termsBtn().click()
        submitBtn().click()
    })
    it("check if user is displayed", () =>{
        displayedChild().should('exist')
    })

})