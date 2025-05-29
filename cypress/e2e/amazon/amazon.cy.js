import cariBarang from "../../pages/amazonPages/cariBarang";
import pilihSortDropdown from "../../pages/amazonPages/pilihSortDropdown";
import Barang from "../../pages/amazonPages/Barang";
import detailBarang from "../../pages/amazonPages/detailBarang";

let totalData = 0;
let nmBarang, hrgBarang;

describe('E2E Automation Cari Kursi di Amazon', () => {
    it('Cari Kursi di Amazon', () => {
        cy.visit(`${Cypress.env("amazon")}`);
        cy.wait(8000);
        cy.scrollTo("top");
        cariBarang.typeKeyword('chair');
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
        cy.scrollTo("top");
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