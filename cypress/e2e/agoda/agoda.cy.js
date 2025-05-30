import { Faker } from "@faker-js/faker";
import { DateTime } from "luxon";

const input = Cypress.env("agoda");
let nextDayDate = DateTime.fromISO(input.nextDay);

describe('E2E Automation Cari Tiket di Agoda', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Pesan Tiket dari Jakarta ke Singapura dengan Malaysia Airlines', () => {
        cy.visit(`${input.url}`);
        cy.xpath(`//li[@id="tab-flight-tab"]`).click({multiple:true});
        cy.url().should('include','#flights').then(() => {
            cy.log(`${nextDayDate.toFormat("yyyy-MM-dd")}`)
        });
        cy.wait(5000);

        // Flying From
        cy.get(`#flight-origin-search-input`).click().clear().type(`${input.cityFrom}`);
        cy.xpath(`//li[@data-objectid="${input.departureFrom}"]`).click({multiple:true});
        // cy.wait(1000);
        cy.get(`#flight-origin-search-input`).invoke('val').then((val) => {
            expect(val).not.to.be.empty;
            expect(val).to.equal(`${input.cityFrom} (${input.departureFrom})`);
        });
        cy.wait(5000)
        // Flying To
        cy.get(`#flight-destination-search-input`).click().clear().type(`${input.cityArrival}`);
        cy.xpath(`//li[@data-objectid="${input.arrivalTo}"]`).click({multiple:true});
        // cy.wait(1000);
        cy.get(`#flight-destination-search-input`).invoke('val').then((val) => {
            expect(val).not.to.be.empty;
            expect(val).to.equal(`${input.cityArrival} (${input.arrivalTo})`);
        });

        // cy.xpath(`//div[@class="DayPicker-Months DayPicker-Months-Wide"]/div[1]`).should('have.contain',`${monthNow}`);
        cy.xpath(`//span[@data-selenium-date='${nextDayDate.toFormat("yyyy-MM-dd")}']`).click({force:true});
        cy.get('[data-selenium="date-selector-title"]').invoke('text').then((val) => {
            expect(val).to.be.equal(`${nextDayDate.day} ${nextDayDate.monthShort} ${nextDayDate.year}`)
        });
        cy.get('[data-selenium="date-selector-desc"]').invoke('text').then((val) => {
            expect(val).to.be.equal(`${nextDayDate.toFormat("ccc")}, ${nextDayDate.day} ${nextDayDate.monthShort} ${nextDayDate.year}`)
        });
        cy.xpath(`//div[@class="FlightSearchOccupancy"]//button[@data-element-object-id="economy"]`).click({force:true})
        cy.get('[data-element-name="flight-occupancy"]').should('have.text',`${input.passenger} Passenger, ${input.cabinType}`).click({multiple:true});
        cy.get('[data-test="SearchButtonBox"]').should('have.contain','SEARCH FLIGHTS').click({multiple:true});
        cy.url().should('include',`departureFrom=${input.departureFrom}`)
                .and('include',`arrivalTo=${input.arrivalTo}`)
                .and('include',`departDate=${nextDayDate.toFormat("yyyy-MM-dd")}`)
                .and('include',`cabinType=${input.cabinType}`)
                .and('include',`adults=${input.passenger}`);
        cy.xpath(`//div[@data-testid="filter-container"]//button/span[starts-with(@label,"Show all")]`).click({force:true});
        cy.xpath(`//*[@data-component="flight-filter-item-airline"]//p`).invoke('text').then(($element) => {
            let val = 1;

            $element.each((index,el) => {
                cy.log(`${index} dan Nilai ${el}`)
            })
        })
        
        // cy.xpath(`(//div[@data-component="flight-filter-item-airline"])[7]//input[@type="checkbox"]`).check();
        // cy.xpath(`//div[@data-testid="flightCard-flight-detail"]//p[contains(text(), 'Malaysia Airlines')]`);
        // cy.then(() => {
        //     // if(today.month === nextDay.month){
        //     // }else{    
        //     //     cy.xpath(`//div[@class="DayPicker-Months DayPicker-Months-Wide"]/div[2]`).should('have.contain',`${monthNext}`);
        //     // }    
        // });
    });
});