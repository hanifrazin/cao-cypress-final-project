cy.xpath(`//div[@data-testid="filter-container"]//button/span[starts-with(@label,"Show all")]`).click({force:true});
cy.xpath(`(//div[@data-component="flight-filter-item-airline"]/label)//p`).each(($ele,$index) => {
    if($ele.text() === 'Malaysia Airlines'){
        cy.xpath(`(//div[@data-component="flight-filter-item-airline"])[${$index+1}]/label//input[@type="checkbox"]`).click({force:true});
    }
});

cy.get('.a5d86-fill-deprecated-secondary-interactive.a5d86-flex > [data-component-name="selection"] > :nth-child(1) > [data-testid="selection-popover"] > .a5d86-bg-generic-base-transparent').should('be.visible').click({force:true});
// cy.xpath('//button[.//p[contains(text(),"Sort by")]]')
// .scrollIntoView()
// .should('be.visible')
// .click({ force: true });

cy.xpath(`//div[@data-testid="floater-container"]//ul/li[4]/button`).click({force:true});
cy.xpath(`//h2[@data-testid="title"]`).click();
cy.xpath(`//div[@data-element-name="flight-sort"]//button//p[1][contains(text(),'Departure time')]`).should('be.visible');
cy.xpath(`//div[@data-element-name="flight-sort"]//button//p[2][contains(text(),'Earliest first')]`).should('be.visible');
cy.xpath(`//div[@data-testid="departure-time"]//h3`).each(($ele) => {
    dataDepTime.push($ele.text());
}).then(() => {
    const setDepTime = new Set(dataDepTime)
    timeList = Array.from(setDepTime)
});

// Pilih salah satu list penerbangan
cy.xpath(`(//div[@data-testid="web-refresh-flights-card"]/button)//h3[contains(text(),${timeList[0]})]`).first().click({multiple:true}).then(() => {
    cy.xpath(`(//div[@data-testid="web-refresh-flights-card"])[1]//div[@data-testid="departure-time"]//h3`).invoke('text').as("getDepartureTime");
    cy.xpath(`(//div[@data-testid="web-refresh-flights-card"])[1]//div[@data-testid="arrival-time"]//h3`).invoke('text').as("getArrivalTime");
    cy.xpath(`//button[@data-element-name="flight-detail-select-button"]`).click({force:true})
    cy.url().should('include','/bookings/details')
});

// cy.wait(3000);

// cy.get('[data-testid="web-refresh-flights-card"]').should('exist');
// findAndClickMalaysiaMorningFlight(7);

// cy.get('@departureTime').then((dep) => {
//     cy.log('Departure:', dep);
// });

// cy.get('@arrivalTime').then((arr) => {
//     cy.log('Arrival:', arr);
// });

// cy.xpath(`//button[@data-element-name="flight-detail-select-button"]`).click({force:true})



cy.wait(3000);

// Contact Details
cy.xpath(`//span[contains(@class,'Spanstyled__SpanStyled-sc-16tp9kb-0 eOJYA-D kite-js-Span ')]`).invoke('text').as("getTotalPrice");
cy.xpath(`//input[@id="contact.contactFirstName"]`).click().type(input.contactDetails.firstName);
cy.xpath(`//input[@id="contact.contactLastName"]`).click().type(input.contactDetails.lastName);
cy.xpath(`//input[@id="contact.contactEmail"]`).click().type(input.contactDetails.email);
cy.wait(1000)
cy.xpath(`//input[@id="contact.contactPhoneNumber"]`).click().type(input.contactDetails.phone);
cy.xpath(`//div[@data-testid="contact.contactCountryOfResidenceId"]//button`).click();
cy.xpath(`//div[@data-testid="floater-container"]//input[@type="text"]`).click().type(input.contactDetails.nationality);
cy.xpath(`//ul[@role="listbox"]/li//span[contains(text(),${input.contactDetails.nationality})]`);
cy.xpath(`//ul[@role="listbox"]/li//input[@type="radio"]`).check();
cy.xpath(`//div[@data-testid="form-card-flight-0"]//h3`).click({force:true});
cy.xpath(`//div[@data-testid="contact.contactCountryOfResidenceId"]//p[contains(text(),${input.contactDetails.nationality})]`);

