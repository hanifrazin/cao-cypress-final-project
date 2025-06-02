class cekData {
    cekNameContact(firstName, lastName) {
        cy.contains(`${firstName} ${lastName}`).should('be.visible');
    }

    cekEmailContact(email){
        cy.contains(`${email}`).should('be.visible');
    }

    cekPhoneContact(phone){
        cy.contains(`${phone}`).should('be.visible');
    }

    cekPassengerName(firstName, middleName, lastName) {
        cy.contains(`${firstName} ${middleName} ${lastName}`).should('be.visible');
    }

    cekTotalPrice(){

    }


}

export default new cekData();