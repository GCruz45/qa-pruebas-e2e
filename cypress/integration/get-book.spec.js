describe("Given I want to obtain a book", () => {
  before(() => {
    // Arrange
    cy.visit("dashboard");
    cy.get(".ant-btn-primary").contains("Add").click();
    cy.wait(300);
    cy.get("#name").type("Ulyses");
    cy.get("#author").type("James Joyce");
    cy.contains("Save").click();
    cy.wait(300);
  });

  beforeEach(() => {
    // Arrange
    // Go back to the main page
    cy.get(".ant-pagination-item.ng-star-inserted").contains("1").click();
  });

  Cypress._.times(10, (i) => {
    it(`Iteration #${
      i + 1
    } - The book should be visible in the list of books`, () => {
      // Act
      // Go to the page that contains the book
      cy.clickVisibleButton();

      //Assert
      cy.get("tr").contains("tr", "Ulyses").should("exist");
    });
  });

  after(() => {
    // Delete the book that was created during the Arrange step
    cy.clickVisibleButton();

    cy.get("tr")
      .contains("tr", "Ulyses")
      .within(() => {
        cy.get('[type="checkbox"]').check();
      });

    cy.get(".ant-btn").contains("Delete").click();
  });
});

Cypress.Commands.add("clickVisibleButton", () => {
  cy.get("body").then(($body) => {
    const bookIsVisible = $body.text().includes("James Joyce");
    if (!bookIsVisible) {
      cy.get("button .anticon-right ").click();
      cy.wait(300);
      cy.clickVisibleButton();
    }
  });
});
