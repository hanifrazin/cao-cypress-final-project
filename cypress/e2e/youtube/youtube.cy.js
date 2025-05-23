import { Faker } from "@faker-js/faker";

describe('E2E Automation Cari Trending Video di Youtube', () => {
    it('Buka Web Youtube', () => {
        cy.visitYoutube();
    });
});