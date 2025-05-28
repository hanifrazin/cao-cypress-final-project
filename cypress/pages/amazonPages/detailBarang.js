class detailBarang {

    checkNamaBarang(){
        return cy.xpath(`//span[@id="productTitle"]`).invoke('text');       
    }

    checkHrgBarang(){
        return cy.xpath(`//div[@id="corePriceDisplay_desktop_feature_div"]//span[@class="aok-offscreen"]`).invoke('text')  
    }

}

export default new detailBarang();