import { Faker } from "@faker-js/faker";

describe('E2E Automation Cari Barang di Tokopedia', () => {
    it('Buka Web Tokopedia', () => {
        cy.visitTokopedia().then(() => {
            cy.contains('Tentang Tokopedia');
        });
    });
});