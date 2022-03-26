describe("Given I want to edit a book", () => {
  before(() => {
    // Arrange
    cy.visit("http://localhost:4200/dashboard");
    cy.wait(300);

    Cypress.Commands.add("clickVisibleButton", () => {
      cy.get("body").then(($body) => {
        const bookIsVisible = $body.text().includes("James Joyce");
        if (!bookIsVisible) {
          cy.get("button .anticon-right ").click();
          cy.wait(300);
          cy.clickVisibleButton();
        } else {
          cy.get("tr .anticon-edit").contains("tr", "Ulyses").click();
          // .within(() => {
          //   cy.get('[type="checkbox"]').check();
          // });
        }
      });
    });

    cy.clickVisibleButton();

    // Act
  });
});
