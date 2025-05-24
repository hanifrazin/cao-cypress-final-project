import { Faker } from "@faker-js/faker";

describe('E2E Automation Cari Trending Video di Youtube', () => {
    it('Search Video Trending on Youtube', () => {
        cy.visitYoutube();
        cy.get('#start > #guide-button > #button > #guide-icon').should('be.visible').click();
        cy.get('#guide').contains('Explore').should('be.visible');
        cy.xpath(`//a[@title='Trending']`).should('be.visible').click();
        cy.xpath(`//ytd-item-section-renderer[3]//div[@id="dismissible"][@class="style-scope ytd-shelf-renderer"]`).should('be.visible').scrollIntoView();
        cy.get(`body > ytd-app:nth-child(4) > div:nth-child(6) > ytd-page-manager:nth-child(5) > ytd-browse:nth-child(5) > ytd-two-column-browse-results-renderer:nth-child(11) > div:nth-child(1) > ytd-section-list-renderer:nth-child(1) > div:nth-child(2) > ytd-item-section-renderer:nth-child(3) > div:nth-child(3) > ytd-shelf-renderer:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ytd-expanded-shelf-contents-renderer:nth-child(1) > div:nth-child(1) > ytd-video-renderer:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > h3:nth-child(1) > a:nth-child(2)`).click();
        // cy.wait(20000);
        // cy.xpath(`//div[@class="style-scope tp-yt-app-drawer visible"]`).should('be.visible');

    });
});