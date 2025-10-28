(function(DOM, doc) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  function app() {
    const $formButtonCadastrar = new DOM('[data-js="button-cadastrar"]');
    const $name = new DOM('[data-js="name"]').get();
    const $phone = new DOM('[data-js="phone"]').get();
    const $tableCarBody = new DOM('[data-js="table-car-body"]').get();

    function ajaxRequest(method, url) {
      const ajax = new XMLHttpRequest();
      ajax.open(method, url, true);
      ajax.send();
      ajax.addEventListener('readystatechange', () => {
        if (ajax.readyState === 4) {
          initCompany(JSON.parse(ajax.responseText));
        }
      });
    }

    function initCompany(company) {
      $name.textContent = company.name;
      $phone.textContent = company.phone;
    }

    function addCar() {
      let fragment = doc.createDocumentFragment();
      const data = inputData().map( item => item.get().value)
      fragment = createTableLine(data);
      clearForm();
      return $tableCarBody.appendChild(fragment);
    }

    function inputData(){
      const image = new DOM('[data-js="input-image"]');
      const marcaModelo = new DOM('[data-js="input-marca-modelo"]');
      const ano = new DOM('[data-js="input-ano"]');
      const placa = new DOM('[data-js="input-placa"]');
      const cor = new DOM('[data-js="input-cor"]');

      return [ image, marcaModelo, ano, placa, cor ];
    }

    function createTableLine(inputData){
      const tr = doc.createElement('tr');
      for ( let i = 0; i < inputData.length; i++){
        const td = doc.createElement('td')
        if (inputData[i].match(/data:image/)){
          const image = doc.createElement( 'img' );
          image.setAttribute( 'src', inputData[i] );
          td.appendChild(image);
          tr.appendChild(td);
          continue;
        }
        td.textContent = inputData[i];
        tr.appendChild(td);
      }
      return tr;
    }

    function clearForm(){
      inputData().map( item => item.get().value = '');
    }

    function submitForm() {
      $formButtonCadastrar.on('click', (event) => {
        event.preventDefault();
        addCar();
      });
    }

    return {
      ajaxRequest,
      initCompany,
      addCar,
      submitForm
    }
  }

  app().ajaxRequest('GET', './company.json');
  app().submitForm();
})(window.DOM, document);
