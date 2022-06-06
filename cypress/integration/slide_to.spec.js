describe('slide to index', () => {
    it('show input', {defaultCommandTimeout: 10000}, () => {
        cy.visit('/');
        cy.get('[data-test-id="change-index"]').first().click();
        cy.get('[data-test-id="slide-index-input"]').type('2');
        cy.get('[data-test-id="slide-index-enter"]').click();
    });
});
