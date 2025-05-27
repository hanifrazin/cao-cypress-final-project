import { Faker } from "@faker-js/faker";

describe('E2E Automation Cari Trending Video di Youtube', () => {
    const xpathListVideo3 = `//div[@id="content"]//ytd-page-manager//ytd-two-column-browse-results-renderer[@page-subtype="trending"]//div[@id="dismissible"]//ytd-video-renderer[3]//div[@id="dismissible"]//div[@class="text-wrapper style-scope ytd-video-renderer"]`
    const xpathOfficialVideo = `//div[@id="primary-inner"]//ytd-watch-metadata`;

    it('Search Video Trending on Youtube', () => {
        let judulFilm, channel;

        cy.visitYoutube();
        cy.get('#guide').contains('Explore').should('be.visible');
        cy.xpath(`//a[@title='Trending']`).should('be.visible').click();
        cy.get(`#tabsContainer`).contains('Movies').click();
        cy.xpath(`//div[@class="yt-tab-shape-wiz__tab yt-tab-shape-wiz__tab--tab-selected"]`).should('exist');
        cy.wait(5000)

        // Get Title
        cy.xpath(`${xpathListVideo3}//a[@id="video-title"]/yt-formatted-string[@class="style-scope ytd-video-renderer"]`)
          .invoke('text')
          .then((titleValue) => {
                judulFilm = titleValue;
        });
        
        // Get Assertion
        cy.xpath(`${xpathListVideo3}//ytd-video-meta-block//ytd-channel-name//a`)
          .invoke('text')
          .then((aText) => {
                channel = aText;
        });

        cy.then(() => {
            cy.log(`Judul Film : ${judulFilm}`);
            cy.log(`Channel Name : ${channel}`)
            cy.xpath(`${xpathListVideo3}`).click({multiple:true});
            cy.wait(10000);
            cy.xpath(`${xpathOfficialVideo}//h1/yt-formatted-string`).should('have.text',`${judulFilm}`);
            cy.xpath(`${xpathOfficialVideo}//ytd-video-owner-renderer//ytd-channel-name//a`).should('have.text',`${channel}`);
            cy.xpath(`//div[@id="above-the-fold"]//button[@class="yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading yt-spec-button-shape-next--enable-backdrop-filter-experiment"][@title="Share"]`).click();
            cy.xpath(`//ytd-unified-share-panel-renderer`).should('be.visible');
            cy.xpath(`//ytd-unified-share-panel-renderer//button[@class="yt-spec-button-shape-next yt-spec-button-shape-next--filled yt-spec-button-shape-next--call-to-action yt-spec-button-shape-next--size-m yt-spec-button-shape-next--enable-backdrop-filter-experiment"]`).click();
            cy.xpath(`//input[@id="share-url"]`)
              .invoke('val')
              .then((linkUrl) => {
                    cy.log(`Link Url : ${linkUrl}`)
            })
        })
    });
});