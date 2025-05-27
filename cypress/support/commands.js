// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('visitAgoda', (url = '/')=>{
    cy.visit(`https://www.agoda.com${url}`,{timeout:40000});
});

Cypress.Commands.add('visitAmazon', (url = '/')=>{
    cy.visit(`https://www.amazon.com${url}`);
});

Cypress.Commands.add('visitYoutube', (url = '/')=>{
    cy.visit(`https://www.youtube.com${url}`);
});
