import homepage from "../../pages/youtubePages/homepage";
import trendingListPage from "../../pages/youtubePages/trendingListPage";
import moviePage from "../../pages/youtubePages/moviePage";

describe('E2E Automation Cari Trending Video di Youtube', () => {
    const xpathOfficialVideo = `//div[@id="primary-inner"]//ytd-watch-metadata`;

    it('Search Video Trending on Youtube', () => {
        let judulFilm, channel;

        homepage.goToYoutube();
        homepage.goToTrendingMenu();

        // Get Judul Film
        trendingListPage.getJudulFilm().then((judul) => {
            judulFilm = judul;
        })

        // Get Channel
        trendingListPage.getChannelYoutube().then((src) => {
            channel = src;
        })

        cy.then(() => {
            cy.log(`Judul Film : ${judulFilm}`);
            cy.log(`Channel Name : ${channel}`)
            trendingListPage.clickMovies();
            cy.wait(10000);
            moviePage.getMovieTitle(judulFilm);
            moviePage.getMovieChannel(channel);
            moviePage.clickShareAndCopy();
            moviePage.getLinkUrl()
                     .then((link) => {
                        cy.log(`Link Url : ${link}`)
                     });
            // cy.xpath(`${xpathOfficialVideo}//h1/yt-formatted-string`).should('have.text',`${judulFilm}`);
            // cy.xpath(`${xpathOfficialVideo}//ytd-video-owner-renderer//ytd-channel-name//a`).should('have.text',`${channel}`);
            // cy.xpath(`//div[@id="above-the-fold"]//button[@class="yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading yt-spec-button-shape-next--enable-backdrop-filter-experiment"][@title="Share"]`).click();
            // cy.xpath(`//ytd-unified-share-panel-renderer`).should('be.visible');
            // cy.xpath(`//ytd-unified-share-panel-renderer//button[@class="yt-spec-button-shape-next yt-spec-button-shape-next--filled yt-spec-button-shape-next--call-to-action yt-spec-button-shape-next--size-m yt-spec-button-shape-next--enable-backdrop-filter-experiment"]`).click();
            // cy.xpath(`//input[@id="share-url"]`)
            //   .invoke('val')
            //   .then((linkUrl) => {
            //         cy.log(`Link Url : ${linkUrl}`)
            // })
        })
    });
});