class cariBarang {
    constructor(){
        this.xpathPopUpDismiss = `//div[@class="a-section glow-toaster glow-toaster-theme-default glow-toaster-slot-default nav-coreFlyout nav-flyout"]`;
    }

    removeDismissPopUp(){
        cy.xpath(`${this.xpathPopUpDismiss}`).should('be.visible');
        cy.xpath(`${this.xpathPopUpDismiss}//span[@class="a-button a-spacing-top-base a-button-base glow-toaster-button glow-toaster-button-dismiss"]//input[@type="submit"]`).should('be.visible').click();
    }

    typeKeyword(keyword){
        cy.xpath(`//form//input[@id="twotabsearchtextbox"]`).click().clear().type(keyword);
        cy.xpath(`//input[@type="submit"][@id="nav-search-submit-button"]`).click();
    }

}

export default new cariBarang();