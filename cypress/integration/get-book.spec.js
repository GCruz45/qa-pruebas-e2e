let bookId = "";
describe("Given I want to obtain a book", () => {
  before(() => {
    // Arrange
    cy.visit("http://localhost:4200/dashboard");
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
          cy.get("button .anticon-right ").click();
          cy.wait(300);
          cy.clickVisibleButton();
        }
      });
    });

    cy.clickVisibleButton();

    // Act
    cy.get("tr")
      .contains("tr", "Ulyses")
      .within(() => {
        cy.get('[type="checkbox"]').check();
      });
  });

  it("The book should be visible in the list of books", () => {
    //Assert
    cy.get("tr").contains("tr", "Ulyses").should("exist");
  });

  it("The book should have its checkbox checked", () => {
    //Assert
    cy.get("tr")
      .contains("tr", "Ulyses")
      .within(() => {
        cy.get('[type="checkbox"]').should("be.checked");
      });
  });

  after(() => {
    cy.request("DELETE", `http://localhost:8080/books/${bookId}`);
  });
});
