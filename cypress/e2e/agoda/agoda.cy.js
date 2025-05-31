import { Faker } from "@faker-js/faker";
import { DateTime } from "luxon";

const input = Cypress.env("agoda");
let nextDayDate = DateTime.fromISO(input.nextDay);
const dataDepTime = []

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
        cy.wait(10000);

        // Flying From
        cy.get(`#flight-origin-search-input`).click().clear().type(`${input.cityFrom}`);
        cy.xpath(`//li[@data-objectid="${input.departureFrom}"]`).click({multiple:true});
        // cy.wait(1000);
        cy.get(`#flight-origin-search-input`).invoke('val').then((val) => {
            expect(val).not.to.be.empty;
            expect(val).to.equal(`${input.cityFrom} (${input.departureFrom})`);
        });

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
        cy.xpath(`(//div[@data-component="flight-filter-item-airline"]/label)//p`).each(($ele,$index) => {
            if($ele.text() === 'Malaysia Airlines'){
                cy.xpath(`(//div[@data-component="flight-filter-item-airline"]/label)[${$index+1}]//input[@type="checkbox"]`).check();
            }
        });
        cy.wait(3000);
        cy.xpath(`//div[@data-element-name="flight-sort"]//button`).as('sortByBtn').click();
        cy.xpath(`//div[@data-testid="floater-container"]//ul/li[4]/button`).click({force:true});
        cy.xpath(`//h2[@data-testid="title"]`).click();
        cy.xpath(`//div[@data-element-name="flight-sort"]//button//p[1][contains(text(),'Departure time')]`).should('be.visible');
        cy.xpath(`//div[@data-element-name="flight-sort"]//button//p[2][contains(text(),'Earliest first')]`).should('be.visible');
        cy.xpath(`//div[@data-testid="departure-time"]//h3`).each(($ele) => {
            dataDepTime.push($ele.text());
        }).then(() => {
            cy.log(`${dataDepTime.length}`);

        });
        
        cy.then(() => {
            let s = new Set(dataDepTime);
            cy.log(`${new Array(...s).length}`);

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