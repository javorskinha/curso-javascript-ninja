(function(win, doc){
  'use strict';
  /*
  Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
  métodos semelhantes aos que existem no array, mas que sirvam para os
  elementos do DOM selecionados.
  Crie os seguintes métodos:
  - forEach, map, filter, reduce, reduceRight, every e some.

  Crie também métodos que verificam o tipo do objeto passado por parâmetro.
  Esses métodos não precisam depender de criar um novo elmento do DOM, podem
  ser métodos estáticos.

  Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
  no objeto, como nos exemplos abaixo:
  DOM.isArray([1, 2, 3]); // true
  DOM.isFunction(function() {}); // true
  DOM.isNumber('numero'); // false

  Crie os seguintes métodos para verificação de tipo:
  - isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
  O método isNull deve retornar `true` se o valor for null ou undefined.
  */

  function DOM(elements) {
    this.elements = doc.querySelectorAll(elements);
  }

  DOM.prototype.on = function on( event, action ) {
    Array.prototype.forEach.call( this.elements, item => item.addEventListener( event, action))
  }

  DOM.prototype.off = function off( event, action ) {
    this.elements.array.forEach(item => {
      item.removeEventListner( event, action, false )
    });
  }

  DOM.prototype.get = function get() {
    return this.elements;
  }

  function objType (obj){
    return Object.prototype.toString.call(obj)
  }

  DOM.prototype.forEach = function (){ return Array.prototype.forEach.apply(this.elements, arguments) };
  DOM.prototype.map = function (){ return Array.prototype.map.apply(this.elements, arguments) };
  DOM.prototype.filter = function (){ return Array.prototype.filter.apply(this.elements, arguments) };
  DOM.prototype.reduce = function (){ return Array.prototype.reduce.apply(this.elements, arguments) };
  DOM.prototype.reduceRight = function (){ return Array.prototype.reduceRight.apply(this.elements, arguments) };
  DOM.prototype.every = function (){ return Array.prototype.every.apply(this.elements, arguments) };
  DOM.prototype.some = function (){ return Array.prototype.some.apply(this.elements, arguments) };

  DOM.prototype.isArray = function (obj){ return objType(obj) === '[object Array]'};
  DOM.prototype.isObject = function (obj){ return objType(obj) === '[object Object]'};
  DOM.prototype.isFunction = function (obj){ return objType(obj) === '[object Function]'};
  DOM.prototype.isNumber = function (obj){ return objType(obj) === '[object Number]'};
  DOM.prototype.isString = function (obj){ return objType(obj) === '[object String]'};
  DOM.prototype.isBoolean = function (obj){ return objType(obj) === '[object Boolean]'};
  DOM.prototype.isNull = function (obj){ return objType(obj) === '[object Null]' || objType(obj) === '[object Undefined]'};

  var $a = new DOM('[data-js="link"]');

  $a.forEach( item => { console.log(item.firstChild.nodeValue) });

  var attr = $a.map( item => { return item.getAttribute('data-js') });
  console.log( attr );

  var filter = $a.filter( item => { item.nodeName !== 'span' } );
  console.log( filter )

  var arrayReduce = $a.reduce( (acc, item, i) => {
    return `${acc} ${item.getAttribute('data-js')}${i}`;
  }, '');
  console.log( 'reduce', arrayReduce );

  var arrayReduceRight = $a.reduceRight( (acc, item, i) => {
    return `${acc} ${item.getAttribute('data-js')}${i}`;
  }, '');
  console.log( 'reduceRight', arrayReduceRight );

  var arrayEvery = $a.every( item => item.firstChild );
  console.log( 'every', arrayEvery );

  var arraySome = $a.some( item => item.value );
  console.log( 'som', arraySome );

  console.log( 'isArray', DOM.prototype.isArray( [1, 2, 3] ));
  console.log( 'isObject', DOM.prototype.isObject( {} ));
  console.log( 'isFunction', DOM.prototype.isFunction( function() {}));
  console.log( 'isNumber', DOM.prototype.isNumber( 34 ));
  console.log( 'isString', DOM.prototype.isString( 'é string' ));
  console.log( 'isBoolean', DOM.prototype.isBoolean( true ));
  console.log( 'isNull', DOM.prototype.isNull());

})(window, document);
