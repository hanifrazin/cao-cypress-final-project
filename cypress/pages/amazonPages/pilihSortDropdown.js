class pilihSortDropdown {
    selectPriceDesc(){
        cy.xpath(`//span[@class="a-dropdown-prompt"]`).click();
        cy.get('#s-result-sort-select_2').click();
        cy.url().should('include','/s?k=chair&s=price-desc-rank');
    }
}

export default new pilihSortDropdown();