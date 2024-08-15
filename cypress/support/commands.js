Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function () {
  cy.get("#firstName").type("Pedro");
  cy.get("#lastName").type("Marques");
  cy.get("#email").type("pdro0214@gmail.com");
  cy.get("#open-text-area").type('teste'); 
  cy.contains('button', 'Enviar').click()
});
