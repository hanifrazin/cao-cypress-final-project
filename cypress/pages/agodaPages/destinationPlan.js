class destinationPlan {
    clickFlightTab(){
        cy.xpath(`//li[@id="tab-flight-tab"]`).click({multiple:true});
        cy.url().should('include','#flights');
    }

    flyingFrom(cityFrom, departureAirport, departureFrom) {
        cy.get(`#flight-origin-search-input`).click().type(`${cityFrom}`);
        cy.xpath(`//li[@data-objectid="${departureFrom}" and @data-text="${departureAirport}"]`)
            .should('be.visible')
            .click({multiple:true});
        cy.get('#flight-origin-search-input')
            .invoke('val')
            .should('eq', `${cityFrom} (${departureFrom})`);  
    }

    flyingTo(cityArrival, arrivalAirport, arrivalTo) {
       cy.get(`#flight-destination-search-input`).click().type(`${cityArrival}`);
        cy.xpath(`//li[@data-objectid="${arrivalTo}" and @data-text="${arrivalAirport}"]`).click({multiple:true});
        cy.get(`#flight-destination-search-input`)
            .invoke('val')
            .should('eq', `${cityArrival} (${arrivalTo})`);
    }

    dateSelectorTitle(){
        return cy.get('[data-selenium="date-selector-title"]').invoke('text')
    }

    dateSelectorDesc(){
        return cy.get('[data-selenium="date-selector-desc"]').invoke('text')
    }
        
    checkCabin(passenger, cabinType) {
        cy.xpath(`//div[@class="FlightSearchOccupancy"]//button[@data-element-object-id="economy"]`).click({force:true})
        cy.get('[data-element-name="flight-occupancy"]').should('have.text',`${passenger} Passenger, ${cabinType}`).click({multiple:true});
    }

    clickSearchFlights() {
        cy.get('[data-test="SearchButtonBox"]').should('have.contain','SEARCH FLIGHTS').click({multiple:true});
    }
}

export default new destinationPlan();