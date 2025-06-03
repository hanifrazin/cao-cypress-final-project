import { DateTime } from "luxon";
import destinationPlan from "../../pages/agodaPages/destinationPlan";
import cariPesawat from "../../pages/agodaPages/cariPesawat";
import fillData from "../../pages/agodaPages/fillData";
import cekData from "../../pages/agodaPages/cekData";

const input = Cypress.env("agoda");
let nextDayDate = DateTime.fromISO(input.nextDay);
let dataDepTime = [];
let timeList = [];
const gender = input.gender

describe('E2E Automation Cari Tiket di Agoda', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Pesan Tiket dari Jakarta ke Singapura dengan Malaysia Airlines', () => {
        cy.visit(`${input.url}`);
        destinationPlan.clickFlightTab();
        cy.wait(5000);

        // Flying From
        destinationPlan.flyingFrom(input.cityFrom, input.departureAirport, input.departureFrom);

        // Flying To
        destinationPlan.flyingTo(input.cityArrival, input.arrivalAirport, input.arrivalTo);

        // cy.xpath(`//div[@class="DayPicker-Months DayPicker-Months-Wide"]/div[1]`).should('have.contain',`${monthNow}`);
        cy.xpath(`//span[@data-selenium-date='${nextDayDate.toFormat("yyyy-MM-dd")}']`).click({multiple:true});
        destinationPlan.dateSelectorTitle().then((val) => {
            expect(val).to.be.equal(`${nextDayDate.day} ${nextDayDate.monthShort} ${nextDayDate.year}`)
        });
        destinationPlan.dateSelectorDesc().then((val) => {
            expect(val).to.be.equal(`${nextDayDate.toFormat("ccc")}, ${nextDayDate.day} ${nextDayDate.monthShort} ${nextDayDate.year}`)
        });

        destinationPlan.checkCabin(input.passenger,input.cabinType);
        destinationPlan.clickSearchFlights();
        
        cy.wait(3000);
        
        cariPesawat.cekListUrl(input.departureFrom, input.arrivalTo, nextDayDate.toFormat("yyyy-MM-dd"), input.cabinType, input.passenger);
        cariPesawat.selectMalaysiaAirlines();
        cariPesawat.clickSortByDropdown
        cy.xpath(`//div[@data-testid="departure-time"]//h3`).each(($ele) => {
            dataDepTime.push($ele.text());
        }).then(() => {
            const setDepTime = new Set(dataDepTime)
            timeList = Array.from(setDepTime)
        });
        cariPesawat.clickListMalaysiaAirlines(timeList[0]);
        
        cy.wait(3000);

        // Contact Details
        fillData.fillContactDetails(input.contactDetails.firstName, input.contactDetails.lastName, input.contactDetails.email, input.contactDetails.phone, input.contactDetails.nationality);

        // Passengers
        fillData.fillPassengerDetails(gender, input.contactDetails.firstName, input.contactDetails.middleName, input.contactDetails.lastName, input.contactDetails.nationality, input.contactDetails.passportNumber)

        cy.wait(2000)

        cy.xpath(`//button[@data-component="flight-continue-to-addOns-button"]`).click({force:true});
        // cy.contains('[role="radio"]', "No, thanks, I’ll risk it.").click();
        cy.contains('p', "No, thanks, I’ll risk it.").click({ force: true });
        cy.xpath(`//button[@type="submit" and @data-testid="continue-to-payment-button"]`).click();

        cy.wait(2000)
        cy.xpath(`//button[@data-element-name="decline-button"]`).click({force:true});
        cy.wait(5000)
        
        cy.xpath(`//span/a[@data-testid="toggle-text-component"]`).should('be.visible').click({force:true});
        
        cekData.cekNameContact(input.contactDetails.firstName, input.contactDetails.lastName);
        cekData.cekEmailContact(input.contactDetails.email);
        cekData.cekPhoneContact(input.contactDetails.phone);
        cekData.cekPassengerName(input.contactDetails.firstName, input.contactDetails.middleName, input.contactDetails.lastName);
        
        cy.get("@getTotalPrice").then((totalPrice) => {
            cy.xpath(`//div[@data-component="breakdownlist-2"]//dd[@data-component="mob-flight-price-total-desc"]/span`).should('be.visible').and('have.text', totalPrice);
        });
        cy.get("@getDepartureTime").then((departureTime) => {
            cy.xpath(`//span[@data-component="mob-flight-segment-departure"][@data-value="${departureTime}"]`).should('have.text',`${departureTime}`);
        });
        cy.get("@getArrivalTime").then((arrivalTime) => {
            cy.xpath(`//span[@data-component="mob-flight-segment-arrival"][@data-value="${arrivalTime}"]`).should('have.text',`${arrivalTime}`);
        });

    });
});