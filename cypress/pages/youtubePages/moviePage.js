class moviePage {
    constructor(){
        this.xpathOfficialVideo = `//div[@id="primary-inner"]//ytd-watch-metadata`;
    }

    getMovieTitle(judulFilm){
        cy.xpath(`${this.xpathOfficialVideo}//h1/yt-formatted-string`).should('have.text',`${judulFilm}`);
    }
    
    getMovieChannel(channel){
        cy.xpath(`${this.xpathOfficialVideo}//ytd-video-owner-renderer//ytd-channel-name//a`).should('have.text',`${channel}`);
    }
    
    clickShareAndCopy(share){
        cy.xpath(`//div[@id="above-the-fold"]//button[@class="yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading yt-spec-button-shape-next--enable-backdrop-filter-experiment"][@title="${share}"]`).click();
        cy.xpath(`//ytd-unified-share-panel-renderer`).should('be.visible');
        cy.xpath(`//ytd-unified-share-panel-renderer//button[@class="yt-spec-button-shape-next yt-spec-button-shape-next--filled yt-spec-button-shape-next--call-to-action yt-spec-button-shape-next--size-m yt-spec-button-shape-next--enable-backdrop-filter-experiment"]`).click();
    }
    
    getLinkUrl(){
        return cy.xpath(`//input[@id="share-url"]`).invoke('val');
    }
}

export default new moviePage();