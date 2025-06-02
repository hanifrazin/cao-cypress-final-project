class cariPesawat {
    cekListUrl(departureFrom,arrivalTo,nextDayDate,cabinType,passenger) {
        cy.url().should('include',`departureFrom=${departureFrom}`)
        .and('include',`arrivalTo=${arrivalTo}`)
        .and('include',`departDate=${nextDayDate}`)
        .and('include',`cabinType=${cabinType}`)
        .and('include',`adults=${passenger}`);
    }
    
    selectMalaysiaAirlines() {
        cy.xpath(`//div[@data-testid="filter-container"]//button/span[starts-with(@label,"Show all")]`).click({force:true});
        cy.xpath(`(//div[@data-component="flight-filter-item-airline"]/label)//p`).each(($ele,$index) => {
            if($ele.text() === 'Malaysia Airlines'){
                cy.xpath(`(//div[@data-component="flight-filter-item-airline"])[${$index+1}]/label//input[@type="checkbox"]`).click({force:true});
            }
        });
    }

    clickSortByDropdown(){
        cy.xpath(`//div[@data-element-name="flight-sort"]//button`).click({force:true});
        cy.xpath(`//div[@data-testid="floater-container"]//ul/li[4]/button`).click({force:true});
        cy.xpath(`//h2[@data-testid="title"]`).click();
        cy.xpath(`//div[@data-element-name="flight-sort"]//button//p[1][contains(text(),'Departure time')]`).should('be.visible');
        cy.xpath(`//div[@data-element-name="flight-sort"]//button//p[2][contains(text(),'Earliest first')]`).should('be.visible');
    }

    clickListMalaysiaAirlines(timeList) {
        cy.xpath(`(//div[@data-testid="web-refresh-flights-card"]/button)//h3[contains(text(),${timeList})]`).first().click({multiple:true}).then(() => {
            cy.xpath(`(//div[@data-testid="web-refresh-flights-card"])[1]//div[@data-testid="departure-time"]//h3`).invoke('text').as("getDepartureTime");
            cy.xpath(`(//div[@data-testid="web-refresh-flights-card"])[1]//div[@data-testid="arrival-time"]//h3`).invoke('text').as("getArrivalTime");
            cy.xpath(`//button[@data-element-name="flight-detail-select-button"]`).click({force:true})
            cy.url().should('include','/bookings/details')
        });
    }

    findAndClickMalaysiaMorningFlight(retryCount = 0) {
        if (retryCount > 10) {
            throw new Error('Flight not found after 10 scrolls');
        }

        cy.get('div[data-testid="web-refresh-flights-card"]').then($cards => {
            const found = Cypress._.some($cards, card => {
            const $card = Cypress.$(card);
            const airlineAlt = $card.find('img[data-testid="airline-logo"]').attr('alt')?.toLowerCase() || '';
            if (!airlineAlt.includes('malaysia airlines')) return false;

            const departureText = $card.find('[data-testid="departure-time"] h3').text().trim();
            const [hourStr] = departureText.split(':');
            const hour = parseInt(hourStr);

            if (hour >= 11) return false;

                const arrivalText = $card.find('[data-testid="arrival-time"] h3').text().trim();

                // Wrap card agar bisa klik & simpan waktu
                cy.wrap(card).scrollIntoView().click({ multiple: true });
                cy.wrap(departureText).as('departureTime');
                cy.wrap(arrivalText).as('arrivalTime');

                return true; // stop iterasi karena sudah ditemukan
            });

            if (!found) {
                cy.scrollTo('bottom');
                cy.wait(1500);
                findAndClickMalaysiaMorningFlight(retryCount + 1);
            }
        });
    }
};
export default new cariPesawat();