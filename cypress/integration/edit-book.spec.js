Cypress.Commands.add("clickVisibleButton", () => {
  cy.get("body").then(($body) => {
    const bookIsVisible = $body.text().includes(currentBookName);
    if (!bookIsVisible) {
      cy.get("button .anticon-right ").click();
      cy.wait(500);
      cy.clickVisibleButton();
    } else {
      cy.get("tr")
        .contains("tr", currentBookName)
        .within(() => {
          cy.get(".anticon-edit").click();
        });

      cy.wait(300);
      cy.get("#name").clear().type(newBookName);
      cy.get("#author").clear().type(newBookAuthor);

      currentBookName = "Ulises";
      newBookName = "Ulyses";
      newBookAuthor = "James Joyce";
    }
  });
});

let currentBookName = "Ulyses";
let newBookName = "Ulises";
let newBookAuthor = "James Joice";
describe("Given I want to edit a book", () => {
  before(() => {
    // Arrange
    cy.visit("http://localhost:4200/dashboard");
    // cy.get(".ant-btn-primary").contains("Add").click();
    // cy.wait(300);
    // cy.get("#name").type("Ulyses");
    // cy.get("#author").type("James Joyce");
    // cy.contains("Save").click();
    cy.wait(500);

    cy.clickVisibleButton();

    // Act
    cy.contains("Save").click();
  });

  it("The book's author should be modified", () => {
    // Assert
    cy.get("tr").contains("tr", "James Joice").should("exist");
  });

  it("The book's name should be modified", () => {
    // Assert
    cy.get("tr").contains("tr", "Ulises").should("exist");
  });

  after(() => {
    cy.clickVisibleButton();
    cy.contains("Save").click();
  });
});
