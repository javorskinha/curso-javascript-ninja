(function(win, doc){
  'use strict';
  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */

  function DOM(elements) {
    this.elements = doc.querySelectorAll(elements);
  }

  DOM.prototype.on = function on( event, action ) {
    Array.prototype.forEach.call( this.elements, item => item.addEventListener( event, action))
  }

  // DOM.prototype.off = function off( event, action ) {
  //   this.elements.array.forEach(item => {
  //     item.removeEventListner( event, action, false )
  //   });
  // }

  DOM.prototype.get = function get() {
    return this.elements;
  }

  // function objType (obj){
  //   return Object.prototype.toString.call(obj)
  // }

  // DOM.prototype.forEach = function (){ return Array.prototype.forEach.apply(this.elements, arguments) };
  // DOM.prototype.map = function (){ return Array.prototype.map.apply(this.elements, arguments) };
  // DOM.prototype.filter = function (){ return Array.prototype.filter.apply(this.elements, arguments) };
  // DOM.prototype.reduce = function (){ return Array.prototype.reduce.apply(this.elements, arguments) };
  // DOM.prototype.reduceRight = function (){ return Array.prototype.reduceRight.apply(this.elements, arguments) };
  // DOM.prototype.every = function (){ return Array.prototype.every.apply(this.elements, arguments) };
  // DOM.prototype.some = function (){ return Array.prototype.some.apply(this.elements, arguments) };

  // DOM.prototype.isArray = function (obj){ return objType(obj) === '[object Array]'};
  // DOM.prototype.isObject = function (obj){ return objType(obj) === '[object Object]'};
  // DOM.prototype.isFunction = function (obj){ return objType(obj) === '[object Function]'};
  // DOM.prototype.isNumber = function (obj){ return objType(obj) === '[object Number]'};
  // DOM.prototype.isString = function (obj){ return objType(obj) === '[object String]'};
  // DOM.prototype.isBoolean = function (obj){ return objType(obj) === '[object Boolean]'};
  // DOM.prototype.isNull = function (obj){ return objType(obj) === '[object Null]' || objType(obj) === '[object Undefined]'};

  const ajax = new XMLHttpRequest;
  const $formZipCode = new DOM('[data-js="form-zip-code"]');
  const $zipCode = new DOM('[data-js="input-zip-code"]');
  const $requestStatus = new DOM('[data-js="input-status"]');
  const $street = new DOM('[data-js="input-street"]');
  const $neighborhood = new DOM('[data-js="input-neighborhood"]');
  const $state = new DOM('[data-js="input-state"]');
  const $city = new DOM('[data-js="input-city"]');
  const $zipCodeResponse = new DOM('[data-js="input-zip-code-response"]');

  $formZipCode.on( 'submit', handleSubmitForm );

  function handleSubmitForm(e){
    e.preventDefault();
    const cleanZip = $zipCode.get()[0].value.match(/\d/g).join('');
    showMessage('loading');
    ajaxRequest( 'GET', `https://viacep.com.br/ws/${cleanZip}/json/` );
  };

  function ajaxRequest( method, url){
    ajax.open( method, url );
    ajax.send();
    ajax.addEventListener( 'readystatechange', handleReadyStateChange );
  }

  function handleReadyStateChange(){
    if( ajax.readyState === 4 && ajax.status === 200) return fillFields();
    if( ajax.status !== 200 ) showMessage('error');
  }

  function fillFields(){
    const { logradouro, bairro, uf, localidade, cep } = JSON.parse(ajax.responseText);
    $street.get()[0].value = logradouro;
    $neighborhood.get()[0].value = bairro;
    $state.get()[0].value = uf;
    $city.get()[0].value = localidade;
    $zipCodeResponse.get()[0].value = cep;
    showMessage('sucess');
  }

  function showMessage(status) {
    const statusMessage = {
      'loading': `Buscando informações para o CEP ${$zipCode.get()[0].value}...`,
      'sucess': `Endereço referente ao CEP ${$zipCode.get()[0].value}:`,
      'error': `Não encontramos o endereço para o CEP ${$zipCode.get()[0].value}.`
    };
    return $requestStatus.get()[0].textNode = statusMessage[status];
  }

})(window, document);
