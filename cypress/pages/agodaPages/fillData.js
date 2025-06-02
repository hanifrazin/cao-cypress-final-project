class fillData {
    fillContactDetails(firstName, lastName, email, phone, nationality) {
        cy.xpath(`//span[contains(@class,'Spanstyled__SpanStyled-sc-16tp9kb-0 eOJYA-D kite-js-Span ')]`).invoke('text').as("getTotalPrice");
        cy.xpath(`//input[@id="contact.contactFirstName"]`).click().type(firstName);
        cy.xpath(`//input[@id="contact.contactLastName"]`).click().type(lastName);
        cy.xpath(`//input[@id="contact.contactEmail"]`).click().type(email);
        cy.wait(1000)
        cy.xpath(`//input[@id="contact.contactPhoneNumber"]`).click({force:true}).type(phone);
        cy.xpath(`//div[@data-testid="contact.contactCountryOfResidenceId"]//button`).as("dropdownCountryDeparture").click();
        cy.xpath(`//div[@data-testid="floater-container"]//input[@type="text"]`).click().type(nationality);
        cy.xpath(`//ul[@role="listbox"]/li//span[contains(text(),${nationality})]`);
        cy.xpath(`//ul[@role="listbox"]/li//input[@type="radio"]`).check();
        cy.get("@dropdownCountryDeparture").click(); // Close dropdown
        cy.xpath(`//div[@data-testid="contact.contactCountryOfResidenceId"]//p[contains(text(),${nationality})]`);
    }

    fillPassengerDetails(gender, firstName, middleName, lastName, nationality, passportNumber) {
        cy.then(() => {
            if(gender === 'male'){
                cy.xpath(`//div[@data-testid="flight.forms.i0.units.i0.passengerGender"]//input[@aria-label="Male" and @type="radio"]`).check();
            }else{
                cy.xpath(`//div[@data-testid="flight.forms.i0.units.i0.passengerGender"]//input[@aria-label="Female" and @type="radio"]`).check();
            }
        });
        cy.xpath(`//input[@datatestid="flight.forms.i0.units.i0.passengerFirstName"]`).click().type(`${firstName} ${middleName}`);
        cy.xpath(`//input[@datatestid="flight.forms.i0.units.i0.passengerLastName"]`).click().type(lastName);
        cy.xpath(`//div[@data-testid="flight.forms.i0.units.i0.passengerNationality"]//button`).click();
        cy.xpath(`//div[@data-testid="floater-container"]//input[@type="text"]`).click().type(nationality);
        cy.xpath(`//ul[@role="listbox"]/li//span[contains(text(),${nationality})]`);
        cy.xpath(`//ul[@role="listbox"]/li//input[@type="radio"]`).check();
        cy.xpath(`//div[@data-testid="form-card-flight-0"]//h3`).click({force:true});
        cy.xpath(`//input[@data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-DateInputDataTestId"]`).click().type(10);
        cy.xpath(`//div[@data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-MonthInputDataTestId"]//button`).click();
        cy.xpath(`(//div[@data-testid="portal"]//ul/li/label)//span[contains(text(),"December")]`).click({force:true});
        cy.xpath(`//input[@data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-YearInputDataTestId"]`).click().type(2000);

        cy.get('body').then(($body) => {
            if ($body.find(`input[id='flight.forms.i0.units.i0.passportNumber']`).length === 1) {
                cy.get(`input[id='flight.forms.i0.units.i0.passportNumber']`).click().type(passportNumber);
                cy.xpath(`//div[@data-testid="flight.forms.i0.units.i0.passportCountryOfIssue"]//button`).click();
                cy.xpath(`//div[@data-testid="floater-container"]//input[@type="text"]`).click().type(nationality);
                cy.xpath(`//ul[@role="listbox"]/li//span[contains(text(),${nationality})]`);
                cy.xpath(`//ul[@role="listbox"]/li//input[@type="radio"]`).check();
                cy.xpath(`//input[@data-testid="flight.forms.i0.units.i0.passportExpiryDate-DateInputDataTestId"]`).click().type(25);
                cy.xpath(`//div[@data-testid="flight.forms.i0.units.i0.passportExpiryDate-MonthInputDataTestId"]//button`).click();
                cy.xpath(`(//div[@data-testid="portal"]//ul/li/label)//span[contains(text(),"December")]`).click({force:true});
                cy.xpath(`//input[@data-testid="flight.forms.i0.units.i0.passportExpiryDate-YearInputDataTestId"]`).click().type(2030);
            }
        });
    }
}

export default new fillData();