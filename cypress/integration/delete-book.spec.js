describe("Given I want to delete a book", () => {
  before(() => {
    // Arrange
    cy.visit("http://localhost:4200/dashboard");
    // Creates the book to guarantee test independency
    cy.get(".ant-btn-primary").contains("Add").click();
    cy.wait(300);
    cy.get("#name").type("Ulyses");
    cy.get("#author").type("James Joyce");
    cy.contains("Save").click();
    cy.wait(300);

    Cypress.Commands.add("clickVisibleButton", () => {
      cy.get("body").then(($body) => {
        const bookIsVisible = $body.text().includes("James Joyce");
        if (!bookIsVisible) {
          if ( // This conditional is fulfilled when the last page of books has been reached
            $body.find(
              ".ant-pagination-next.ng-star-inserted.ant-pagination-disabled"
            ).length
          ) {
            // Since bookIsVisible = False and the last page was reached, the book doesn't exist anymore
            continue;
          }
          // Moves on to the next page
          cy.get("button .anticon-right ").click();
          cy.wait(300);
          cy.clickVisibleButton();
        } else {
          // Else, the book was found in the current page. Its checkbox gets checked so that it can later be deleted
          cy.get("tr")
            .contains("tr", "Ulyses")
            .within(() => {
              cy.get('[type="checkbox"]').check();
            });
        }
      });
    });

    // Finds the book and selects it by checking its checkbox
    cy.clickVisibleButton();

    // Act
    cy.get(".ant-btn").contains("Delete").click();
  });

  it("The book should not exist", () => {
    // Goes back to the main page to start a left-to-right page navigation search for the book
    cy.visit("http://localhost:4200/dashboard");
    cy.wait(300);

    // Executes the page search
    cy.clickVisibleButton();

    // Assert
    cy.get("tr").contains("tr", "Ulyses").should("not.exist");
  });
});
