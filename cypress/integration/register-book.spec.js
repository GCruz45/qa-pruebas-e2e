const back = "http://localhost:8080/books";
let currentBookName = "Ulyses";
let currentBookAuthor = "James Joyce";
describe("Given I want to register a book", () => {
  before(() => {
    // Arrange
    cy.visit("dashboard");
  });

  beforeEach(() => {
    // Arrange
    // If a book with currentBookName exists, then delete it
    cy.findBookPage();
    cy.get("body").then(($body) => {
      const bookIsVisible = $body.text().includes("James Joyce");
      if (bookIsVisible) {
        cy.get("tr")
          .contains("tr", "Ulyses")
          .within(() => {
            cy.get('[type="checkbox"]').check();
          });
        cy.get("body").get(".ant-btn").contains("Delete").click();
      }
    });

    // Go back to the main page
    cy.get(".ant-pagination-item.ng-star-inserted").contains("1").click();
    // Open the book creation form
    cy.get(".ant-btn-primary").contains("Add").click();
    cy.wait(300);
  });

  Cypress._.times(10, (i) => {
    it(`Iteration #${
      i + 1
    } - The book should be created and visible in the list of books`, () => {
      // Arrange
      cy.get("#name").type(currentBookName);
      cy.get("#author").type(currentBookAuthor);

      // Act
      cy.contains("Save").click();
      cy.wait(300);
      cy.findBookPage();

      // Assert
      cy.get("tr").contains("tr", "Ulyses").should("exist");
    });
  });

  it("The book should not be allowed to be created when the book's name is empty", () => {
    // Act
    cy.get("#author").type(currentBookAuthor);
    cy.get("#name").clear();

    // Assert
    cy.contains("Save").should("be.disabled");

    cy.contains("Cancel").click();
  });

  it("The book should not be allowed to be created when the author's name is empty", () => {
    // Arrange
    cy.get("#name").type(currentBookName);

    // Act
    cy.get("#author").clear();

    // Assert
    cy.contains("Save").should("be.disabled");
    cy.contains("Cancel").click();
  });
});

Cypress.Commands.add("findBookPage", () => {
  cy.get("body").then(($body) => {
    const bookIsVisible = $body.text().includes("Ulyses");
    if (!bookIsVisible) {
      if (
        // This conditional is fulfilled when the last page of books has been reached
        !$body.find(
          ".ant-pagination-next.ng-star-inserted.ant-pagination-disabled"
        ).length
      ) {
        cy.get("button .anticon-right ").click();
        cy.wait(300);
        cy.findBookPage();
      }
      // Since bookIsVisible = False and the last page was reached, the book doesn't exist anymore
    }
  });
});