// Passengers
cy.then(() => {
    if(gender === 'male'){
        cy.xpath(`//div[@data-testid="flight.forms.i0.units.i0.passengerGender"]//input[@aria-label="Male" and @type="radio"]`).check();
    }else{
        cy.xpath(`//div[@data-testid="flight.forms.i0.units.i0.passengerGender"]//input[@aria-label="Female" and @type="radio"]`).check();
    }
});
cy.xpath(`//input[@datatestid="flight.forms.i0.units.i0.passengerFirstName"]`).click().type(`${input.contactDetails.firstName} ${input.contactDetails.middleName}`);
cy.xpath(`//input[@datatestid="flight.forms.i0.units.i0.passengerLastName"]`).click().type(input.contactDetails.lastName);
cy.xpath(`//div[@data-testid="flight.forms.i0.units.i0.passengerNationality"]//button`).click();
cy.xpath(`//div[@data-testid="floater-container"]//input[@type="text"]`).click().type(input.contactDetails.nationality);
cy.xpath(`//ul[@role="listbox"]/li//span[contains(text(),${input.contactDetails.nationality})]`);
cy.xpath(`//ul[@role="listbox"]/li//input[@type="radio"]`).check();
cy.xpath(`//div[@data-testid="form-card-flight-0"]//h3`).click({force:true});
cy.xpath(`//input[@data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-DateInputDataTestId"]`).click().type(10);
cy.xpath(`//div[@data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-MonthInputDataTestId"]//button`).click();
cy.xpath(`(//div[@data-testid="portal"]//ul/li/label)//span[contains(text(),"December")]`).click({force:true});
cy.xpath(`//input[@data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-YearInputDataTestId"]`).click().type(2000);

cy.wait(2000)

cy.xpath(`//button[@data-component="flight-continue-to-addOns-button"]`).click({force:true});
cy.contains('[role="radio"]', "No, thanks, I’ll risk it.").click();
cy.xpath(`//button[@type="submit" and @data-testid="continue-to-payment-button"]`).click();

cy.wait(2000)
cy.xpath(`//button[@data-element-name="decline-button"]`).click({force:true});
cy.wait(2000)

cy.url().should('include','/bookings/payment')
cy.xpath(`//div[@data-testid="mob-flight-slice-container"]//a`).click();
cy.get("@getDepartureTime").then(($val) => {
    cy.xpath(`(//div[@data-testid="mob-flight-collapse"]//ul/li)[1]//span[@data-component="mob-flight-segment-departure"]`).invoke('text').then(($ele) => {
        expect($ele.trim()).to.be.equal($val);
    });
});
cy.get("@getArrivalTime").then(($val) => {
    cy.xpath(`(//div[@data-testid="mob-flight-collapse"]//ul/li)[3]//span[@data-component="mob-flight-segment-arrival"]`).invoke('text').then(($ele) => {
        expect($ele.trim()).to.be.equal($val);
    });
});
cy.get("@getTotalPrice").then(($val) => {
    cy.xpath(`//dd[@data-component="mob-flight-price-total-desc"]/span[@data-component="mob-price-desc-text"]`).invoke('text').then(($ele) => {
        expect($ele.trim()).to.be.equal($val);
    });
});
cy.xpath(`//div[@data-component="passenger-summary-list"]//span[@data-component="name-container-name"]`).invoke('text').then(($ele) => {
    expect($ele.trim()).to.be.equal(`${input.contactDetails.firstName} ${input.contactDetails.middleName} ${input.contactDetails.lastName}`);
});