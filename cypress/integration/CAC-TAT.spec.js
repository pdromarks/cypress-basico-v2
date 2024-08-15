/// <reference types="Cypress"/>

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", function () {
    const longText =
      "teste, teste, teste, testes, teste, teste, teste, testes, teste, teste, teste, testes, teste, teste, teste, testes, teste, teste, teste, testes, teste, teste, teste, testes, teste, teste, teste, testes.";
    cy.get("#firstName").type("Pedro");
    cy.get("#lastName").type("Marques");
    cy.get("#email").type("pdro0214@gmail.com");
    cy.get("#open-text-area").type(longText, { delay: 0 }); //aplicando delay 0 ao digitar um texto grande
    cy.contains('button', 'Enviar').click()

    cy.get(".success").should("be.visible"); //validando mensagem de sucesso
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").type("Pedro");
    cy.get("#lastName").type("Marques");
    cy.get("#email").type("pdro0214gmail,com"); //digitando um e-mail inválido
    cy.get("#open-text-area").type("Teste");
    cy.contains('button', 'Enviar').click()

    cy.get(".error").should("be.visible");
  });

  it("campo phone continua vazio quando preenchido com valor não-numérioo", function () {
    cy.get("#phone").type("teste").should("be.empty"); //validando se o campo phone está vazio
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    //preenchendo os campos obrigatórios
    cy.get("#firstName").type("Pedro");
    cy.get("#lastName").type("Marques");
    cy.get("#email").type("pdro0214@gmail.com");
    //clicando no checkbox telefone
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("Teste");

    //clicando no botão enviar
    cy.contains('button', 'Enviar').click()

    //validando mensagem de erro
    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    //preenchendo os campos, validando se foram preenchidos, limpando os campos e validando se foram limpados
    cy.get("#firstName")
      .type("Pedro")
      .should("have.value", "Pedro")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Marques")
      .should("have.value", "Marques")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("pdro0214@gmail.com")
      .should("have.value", "pdro0214@gmail.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("1111111111")
      .should("have.value", "1111111111")
      .clear()
      .should("have.value", "");
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.contains('button', 'Enviar').click()
    cy.get(".error").should("be.visible");
  })

  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit() //importando comando do arquivo commands.js
    cy.get(".success").should("be.visible"); //validando mensagem de
  })

  it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function(){
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', function(){
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  })

  //-----------------Forma que eu fiz-----------------
  // it.only('marca todos tipos de atendimento', function(){
    //   cy.get('input[type="radio"][value="ajuda"]').check().should('be.checked')
    //   cy.get('input[type="radio"][value="elogio"]').check().should('be.checked')
    //   cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    // })
    
    //-----------------Forma "Correta"-----------------
  it('marca todos os atendimentos', function(){
    cy.get('input[type="radio"]') //pega todos campos do tipo radio
      .should('have.length', 3) //verifica se possui 3 elementos tipo radio
      .each(function($radio){ //entra em um looping até validar todos os elementos do tipo radio
        cy.wrap($radio).check() //marca
        cy.wrap($radio).should('be.checked') //verifica se marcou
      })
  })
  
it('marca ambos checkboxes, depois desmarca o último', function(){
  cy.get('input[type="checkbox"]') //seleciona todos os elementos do tipo checkbox
  .check() //marca todos os elementos selecionados
  .should('be.checked') //verifica se realmente foi marcado
  .last( ) //seleciona o último elemento
  .uncheck() //desmarca o elemento selecionado
  .should('not.be.checked') //verifica se foi desmarcado
})

it.only('seleciona um arquivo da pasta fixtures', function(){
  cy.get('input[type="file"]') // encontra todos os elementos do tipo file
  .should('not.have.value') //verifica se não tem nenhum valor
  .selectFile('./cypress/fixtures/example.json') //seleciona o arquivo example.json
  .should(function($input){
    expect($input[0].files[0].name).to.equal("example.json") //valida se o arquivo selecionado está correto

  })
})
});



