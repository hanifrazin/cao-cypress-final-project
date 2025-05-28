import homepage from "../../pages/youtubePages/homePage";
import trendingListPage from "../../pages/youtubePages/trendingListPage";
import moviePage from "../../pages/youtubePages/moviePage";

describe('E2E Automation Cari Trending Video di Youtube', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Search Video Trending on Youtube', () => {
        let lang = Cypress.env('LANGUAGE') || 'en';
        const messages = Cypress.env('labelYoutube');
        let judulFilm, channel;

        cy.visitYoutube();
        homepage.getLangYoutube().then((langAttr) => {
            cy.log(`Language Default : ${langAttr}`)
            lang = langAttr === "id-ID" ? "id" : "en";
        });

        cy.then(() => {
            homepage.goToTrendingMenu(messages[lang].explore);
            homepage.goToMoviesTab(messages[lang].movie);

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
                moviePage.clickShareAndCopy(messages[lang].share);
                moviePage.getLinkUrl()
                        .then((link) => {
                            cy.log(`Link Url : ${link}`)
                        });
            });
        });
    });
});