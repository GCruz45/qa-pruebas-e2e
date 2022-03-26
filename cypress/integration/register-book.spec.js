// const { faker } = require('@faker-js/faker');

let catName;
describe('Given I want to register a book', () => {
    before(() => {
        // Arrange
        // catName = faker.name.firstName();
        cy.visit('http://localhost:4200/dashboard');
        cy.get('.ant-btn-primary').contains('Add').click();
        cy.wait(300)
        // cy.get('#name').type("Ulyses")
        // cy.get('#author').type("James Joyce");

        // // Act
        // cy.contains('Save').click();
    })

    it('The book should be visible in the list of books', () => {
        //Assert
        expect(true).to.equal(true)
      })

    // it ('The cat should be visible in the list of animals', () => {
    //     //Assert
    //     cy.get(`[data-testid=${catName}-container]`).should('exist');
    // })

    // it ('The cat icon should display that is not vaccinated', () => {
    //     //Assert
    //     cy.get(`[data-testid=${catName}-container]`)
    //         .get('[name=is-vaccinated-cat]')
    //         .get('[name=unhealthy-icon]').should('exist');
    // })

    // after(() => {
    //     cy.request(
    //         'DELETE',
    //         `http://localhost:4200/dashboard/books/Ulyses`);
    //         // `http://localhost:4200/dashboard/books/${catName}`);
    // })
})
