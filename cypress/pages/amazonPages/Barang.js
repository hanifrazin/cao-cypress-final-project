class Barang {
    constructor(){
        // this.xpathItemKe5 = `//div[@class="sg-col-20-of-24 s-matching-dir sg-col-16-of-20 sg-col sg-col-8-of-12 sg-col-12-of-16"]//span/div/div[@class="sg-col-4-of-24 sg-col-4-of-12 s-result-item s-asin sg-col-4-of-16 sg-col s-widget-spacing-small sg-col-4-of-20"][5]//div[@class="a-section a-spacing-small puis-padding-left-small puis-padding-right-small"]`;
        this.xpathItemKe5 = `(//div[@role="listitem"])[5]`
    }

    getTotalData(){
        return cy.get(`span.a-offscreen`);
    }

    getNamaBarang(){
        return cy.xpath(`${this.xpathItemKe5}//div[@data-cy="title-recipe"]/a/h2/span`).invoke('text');
    }

    getHargaBarang(){
        return cy.xpath(`${this.xpathItemKe5}//div[@data-cy="price-recipe"]//span[@class="a-offscreen"]`).invoke('text');
    }

    clickBarang(){
        cy.xpath(`${this.xpathItemKe5}//div[@data-cy="title-recipe"]//a`).click();
    }
}

export default new Barang();