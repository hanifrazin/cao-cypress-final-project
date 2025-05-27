class homePage {
    goToYoutube(){
        cy.visitYoutube();
    }

    goToTrendingMenu(){
        cy.get('#guide').contains('Explore').should('be.visible');
        cy.xpath(`//a[@title='Trending']`).should('be.visible').click();
        cy.get(`#tabsContainer`).contains('Movies').click();
        cy.xpath(`//div[@class="yt-tab-shape-wiz__tab yt-tab-shape-wiz__tab--tab-selected"]`).should('exist');
        cy.wait(5000)
    }
}

export default new homePage();