import { Faker } from "@faker-js/faker";

describe('E2E Automation Cari Tiket di Agoda', () => {
    it('Buka Web Agoda', () => {
        cy.visitAgoda();
    });
});