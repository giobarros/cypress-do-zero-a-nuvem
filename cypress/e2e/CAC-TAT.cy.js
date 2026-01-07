describe('Central de Atendimento ao Cliente TAT', ()=> {

  beforeEach(()=> {
    cy.visit('./src/index.html')
  })

  it('Verificar o título da aplicação', ()=> {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preencher os campos obrigatórios e enviar o formulário', ()=> {
    cy.get('#firstName').type('Lia')
    cy.get('#lastName').type('Scott')
    cy.get('#email').type('lia45@gmail.com')
    cy.get('#open-text-area').type('aaaabbbbcccc', {delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('Exibir mensagem de erro ao submeter o formulario com um email com formatação inválida', ()=> {
    cy.get('#firstName').type('Lia')
    cy.get('#lastName').type('Scott')
    cy.get('#email').type('l@@gmail.com')
    cy.get('#open-text-area').type('aaaabbbbcccc', {delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('Validar, que se um valor não-numérico for digitado, seu valor continuará vazio.', ()=> {
    cy.get('#phone')
      .type('acvb')
      .should('have.value', '')
  })

  it('Exibir mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=> {
    cy.get('#firstName').type('Lia')
    cy.get('#lastName').type('Scott')
    cy.get('#email').type('lia45@gmail.com')
    cy.get('#open-text-area').type('aaaabbbbcccc', {delay: 0})
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('Preencher e limpar os campos nome, sobrenome, email e telefone', ()=> {
    cy.get('#firstName')
      .type('Lia')
      .should('have.value','Lia')
      .clear()
      .should('have.value','')

    cy.get('#lastName')
      .type('Scott')
      .should('have.value','Scott')
      .clear()
      .should('have.value','')

    cy.get('#email')
      .type('lia45@gmail.com')
      .should('have.value','lia45@gmail.com')
      .clear()
      .should('have.value','')

    cy.get('#phone')
      .type('123456789')
      .should('have.value','123456789')
      .clear()
      .should('have.value','')
  })

  it('Exibir mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=> {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('Enviar o formuário com sucesso usando um comando customizado', ()=> {    
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('Selecionar um produto (YouTube) por seu texto', ()=> {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube') //valor tem a palavra minuscula
  })

  it('Selecionar um produto (Mentoria) por seu valor (value)', ()=> {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('Selecionar um produto (Blog) por seu índice', ()=> {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('Marcar o tipo de atendimento "Feedback"', ()=> {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('Marcar cada tipo de atendimento', ()=> {
    const atendimento = ['ajuda', 'elogio', 'feedback']

    atendimento.forEach((valor) => {
      cy.get(`input[type="radio"][value="${valor}"]`)
        .check()
        .should('be.checked') 
    })
  })

  it('Marcar ambos checkboxes, depois desmarcar o último', ()=> {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('Selecionar um arquivo da pasta fixtures', ()=> {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Selecionar um arquivo simulando um drag-and-drop', ()=> {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}) //cypress simula um arquivo sendo arrastado para o inpput
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Selecionar um arquivo utilizando uma fixture para a qual foi dada um alias', ()=> {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('Verificar que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=> {
    cy.get('[href="privacy.html"]').should('have.attr', 'target', '_blank')
  })

  it('Acessar a página da política de privacidade removendo o target e então clicando no link', ()=> {
    cy.get('[href="privacy.html"]').invoke('removeAttr', 'target').click()
  })
})