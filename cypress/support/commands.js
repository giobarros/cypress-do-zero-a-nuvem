Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Lia',
    lastName: 'Scott',
    email: 'lia45@gmail.com',
    text: 'muito bom, asdndjvsdnjvnf'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click()
})