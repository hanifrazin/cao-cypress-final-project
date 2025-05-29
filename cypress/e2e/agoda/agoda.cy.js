import { Faker } from "@faker-js/faker";
import { DateTime } from "luxon";

const cityFrom = 'Jakarta';
const departureFrom = 'CGK';
const cityArrival = 'Singapore';
const arrivalTo = 'SIN';
const cabinType = "Economy"
const passenger = 1;
const today = DateTime.now();
const nextDay = today.plus({days:1});

describe('E2E Automation Cari Tiket di Agoda', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Pesan Tiket dari Jakarta ke Singapura dengan Malaysia Airlines', () => {
        cy.visit(`${Cypress.env("agoda")}`);
        cy.xpath(`//li[@id="tab-flight-tab"]`).click({multiple:true});
        cy.url().should('include','#flights');
        cy.wait(5000);

        // Flying From
        cy.get(`#flight-origin-search-input`).click().clear().type(`${cityFrom}`);
        cy.xpath(`//li[@data-objectid="${departureFrom}"]`).click({multiple:true});
        // cy.wait(1000);
        cy.get(`#flight-origin-search-input`).invoke('val').then((val) => {
            expect(val).not.to.be.empty;
            expect(val).to.equal(`${cityFrom} (${departureFrom})`);
        });
        cy.wait(5000)
        // Flying To
        cy.get(`#flight-destination-search-input`).click().clear().type(`${cityArrival}`);
        cy.xpath(`//li[@data-objectid="${arrivalTo}"]`).click({multiple:true});
        // cy.wait(1000);
        cy.get(`#flight-destination-search-input`).invoke('val').then((val) => {
            expect(val).not.to.be.empty;
            expect(val).to.equal(`${cityArrival} (${arrivalTo})`);
        });

        // cy.xpath(`//div[@class="DayPicker-Months DayPicker-Months-Wide"]/div[1]`).should('have.contain',`${monthNow}`);
        cy.xpath(`//span[@data-selenium-date='${nextDay.toFormat("yyyy-MM-dd")}']`).click({force:true});
        cy.get('[data-selenium="date-selector-title"]').invoke('text').then((val) => {
            expect(val).to.be.equal(`${nextDay.toFormat("dd MMMM yyyy")}`)
        });
        cy.get('[data-selenium="date-selector-desc"]').invoke('text').then((val) => {
            expect(val).to.be.equal(`${nextDay.toFormat("ccc, dd MMMM yyyy")}`)
        });
        cy.xpath(`//div[@class="FlightSearchOccupancy"]//button[@data-element-object-id="economy"]`).click({force:true})
        cy.get('[data-element-name="flight-occupancy"]').should('have.text',`${passenger} Passenger, ${cabinType}`).click({multiple:true});
        cy.get('[data-test="SearchButtonBox"]').should('have.contain','SEARCH FLIGHTS').click({multiple:true});
        cy.url().should('include',`departureFrom=${departureFrom}`)
                .and('include',`arrivalTo=${arrivalTo}`)
                .and('include',`departDate=${nextDay.toFormat("yyyy-MM-dd")}`)
                .and('include',`cabinType=${cabinType}`)
                .and('include',`adults=${passenger}`);
        // cy.then(() => {
        //     // if(today.month === nextDay.month){
        //     // }else{    
        //     //     cy.xpath(`//div[@class="DayPicker-Months DayPicker-Months-Wide"]/div[2]`).should('have.contain',`${monthNext}`);
        //     // }    
        // });
    });
});