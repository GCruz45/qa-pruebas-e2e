Cypress.Commands.add("getAndEditBook", () => {
  cy.get("body").then(($body) => {
    const bookIsVisible = $body.text().includes(currentBookName);

    if (!bookIsVisible) {
      // This conditional checks if the book exists in the current page. Otherwise, it moves on to the next page
      cy.get("button .anticon-right ").click();
      cy.wait(500);
      cy.clickVisibleButton();
    } else {
      // Else, the book is obtained from its parent tr element and its corresponding edit button is clicked
      cy.get("tr")
        .contains("tr", currentBookName)
        .within(() => {
          cy.get(".anticon-edit").click();
        });

      cy.wait(300);
      // The books's new fields are input
      cy.get("#name").clear().type(newBookName);
      cy.get("#author").clear().type(newBookAuthor);

      currentBookName = "Ulises";
      newBookName = "Ulyses";
      newBookAuthor = "James Joyce";
    }
  });
});

let currentBookName = "Ulyses";
let currentBookAuthor = "James Joyce";
let newBookName = "Ulises";
let newBookAuthor = "James Joice";
describe("Given I want to edit a book", () => {
  before(() => {
    // Arrange
    cy.visit("http://localhost:4200/dashboard");
    cy.get(".ant-btn-primary").contains("Add").click();
    cy.wait(300);
    cy.get("#name").type(currentBookName);
    cy.get("#author").type(currentBookAuthor);
    cy.contains("Save").click();
    cy.wait(500);

    // Gets the book and fills its fields with the new values
    cy.getAndEditBook();

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
    // Return the book's values to their original ones
    cy.getAndEditBook();
    cy.contains("Save").click();
  });
});
