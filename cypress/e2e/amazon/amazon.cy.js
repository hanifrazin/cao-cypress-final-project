import cariBarang from "../../pages/amazonPages/cariBarang";
import pilihSortDropdown from "../../pages/amazonPages/pilihSortDropdown";
import Barang from "../../pages/amazonPages/Barang";
import detailBarang from "../../pages/amazonPages/detailBarang";

let totalData = 0;
let nmBarang, hrgBarang;
const input = Cypress.env("amazon");

describe('E2E Automation Cari Kursi di Amazon', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Cari Kursi di Amazon', () => {
        cy.visit(`${input.url}`);
        cy.wait(8000);
        cy.scrollTo("top");
        cariBarang.typeKeyword(`${input.typeKeyword}`);
        cy.wait(1000);

        pilihSortDropdown.selectPriceDesc();
        cy.wait(3000);
        Barang.getTotalData().then(($val) => {
            totalData = $val.length;
            cy.log(`Banyaknya data = ${totalData}`)
        });
        Barang.getNamaBarang().then((data) => {
            nmBarang = data;
            cy.log(`Nama Barang = ${nmBarang}`)
        });
        Barang.getHargaBarang().then((data) => {
            hrgBarang = data;
            cy.log(`Harga Barang = ${hrgBarang}`)
        });
        Barang.clickBarang();
        
        detailBarang.checkNamaBarang().then((data) => {
            expect(data.trim()).equal(nmBarang);
        });
        detailBarang.checkHrgBarang().then((data) => {
            expect(data.trim()).equal(hrgBarang);
        });
        
        // cy.then((data) => {
        //     cy.wrap(data).as('expectedData')
        //     cy.get('@expectedData')
        // })
    });
});