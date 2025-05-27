class trendingListPage {
    constructor(){
        this.xpathListVideo3 = `//div[@id="content"]//ytd-page-manager//ytd-two-column-browse-results-renderer[@page-subtype="trending"]//div[@id="dismissible"]//ytd-video-renderer[3]//div[@id="dismissible"]//div[@class="text-wrapper style-scope ytd-video-renderer"]`

    }

    getJudulFilm(){
        return cy.xpath(`${this.xpathListVideo3}//a[@id="video-title"]/yt-formatted-string[@class="style-scope ytd-video-renderer"]`)
                 .invoke('text');
    } 
    
    getChannelYoutube(){
        return cy.xpath(`${this.xpathListVideo3}//ytd-video-meta-block//ytd-channel-name//a`)
                 .invoke('text');
    }

    clickMovies(){
        cy.xpath(`${this.xpathListVideo3}`).click({multiple:true});
    }

}

export default new trendingListPage();