describe('E2E Automation Cari Kursi di Amazon', () => {
    it('Cari Kursi di Amazon', () => {
        let totalData = 0;
        let nmBarang, hrgBarang;
        const xpathPopUpDismiss = `//div[@class="a-section glow-toaster glow-toaster-theme-default glow-toaster-slot-default nav-coreFlyout nav-flyout"]`;
        const xpathItemKe5 = `//div[@class="sg-col-20-of-24 s-matching-dir sg-col-16-of-20 sg-col sg-col-8-of-12 sg-col-12-of-16"]//span/div/div[@class="sg-col-4-of-24 sg-col-4-of-12 s-result-item s-asin sg-col-4-of-16 sg-col s-widget-spacing-small sg-col-4-of-20"][5]//div[@class="a-section a-spacing-small puis-padding-left-small puis-padding-right-small"]`;

        cy.visitAmazon();
        cy.wait(10000);
        cy.xpath(`${xpathPopUpDismiss}`).should('be.visible');
        cy.xpath(`${xpathPopUpDismiss}//span[@class="a-button a-spacing-top-base a-button-base glow-toaster-button glow-toaster-button-dismiss"]//input[@type="submit"]`).should('be.visible').click();
        cy.xpath(`//form[@id="nav-search-bar-form"]//input[@id="twotabsearchtextbox"]`).clear().type('chair');
        cy.get('#nav-flyout-searchAjax').should('be.visible');
        cy.wait(1000);
        cy.xpath(`//input[@type="submit"][@id="nav-search-submit-button"]`).click();
        cy.scrollTo("top")
        cy.xpath(`//span[@class="a-dropdown-prompt"]`).click();
        cy.get('#s-result-sort-select_2').click();
        cy.url().should('include','/s?k=chair&s=price-desc-rank')
        cy.wait(3000);
        cy.get(`span.a-offscreen`)
            .then(($val) => {
                totalData = $val.length;
                cy.log(`Banyaknya data = ${totalData}`)
            });
        cy.xpath(`${xpathItemKe5}//div[@data-cy="title-recipe"]//h2/span`)
          .invoke('text')
          .then((data) => {
                nmBarang = data;
                cy.log(`Nama Barang = ${nmBarang}`)
            });
        cy.xpath(`${xpathItemKe5}//div[@data-cy="price-recipe"]//span[@class="a-offscreen"]`)
          .invoke('text')
          .then((data) => {
                hrgBarang = data;
                cy.log(`Harga Barang = ${hrgBarang}`)
          });
        
        cy.xpath(`${xpathItemKe5}//div[@data-cy="title-recipe"]//a`).click();
        cy.xpath(`//span[@id="productTitle"]`)
            .invoke('text')
            .then((data) => {
                expect(data.trim()).equal(nmBarang);
            });
        cy.xpath(`//div[@id="corePriceDisplay_desktop_feature_div"]//span[@class="aok-offscreen"]`)
            .invoke('text')
            .then((data) => {
                expect(data.trim()).equal(hrgBarang);
            })
        
        // cy.then((data) => {
        //     cy.wrap(data).as('expectedData')
        //     cy.get('@expectedData')
        // })
    });
});