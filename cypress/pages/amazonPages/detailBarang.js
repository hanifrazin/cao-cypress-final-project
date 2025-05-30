class detailBarang {

    checkNamaBarang(){
        return cy.xpath(`//span[@id="productTitle"]`).invoke('text');       
    }

    checkHrgBarang(){
        return cy.xpath(`//div[@id="apex_desktop"]//span[@class="a-price-whole"]`).invoke('text')  
    }

}

export default new detailBarang();