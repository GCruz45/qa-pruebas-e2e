let currentBookName = "Ulyses";
let currentBookAuthor = "James Joyce";
let newBookName = "Ulises";
let newBookAuthor = "James Joice";
describe("Given I want to edit a book", () => {
  before(() => {
    // Arrange
    cy.visit("dashboard");
    cy.get(".ant-btn-primary").contains("Add").click();
    cy.wait(300);
    cy.get("#name").type(currentBookName);
    cy.get("#author").type(currentBookAuthor);
    cy.contains("Save").click();
    cy.wait(500);
  });

  beforeEach(() => {
    // Arrange
    // Go back to the main page
    cy.get(".ant-pagination-item.ng-star-inserted").contains("1").click();
  });

  Cypress._.times(10, (i) => {
    it(`Iteration #${
      i + 1
    } - The book's name and author should be modified`, () => {
      // Act
      // Get the book and change its properties to the new values
      cy.getAndEditBook();

      // Assert
      cy.get("tr").contains("tr", "James Joice").should("exist");
      cy.get("tr").contains("tr", "Ulises").should("exist");

      // Go back to the main page
      cy.get(".ant-pagination-item.ng-star-inserted").contains("1").click();
      cy.wait(300);

      cy.getAndEditBook();
    });
  });

  it("The book should not be allowed to be edited with empty values for its name nor for its author's name", () => {
    // Arrange
    // Get the book and open the edit form
    cy.get("tr")
      .contains("tr", currentBookName)
      .within(() => {
        cy.get(".anticon-edit").click();
      });

    // Act
    cy.get("#author").type(currentBookAuthor);
    cy.get("#name").clear();

    // Assert
    cy.contains("Save").should("be.disabled");

    // Act
    cy.get("#name").type(currentBookName);
    cy.get("#author").clear();

    // Assert
    cy.contains("Save").should("be.disabled");

    cy.contains("Cancel").click();
  });
});

Cypress.Commands.add("getAndEditBook", () => {
  cy.get("body").then(($body) => {
    const bookIsVisible = $body.text().includes(currentBookName);

    if (!bookIsVisible) {
      // This conditional checks if the book exists in the current page. Otherwise, it moves on to the next page
      cy.get("button .anticon-right ").click();
      cy.wait(500);
      cy.getAndEditBook();
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

      // Alternate var values for future function call
      const tempBookName = currentBookName;
      const tempBookAuthor = currentBookAuthor;
      currentBookName = newBookName;
      currentBookAuthor = newBookAuthor;
      newBookName = tempBookName;
      newBookAuthor = tempBookAuthor;

      cy.contains("Save").click();
    }
  });
});
