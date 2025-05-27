import { Faker } from "@faker-js/faker";

describe('E2E Automation Cari Kursi di Amazon', () => {
    it('Cari Kursi di Amazon', () => {
        cy.visitAmazon();
        cy.wait(5000);
        cy.xpath(`//form[@id="nav-search-bar-form"]//input[@id="twotabsearchtextbox"]`).clear().type('chair');
        cy.get('#nav-flyout-searchAjax').should('be.visible');
        cy.wait(1000);
        cy.xpath(`//input[@type="submit"][@id="nav-search-submit-button"]`).click();
        cy.xpath(`//form[@class="aok-inline-block a-spacing-none"]//select[@id="s-result-sort-select"]`).select({force:true});
    });
});