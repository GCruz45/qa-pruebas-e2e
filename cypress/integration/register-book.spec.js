const back = "http://localhost:8080/books";
describe("Given I want to register a book", () => {
  before(() => {
    // Arrange

    cy.intercept("POST", back).as("registerBook");
    this.registerBook.reply.body.id.as("bookId");
    // cy.intercept("POST", back, (req) => {
    //   cy.req.reply.body.id.as("bookId");
    //   // req.reply((res) => {
    //   //   bookId = res.body.id;
    //   // });
    // }).as("registerBook");
    cy.visit("dashboard");
  });

  beforeEach(() => {
    // Arrange
    cy.get(".ant-btn-primary").contains("Add").click();
    // cy.wait(300);
  });

  it("The book should be created and visible in the list of books ", () => {
    //Assert
    cy.get("#name").should("have.value", "Ulyses");
  });

  Cypress._.times(100, (i) => {
    it(`Iteration #${
      i + 1
    } - The book should be visible in the list of books`, () => {
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

      //Assert
      cy.get("tr").contains("tr", "Ulyses").should("exist");
    });
  });

  after(() => {
    cy.request("DELETE", `http://localhost:8080/books/${bookId}`);
  });
});
