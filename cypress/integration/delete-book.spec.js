describe("Given I want to delete a book", () => {
  before(() => {
    // Arrange
    cy.visit("http://localhost:4200/dashboard");
    // cy.get(".ant-btn-primary").contains("Add").click();
    // cy.wait(300);
    // cy.get("#name").type("Ulyses");
    // cy.get("#author").type("James Joyce");
    // cy.contains("Save").click();
    cy.wait(300);

    Cypress.Commands.add("clickVisibleButton", () => {
      cy.get("body").then(($body) => {
        const bookIsVisible = $body.text().includes("James Joyce");
        if (!bookIsVisible) {
          if (
            $body.find(
              ".ant-pagination-next.ng-star-inserted.ant-pagination-disabled"
            ).length
          ) {
            continue;
          }
          cy.get("button .anticon-right ").click();
          cy.wait(300);
          cy.clickVisibleButton();
        } else {
          cy.get("tr")
            .contains("tr", "Ulyses")
            .within(() => {
              cy.get('[type="checkbox"]').check();
            });
        }
      });
    });

    cy.clickVisibleButton();

    // Act
    cy.get(".ant-btn").contains("Delete").click();
  });

  it("The book should not exist", () => {
    // Assert
    // let foundTheBook = cy.clickVisibleButton();
    // expect(foundTheBook).to.be.false;
    // cy.get("body").expect("exist");

    cy.visit("http://localhost:4200/dashboard");
    cy.wait(300);
    cy.clickVisibleButton();
    cy.get("tr").contains("tr", "Ulyses").should("not.exist");
  });

  after(() => {
    cy.get(".ant-btn-primary").contains("Add").click();
    cy.wait(500);
    cy.get("#name").type("Ulyses");
    cy.get("#author").type("James Joyce");
    cy.contains("Save").click();
  });
});
