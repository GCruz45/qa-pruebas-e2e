const back = "http://localhost:8080/books";
let bookId = new String("");
let currentBookName = "Ulyses";
let currentBookAuthor = "James Joyce";
describe("Given I want to register a book", () => {
  before(() => {
    // Arrange

    // cy.intercept("POST", back, (req) => {
    //   cy.req.reply.body.id.as("bookId");
    //   // req.reply((res) => {
    //   //   bookId = res.body.id;
    //   // });
    // }).as("registerBook");
    cy.visit("dashboard");
    // cy.wrap("a").as("bookId");
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
        cy.get(".ant-btn").contains("Delete").click();
      }
    });
    // Open the book creation form
    cy.get(".ant-btn-primary").contains("Add").click();
    cy.wait(300);
  });

  it("The book should be created and visible in the list of books ", () => {
    // Arrange
    cy.get("#name").type(currentBookName);
    cy.get("#author").type(currentBookAuthor);

    // Act
    // cy.intercept("POST", back).as("registerBook");
    cy.contains("Save").click();
    // cy.wait("@registerBook").then(({ request }) => {
    //   bookId = request.body.id;
    //   cy.wrap(bookId).as("bookId");
    // });
    cy.findBookPage();

    // Assert
    // cy.get("#name").should("have.value", "Ulyses");
    cy.get("tr").contains("tr", "Ulyses").should("exist");
  });

  it("The book should not be allowed to be created when the book name is empty", () => {
    // Arrange
    cy.get("#author").type(currentBookAuthor);

    // Act
    cy.get("#author").type("");

    // Assert
    cy.contains("Save").should(be.disabled);
  });

  // Cypress._.times(100, (i) => {
  //   it(`Iteration #${
  //     i + 1
  //   } - Name of iterating method`, () => {
  //   });
  // });

  after(() => {
    //   if (this.bookId.localeCompare("") != 0)
    //     cy.request("DELETE", `http://localhost:8080/books/${bookId}`);
  });
});

Cypress.Commands.add("findBookPage", () => {
  cy.get("body").then(($body) => {
    const bookIsVisible = $body.text().includes("James Joyce");
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
